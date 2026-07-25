import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  Landmark,
  Users,
  Bookmark,
  Bell,
  Plus,
  Pencil,
  Trash2,
  ScrollText,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import type { Scheme } from "@/types";
import { getSchemes } from "@/services/schemeService";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/context/ToastContext";
import { formatDate } from "@/lib/utils";

const COLORS = ["#22C55E", "#166534", "#FACC15", "#4ADE80", "#EAB308", "#86EFAC"];

const growthData = [
  { m: "Feb", users: 12000, schemes: 180 },
  { m: "Mar", users: 18500, schemes: 195 },
  { m: "Apr", users: 26000, schemes: 210 },
  { m: "May", users: 33000, schemes: 225 },
  { m: "Jun", users: 41000, schemes: 240 },
  { m: "Jul", users: 48500, schemes: 250 },
];

const automationLogs = [
  { time: "10:00", source: "PM-KISAN Portal", found: 2, status: "success" },
  { time: "09:00", source: "PIB", found: 1, status: "success" },
  { time: "08:00", source: "e-NAM", found: 0, status: "success" },
  { time: "07:00", source: "myScheme", found: 3, status: "success" },
  { time: "06:00", source: "MyGov", found: 0, status: "skipped" },
];

export default function Admin() {
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [tab, setTab] = useState<"overview" | "schemes" | "automation">("overview");

  useEffect(() => {
    getSchemes().then(setSchemes);
  }, []);

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    schemes.forEach((s) => (map[s.category] = (map[s.category] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [schemes]);

  const levelData = useMemo(
    () => [
      { name: "Central", value: schemes.filter((s) => s.level === "Central").length },
      { name: "State", value: schemes.filter((s) => s.level === "State").length },
    ],
    [schemes],
  );

  const stats = [
    { icon: Landmark, label: "Total Schemes", value: schemes.length, color: "text-primary-600" },
    { icon: Users, label: "Registered Users", value: "48,500", color: "text-accent-500" },
    { icon: Bookmark, label: "Total Bookmarks", value: "12,340", color: "text-primary-600" },
    { icon: Bell, label: "Notifications Sent", value: "9,821", color: "text-accent-500" },
  ];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-primary-500">
            <ShieldCheck size={14} /> Admin Panel
          </span>
          <h2 className="section-title mt-2">Administration Dashboard</h2>
        </div>
        <div className="flex rounded-xl bg-primary-50 p-1 dark:bg-slate-800">
          {(["overview", "schemes", "automation"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                tab === t ? "bg-primary-500 text-white shadow-soft" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface flex items-center gap-4 p-5"
          >
            <span className={`grid h-12 w-12 place-items-center rounded-xl bg-primary-100 dark:bg-slate-800 ${s.color}`}>
              <s.icon size={22} />
            </span>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="card-surface p-6 lg:col-span-2">
            <h3 className="mb-4 font-bold">Platform Growth</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="m" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#22C55E" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card-surface p-6">
            <h3 className="mb-4 font-bold">Central vs State</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={levelData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {levelData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-4 text-sm">
              {levelData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full" style={{ background: COLORS[i] }} />
                  {d.name} ({d.value})
                </span>
              ))}
            </div>
          </div>
          <div className="card-surface p-6 lg:col-span-3">
            <h3 className="mb-4 font-bold">Schemes by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={11} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "schemes" && (
        <div className="card-surface mt-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-primary-100 p-5 dark:border-slate-800">
            <h3 className="font-bold">Manage Schemes ({schemes.length})</h3>
            <button onClick={() => toast("Add-scheme form opens here (admin CRUD)", "info")} className="btn-primary !py-2">
              <Plus size={16} /> Add Scheme
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800">
                <tr>
                  <th className="p-4">Scheme</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Updated</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((s) => (
                  <tr key={s.id} className="border-t border-primary-50 dark:border-slate-800">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4">{s.level}</td>
                    <td className="p-4">
                      <Badge variant={s.status === "Active" ? "live" : s.status === "Closing Soon" ? "urgent" : "soft"}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-400">{formatDate(s.lastUpdated)}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => toast("Edit scheme (admin)", "info")} className="rounded-lg p-2 text-slate-400 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-slate-800">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => toast("Delete scheme (admin)", "error")} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-800">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "automation" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold">
                <ScrollText size={18} className="text-primary-500" /> Automation Logs
              </h3>
              <button onClick={() => toast("Cron sync triggered manually")} className="btn-outline !py-2">
                <RefreshCw size={15} /> Run Sync
              </button>
            </div>
            <ul className="space-y-3">
              {automationLogs.map((l, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-primary-100 p-3 text-sm dark:border-slate-800">
                  <div>
                    <p className="font-semibold">{l.source}</p>
                    <p className="text-xs text-slate-400">Today {l.time} • {l.found} new record(s)</p>
                  </div>
                  <Badge variant={l.status === "success" ? "live" : "soft"}>{l.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h3 className="mb-4 font-bold">Cron Schedule</h3>
            <div className="space-y-3 text-sm">
              {[
                { job: "Sync official schemes", cron: "0 * * * *", desc: "Every hour" },
                { job: "Fetch latest updates", cron: "*/30 * * * *", desc: "Every 30 min" },
                { job: "Refresh weather cache", cron: "0 */3 * * *", desc: "Every 3 hours" },
                { job: "Fetch agriculture news", cron: "0 6,18 * * *", desc: "Twice daily" },
              ].map((c) => (
                <div key={c.job} className="flex items-center justify-between rounded-xl bg-primary-50 p-3 dark:bg-slate-800">
                  <div>
                    <p className="font-medium">{c.job}</p>
                    <p className="text-xs text-slate-400">{c.desc}</p>
                  </div>
                  <code className="rounded bg-white px-2 py-1 text-xs text-primary-700 dark:bg-slate-900">{c.cron}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
