import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CalendarClock, Zap } from "lucide-react";
import type { Scheme } from "@/types";
import { getActiveSchemes } from "@/services/schemeService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { SchemeCardSkeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

function daysLeft(iso?: string) {
  if (!iso) return null;
  const d = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  return d;
}

export default function CurrentSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveSchemes()
      .then(setSchemes)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-12">
      <SectionHeading
        eyebrow="Live & Active"
        title="Current Running Schemes"
        subtitle="Only schemes currently open for application. Watch for 'Closing Soon' deadlines and apply directly on the official portal."
      />

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SchemeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {schemes.map((s, i) => {
            const left = daysLeft(s.deadline);
            const closingSoon = s.status === "Closing Soon";
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`card-surface overflow-hidden p-6 ${
                  closingSoon ? "ring-2 ring-red-300" : "ring-1 ring-primary-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="live">
                      <Zap size={11} /> LIVE
                    </Badge>
                    <Badge variant="soft">{s.level}</Badge>
                    {s.isNew && <Badge variant="new">NEW</Badge>}
                    {closingSoon && <Badge variant="urgent">Closing Soon</Badge>}
                  </div>
                </div>

                <h3 className="mt-3 text-lg font-bold">{s.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                  {s.description}
                </p>

                {s.deadline && (
                  <div
                    className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      closingSoon
                        ? "bg-red-50 text-red-600 dark:bg-red-950/40"
                        : "bg-primary-50 text-primary-700 dark:bg-slate-800"
                    }`}
                  >
                    <CalendarClock size={15} />
                    Deadline: {formatDate(s.deadline)}
                    {left !== null && left >= 0 && (
                      <span className="ml-auto font-bold">{left} days left</span>
                    )}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Source: {s.source}
                  </span>
                  <a
                    href={s.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary !py-2"
                  >
                    Official Portal <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
