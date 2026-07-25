import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, FileCheck2 } from "lucide-react";
import type { EligibilityInput, FarmerCategory, Scheme } from "@/types";
import { checkEligibility } from "@/services/schemeService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { INDIAN_STATES, CROPS } from "@/data/misc";

const categories: FarmerCategory[] = [
  "Marginal Farmer",
  "Small Farmer",
  "Large Farmer",
];

export default function EligibilityChecker() {
  const [form, setForm] = useState<EligibilityInput>({
    state: "Uttar Pradesh",
    age: 35,
    income: 120000,
    landArea: 2,
    category: "Small Farmer",
    crop: "Wheat",
  });
  const [results, setResults] = useState<Scheme[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const r = await checkEligibility(form);
    setResults(r);
    setLoading(false);
    setTimeout(
      () => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }

  const set = <K extends keyof EligibilityInput>(k: K, v: EligibilityInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="container-page py-12">
      <SectionHeading
        center
        eyebrow="AI Eligibility Checker"
        title="Find schemes you qualify for"
        subtitle="Enter a few details and our AI matches you to suitable government schemes instantly."
      />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface mx-auto mt-8 grid max-w-3xl gap-4 p-6 sm:grid-cols-2"
      >
        <Field label="State">
          <select
            className="input"
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
          >
            {INDIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Age">
          <input
            type="number"
            min={18}
            max={100}
            className="input"
            value={form.age}
            onChange={(e) => set("age", Number(e.target.value))}
          />
        </Field>
        <Field label="Annual Income (₹)">
          <input
            type="number"
            min={0}
            step={10000}
            className="input"
            value={form.income}
            onChange={(e) => set("income", Number(e.target.value))}
          />
        </Field>
        <Field label="Land Area (acres)">
          <input
            type="number"
            min={0}
            step={0.5}
            className="input"
            value={form.landArea}
            onChange={(e) => set("landArea", Number(e.target.value))}
          />
        </Field>
        <Field label="Farmer Category">
          <select
            className="input"
            value={form.category}
            onChange={(e) => set("category", e.target.value as FarmerCategory)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Primary Crop">
          <select
            className="input"
            value={form.crop}
            onChange={(e) => set("crop", e.target.value)}
          >
            {CROPS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? (
              "Analysing your profile..."
            ) : (
              <>
                <Sparkles size={16} /> Check My Eligibility <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </motion.form>

      {results && (
        <div id="results" className="mt-12">
          <div className="flex items-center gap-2">
            <FileCheck2 className="text-primary-500" />
            <h3 className="text-xl font-bold">
              {results.length} scheme{results.length !== 1 ? "s" : ""} matched your
              profile
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Based on your state, category and crop. Verify details on each
            official portal before applying.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}
