import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";

/** Minimal i18n dictionary. Extendable to full i18next in production. */
const dict: Record<string, Record<Lang, string>> = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.schemes": { en: "Schemes", hi: "योजनाएँ" },
  "nav.updates": { en: "Latest Updates", hi: "ताज़ा अपडेट" },
  "nav.current": { en: "Current Schemes", hi: "वर्तमान योजनाएँ" },
  "nav.ai": { en: "AI Assistant", hi: "एआई सहायक" },
  "nav.weather": { en: "Weather", hi: "मौसम" },
  "nav.news": { en: "News", hi: "समाचार" },
  "nav.about": { en: "About", hi: "परिचय" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },
  "nav.login": { en: "Login", hi: "लॉगिन" },
  "nav.register": { en: "Register", hi: "पंजीकरण" },
  "hero.headline": {
    en: "Empowering Indian Farmers with AI",
    hi: "एआई के साथ भारतीय किसानों का सशक्तिकरण",
  },
  "hero.sub": {
    en: "Find every government scheme, latest agriculture news, subsidies, weather alerts and AI guidance in one place.",
    hi: "हर सरकारी योजना, ताज़ा कृषि समाचार, सब्सिडी, मौसम चेतावनी और एआई मार्गदर्शन एक ही जगह पाएँ।",
  },
  "cta.explore": { en: "Explore Schemes", hi: "योजनाएँ देखें" },
  "cta.talk": { en: "Talk to AI", hi: "एआई से बात करें" },
  "cta.updates": { en: "Latest Updates", hi: "ताज़ा अपडेट" },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    (localStorage.getItem("kisaniyat_lang") as Lang) || "en",
  );

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kisaniyat_lang", l);
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
