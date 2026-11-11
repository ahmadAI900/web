import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "primary" | "inverse" | "mono";
  layout?: "inline" | "stacked";
  showWordmark?: boolean;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

const markTone = {
  primary: "text-accent",
  inverse: "text-[#0A0A0B]",
  mono: "text-current",
} as const;

const nameTone = {
  primary: "text-foreground",
  inverse: "text-[#0A0A0B]",
  mono: "text-current",
} as const;

const suffixTone = {
  primary: "text-muted",
  inverse: "text-[#0A0A0B]/60",
  mono: "text-current/70",
} as const;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8", className)}
    >
      <path
        d="M5.6 28.4 16 8.4"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
      />
      <path
        d="M26.4 28.4 16 8.4"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
      />
      <path
        d="M10.1 21.4h11.8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <circle cx="16" cy="6.2" r="2.9" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  variant = "primary",
  layout = "inline",
  showWordmark = true,
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  const label = "ALASHRAF-TECHUB";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        layout === "stacked" && "flex-col items-start gap-3",
        className,
      )}
      aria-label={showWordmark ? undefined : label}
      role={showWordmark ? undefined : "img"}
    >
      <LogoMark className={cn(markTone[variant], markClassName)} />
      {showWordmark ? (
        <span
          className={cn(
            "flex items-baseline gap-1.5 font-display leading-none",
            layout === "stacked" && "flex-col items-start gap-1",
            wordmarkClassName,
          )}
        >
          <span
            className={cn(
              "text-[1.05rem] font-bold tracking-[0.12em]",
              nameTone[variant],
            )}
          >
            ALASHRAF
          </span>
          <span
            className={cn(
              "text-[0.72rem] font-medium tracking-[0.3em]",
              suffixTone[variant],
            )}
          >
            TECHUB
          </span>
        </span>
      ) : null}
    </span>
  );
}
