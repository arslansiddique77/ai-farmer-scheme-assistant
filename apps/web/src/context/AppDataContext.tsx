import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AppNotification } from "@/types";
import { mockNotifications } from "@/data/misc";

interface AppDataCtx {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
}

const AppDataContext = createContext<AppDataCtx | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const raw = localStorage.getItem("kisaniyat_bookmarks");
    return raw ? JSON.parse(raw) : [];
  });
  const [notifications, setNotifications] =
    useState<AppNotification[]>(mockNotifications);

  useEffect(() => {
    localStorage.setItem("kisaniyat_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) =>
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const value: AppDataCtx = {
    bookmarks,
    toggleBookmark,
    isBookmarked: (id) => bookmarks.includes(id),
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAllRead: () =>
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
