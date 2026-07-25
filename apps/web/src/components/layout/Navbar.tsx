import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sprout,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Globe,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { NotificationPanel } from "./NotificationPanel";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/schemes", key: "nav.schemes" },
  { to: "/updates", key: "nav.updates" },
  { to: "/current-schemes", key: "nav.current" },
  { to: "/assistant", key: "nav.ai" },
  { to: "/weather", key: "nav.weather" },
  { to: "/news", key: "nav.news" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const { user, logout } = useAuth();
  const { unreadCount } = useAppData();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b">
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero-gradient text-white shadow-soft">
            <Sprout size={20} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Kisaniyat
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary-100 text-primary-700 dark:bg-slate-800 dark:text-primary-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {/* Language */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="btn-ghost !px-2.5"
            aria-label="Change language"
            title="Language"
          >
            <Globe size={18} />
            <span className="text-xs font-bold">{lang.toUpperCase()}</span>
          </button>

          {/* Theme */}
          <button
            onClick={toggle}
            className="btn-ghost !px-2.5"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications (auth only) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="btn-ghost relative !px-2.5"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent-400 text-[10px] font-bold text-primary-800">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>
          )}

          {/* Auth */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenu((o) => !o)}
                className="btn-ghost !px-2"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-500 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="glass absolute right-0 mt-2 w-52 rounded-xl p-2 shadow-soft"
                  >
                    <div className="border-b border-slate-200/60 px-3 py-2 dark:border-slate-700">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                    <MenuItem to="/dashboard" icon={LayoutDashboard} onClick={() => setUserMenu(false)}>
                      Dashboard
                    </MenuItem>
                    <MenuItem to="/profile" icon={UserIcon} onClick={() => setUserMenu(false)}>
                      Profile
                    </MenuItem>
                    {user.role === "admin" && (
                      <MenuItem to="/admin" icon={ShieldCheck} onClick={() => setUserMenu(false)}>
                        Admin Panel
                      </MenuItem>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setUserMenu(false);
                        navigate("/");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn-ghost">
                {t("nav.login")}
              </Link>
              <Link to="/register" className="btn-primary">
                {t("nav.register")}
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="btn-ghost !px-2.5 xl:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200/60 xl:hidden dark:border-slate-800"
          >
            <div className="container-page flex flex-col gap-1 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-primary-100 text-primary-700 dark:bg-slate-800"
                        : "text-slate-600 dark:text-slate-300",
                    )
                  }
                >
                  {t(l.key)}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="btn-outline flex-1">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline flex-1">
                      {t("nav.login")}
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">
                      {t("nav.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuItem({
  to,
  icon: Icon,
  children,
  onClick,
}: {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800"
    >
      <Icon size={16} className="text-primary-500" /> {children}
    </Link>
  );
}
