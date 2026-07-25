import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/context/ToastContext";

export default function Contact() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast("Thank you! Your message has been received.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="container-page py-12">
      <SectionHeading
        center
        eyebrow="Get in touch"
        title="Contact & Feedback"
        subtitle="Have a question or suggestion? We'd love to hear from you."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Info cards */}
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "support@kisaniyat.in" },
            { icon: Phone, label: "Phone", value: "1800-180-1551 (Kisan Call Centre)" },
            { icon: MapPin, label: "Address", value: "Krishi Bhavan, New Delhi, India" },
          ].map((c) => (
            <div key={c.label} className="card-surface flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-100 text-primary-600 dark:bg-slate-800">
                <c.icon size={20} />
              </span>
              <div>
                <p className="text-xs text-slate-400">{c.label}</p>
                <p className="text-sm font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="card-surface overflow-hidden">
            <iframe
              title="Location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.4%2C28.8&layer=mapnik"
              className="h-48 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface p-6 lg:col-span-2"
        >
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <MessageSquare size={18} className="text-primary-500" /> Send us a message
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input required placeholder="Your name" className="input" />
            <input required type="email" placeholder="Your email" className="input" />
            <input placeholder="Subject" className="input sm:col-span-2" />
            <textarea
              required
              rows={5}
              placeholder="Your message / feedback"
              className="input sm:col-span-2 resize-none"
            />
          </div>
          <button type="submit" className="btn-primary mt-4" disabled={sent}>
            {sent ? "Sent!" : (<><Send size={16} /> Send Message</>)}
          </button>
        </motion.form>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <SectionHeading center eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQ />
        </div>
      </div>
    </div>
  );
}
