/**
 * Shared seed data. Arrays are JSON-encoded to match the SQLite-friendly
 * String columns in schema.prisma. Every record carries its official source
 * and source URL per the government-data attribution requirement.
 */
import { Prisma } from "@prisma/client";

const j = (arr: string[]) => JSON.stringify(arr);

export const seedSchemes: Prisma.SchemeCreateInput[] = [
  {
    slug: "pm-kisan-samman-nidhi",
    name: "PM-KISAN Samman Nidhi",
    category: "Income Support",
    level: "CENTRAL",
    description:
      "Direct income support of ₹6,000 per year to all landholding farmer families, paid in three equal instalments of ₹2,000 directly into bank accounts.",
    eligibility: j([
      "All landholding farmer families with cultivable land",
      "Name recorded in land records of the state/UT",
      "Valid Aadhaar linked bank account",
    ]),
    benefits: j([
      "₹6,000 per year in 3 instalments",
      "Direct Benefit Transfer (DBT) to bank account",
      "No application fee",
    ]),
    applicationProcess: j([
      "Visit pmkisan.gov.in and click 'New Farmer Registration'",
      "Enter Aadhaar, mobile and land details",
      "Complete e-KYC (OTP / biometric)",
      "Verification by state/district officials",
    ]),
    requiredDocuments: j([
      "Aadhaar Card",
      "Bank account passbook",
      "Land ownership records (Khatauni)",
    ]),
    officialLink: "https://pmkisan.gov.in",
    status: "ACTIVE",
    isNew: true,
    source: "PM-KISAN Portal",
    sourceUrl: "https://pmkisan.gov.in",
    tags: j(["income", "dbt", "central"]),
  },
  {
    slug: "pradhan-mantri-fasal-bima-yojana",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Insurance",
    level: "CENTRAL",
    description:
      "Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss/damage due to natural calamities, pests and diseases.",
    eligibility: j([
      "All farmers growing notified crops in notified areas",
      "Both loanee and non-loanee farmers can enrol",
      "Sharecroppers and tenant farmers eligible",
    ]),
    benefits: j([
      "Low premium: 2% (Kharif), 1.5% (Rabi), 5% (commercial/horticulture)",
      "Full insured sum for crop loss",
      "Coverage for prevented sowing and post-harvest losses",
    ]),
    applicationProcess: j([
      "Apply via pmfby.gov.in or nearest bank/CSC before cut-off date",
      "Submit land and crop sowing details",
      "Pay farmer share of premium",
    ]),
    requiredDocuments: j([
      "Aadhaar Card",
      "Bank passbook",
      "Land records / tenancy agreement",
      "Sowing certificate",
    ]),
    officialLink: "https://pmfby.gov.in",
    status: "CLOSING_SOON",
    deadline: new Date("2026-07-31"),
    isNew: true,
    source: "PMFBY Portal",
    sourceUrl: "https://pmfby.gov.in",
    tags: j(["insurance", "risk", "central"]),
  },
  {
    slug: "kisan-credit-card",
    name: "Kisan Credit Card (KCC)",
    category: "Credit",
    level: "CENTRAL",
    description:
      "Provides farmers timely and adequate credit for cultivation and other needs at a subsidised interest rate, with a simple, flexible repayment structure.",
    eligibility: j([
      "Individual/joint cultivators (owner or tenant)",
      "SHGs and JLGs of farmers",
      "Farmers engaged in animal husbandry and fisheries",
    ]),
    benefits: j([
      "Credit up to ₹3 lakh at 4% effective interest (with subvention)",
      "Flexible withdrawals and repayment",
      "Insurance cover for KCC holders",
    ]),
    applicationProcess: j([
      "Apply at any bank branch or via the PM-KISAN portal KCC link",
      "Fill the one-page KCC form",
      "Bank verifies land records and sanctions limit",
    ]),
    requiredDocuments: j(["Aadhaar & PAN", "Land records", "Passport photograph"]),
    officialLink: "https://www.myscheme.gov.in/schemes/kcc",
    status: "ACTIVE",
    source: "myScheme Portal",
    sourceUrl: "https://www.myscheme.gov.in",
    tags: j(["credit", "loan", "central"]),
  },
  {
    slug: "soil-health-card",
    name: "Soil Health Card Scheme",
    category: "Advisory",
    level: "CENTRAL",
    description:
      "Provides every farmer a soil health card with crop-wise recommendations of nutrients and fertilisers required to improve productivity.",
    eligibility: j(["All farmers with agricultural land"]),
    benefits: j([
      "Free soil testing every 2 years",
      "Crop-specific fertiliser recommendations",
      "Reduced input cost & better yield",
    ]),
    applicationProcess: j([
      "Register at soilhealth.dac.gov.in",
      "Collect soil sample as per guidelines",
      "Receive digital soil health card",
    ]),
    requiredDocuments: j(["Aadhaar Card", "Land details"]),
    officialLink: "https://soilhealth.dac.gov.in",
    status: "ACTIVE",
    source: "Dept. of Agriculture & Farmers Welfare",
    sourceUrl: "https://soilhealth.dac.gov.in",
    tags: j(["advisory", "soil", "central"]),
  },
  {
    slug: "e-nam",
    name: "e-NAM (National Agriculture Market)",
    category: "Market",
    level: "CENTRAL",
    description:
      "A pan-India electronic trading portal networking existing APMC mandis to create a unified national market for agricultural commodities.",
    eligibility: j([
      "Registered farmers, traders and commission agents",
      "FPOs and cooperatives",
    ]),
    benefits: j([
      "Transparent online price discovery",
      "Access to buyers across India",
      "Direct online payment",
    ]),
    applicationProcess: j([
      "Register on enam.gov.in with mobile & bank details",
      "Get approval from the local mandi",
      "Start trading online",
    ]),
    requiredDocuments: j(["Aadhaar", "Bank account", "Mandi registration"]),
    officialLink: "https://enam.gov.in",
    status: "ACTIVE",
    source: "e-NAM Portal",
    sourceUrl: "https://enam.gov.in",
    tags: j(["market", "trading", "central"]),
  },
  {
    slug: "paramparagat-krishi-vikas-yojana",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    category: "Organic Farming",
    level: "CENTRAL",
    description:
      "Promotes cluster-based organic farming with financial assistance for inputs, certification and marketing to make farming chemical-free.",
    eligibility: j([
      "Farmers willing to adopt organic farming in clusters",
      "Minimum cluster of 20 hectares / 50 farmers",
    ]),
    benefits: j([
      "₹31,500 per hectare over 3 years",
      "Support for organic inputs & certification",
      "Marketing and branding assistance",
    ]),
    applicationProcess: j([
      "Approach state agriculture department / regional council",
      "Form or join an organic cluster",
      "Enrol under PGS-India certification",
    ]),
    requiredDocuments: j(["Aadhaar", "Land records", "Cluster membership proof"]),
    officialLink: "https://pgsindia-ncof.gov.in",
    status: "ACTIVE",
    source: "National Centre of Organic Farming",
    sourceUrl: "https://pgsindia-ncof.gov.in",
    tags: j(["organic", "sustainable", "central"]),
  },
  {
    slug: "pradhan-mantri-krishi-sinchayee-yojana",
    name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    category: "Irrigation",
    level: "CENTRAL",
    description:
      "'Har Khet Ko Pani' — enhances water use efficiency through micro-irrigation (drip & sprinkler) and expands assured irrigation coverage.",
    eligibility: j(["All categories of farmers", "Priority to small & marginal farmers"]),
    benefits: j([
      "Up to 55% subsidy for small/marginal farmers on micro-irrigation",
      "Up to 45% subsidy for other farmers",
      "Water conservation and higher yields",
    ]),
    applicationProcess: j([
      "Apply via state horticulture/agriculture dept portal",
      "Site inspection and approval",
      "Install equipment via empanelled vendors",
    ]),
    requiredDocuments: j(["Aadhaar", "Land records", "Bank passbook", "Quotation"]),
    officialLink: "https://pmksy.gov.in",
    status: "ACTIVE",
    source: "PMKSY Portal",
    sourceUrl: "https://pmksy.gov.in",
    tags: j(["irrigation", "subsidy", "central"]),
  },
  {
    slug: "up-kisan-karj-rahat",
    name: "UP Kisan Karj Rahat (Loan Waiver)",
    category: "Credit",
    level: "STATE",
    state: "Uttar Pradesh",
    description:
      "Uttar Pradesh state scheme offering relief on crop loans for small and marginal farmers to reduce debt burden.",
    eligibility: j([
      "Small & marginal farmers of Uttar Pradesh",
      "Crop loan taken from notified banks",
      "Loan within the eligible limit",
    ]),
    benefits: j(["Crop loan relief up to ₹1 lakh", "Reduced debt burden"]),
    applicationProcess: j([
      "Check eligibility on upkisankarjrahat.upsdc.gov.in",
      "Verify loan account details",
      "Relief credited to loan account",
    ]),
    requiredDocuments: j(["Aadhaar", "Loan account details", "Land records"]),
    officialLink: "https://upkisankarjrahat.upsdc.gov.in",
    status: "ACTIVE",
    isNew: true,
    source: "UP State Agriculture Dept",
    sourceUrl: "https://upkisankarjrahat.upsdc.gov.in",
    tags: j(["state", "up", "loan"]),
  },
  {
    slug: "namo-shetkari-mahasanman-nidhi",
    name: "Namo Shetkari Mahasanman Nidhi",
    category: "Income Support",
    level: "STATE",
    state: "Maharashtra",
    description:
      "Maharashtra state top-up to PM-KISAN, providing an additional ₹6,000 per year to eligible farmer families in the state.",
    eligibility: j([
      "PM-KISAN beneficiaries in Maharashtra",
      "Resident farmer families of Maharashtra",
    ]),
    benefits: j(["Additional ₹6,000/year over PM-KISAN", "Direct benefit transfer"]),
    applicationProcess: j([
      "Automatic enrolment for PM-KISAN beneficiaries",
      "Verify status on the state portal",
    ]),
    requiredDocuments: j(["Aadhaar", "PM-KISAN registration", "Bank passbook"]),
    officialLink: "https://nsmny.mahait.org",
    status: "ACTIVE",
    source: "Maharashtra Agriculture Dept",
    sourceUrl: "https://nsmny.mahait.org",
    tags: j(["state", "maharashtra", "income"]),
  },
  {
    slug: "namo-drone-didi",
    name: "Kisan Drone / Namo Drone Didi",
    category: "Technology",
    level: "CENTRAL",
    description:
      "Provides drones to Women Self Help Groups for renting to farmers for spraying fertilisers and pesticides, boosting efficiency and rural incomes.",
    eligibility: j(["Women SHGs under NRLM", "Selected clusters and progressive farmers"]),
    benefits: j([
      "80% subsidy (up to ₹8 lakh) on drone cost to SHGs",
      "New income source for rural women",
      "Precision spraying for farmers",
    ]),
    applicationProcess: j([
      "SHGs apply via state rural livelihood mission",
      "Training and certification of drone pilots",
      "Deployment for farm services",
    ]),
    requiredDocuments: j(["SHG registration", "Aadhaar", "Bank details"]),
    officialLink: "https://www.myscheme.gov.in",
    status: "UPCOMING",
    isNew: true,
    source: "Ministry of Agriculture",
    sourceUrl: "https://www.myscheme.gov.in",
    tags: j(["technology", "drone", "women"]),
  },
  {
    slug: "agriculture-infrastructure-fund",
    name: "Agriculture Infrastructure Fund (AIF)",
    category: "Infrastructure",
    level: "CENTRAL",
    description:
      "Medium-long term debt financing facility for investment in post-harvest management infrastructure and community farming assets.",
    eligibility: j(["Farmers, FPOs, PACS, cooperatives", "Agri-entrepreneurs and startups"]),
    benefits: j([
      "3% interest subvention on loans up to ₹2 crore",
      "Credit guarantee coverage",
      "Support for warehouses, cold storage, processing units",
    ]),
    applicationProcess: j([
      "Apply on agriinfra.dac.gov.in",
      "Submit project proposal & DPR",
      "Bank appraisal and sanction",
    ]),
    requiredDocuments: j(["Project report", "KYC", "Land/lease documents"]),
    officialLink: "https://agriinfra.dac.gov.in",
    status: "ACTIVE",
    source: "Agri Infra Fund Portal",
    sourceUrl: "https://agriinfra.dac.gov.in",
    tags: j(["infrastructure", "loan", "central"]),
  },
  {
    slug: "pm-kusum",
    name: "PM-KUSUM (Solar Pumps)",
    category: "Renewable Energy",
    level: "CENTRAL",
    description:
      "Supports installation of solar pumps and grid-connected solar power plants to provide farmers energy security and additional income.",
    eligibility: j([
      "Individual farmers, FPOs, cooperatives",
      "Farmers with un-electrified pumps",
    ]),
    benefits: j([
      "Up to 60% subsidy on solar pump cost",
      "30% loan facility",
      "Sell surplus power to grid",
    ]),
    applicationProcess: j([
      "Apply via state nodal renewable energy agency",
      "Site feasibility check",
      "Installation by empanelled vendor",
    ]),
    requiredDocuments: j(["Aadhaar", "Land records", "Bank passbook"]),
    officialLink: "https://pmkusum.mnre.gov.in",
    status: "ACTIVE",
    source: "MNRE PM-KUSUM Portal",
    sourceUrl: "https://pmkusum.mnre.gov.in",
    tags: j(["solar", "energy", "subsidy"]),
  },
];

