"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionAlternativeLike = {
  transcript: string;
  confidence: number;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionResultListLike = {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
};

type SpeechRecognitionEventLike = {
  results: SpeechRecognitionResultListLike;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event?: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export function useVoice(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef(onTranscript);
  const [speechSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    return Boolean(win.SpeechRecognition ?? win.webkitSpeechRecognition);
  });
  const [ttsSupported] = useState(() =>
    typeof window !== "undefined" && "speechSynthesis" in window,
  );

  useEffect(() => {
    transcriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Constructor = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    if (Constructor) {
      const recognition = new Constructor();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcript = result?.[0]?.transcript?.trim();
        if (transcript) transcriptRef.current(transcript);
      };
      recognition.onerror = (event) => {
        setListening(false);
        setVoiceError(
          event?.error === "not-allowed"
            ? "Microphone permission was blocked."
            : "Voice input is unavailable in this browser.",
        );
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    setVoiceError(null);
    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
      setVoiceError("Voice input could not start.");
    }
  }, [listening]);

  const speak = useCallback(
    (text: string) => {
      if (!voiceReplies || !text) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 700));
      utterance.lang = "en-US";
      utterance.rate = 1.02;
      window.speechSynthesis.speak(utterance);
    },
    [voiceReplies],
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return {
    listening,
    speechSupported,
    ttsSupported,
    voiceError,
    voiceReplies,
    setVoiceReplies,
    toggleListening,
    speak,
    stopSpeaking,
  };
}
