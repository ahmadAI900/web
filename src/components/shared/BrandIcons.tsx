export function TeddyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <ellipse cx="18" cy="18" rx="9" ry="10" fill="currentColor" opacity="0.9" />
      <ellipse cx="46" cy="18" rx="9" ry="10" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="30" r="19" fill="currentColor" />
      <circle cx="24" cy="28" r="3.2" fill="#0a0a0b" />
      <circle cx="40" cy="28" r="3.2" fill="#0a0a0b" />
      <circle cx="25.2" cy="26.8" r="1.1" fill="#f8fafc" />
      <circle cx="41.2" cy="26.8" r="1.1" fill="#f8fafc" />
      <path
        d="M24 37c2.4 3.2 5.2 4.8 8 4.8s5.6-1.6 8-4.8"
        stroke="#0a0a0b"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="34" r="2.2" fill="#0a0a0b" />
      <path
        d="M16 50c4-4 10-6 16-6s12 2 16 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
