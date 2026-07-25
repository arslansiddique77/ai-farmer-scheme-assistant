import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast(`Welcome back, ${u.name}!`);
      navigate(from, { replace: true });
    } catch {
      toast("Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-hero-gradient lg:block">
        <div className="pointer-events-none absolute -right-16 top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10" />
        <div className="relative flex h-full flex-col justify-center p-14 text-white">
          <Sprout size={44} />
          <h2 className="mt-6 text-4xl font-extrabold leading-tight">
            Welcome back to Kisaniyat
          </h2>
          <p className="mt-4 max-w-md text-white/90">
            Access your personalised dashboard, saved schemes, weather advisories
            and AI guidance — all in one place.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="grid place-items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-extrabold">Login to your account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Tip: use <strong>admin@kisaniyat.in</strong> to preview the admin panel.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input px-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500">
                <input type="checkbox" className="rounded text-primary-500" /> Remember me
              </label>
              <a href="#" className="font-medium text-primary-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : (<><LogIn size={16} /> Login</>)}
            </button>

            <button
              type="button"
              onClick={() => toast("Google login is configured in production", "info")}
              className="btn-outline w-full"
            >
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary-600 hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
