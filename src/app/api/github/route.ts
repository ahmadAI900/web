import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

type GitHubUser = {
  public_repos: number;
  followers: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

type GitHubPayload = {
  ok: true;
  user: { publicRepos: number; followers: number };
  stars: number;
  languages: { name: string; count: number }[];
  repos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    href: string;
    updatedAt: string;
  }[];
};

const USERNAME = "ahmadAI900";

async function getGithubData(): Promise<GitHubPayload> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "alashraf-techub-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
      headers,
    }),
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error(`GitHub API responded ${userResponse.status}/${reposResponse.status}`);
  }

  const user = (await userResponse.json()) as GitHubUser;
  const repos = ((await reposResponse.json()) as GitHubRepo[]).filter(
    (repo) => !repo.archived,
  );

  const languageCounts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }

  const languages = [...languageCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    ok: true,
    user: { publicRepos: user.public_repos, followers: user.followers },
    stars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
    languages,
    repos: repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        href: repo.html_url,
        updatedAt: repo.updated_at,
      })),
  };
}

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function GET(request: Request) {
  const ip = getIp(request);
  const limit = rateLimit(`github:${ip}`, 30, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) } },
    );
  }

  try {
    const data = await getGithubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub stats unavailable", error);
    return NextResponse.json(
      { ok: false },
      { headers: { "Cache-Control": "public, s-maxage=300" } },
    );
  }
}
