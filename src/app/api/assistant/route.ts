import { NextResponse } from "next/server";
import { z } from "zod";
import { assistantSystemPrompt } from "@/content/knowledge";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z
  .object({
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1).max(3000),
        }),
      )
      .min(1)
      .max(12),
  })
  .refine(
    (data) =>
      data.messages.reduce((total, message) => total + message.content.length, 0) <=
      6000,
    { message: "Conversation is too long." },
  );

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getIp(request);
  const limit = rateLimit(`assistant:${ip}`, 10, 60 * 1000);

  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          "You are sending messages too quickly. Wait a minute, or contact Ahmad on WhatsApp.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "The AI assistant is not connected right now. Ahmad can answer directly on WhatsApp at +971 56 554 7528 or by email at ahmadashraf97800@gmail.com.",
    });
  }

  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  let upstream: Response;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          { role: "system", content: assistantSystemPrompt },
          ...parsed.data.messages,
        ],
      }),
      signal: request.signal,
    });
  } catch (error) {
    console.error("Groq request failed", error);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("Groq error", upstream.status, detail.slice(0, 500));
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 },
    );
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newline = buffer.indexOf("\n");
          while (newline !== -1) {
            const line = buffer.slice(0, newline).trim();
            buffer = buffer.slice(newline + 1);
            newline = buffer.indexOf("\n");

            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;
            if (data === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const parsedChunk = JSON.parse(data) as {
                choices?: { delta?: { content?: string } }[];
              };
              const delta = parsedChunk.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Ignore malformed keep-alive fragments.
            }
          }
        }
        controller.close();
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Assistant stream failed", error);
        }
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
