import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCheck, CalendarClock, CloudRain, Megaphone, TrendingUp } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { timeAgo } from "@/lib/utils";
import type { AppNotification } from "@/types";

const iconFor: Record<AppNotification["type"], React.ElementType> = {
  scheme: Megaphone,
  deadline: CalendarClock,
  update: Bell,
  weather: CloudRain,
  market: TrendingUp,
};

export function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { notifications, markAllRead } = useAppData();

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="glass absolute right-0 z-20 mt-2 w-80 rounded-2xl p-3 shadow-soft"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-sm font-bold">Notifications</h3>
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-primary-600 hover:underline"
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            </div>
            <div className="max-h-96 space-y-1 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = iconFor[n.type];
                return (
                  <div
                    key={n.id}
                    className={`flex gap-3 rounded-xl p-3 ${
                      n.read ? "opacity-70" : "bg-primary-50/60 dark:bg-slate-800/60"
                    }`}
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-100 text-primary-600 dark:bg-slate-800">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.message}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
