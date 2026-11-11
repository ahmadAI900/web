"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteInquiryButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async () => {
    if (!window.confirm("Delete this inquiry? This cannot be undone.")) return;
    setPending(true);
    setError(null);

    try {
      const response = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Could not delete the inquiry.");
      }
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not delete the inquiry.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void onDelete()}
        disabled={pending}
        aria-label="Delete inquiry"
        className="inline-flex size-9 items-center justify-center rounded-[8px] border border-border bg-background text-muted transition-colors duration-200 hover:border-danger/40 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
      {error ? <p className="text-[0.65rem] text-danger">{error}</p> : null}
    </div>
  );
}
