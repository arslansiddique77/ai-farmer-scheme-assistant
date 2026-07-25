import { config } from "../lib/config.js";
import { logger } from "../lib/logger.js";

type Lang = "en" | "hi";

/**
 * Rule-based fallback so the assistant works without any API key. When
 * OPENAI_API_KEY or GEMINI_API_KEY is set, real LLM calls should be wired here.
 */
function ruleBased(message: string, lang: Lang): string {
  const q = message.toLowerCase();
  if (q.includes("pm-kisan") || q.includes("किसान सम्मान"))
    return lang === "hi"
      ? "पीएम-किसान के तहत सभी भूमिधारक किसानों को सालाना ₹6,000 तीन किस्तों में मिलते हैं। आधिकारिक पोर्टल: https://pmkisan.gov.in"
      : "Under PM-KISAN every landholding farmer family gets ₹6,000/year in 3 instalments. Apply at https://pmkisan.gov.in";
  if (q.includes("insurance") || q.includes("बीमा"))
    return lang === "hi"
      ? "फसल बीमा (PMFBY) में खरीफ के लिए 2% प्रीमियम देना होता है। समय सीमा से पहले नामांकन करें।"
      : "Crop insurance (PMFBY) needs only 2% premium for Kharif. Enrol before the cut-off date.";
  if (q.includes("loan") || q.includes("credit") || q.includes("ऋण"))
    return lang === "hi"
      ? "किसान क्रेडिट कार्ड से ₹3 लाख तक का ऋण 4% प्रभावी ब्याज पर मिलता है।"
      : "The Kisan Credit Card offers loans up to ₹3 lakh at 4% effective interest.";
  return lang === "hi"
    ? "मैं सरकारी योजनाओं, पात्रता, फसल और मौसम में मदद कर सकता हूँ। कृपया विस्तार से पूछें।"
    : "I can help with government schemes, eligibility, crops and weather. Please ask in more detail.";
}

export async function askAssistant(message: string, lang: Lang): Promise<string> {
  if (config.openaiKey || config.geminiKey) {
    // TODO: real LLM integration (OpenAI / Gemini)
    logger.info("AI key present — real LLM integration goes here.");
    return ruleBased(message, lang);
  }
  return ruleBased(message, lang);
}
