import { Link } from "react-router-dom";
import { Sprout, Share2, MessageCircle, Send, Globe, ExternalLink } from "lucide-react";

const quickLinks = [
  { to: "/schemes", label: "Schemes" },
  { to: "/current-schemes", label: "Current Schemes" },
  { to: "/updates", label: "Latest Updates" },
  { to: "/news", label: "Agriculture News" },
  { to: "/assistant", label: "AI Assistant" },
];

const govLinks = [
  { href: "https://pmkisan.gov.in", label: "PM-KISAN" },
  { href: "https://pmfby.gov.in", label: "PM Fasal Bima" },
  { href: "https://enam.gov.in", label: "e-NAM" },
  { href: "https://www.myscheme.gov.in", label: "myScheme" },
  { href: "https://agricoop.gov.in", label: "Agriculture Ministry" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/60 bg-primary-50/40 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero-gradient text-white">
              <Sprout size={20} />
            </span>
            <span className="text-lg font-extrabold">Kisaniyat</span>
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            One Platform for Every Indian Farmer. Discover schemes, subsidies,
            news, weather and AI guidance — all in one place.
          </p>
          <div className="mt-4 flex gap-2">
            {[Share2, MessageCircle, Send, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-500 shadow-soft transition hover:text-primary-600 dark:bg-slate-800"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-muted">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
            Government Portals
          </h4>
          <ul className="space-y-2">
            {govLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-muted inline-flex items-center gap-1"
                >
                  {l.label} <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
            Legal
          </h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="link-muted">About Us</Link></li>
            <li><Link to="/contact" className="link-muted">Contact</Link></li>
            <li><a href="#" className="link-muted">Privacy Policy</a></li>
            <li><a href="#" className="link-muted">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200/60 py-5 dark:border-slate-800">
        <p className="container-page text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Kisaniyat — AI Farmer Scheme Assistant.
          Content sourced from official government portals. Built as an
          internship project.
        </p>
      </div>
    </footer>
  );
}
