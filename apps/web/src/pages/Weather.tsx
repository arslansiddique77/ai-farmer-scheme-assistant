import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  CloudRain,
  MapPin,
  AlertTriangle,
  Sun,
  Cloud,
  CloudSun,
  CloudLightning,
} from "lucide-react";
import type { Weather as WeatherType } from "@/types";
import { getWeather } from "@/services/schemeService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";

const iconMap: Record<string, React.ElementType> = {
  sun: Sun,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning,
};

function WIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = iconMap[name] || CloudSun;
  return <Icon size={size} />;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherType | null>(null);

  useEffect(() => {
    getWeather().then(setWeather);
  }, []);

  return (
    <div className="container-page py-12">
      <SectionHeading
        eyebrow="Live Weather"
        title="Weather & Farmer Advisory"
        subtitle="Real-time conditions and a 7-day forecast with actionable advice for your fields."
      />

      {!weather ? (
        <div className="mt-8 space-y-5">
          <Skeleton className="h-56 w-full rounded-3xl" />
          <Skeleton className="h-36 w-full rounded-3xl" />
        </div>
      ) : (
        <>
          {/* Current */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid gap-6 overflow-hidden rounded-3xl bg-hero-gradient p-8 text-white shadow-soft md:grid-cols-2"
          >
            <div>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={15} /> {weather.location}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <WIcon name={weather.icon} size={56} />
                <div>
                  <p className="text-6xl font-extrabold">{weather.temperature}°</p>
                  <p className="text-white/90">{weather.condition}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 self-center">
              <Metric icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
              <Metric icon={Wind} label="Wind" value={`${weather.windSpeed} km/h`} />
              <Metric icon={CloudRain} label="Rain" value={`${weather.rainChance}%`} />
            </div>
          </motion.div>

          {/* Advisory */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 flex items-start gap-3 rounded-2xl border-l-4 border-accent-400 bg-accent-50 p-5 dark:bg-slate-900"
          >
            <AlertTriangle className="mt-0.5 shrink-0 text-accent-500" size={22} />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">
                Farmer Advisory
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {weather.advisory}
              </p>
            </div>
          </motion.div>

          {/* Forecast */}
          <h3 className="mt-8 text-lg font-bold">7-Day Forecast</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {weather.forecast.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-surface flex flex-col items-center gap-2 p-4 text-center"
              >
                <span className="text-sm font-semibold">{d.day}</span>
                <span className="text-primary-500">
                  <WIcon name={d.icon} size={28} />
                </span>
                <span className="text-xs text-slate-400">{d.condition}</span>
                <p className="text-sm font-bold">
                  {d.max}° <span className="text-slate-400">{d.min}°</span>
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] text-blue-500">
                  <Droplets size={11} /> {d.rainChance}%
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 text-center">
      <Icon className="mx-auto" size={20} />
      <p className="mt-1 text-lg font-bold">{value}</p>
      <p className="text-[11px] text-white/80">{label}</p>
    </div>
  );
}
