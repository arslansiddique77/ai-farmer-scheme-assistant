import { useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const hideFloating = pathname.startsWith("/assistant");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating AI Assistant button */}
      {!hideFloating && (
        <Link
          to="/assistant"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-hero-gradient px-5 py-3 font-semibold text-white shadow-glow transition hover:scale-105"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Ask AI</span>
        </Link>
      )}
    </div>
  );
}
