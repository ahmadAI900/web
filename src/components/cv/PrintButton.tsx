"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-accent px-4 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
    >
      <Download className="size-4" aria-hidden="true" />
      Save as PDF
    </button>
  );
}
