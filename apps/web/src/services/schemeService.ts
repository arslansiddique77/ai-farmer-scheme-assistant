import { api, USE_REAL_API } from "./api";
import { schemes } from "@/data/schemes";
import { updates, news, faqs } from "@/data/updates";
import { mockWeather } from "@/data/misc";
import { delay } from "@/lib/utils";
import type {
  Scheme,
  GovUpdate,
  NewsItem,
  Weather,
  Faq,
  EligibilityInput,
} from "@/types";

/**
 * Data service layer. Each function tries the real backend when configured and
 * transparently falls back to the bundled mock dataset. This keeps components
 * decoupled from the data source.
 */

export async function getSchemes(): Promise<Scheme[]> {
  if (USE_REAL_API) {
    const { data } = await api.get<Scheme[]>("/schemes");
    return data;
  }
  return delay(schemes, 400);
}

export async function getSchemeBySlug(slug: string): Promise<Scheme | undefined> {
  if (USE_REAL_API) {
    const { data } = await api.get<Scheme>(`/schemes/${slug}`);
    return data;
  }
  return delay(schemes.find((s) => s.slug === slug), 300);
}

export async function getActiveSchemes(): Promise<Scheme[]> {
  const all = await getSchemes();
  return all.filter(
    (s) => s.status === "Active" || s.status === "Closing Soon",
  );
}

export async function getUpdates(): Promise<GovUpdate[]> {
  if (USE_REAL_API) {
    const { data } = await api.get<GovUpdate[]>("/updates");
    return data;
  }
  return delay(updates, 400);
}

export async function getNews(): Promise<NewsItem[]> {
  if (USE_REAL_API) {
    const { data } = await api.get<NewsItem[]>("/news");
    return data;
  }
  return delay(news, 400);
}

export async function getWeather(location?: string): Promise<Weather> {
  if (USE_REAL_API) {
    const { data } = await api.get<Weather>("/weather", {
      params: { location },
    });
    return data;
  }
  return delay(mockWeather, 400);
}

export async function getFaqs(): Promise<Faq[]> {
  return delay(faqs, 200);
}

/**
 * AI Eligibility Checker. Uses simple rule-based matching on the mock dataset;
 * in production this can be delegated to an LLM prompt on the backend.
 */
export async function checkEligibility(
  input: EligibilityInput,
): Promise<Scheme[]> {
  if (USE_REAL_API) {
    const { data } = await api.post<Scheme[]>("/ai/eligibility", input);
    return data;
  }
  const all = await getSchemes();
  const matched = all.filter((s) => {
    // State schemes must match the farmer's state
    if (s.level === "State" && s.state && s.state !== input.state) return false;
    // Large farmers are excluded from a few small-farmer-focused schemes
    if (
      input.category === "Large Farmer" &&
      ["up-kisan-karj-mafi"].includes(s.id)
    )
      return false;
    return s.status !== "Closed";
  });
  return delay(matched, 600);
}
