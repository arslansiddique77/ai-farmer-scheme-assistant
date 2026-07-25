import { Link } from "react-router-dom";
import { Sprout, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-hero-gradient text-white shadow-glow">
          <Sprout size={38} />
        </span>
        <h1 className="mt-6 text-7xl font-extrabold text-primary-500">404</h1>
        <p className="mt-2 text-xl font-bold">Page not found</p>
        <p className="mt-2 text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-6">
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
