import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Share2, Link2, MessageCircle, Send, Globe } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function ShareMenu({ title, url }: { title: string; url?: string }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const text = encodeURIComponent(`${title} — via Kisaniyat`);

  const links = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: Globe,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Twitter / X",
      icon: Send,
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost !px-3"
        aria-label="Share"
      >
        <Share2 size={16} /> Share
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="glass absolute right-0 z-20 mt-2 w-44 rounded-xl p-2 shadow-soft"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800"
              >
                <l.icon size={16} className="text-primary-500" /> {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast("Link copied to clipboard");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              <Link2 size={16} className="text-primary-500" /> Copy Link
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
