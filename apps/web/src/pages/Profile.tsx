import { useState } from "react";
import { motion } from "framer-motion";
import { Save, UserCog } from "lucide-react";
import type { FarmerCategory } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDIAN_STATES, CROPS } from "@/data/misc";

const categories: FarmerCategory[] = ["Marginal Farmer", "Small Farmer", "Large Farmer"];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: user?.name || "",
    age: user?.age?.toString() || "",
    state: user?.state || "Uttar Pradesh",
    district: user?.district || "",
    landArea: user?.landArea?.toString() || "",
    cropType: user?.cropType || "Wheat",
    incomeCategory: user?.incomeCategory || "",
    category: (user?.category || "Small Farmer") as FarmerCategory,
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({
      name: form.name,
      age: Number(form.age) || undefined,
      state: form.state,
      district: form.district,
      landArea: Number(form.landArea) || undefined,
      cropType: form.cropType,
      incomeCategory: form.incomeCategory,
      category: form.category,
    });
    toast("Profile updated successfully");
  }

  return (
    <div className="container-page py-12">
      <SectionHeading
        eyebrow="Farmer Profile"
        title="Manage your details"
        subtitle="Keep your profile updated for the most accurate scheme recommendations."
      />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 grid gap-6 lg:grid-cols-3"
      >
        <div className="card-surface p-6 text-center lg:col-span-1">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-hero-gradient text-4xl font-extrabold text-white">
            {form.name.charAt(0).toUpperCase() || "K"}
          </span>
          <p className="mt-4 text-lg font-bold capitalize">{form.name}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <span className="badge-live mt-3 inline-flex">{form.category}</span>
          <div className="mt-6 rounded-xl bg-primary-50 p-4 text-left text-xs text-slate-500 dark:bg-slate-800">
            <p className="flex items-center gap-1 font-semibold text-primary-700 dark:text-primary-300">
              <UserCog size={13} /> Role: {user?.role}
            </p>
          </div>
        </div>

        <div className="card-surface grid gap-4 p-6 sm:grid-cols-2 lg:col-span-2">
          <Field label="Full Name">
            <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Age">
            <input type="number" className="input" value={form.age} onChange={(e) => set("age", e.target.value)} />
          </Field>
          <Field label="State">
            <select className="input" value={form.state} onChange={(e) => set("state", e.target.value)}>
              {INDIAN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="District">
            <input className="input" value={form.district} onChange={(e) => set("district", e.target.value)} />
          </Field>
          <Field label="Land Area (acres)">
            <input type="number" step="0.5" className="input" value={form.landArea} onChange={(e) => set("landArea", e.target.value)} />
          </Field>
          <Field label="Primary Crop">
            <select className="input" value={form.cropType} onChange={(e) => set("cropType", e.target.value)}>
              {CROPS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Income Category">
            <input className="input" placeholder="e.g. BPL / APL" value={form.incomeCategory} onChange={(e) => set("incomeCategory", e.target.value)} />
          </Field>
          <Field label="Farmer Category">
            <select className="input" value={form.category} onChange={(e) => set("category", e.target.value as FarmerCategory)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">
              <Save size={16} /> Update Profile
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}
