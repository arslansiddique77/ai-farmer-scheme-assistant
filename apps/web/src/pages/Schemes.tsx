import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, FrownIcon } from "lucide-react";
import type { Scheme, SchemeLevel } from "@/types";
import { getSchemes } from "@/services/schemeService";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SchemeCardSkeleton } from "@/components/ui/Skeleton";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 6;

export default function Schemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"All" | SchemeLevel>("All");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const debounced = useDebounce(query, 300);

  useEffect(() => {
    getSchemes()
      .then(setSchemes)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(schemes.map((s) => s.category)))],
    [schemes],
  );

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const q = debounced.toLowerCase();
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.includes(q));
      const matchLevel = level === "All" || s.level === level;
      const matchCat = category === "All" || s.category === category;
      return matchQ && matchLevel && matchCat;
    });
  }, [schemes, debounced, level, category]);

  useEffect(() => setPage(1), [debounced, level, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container-page py-12">
      <SectionHeading
        eyebrow="Government Schemes"
        title="Discover schemes made for you"
        subtitle="Search and filter across central and state agriculture schemes. Every card links to the official government application portal."
      />

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-soft lg:flex-row lg:items-center dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schemes, e.g. 'insurance', 'loan', 'solar'..."
            className="input pl-10"
            aria-label="Search schemes"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={16} className="text-slate-400" />
          <div className="flex rounded-xl bg-primary-50 p-1 dark:bg-slate-800">
            {(["All", "Central", "State"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  level === l
                    ? "bg-primary-500 text-white shadow-soft"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input !w-auto !py-2 text-sm"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing <strong>{filtered.length}</strong> scheme
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SchemeCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-slate-400">
          <FrownIcon size={48} />
          <p className="text-lg font-semibold">No schemes match your filters</p>
          <button
            onClick={() => {
              setQuery("");
              setLevel("All");
              setCategory("All");
            }}
            className="btn-outline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paged.map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-outline"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                    page === i + 1
                      ? "bg-primary-500 text-white shadow-soft"
                      : "bg-primary-50 text-slate-600 dark:bg-slate-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
