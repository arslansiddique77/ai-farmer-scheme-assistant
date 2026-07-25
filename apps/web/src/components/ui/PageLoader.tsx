import { Sprout } from "lucide-react";

export function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="grid h-14 w-14 animate-float place-items-center rounded-2xl bg-hero-gradient text-white shadow-glow">
          <Sprout size={28} />
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary-400"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
