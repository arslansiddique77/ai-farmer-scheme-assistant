import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Gift,
  ListChecks,
  FileText,
  Bookmark,
  BookmarkCheck,
  Download,
  CalendarClock,
  Building2,
} from "lucide-react";
import type { Scheme } from "@/types";
import { getSchemeBySlug } from "@/services/schemeService";
import { Badge } from "@/components/ui/Badge";
import { ShareMenu } from "@/components/ui/ShareMenu";
import { PageLoader } from "@/components/ui/PageLoader";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { formatDate } from "@/lib/utils";

export default function SchemeDetail() {
  const { slug } = useParams();
  const [scheme, setScheme] = useState<Scheme | null | undefined>(undefined);
  const { isBookmarked, toggleBookmark } = useAppData();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) getSchemeBySlug(slug).then((s) => setScheme(s ?? null));
  }, [slug]);

  if (scheme === undefined) return <PageLoader />;
  if (scheme === null)
    return (
      <div className="container-page py-24 text-center">
        <p className="text-lg font-semibold">Scheme not found.</p>
        <Link to="/schemes" className="btn-primary mt-4">
          Back to schemes
        </Link>
      </div>
    );

  const bookmarked = isBookmarked(scheme.id);

  const sections = [
    { icon: CheckCircle2, title: "Eligibility", items: scheme.eligibility },
    { icon: Gift, title: "Benefits", items: scheme.benefits },
    { icon: ListChecks, title: "Application Process", items: scheme.applicationProcess },
    { icon: FileText, title: "Required Documents", items: scheme.requiredDocuments },
  ];

  return (
    <div className="container-page py-10">
      <Link to="/schemes" className="link-muted inline-flex items-center gap-1">
        <ArrowLeft size={16} /> Back to all schemes
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 overflow-hidden rounded-3xl bg-hero-gradient p-8 text-white shadow-soft sm:p-10"
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="!bg-white/20 !text-white">
            <Building2 size={12} /> {scheme.level}
          </Badge>
          <Badge className="!bg-white/20 !text-white">{scheme.category}</Badge>
          {scheme.isNew && <Badge variant="new">NEW</Badge>}
          {scheme.status === "Closing Soon" && (
            <Badge variant="urgent">Closing Soon</Badge>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{scheme.name}</h1>
        <p className="mt-3 max-w-3xl text-white/90">{scheme.description}</p>
        {scheme.deadline && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-sm">
            <CalendarClock size={15} /> Deadline: {formatDate(scheme.deadline)}
          </p>
        )}
      </motion.div>

      {/* Action bar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Apply on Official Portal <ExternalLink size={15} />
        </a>
        <button
          onClick={() => {
            toggleBookmark(scheme.id);
            toast(bookmarked ? "Removed from bookmarks" : "Scheme bookmarked");
          }}
          className="btn-outline"
        >
          {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <ShareMenu title={scheme.name} url={scheme.officialLink} />
        <button
          onClick={() => toast("PDF download will be available in production", "info")}
          className="btn-ghost"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      {/* Detail sections */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {sections.map((sec) => (
          <div key={sec.title} className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-100 text-primary-600 dark:bg-slate-800">
                <sec.icon size={18} />
              </span>
              {sec.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {sec.items.map((it, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Source attribution */}
      <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50/50 p-5 text-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="font-semibold text-primary-700 dark:text-primary-300">
          Source: Official Government Portal
        </p>
        <p className="mt-1 text-slate-500">
          Imported from <strong>{scheme.source}</strong>. Last updated{" "}
          {formatDate(scheme.lastUpdated)}. Always verify details on the official
          portal before applying.
        </p>
      </div>
    </div>
  );
}
