import { prisma } from "@kisaniyat/database";
import { config } from "../lib/config.js";
import { logger } from "../lib/logger.js";

const CACHE_TTL_MS = 1000 * 60 * 60 * 3; // 3 hours

const mockWeather = (location: string) => ({
  location,
  temperature: 32,
  humidity: 78,
  windSpeed: 12,
  rainChance: 65,
  condition: "Partly Cloudy",
  icon: "cloud-sun",
  advisory:
    "Heavy rainfall expected in the next 48 hours. Delay pesticide spraying and ensure proper field drainage to protect standing crops.",
  updatedAt: new Date().toISOString(),
  forecast: [
    { day: "Sat", min: 27, max: 33, condition: "Rain", icon: "cloud-rain", rainChance: 80 },
    { day: "Sun", min: 26, max: 31, condition: "Thunderstorm", icon: "cloud-lightning", rainChance: 90 },
    { day: "Mon", min: 27, max: 34, condition: "Cloudy", icon: "cloud", rainChance: 55 },
    { day: "Tue", min: 28, max: 35, condition: "Sunny", icon: "sun", rainChance: 20 },
    { day: "Wed", min: 28, max: 36, condition: "Sunny", icon: "sun", rainChance: 10 },
    { day: "Thu", min: 27, max: 34, condition: "Partly Cloudy", icon: "cloud-sun", rainChance: 40 },
    { day: "Fri", min: 27, max: 33, condition: "Rain", icon: "cloud-rain", rainChance: 70 },
  ],
});

/**
 * Returns weather for a location, using a DB cache. When WEATHER_API_KEY is
 * configured this is where a real provider (OpenWeather/IMD) call would go;
 * otherwise it returns a realistic mock so the feature is fully demoable.
 */
export async function getWeather(location: string) {
  const cached = await prisma.weatherCache.findUnique({ where: { location } });
  if (cached && Date.now() - cached.fetchedAt.getTime() < CACHE_TTL_MS) {
    return JSON.parse(cached.payload);
  }

  let data;
  if (config.weatherKey) {
    // TODO: real provider integration
    // const res = await fetch(`https://api.openweathermap.org/...&appid=${config.weatherKey}`);
    logger.info("Weather API key present — real provider integration goes here.");
    data = mockWeather(location);
  } else {
    data = mockWeather(location);
  }

  await prisma.weatherCache.upsert({
    where: { location },
    update: { payload: JSON.stringify(data), fetchedAt: new Date() },
    create: { location, payload: JSON.stringify(data) },
  });
  return data;
}