export const seedUpdates: Prisma.GovUpdateCreateInput[] = [
  {
    externalId: "u1",
    title: "PM-KISAN 20th Instalment Release Date Announced",
    summary:
      "The Ministry of Agriculture has announced that the 20th instalment of ₹2,000 under PM-KISAN will be released to eligible farmers. Complete your e-KYC to avoid delays.",
    source: "PM-KISAN Portal",
    officialLink: "https://pmkisan.gov.in",
    badge: "TODAY",
    publishedAt: new Date("2026-07-25"),
  },
  {
    externalId: "u2",
    title: "PMFBY Kharif 2026 Enrolment Closing on 31 July",
    summary:
      "Farmers are urged to enrol crops under Pradhan Mantri Fasal Bima Yojana for the Kharif 2026 season before the cut-off date of 31 July 2026.",
    source: "PMFBY Portal",
    officialLink: "https://pmfby.gov.in",
    badge: "URGENT",
    publishedAt: new Date("2026-07-24"),
  },
  {
    externalId: "u3",
    title: "New Guidelines Issued for Namo Drone Didi Scheme",
    summary:
      "The Ministry released revised operational guidelines expanding the number of women SHGs eligible for drone subsidies in FY 2026-27.",
    source: "Press Information Bureau",
    officialLink: "https://pib.gov.in",
    badge: "NEW UPDATE",
    publishedAt: new Date("2026-07-23"),
  },
  {
    externalId: "u4",
    title: "e-NAM Adds 100 New Mandis to National Network",
    summary:
      "One hundred additional APMC mandis have been integrated with the e-NAM platform, expanding transparent online trading opportunities for farmers.",
    source: "e-NAM Portal",
    officialLink: "https://enam.gov.in",
    badge: "RECENTLY ADDED",
    publishedAt: new Date("2026-07-21"),
  },
];

export const seedNews: Prisma.NewsCreateManyInput[] = [
  {
    headline: "Government Boosts MSP for Kharif Crops 2026-27",
    summary:
      "The Cabinet approved higher minimum support prices for 14 Kharif crops, with the largest increase for pulses and oilseeds to encourage diversification.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    category: "Government",
    source: "Agriculture Ministry",
    url: "https://agricoop.gov.in",
    publishedAt: new Date("2026-07-24"),
  },
  {
    headline: "AI-Powered Pest Detection Reaches 1 Million Farmers",
    summary:
      "A national digital agriculture initiative using AI image recognition now helps over a million farmers identify crop pests instantly via smartphones.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    category: "Technology",
    source: "Digital Agriculture Mission",
    url: "https://agricoop.gov.in",
    publishedAt: new Date("2026-07-22"),
  },
  {
    headline: "Organic Exports Cross Record ₹7,000 Crore",
    summary:
      "India's organic produce exports hit a new high, driven by strong demand for millets, spices and organic rice from Europe and North America.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    category: "Export",
    source: "APEDA",
    url: "https://apeda.gov.in",
    publishedAt: new Date("2026-07-20"),
  },
];
