import type { GovUpdate, NewsItem, Faq } from "@/types";

export const updates: GovUpdate[] = [
  {
    id: "u1",
    title: "PM-KISAN 20th Instalment Release Date Announced",
    summary:
      "The Ministry of Agriculture has announced that the 20th instalment of ₹2,000 under PM-KISAN will be released to eligible farmers. Complete your e-KYC to avoid delays.",
    source: "PM-KISAN Portal",
    officialLink: "https://pmkisan.gov.in",
    publishedAt: "2026-07-25",
    badge: "TODAY",
  },
  {
    id: "u2",
    title: "PMFBY Kharif 2026 Enrolment Closing on 31 July",
    summary:
      "Farmers are urged to enrol crops under Pradhan Mantri Fasal Bima Yojana for the Kharif 2026 season before the cut-off date of 31 July 2026.",
    source: "PMFBY Portal",
    officialLink: "https://pmfby.gov.in",
    publishedAt: "2026-07-24",
    badge: "URGENT",
  },
  {
    id: "u3",
    title: "New Guidelines Issued for Namo Drone Didi Scheme",
    summary:
      "The Ministry released revised operational guidelines expanding the number of women SHGs eligible for drone subsidies in FY 2026-27.",
    source: "Press Information Bureau",
    officialLink: "https://pib.gov.in",
    publishedAt: "2026-07-23",
    badge: "NEW UPDATE",
  },
  {
    id: "u4",
    title: "e-NAM Adds 100 New Mandis to National Network",
    summary:
      "One hundred additional APMC mandis have been integrated with the e-NAM platform, expanding transparent online trading opportunities for farmers.",
    source: "e-NAM Portal",
    officialLink: "https://enam.gov.in",
    publishedAt: "2026-07-21",
    badge: "RECENTLY ADDED",
  },
  {
    id: "u5",
    title: "Interest Subvention Extended for Kisan Credit Card",
    summary:
      "The government extended the 1.5% interest subvention on KCC crop loans up to ₹3 lakh for the current financial year.",
    source: "myScheme Portal",
    officialLink: "https://www.myscheme.gov.in",
    publishedAt: "2026-07-19",
    badge: "NEW UPDATE",
  },
  {
    id: "u6",
    title: "Soil Health Card 2.0 Mobile App Launched",
    summary:
      "A new mobile app allows farmers to access soil test results and crop-wise fertiliser recommendations directly on their phones.",
    source: "Dept. of Agriculture & Farmers Welfare",
    officialLink: "https://soilhealth.dac.gov.in",
    publishedAt: "2026-07-16",
    badge: "RECENTLY ADDED",
  },
];

export const news: NewsItem[] = [
  {
    id: "n1",
    headline: "Government Boosts MSP for Kharif Crops 2026-27",
    summary:
      "The Cabinet approved higher minimum support prices for 14 Kharif crops, with the largest increase for pulses and oilseeds to encourage diversification.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    category: "Government",
    source: "Agriculture Ministry",
    url: "https://agricoop.gov.in",
    publishedAt: "2026-07-24",
  },
  {
    id: "n2",
    headline: "AI-Powered Pest Detection Reaches 1 Million Farmers",
    summary:
      "A national digital agriculture initiative using AI image recognition now helps over a million farmers identify crop pests instantly via smartphones.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    category: "Technology",
    source: "Digital Agriculture Mission",
    url: "https://agricoop.gov.in",
    publishedAt: "2026-07-22",
  },
  {
    id: "n3",
    headline: "Organic Exports Cross Record ₹7,000 Crore",
    summary:
      "India's organic produce exports hit a new high, driven by strong demand for millets, spices and organic rice from Europe and North America.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    category: "Export",
    source: "APEDA",
    url: "https://apeda.gov.in",
    publishedAt: "2026-07-20",
  },
  {
    id: "n4",
    headline: "Monsoon Progress Favourable for Paddy Sowing",
    summary:
      "The IMD reports above-normal monsoon rainfall across major paddy-growing regions, boosting Kharif sowing prospects nationwide.",
    image:
      "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&q=80",
    category: "Crop",
    source: "India Meteorological Department",
    url: "https://mausam.imd.gov.in",
    publishedAt: "2026-07-18",
  },
  {
    id: "n5",
    headline: "Wheat Prices Stabilise as Buffer Stocks Rise",
    summary:
      "Government open-market operations have helped stabilise wheat prices in mandis, offering relief to both farmers and consumers.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    category: "Market",
    source: "Food Corporation of India",
    url: "https://fci.gov.in",
    publishedAt: "2026-07-15",
  },
  {
    id: "n6",
    headline: "Natural Farming Mission Expands to 5 New States",
    summary:
      "The National Mission on Natural Farming will onboard five additional states, promoting chemical-free, low-cost sustainable practices.",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
    category: "Organic Farming",
    source: "Ministry of Agriculture",
    url: "https://naturalfarming.dac.gov.in",
    publishedAt: "2026-07-12",
  },
];

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "Who is eligible for PM-KISAN?",
    answer:
      "All landholding farmer families whose names appear in the land records of their state/UT are eligible. Institutional landholders, higher-income taxpayers and constitutional post holders are excluded. You must complete e-KYC and link your Aadhaar to your bank account.",
    category: "Eligibility",
  },
  {
    id: "f2",
    question: "How do I register for a government scheme?",
    answer:
      "Most schemes can be applied for online via their official portal (e.g. pmkisan.gov.in) or offline at your nearest bank branch, CSC (Common Service Centre) or agriculture department office. Kisaniyat links you directly to the official application page for each scheme.",
    category: "Registration",
  },
  {
    id: "f3",
    question: "What documents are commonly required?",
    answer:
      "Most schemes require an Aadhaar card, a bank passbook (for DBT), and land ownership records (Khatauni/Khasra). Some schemes additionally need a caste certificate, income certificate, or sowing certificate. Use our AI Document Checklist to get a scheme-specific list.",
    category: "Documents",
  },
  {
    id: "f4",
    question: "How does Crop Insurance (PMFBY) work?",
    answer:
      "Under PMFBY you pay a small premium (2% for Kharif, 1.5% for Rabi) and the government subsidises the rest. If your notified crop is damaged by natural calamity, pests or disease, you receive compensation based on the insured sum. Enrol before the seasonal cut-off date.",
    category: "Insurance",
  },
  {
    id: "f5",
    question: "How can I get a farm loan at low interest?",
    answer:
      "Apply for a Kisan Credit Card (KCC) at any bank. Loans up to ₹3 lakh are available at an effective 4% interest after subvention, provided you repay on time. You can apply through the KCC link on the PM-KISAN portal.",
    category: "Loans",
  },
  {
    id: "f6",
    question: "Are subsidies available for micro-irrigation?",
    answer:
      "Yes. Under PMKSY (Per Drop More Crop), small and marginal farmers can get up to 55% subsidy on drip and sprinkler systems, and other farmers up to 45%. Apply through your state horticulture/agriculture department.",
    category: "Subsidies",
  },
];
