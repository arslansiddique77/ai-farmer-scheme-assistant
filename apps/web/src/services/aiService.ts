import { api, USE_REAL_API } from "./api";
import { delay } from "@/lib/utils";
import { schemes } from "@/data/schemes";

/**
 * AI Assistant service. When a backend is configured it proxies to the real
 * OpenAI/Gemini-powered endpoint. Otherwise it uses a lightweight rule-based
 * responder so the chatbot is fully demoable offline (bilingual EN/HI).
 */

export type Lang = "en" | "hi";

export const suggestedQuestions: Record<Lang, string[]> = {
  en: [
    "Am I eligible for PM-KISAN?",
    "Which crops suit the Kharif season?",
    "How do I apply for a Kisan Credit Card?",
    "What documents do I need for crop insurance?",
  ],
  hi: [
    "क्या मैं पीएम-किसान के लिए पात्र हूँ?",
    "खरीफ मौसम के लिए कौन सी फसलें उपयुक्त हैं?",
    "किसान क्रेडिट कार्ड के लिए आवेदन कैसे करें?",
    "फसल बीमा के लिए कौन से दस्तावेज़ चाहिए?",
  ],
};

function ruleBasedAnswer(message: string, lang: Lang): string {
  const q = message.toLowerCase();

  const find = (id: string) => schemes.find((s) => s.id === id)!;

  if (q.includes("pm-kisan") || q.includes("pm kisan") || q.includes("किसान सम्मान")) {
    const s = find("pm-kisan");
    return lang === "hi"
      ? `पीएम-किसान योजना के तहत सभी भूमिधारक किसान परिवारों को हर साल ₹6,000 तीन किस्तों में मिलते हैं। पात्रता: आपकी ज़मीन राज्य के भू-अभिलेख में दर्ज होनी चाहिए और आधार-लिंक्ड बैंक खाता होना चाहिए। आधिकारिक पोर्टल: ${s.officialLink}`
      : `Under PM-KISAN, every landholding farmer family receives ₹6,000 per year in 3 instalments. Eligibility: your land must be recorded in the state land records and you need an Aadhaar-linked bank account. Apply on the official portal: ${s.officialLink}`;
  }

  if (q.includes("insurance") || q.includes("pmfby") || q.includes("बीमा")) {
    const s = find("pmfby");
    return lang === "hi"
      ? `फसल बीमा (PMFBY) में खरीफ के लिए सिर्फ 2% और रबी के लिए 1.5% प्रीमियम देना होता है। ज़रूरी दस्तावेज़: आधार, बैंक पासबुक, भू-अभिलेख और बुवाई प्रमाणपत्र। समय सीमा से पहले नामांकन करें: ${s.officialLink}`
      : `Crop insurance (PMFBY) requires only 2% premium for Kharif and 1.5% for Rabi. Documents needed: Aadhaar, bank passbook, land records and sowing certificate. Enrol before the cut-off date: ${s.officialLink}`;
  }

  if (q.includes("credit") || q.includes("loan") || q.includes("kcc") || q.includes("ऋण") || q.includes("लोन")) {
    const s = find("kcc");
    return lang === "hi"
      ? `किसान क्रेडिट कार्ड (KCC) से ₹3 लाख तक का ऋण मात्र 4% प्रभावी ब्याज पर मिल सकता है। किसी भी बैंक शाखा में एक-पृष्ठ का फॉर्म भरें। अधिक जानकारी: ${s.officialLink}`
      : `The Kisan Credit Card (KCC) offers loans up to ₹3 lakh at just 4% effective interest. Fill the one-page form at any bank branch. Learn more: ${s.officialLink}`;
  }

  if (q.includes("crop") || q.includes("kharif") || q.includes("season") || q.includes("फसल") || q.includes("खरीफ")) {
    return lang === "hi"
      ? "अच्छे मानसून वाले क्षेत्रों में खरीफ मौसम के लिए धान, मक्का, सोयाबीन, कपास और अरहर उपयुक्त हैं। कम पानी वाले क्षेत्रों में बाजरा और मूंग बेहतर हैं। सटीक सुझाव के लिए AI Crop Recommendation टूल आज़माएँ।"
      : "For the Kharif season in good-monsoon regions, paddy, maize, soybean, cotton and arhar (pigeon pea) are well suited. In low-water areas, bajra and moong perform better. Try the AI Crop Recommendation tool for a tailored suggestion.";
  }

  if (q.includes("fertiliser") || q.includes("fertilizer") || q.includes("खाद") || q.includes("उर्वरक")) {
    return lang === "hi"
      ? "उर्वरक की सही मात्रा जानने के लिए मुफ्त 'सॉयल हेल्थ कार्ड' बनवाएँ — यह आपकी मिट्टी के अनुसार फसल-वार सिफारिश देता है, जिससे लागत घटती है और उपज बढ़ती है।"
      : "For the right fertiliser dosage, get a free Soil Health Card — it gives crop-wise recommendations based on your soil, reducing input cost and improving yield.";
  }

  if (q.includes("weather") || q.includes("rain") || q.includes("मौसम") || q.includes("बारिश")) {
    return lang === "hi"
      ? "आगामी 48 घंटों में भारी बारिश की संभावना है। कीटनाशक छिड़काव टालें और खेत में जल-निकासी सुनिश्चित करें। विस्तृत पूर्वानुमान Weather पेज पर देखें।"
      : "Heavy rainfall is expected in the next 48 hours. Delay pesticide spraying and ensure proper field drainage. See the detailed forecast on the Weather page.";
  }

  return lang === "hi"
    ? "मैं किसानों के लिए सरकारी योजनाओं, पात्रता, फसल सुझाव, खाद सलाह और मौसम मार्गदर्शन में मदद कर सकता हूँ। कृपया अपना प्रश्न विस्तार से पूछें।"
    : "I can help with government schemes, eligibility, crop suggestions, fertiliser advice and weather guidance for farmers. Please ask your question in a bit more detail.";
}

export async function askAssistant(
  message: string,
  lang: Lang = "en",
): Promise<string> {
  if (USE_REAL_API) {
    const { data } = await api.post<{ answer: string }>("/ai/chat", {
      message,
      lang,
    });
    return data.answer;
  }
  // Simulate typing latency for a natural feel
  return delay(ruleBasedAnswer(message, lang), 900);
}
