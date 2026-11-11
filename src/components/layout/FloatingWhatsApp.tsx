const WHATSAPP_NUMBER = "971565547528";
const DEFAULT_MESSAGE =
  "Hi Ahmad, I found your site and I'd like to talk about a project.";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ahmad on WhatsApp"
      className="group glass-button fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <span
        className="absolute inset-0 rounded-full border border-accent/50 motion-safe:animate-ping"
        style={{ animationDuration: "3s" }}
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative size-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-border bg-background/95 px-2.5 py-1.5 text-xs text-foreground opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
