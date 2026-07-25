import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";
import { getFaqs } from "@/services/schemeService";

export function FAQ() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    getFaqs().then(setFaqs);
  }, []);

  return (
    <div className="space-y-3">
      {faqs.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className="card-surface overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : f.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold">{f.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400">
                    {f.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
