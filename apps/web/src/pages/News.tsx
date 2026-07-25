import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { NewsItem, NewsCategory } from "@/types";
import { getNews } from "@/services/schemeService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

const CATS: ("All" | NewsCategory)[] = [
  "All",
  "Government",
  "Technology",
  "Organic Farming",
  "Crop",
  "Market",
  "Export",
];

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  useEffect(() => {
    getNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (cat === "All" ? news : news.filter((n) => n.category === cat)),
    [news, cat],
  );

  return (
    <div className="container-page py-12">
      <SectionHeading
        eyebrow="Agriculture News"
        title="Stay updated with farming news"
        subtitle="Curated agriculture news across government, technology, organic farming, crops, markets and exports."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              cat === c
                ? "bg-primary-500 text-white shadow-soft"
                : "bg-primary-50 text-slate-600 hover:bg-primary-100 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-surface overflow-hidden">
              <Skeleton className="h-44 w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-surface group flex flex-col overflow-hidden hover:shadow-glow"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={n.image}
                  alt={n.headline}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3">
                  <Badge variant="live">{n.category}</Badge>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs text-slate-400">
                  {formatDate(n.publishedAt)} • {n.source}
                </span>
                <h3 className="mt-1 text-base font-bold leading-snug">
                  {n.headline}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500 dark:text-slate-400">
                  {n.summary}
                </p>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600"
                >
                  Read More <ExternalLink size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
