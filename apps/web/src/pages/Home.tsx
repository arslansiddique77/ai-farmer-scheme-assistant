import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Bell,
  Landmark,
  Users,
  Activity,
  Newspaper,
  Trophy,
  Sparkles,
  CloudSun,
  Search,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/context/LanguageContext";

const stats = [
  { icon: Landmark, label: "Government Schemes", value: 250, suffix: "+" },
  { icon: Users, label: "Registered Farmers", value: 48500, suffix: "+" },
  { icon: Activity, label: "Active Schemes", value: 96, suffix: "" },
  { icon: Newspaper, label: "Latest Updates", value: 1200, suffix: "+" },
  { icon: Trophy, label: "Success Stories", value: 3400, suffix: "+" },
];

const features = [
  {
    icon: Search,
    title: "Smart Scheme Discovery",
    desc: "Search and filter 250+ central & state schemes with eligibility, benefits and documents.",
    to: "/schemes",
  },
  {
    icon: Sparkles,
    title: "AI Eligibility Checker",
    desc: "Enter your details and let AI recommend the schemes you actually qualify for.",
    to: "/eligibility",
  },
  {
    icon: MessageCircle,
    title: "Bilingual AI Assistant",
    desc: "Ask anything about schemes, crops or fertilisers in Hindi or English, 24×7.",
    to: "/assistant",
  },
  {
    icon: CloudSun,
    title: "Live Weather Advisory",
    desc: "Localised weather with farmer-friendly advisories to plan spraying and sowing.",
    to: "/weather",
  },
  {
    icon: Bell,
    title: "Latest Govt Updates",
    desc: "Auto-synced announcements from PM-KISAN, PIB, MyGov and more — labelled NEW.",
    to: "/updates",
  },
  {
    icon: FileCheck2,
    title: "Document Checklist",
    desc: "Know exactly which documents to prepare before you apply for any scheme.",
    to: "/eligibility",
  },
];

const steps = [
  { n: 1, title: "Create your profile", desc: "Tell us your state, land and crop." },
  { n: 2, title: "Discover schemes", desc: "AI matches you to eligible benefits." },
  { n: 3, title: "Apply on official portal", desc: "We link you straight to the government site." },
];

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />
        <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/30" />
        <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-72 w-72 rounded-full bg-accent-100/60 blur-3xl dark:bg-accent-500/10" />

        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-live">
              <Sparkles size={13} /> One Platform for Every Indian Farmer
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t("hero.headline")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              {t("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/schemes" className="btn-primary">
                {t("cta.explore")} <ArrowRight size={16} />
              </Link>
              <Link to="/assistant" className="btn-accent">
                <MessageCircle size={16} /> {t("cta.talk")}
              </Link>
              <Link to="/updates" className="btn-outline">
                <Bell size={16} /> {t("cta.updates")}
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck size={16} className="text-primary-500" />
              Content sourced from official government portals
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="animate-float">
              <img
                src="/hero-illustration.png"
                alt="Indian farmer using Kisaniyat AI assistant"
                className="w-full rounded-3xl"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-page -mt-6 pb-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:grid-cols-3 lg:grid-cols-5 dark:border-slate-800 dark:bg-slate-900">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto text-primary-500" size={26} />
              <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-page py-16">
        <SectionHeading
          center
          eyebrow="Everything in one place"
          title="Built for the modern Indian farmer"
          subtitle="From discovery to application — Kisaniyat brings schemes, AI, weather and news together in a beautiful, easy interface."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={f.to}
                className="card-surface group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-600 transition group-hover:bg-primary-500 group-hover:text-white dark:bg-slate-800">
                  <f.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">
                  {f.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-primary-50/50 py-16 dark:bg-slate-900/40">
        <div className="container-page">
          <SectionHeading center eyebrow="Simple 3 steps" title="How Kisaniyat works" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card-surface p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-hero-gradient text-2xl font-extrabold text-white shadow-soft">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-center text-white shadow-soft sm:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/10" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to find your scheme?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Join thousands of farmers using Kisaniyat to unlock government
            benefits, subsidies and expert AI guidance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn-accent">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/eligibility" className="btn bg-white/15 text-white hover:bg-white/25">
              <Sparkles size={16} /> Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
