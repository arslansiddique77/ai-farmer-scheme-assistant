import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bookmark,
  MessageCircle,
  CloudSun,
  Newspaper,
  ArrowRight,
  MapPin,
  Droplets,
  Bell,
  Activity,
} from "lucide-react";
import type { Scheme, Weather, GovUpdate } from "@/types";
import { getSchemes, getWeather, getUpdates } from "@/services/schemeService";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate, timeAgo } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const { bookmarks, notifications } = useAppData();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [updates, setUpdates] = useState<GovUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSchemes(), getWeather(), getUpdates()])
      .then(([s, w, u]) => {
        setSchemes(s);
        setWeather(w);
        setUpdates(u);
      })
      .finally(() => setLoading(false));
  }, []);

  const recommended = schemes.filter((s) => !s.state || s.state === user?.state).slice(0, 3);
  const saved = schemes.filter((s) => bookmarks.includes(s.id));

  return (
    <div className="container-page py-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl bg-hero-gradient p-8 text-white shadow-soft"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-white/80">Welcome back,</p>
            <h1 className="text-3xl font-extrabold capitalize">{user?.name} 👋</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
              <MapPin size={14} /> {user?.district ? `${user.district}, ` : ""}
              {user?.state} • {user?.category}
            </p>
          </div>
          <Link to="/eligibility" className="btn-accent">
            <Sparkles size={16} /> Check Eligibility
          </Link>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Bookmark} label="Saved Schemes" value={bookmarks.length} to="/schemes" />
        <StatCard icon={Activity} label="Active Schemes" value={schemes.filter((s) => s.status === "Active").length} to="/current-schemes" />
        <StatCard icon={Bell} label="Notifications" value={notifications.filter((n) => !n.read).length} to="/dashboard" />
        <StatCard icon={Newspaper} label="Updates Today" value={updates.filter((u) => u.badge === "TODAY").length} to="/updates" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recommended */}
          <Section title="Recommended for you" to="/schemes" cta="View all">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recommended.map((s) => (
                  <Link
                    key={s.id}
                    to={`/schemes/${s.slug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-primary-100 p-4 transition hover:bg-primary-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.category} • {s.level}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.isNew && <Badge variant="new">NEW</Badge>}
                      <ArrowRight size={16} className="text-primary-500" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Section>

          {/* Saved */}
          <Section title="Bookmarked schemes" to="/schemes" cta="Browse more">
            {saved.length === 0 ? (
              <p className="rounded-xl bg-primary-50 p-4 text-sm text-slate-500 dark:bg-slate-800">
                No bookmarks yet. Tap the bookmark icon on any scheme to save it here.
              </p>
            ) : (
              <div className="space-y-2">
                {saved.map((s) => (
                  <Link
                    key={s.id}
                    to={`/schemes/${s.slug}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800"
                  >
                    <Bookmark size={14} className="text-primary-500" /> {s.name}
                  </Link>
                ))}
              </div>
            )}
          </Section>

          {/* Latest updates */}
          <Section title="Latest government updates" to="/updates" cta="See all">
            <div className="space-y-3">
              {updates.slice(0, 3).map((u) => (
                <a
                  key={u.id}
                  href={u.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-primary-100 p-4 transition hover:bg-primary-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                  <Badge variant="new">{u.badge}</Badge>
                  <p className="mt-1 font-semibold">{u.title}</p>
                  <p className="text-xs text-slate-400">
                    {formatDate(u.publishedAt)} • {u.source}
                  </p>
                </a>
              ))}
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile card */}
          <div className="card-surface p-6 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-hero-gradient text-2xl font-extrabold text-white">
              {user?.name.charAt(0).toUpperCase()}
            </span>
            <p className="mt-3 font-bold capitalize">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <Link to="/profile" className="btn-outline mt-4 w-full">
              Edit Profile
            </Link>
          </div>

          {/* Weather widget */}
          {weather && (
            <div className="card-surface overflow-hidden">
              <div className="bg-hero-gradient p-5 text-white">
                <p className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin size={12} /> {weather.location}
                </p>
                <div className="mt-1 flex items-end justify-between">
                  <p className="text-4xl font-extrabold">{weather.temperature}°</p>
                  <div className="text-right text-xs">
                    <p>{weather.condition}</p>
                    <p className="flex items-center justify-end gap-1">
                      <Droplets size={11} /> {weather.rainChance}% rain
                    </p>
                  </div>
                </div>
              </div>
              <p className="p-4 text-xs text-slate-500 dark:text-slate-400">
                {weather.advisory}
              </p>
              <Link to="/weather" className="block border-t border-primary-100 p-3 text-center text-sm font-semibold text-primary-600 dark:border-slate-800">
                Full forecast
              </Link>
            </div>
          )}

          {/* Shortcuts */}
          <div className="card-surface p-5">
            <p className="mb-3 text-sm font-bold">Quick Actions</p>
            <div className="space-y-2">
              <Shortcut to="/assistant" icon={MessageCircle} label="Ask AI Assistant" />
              <Shortcut to="/weather" icon={CloudSun} label="Weather Advisory" />
              <Shortcut to="/news" icon={Newspaper} label="Agriculture News" />
            </div>
          </div>

          {/* Recent activity */}
          <div className="card-surface p-5">
            <p className="mb-3 text-sm font-bold">Recent Activity</p>
            <ul className="space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.id} className="flex gap-2 text-xs">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-slate-400">{timeAgo(n.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, to }: { icon: React.ElementType; label: string; value: number; to: string }) {
  return (
    <Link to={to} className="card-surface flex items-center gap-3 p-5 hover:shadow-glow">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-100 text-primary-600 dark:bg-slate-800">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-extrabold">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </Link>
  );
}

function Section({ title, to, cta, children }: { title: string; to: string; cta: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link to={to} className="text-sm font-semibold text-primary-600 hover:underline">
          {cta}
        </Link>
      </div>
      {children}
    </div>
  );
}

function Shortcut({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800">
      <Icon size={16} className="text-primary-500" /> {label}
    </Link>
  );
}
