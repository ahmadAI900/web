import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className="max-w-3xl font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
