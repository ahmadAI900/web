"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useVoice } from "@/components/assistant/useVoice";
import { TeddyIcon } from "@/components/shared/BrandIcons";
import { whatsappLink } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const greeting: Message = {
  role: "assistant",
  content:
    "Hi — I'm Ahmad's AI assistant. Ask me about his services, projects, background, or how to start working with him.",
};

const suggestions = [
  "What services does Ahmad offer?",
  "Tell me about GENESIS OS.",
  "How do I start a project?",
  "Is Ahmad available for new work?",
];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleTranscript = (text: string) => setInput(text);
  const {
    listening,
    speechSupported,
    ttsSupported,
    voiceError,
    voiceReplies,
    setVoiceReplies,
    toggleListening,
    speak,
    stopSpeaking,
  } = useVoice(handleTranscript);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!voiceReplies) stopSpeaking();
  }, [voiceReplies, stopSpeaking]);

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;

    setInput("");
    setError(null);
    setBusy(true);

    const history: Message[] = [
      ...messages.filter((message) => message.content.trim().length > 0),
      { role: "user", content: text },
    ];
    const apiMessages = history.slice(-10);

    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "The assistant is unavailable right now.");
      }

      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as { reply?: string; error?: string };
        const reply =
          payload.reply ??
          payload.error ??
          "I could not answer that. Please message Ahmad on WhatsApp.";
        setMessages([...history, { role: "assistant", content: reply }]);
        speak(reply);
        return;
      }

      if (!response.body) {
        throw new Error("The assistant returned an empty response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: accumulated }]);
      }

      if (!accumulated.trim()) {
        accumulated =
          "I could not answer that. Please message Ahmad on WhatsApp for a direct reply.";
      }

      setMessages([...history, { role: "assistant", content: accumulated }]);
      speak(accumulated);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Please try again.";
      setError(message);
      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            "Sorry — I hit an error. You can message Ahmad directly and he will answer personally.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the AI assistant"
          aria-expanded={false}
          aria-controls="assistant-panel"
          className="group glass-button fixed bottom-24 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full transition-colors duration-200 sm:bottom-24 sm:right-6"
        >
          <span
            className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-background bg-accent"
            aria-hidden="true"
          />
          <TeddyIcon className="size-6" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-border bg-background/95 px-2.5 py-1.5 text-xs text-foreground opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100 md:block">
            Ask about Ahmad
          </span>
        </button>
      ) : null}

      {open ? (
        <div
          id="assistant-panel"
          role="dialog"
          aria-label="AI assistant"
          className="fixed bottom-24 left-4 right-4 z-40 flex h-[min(560px,calc(100svh-8rem))] flex-col overflow-hidden rounded-[16px] border border-border bg-background shadow-[0_24px_80px_rgb(0_0_0_/_0.6)] sm:left-auto sm:right-6 sm:w-[400px]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/60 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-[8px] border border-accent/25 bg-accent/10 text-accent">
                <TeddyIcon className="size-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  Ask about Ahmad
                </p>
                <p className="flex items-center gap-1.5 text-[0.65rem] text-muted">
                  <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                  AI assistant · answers from this site
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {ttsSupported ? (
                <button
                  type="button"
                  onClick={() => setVoiceReplies((value) => !value)}
                  aria-pressed={voiceReplies}
                  aria-label={voiceReplies ? "Disable spoken replies" : "Enable spoken replies"}
className="inline-flex size-11 items-center justify-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
                >
                  {voiceReplies ? (
                    <Volume2 className="size-4" aria-hidden="true" />
                  ) : (
                    <VolumeX className="size-4" aria-hidden="true" />
                  )}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  stopSpeaking();
                }}
                aria-label="Close assistant"
                className="inline-flex size-9 items-center justify-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] rounded-[12px] rounded-br-[4px] bg-accent px-3.5 py-2.5 text-sm leading-relaxed text-on-accent whitespace-pre-wrap"
                      : "max-w-[85%] rounded-[12px] rounded-bl-[4px] border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-foreground whitespace-pre-wrap"
                  }
                >
                  {message.content || (
                    <span className="inline-flex items-center gap-1" aria-label="Thinking">
                      <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {messages.length <= 1 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="min-h-11 rounded-full border border-border bg-surface px-3 py-2 text-left text-xs text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

            {error ? (
              <p
                role="alert"
                className="mx-4 mb-2 rounded-[8px] border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger"
              >
                {error}
              </p>
            ) : null}
            {voiceError ? (
              <p className="mx-4 mb-2 rounded-[8px] border border-border bg-surface/60 px-3 py-2 text-xs text-muted">
                {voiceError}
              </p>
            ) : null}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
            className="border-t border-border bg-surface/40 p-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={500}
                placeholder={listening ? "Listening…" : "Ask a question…"}
                aria-label="Message the assistant"
                className="h-11 min-w-0 flex-1 rounded-[8px] border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              {speechSupported ? (
                <button
                  type="button"
                  onClick={toggleListening}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                  className={
                    listening
                      ? "inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-accent/40 bg-accent/15 text-accent"
                      : "inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-border bg-background text-muted transition-colors duration-200 hover:text-foreground"
                  }
                >
                  {listening ? (
                    <MicOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Mic className="size-4" aria-hidden="true" />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label="Voice input is not supported in this browser"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-border bg-background text-muted opacity-50"
                >
                  <Mic className="size-4" aria-hidden="true" />
                </button>
              )}
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="glass-button inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] text-accent transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[0.6rem] text-muted">
              <span>AI assistant — may be inaccurate. Confirm details directly.</span>
              <a
                href={whatsappLink("Hi Ahmad, I have a question about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-medium text-foreground underline decoration-accent/50 underline-offset-2"
              >
                WhatsApp Ahmad
              </a>
            </p>
          </form>
        </div>
      ) : null}
    </>
  );
}
