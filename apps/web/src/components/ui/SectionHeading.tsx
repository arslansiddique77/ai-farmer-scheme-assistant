import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-500">
          {eyebrow}
        </span>
      )}
      <h2 className="section-title mt-2">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}
