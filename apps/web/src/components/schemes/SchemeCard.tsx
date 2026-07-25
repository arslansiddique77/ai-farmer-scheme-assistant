import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ArrowRight,
  Building2,
  MapPin,
} from "lucide-react";
import type { Scheme } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ShareMenu } from "@/components/ui/ShareMenu";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { formatDate } from "@/lib/utils";

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const { isBookmarked, toggleBookmark } = useAppData();
  const { toast } = useToast();
  const bookmarked = isBookmarked(scheme.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="card-surface flex flex-col p-6 hover:shadow-glow"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={scheme.level === "Central" ? "live" : "soft"}>
            {scheme.level === "Central" ? (
              <Building2 size={11} />
            ) : (
              <MapPin size={11} />
            )}
            {scheme.level}
          </Badge>
          {scheme.isNew && <Badge variant="new">NEW</Badge>}
          {scheme.status === "Closing Soon" && (
            <Badge variant="urgent">Closing Soon</Badge>
          )}
        </div>
        <button
          onClick={() => {
            toggleBookmark(scheme.id);
            toast(bookmarked ? "Removed from bookmarks" : "Scheme bookmarked");
          }}
          className="text-slate-400 transition hover:text-primary-600"
          aria-label="Bookmark scheme"
        >
          {bookmarked ? (
            <BookmarkCheck size={20} className="text-primary-600" />
          ) : (
            <Bookmark size={20} />
          )}
        </button>
      </div>

      <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
        {scheme.name}
      </h3>
      <span className="mt-1 text-xs font-medium text-primary-600">
        {scheme.category}
        {scheme.state ? ` • ${scheme.state}` : ""}
      </span>

      <p className="mt-3 line-clamp-3 flex-1 text-sm text-slate-500 dark:text-slate-400">
        {scheme.description}
      </p>

      <div className="mt-4 rounded-lg bg-white/60 p-2 text-[11px] text-slate-400 dark:bg-slate-800/40">
        Source: {scheme.source} • Updated {formatDate(scheme.lastUpdated)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to={`/schemes/${scheme.slug}`} className="btn-outline flex-1">
          Details <ArrowRight size={15} />
        </Link>
        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Apply <ExternalLink size={14} />
        </a>
        <ShareMenu title={scheme.name} url={scheme.officialLink} />
      </div>
    </motion.article>
  );
}
