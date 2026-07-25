import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, Bot, User as UserIcon, Mic, Volume2, Trash2 } from "lucide-react";
import type { ChatMessage } from "@/types";
import { askAssistant, suggestedQuestions, type Lang } from "@/services/aiService";
import { useLang } from "@/context/LanguageContext";

// Minimal typings for the Web Speech API (not in default TS DOM lib)
type SpeechRecognitionResult = { transcript: string };
interface SR {
  lang: string;
  onresult: (e: { results: { 0: SpeechRecognitionResult }[] }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

function TypingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-primary-400"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function Assistant() {
  const { lang, setLang } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const raw = localStorage.getItem("kisaniyat_chat");
    return raw ? JSON.parse(raw) : [];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("kisaniyat_chat", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = {
      id: "m-" + Date.now(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    const answer = await askAssistant(trimmed, lang as Lang);
    setTyping(false);
    setMessages((m) => [
      ...m,
      {
        id: "a-" + Date.now(),
        role: "assistant",
        content: answer,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(u);
  }

  function startVoice() {
    const w = window as unknown as {
      webkitSpeechRecognition?: new () => SR;
      SpeechRecognition?: new () => SR;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const rec = new Ctor();
    rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
    setListening(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      send(transcript);
    };
    rec.onend = () => setListening(false);
    rec.start();
  }

  return (
    <div className="container-page py-8">
      <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 bg-primary-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-hero-gradient text-white">
              <Bot size={20} />
            </span>
            <div>
              <p className="font-bold">Kisaniyat AI Assistant</p>
              <p className="text-xs text-primary-600">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary-500" />
                Online • Hindi & English
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="btn-ghost !px-2.5 text-xs"
            >
              {lang === "en" ? "हिंदी" : "English"}
            </button>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="btn-ghost !px-2.5"
                aria-label="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-slate-800">
                  <Sparkles size={30} />
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  {lang === "hi"
                    ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?"
                    : "Hello! How can I help you today?"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {lang === "hi"
                    ? "योजनाएँ, पात्रता, फसल या मौसम के बारे में पूछें"
                    : "Ask about schemes, eligibility, crops or weather"}
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  m.role === "user"
                    ? "bg-accent-400 text-primary-800"
                    : "bg-primary-500 text-white"
                }`}
              >
                {m.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
              </span>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "rounded-tr-sm bg-primary-500 text-white"
                    : "rounded-tl-sm bg-primary-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                {m.role === "assistant" && (
                  <button
                    onClick={() => speak(m.content)}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary-600 hover:underline"
                  >
                    <Volume2 size={12} /> Listen
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-500 text-white">
                  <Bot size={16} />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-primary-50 px-4 py-3 dark:bg-slate-800">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>

        {/* Suggested questions */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 px-5 pb-2">
            {suggestedQuestions[lang as Lang].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:bg-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-primary-300"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-slate-200/60 p-4 dark:border-slate-800"
        >
          <button
            type="button"
            onClick={startVoice}
            className={`btn-ghost !px-3 ${listening ? "animate-pulse text-red-500" : ""}`}
            aria-label="Voice input"
          >
            <Mic size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === "hi" ? "अपना प्रश्न लिखें..." : "Type your question..."
            }
            className="input flex-1"
          />
          <button type="submit" className="btn-primary !px-4" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
