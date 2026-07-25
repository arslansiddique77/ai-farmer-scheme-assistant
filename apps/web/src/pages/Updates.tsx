import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Rss } from "lucide-react";
import type { GovUpdate, UpdateBadge } from "@/types";
import { getUpdates } from "@/services/schemeService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

const badgeVariant: Record<UpdateBadge, "new" | "urgent" | "soft" | "live"> = {
  "NEW UPDATE": "new",
  TODAY: "live",
  "RECENTLY ADDED": "soft",
  URGENT: "urgent",
};

export default function Updates() {
  const [updates, setUpdates] = useState<GovUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getUpdates()
      .then(setUpdates)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Auto-synced from official portals"
          title="Latest Government Updates"
          subtitle="Announcements are fetched hourly from PM-KISAN, PIB, MyGov, e-NAM and more. New items are labelled automatically."
        />
        <button onClick={load} className="btn-outline">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 dark:bg-slate-800 dark:text-primary-300">
        <Rss size={13} /> Backend cron jobs check official sources every hour and
        insert only new records.
      </div>

      <div className="mt-8 space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-surface space-y-3 p-6">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))
          : updates.map((u, i) => (
              <motion.article
                key={u.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-surface flex flex-col gap-3 p-6 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={badgeVariant[u.badge]}>{u.badge}</Badge>
                    <span className="text-xs text-slate-400">
                      {formatDate(u.publishedAt)} • {u.source}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{u.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {u.summary}
                  </p>
                </div>
                <a
                  href={u.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary shrink-0"
                >
                  Read More <ExternalLink size={14} />
                </a>
              </motion.article>
            ))}
      </div>
    </div>
  );
}
