import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { INDIAN_STATES } from "@/data/misc";

export default function Register() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Uttar Pradesh",
    district: "",
    occupation: "Farmer",
    password: "",
    confirm: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast("Passwords do not match", "error");
      return;
    }
    // Mock OTP step
    setStep(2);
    toast("OTP sent to your phone (mock: 1234)", "info");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (otp !== "1234") {
      toast("Invalid OTP. Use 1234 for the demo.", "error");
      return;
    }
    setLoading(true);
    try {
      const u = await register(form);
      toast(`Account created! Welcome, ${u.name}`);
      navigate("/dashboard", { replace: true });
    } catch {
      toast("Registration failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="grid place-items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-hero-gradient text-white">
              <Sprout size={20} />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold">Create your account</h1>
              <p className="text-sm text-slate-500">
                Step {step} of 2 — {step === 1 ? "Your details" : "Verify OTP"}
              </p>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={next} className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={form.name} onChange={(v) => set("name", v)} required span2 />
              <Input label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
              <Input label="Phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} required />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">State</span>
                <select className="input" value={form.state} onChange={(e) => set("state", e.target.value)}>
                  {INDIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <Input label="District" value={form.district} onChange={(v) => set("district", v)} required />
              <Input label="Occupation" value={form.occupation} onChange={(v) => set("occupation", v)} span2 />
              <Input label="Password" type="password" value={form.password} onChange={(v) => set("password", v)} required />
              <Input label="Confirm Password" type="password" value={form.confirm} onChange={(v) => set("confirm", v)} required />
              <button type="submit" className="btn-primary sm:col-span-2">
                Continue <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm dark:bg-slate-800">
                <ShieldCheck className="mt-0.5 text-primary-500" size={20} />
                <p className="text-slate-600 dark:text-slate-300">
                  We sent a 6-digit OTP to <strong>{form.phone || "your phone"}</strong>.
                  For this demo, enter <strong>1234</strong>.
                </p>
              </div>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="input text-center text-lg tracking-[0.5em]"
                maxLength={4}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={loading}>
                  {loading ? "Creating..." : "Verify & Register"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary-600 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden bg-hero-gradient lg:block">
        <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative flex h-full flex-col justify-center p-14 text-white">
          <h2 className="text-4xl font-extrabold leading-tight">
            Join 48,000+ farmers
          </h2>
          <p className="mt-4 max-w-md text-white/90">
            Register free to unlock personalised scheme recommendations, bookmarks,
            weather alerts and a bilingual AI assistant.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Personalised scheme recommendations",
              "Save & bookmark schemes",
              "Weather & deadline alerts",
              "24×7 AI farming assistant",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <ShieldCheck size={18} /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  span2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  span2?: boolean;
}) {
  return (
    <label className={`block ${span2 ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </label>
  );
}
