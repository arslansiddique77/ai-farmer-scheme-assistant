// Central domain types for Kisaniyat

export type SchemeLevel = "Central" | "State";
export type SchemeStatus = "Active" | "Closing Soon" | "Closed" | "Upcoming";
export type FarmerCategory =
  | "Small Farmer"
  | "Marginal Farmer"
  | "Large Farmer";

export interface Scheme {
  id: string;
  name: string;
  slug: string;
  category: string; // e.g. Income Support, Insurance, Credit
  level: SchemeLevel;
  state?: string; // for state schemes
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  requiredDocuments: string[];
  officialLink: string;
  status: SchemeStatus;
  deadline?: string; // ISO date
  isNew?: boolean;
  source: string; // e.g. "PM-KISAN Portal"
  lastUpdated: string; // ISO date
  tags?: string[];
}

export type UpdateBadge =
  | "NEW UPDATE"
  | "TODAY"
  | "RECENTLY ADDED"
  | "URGENT";

export interface GovUpdate {
  id: string;
  title: string;
  summary: string;
  source: string;
  officialLink: string;
  publishedAt: string; // ISO date
  badge: UpdateBadge;
}

export type NewsCategory =
  | "Government"
  | "Technology"
  | "Organic Farming"
  | "Crop"
  | "Market"
  | "Export";

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  image: string;
  category: NewsCategory;
  source: string;
  url: string;
  publishedAt: string;
}

export interface WeatherForecastDay {
  day: string;
  min: number;
  max: number;
  condition: string;
  icon: string;
  rainChance: number;
}

export interface Weather {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  condition: string;
  icon: string;
  advisory: string;
  forecast: WeatherForecastDay[];
  updatedAt: string;
}

export type Role = "farmer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state?: string;
  district?: string;
  occupation?: string;
  age?: number;
  landArea?: number; // acres
  cropType?: string;
  incomeCategory?: string;
  category?: FarmerCategory;
  role: Role;
  avatar?: string;
}

export interface AppNotification {
  id: string;
  type: "scheme" | "deadline" | "update" | "weather" | "market";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface EligibilityInput {
  state: string;
  age: number;
  income: number;
  landArea: number;
  category: FarmerCategory;
  crop: string;
}
