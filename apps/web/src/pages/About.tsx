import { motion } from "framer-motion";
import { Target, Eye, Code2, GraduationCap, Sprout } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tech = [
  "React", "TypeScript", "Tailwind CSS", "Framer Motion", "ShadCN UI",
  "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT",
  "OpenAI / Gemini", "Vercel", "Render", "Neon",
];

export default function About() {
  return (
    <div className="container-page py-12">
      <SectionHeading
        center
        eyebrow="About Kisaniyat"
        title="One Platform for Every Indian Farmer"
        subtitle="Kisaniyat is an AI-powered platform that helps Indian farmers discover government schemes, subsidies, news, weather and expert guidance — bridging the gap between farmers and the benefits meant for them."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card-surface p-8"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-600 dark:bg-slate-800">
            <Target size={22} />
          </span>
          <h3 className="mt-4 text-xl font-bold">Our Mission</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            To ensure that no farmer misses out on a government benefit they are
            entitled to — by making scheme discovery simple, accessible and
            available in their language, powered by AI.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card-surface p-8"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-100 text-accent-500">
            <Eye size={22} />
          </span>
          <h3 className="mt-4 text-xl font-bold">Our Vision</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            A digitally empowered rural India where every farmer has a trusted,
            intelligent companion for schemes, market prices, weather and
            sustainable farming decisions.
          </p>
        </motion.div>
      </div>

      {/* Project description */}
      <div className="mt-6 card-surface p-8">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-600 dark:bg-slate-800">
          <Sprout size={22} />
        </span>
        <h3 className="mt-4 text-xl font-bold">Project Description</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Kisaniyat is a full-stack web application featuring a modern responsive
          frontend, a secure Node/Express backend, PostgreSQL with Prisma, JWT
          role-based authentication, an AI chatbot (OpenAI/Gemini), automated
          scheme-update synchronisation from official government portals, a live
          weather module, agriculture news, and an admin dashboard. All imported
          content is clearly attributed to its official source with a direct link
          to the government application page.
        </p>
      </div>

      {/* Tech + internship */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card-surface p-8">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-600 dark:bg-slate-800">
            <Code2 size={22} />
          </span>
          <h3 className="mt-4 text-xl font-bold">Technology Used</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="badge-soft">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="card-surface p-8">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-100 text-accent-500">
            <GraduationCap size={22} />
          </span>
          <h3 className="mt-4 text-xl font-bold">Internship Project</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Built as a professional internship submission demonstrating full-stack
            engineering, modern UI/UX, AI integration, secure authentication and
            production-ready deployment configuration.
          </p>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Category</dt>
              <dd className="font-medium">Full-Stack + AI</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Type</dt>
              <dd className="font-medium">Web Application</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Status</dt>
              <dd className="font-medium text-primary-600">Production Ready</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
