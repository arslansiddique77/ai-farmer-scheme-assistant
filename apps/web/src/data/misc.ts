import type { Weather, AppNotification } from "@/types";

export const mockWeather: Weather = {
  location: "Varanasi, Uttar Pradesh",
  temperature: 32,
  humidity: 78,
  windSpeed: 12,
  rainChance: 65,
  condition: "Partly Cloudy",
  icon: "cloud-sun",
  advisory:
    "Heavy rainfall expected in the next 48 hours. Delay pesticide spraying and ensure proper field drainage to protect standing crops.",
  updatedAt: "2026-07-25T09:00:00Z",
  forecast: [
    { day: "Sat", min: 27, max: 33, condition: "Rain", icon: "cloud-rain", rainChance: 80 },
    { day: "Sun", min: 26, max: 31, condition: "Thunderstorm", icon: "cloud-lightning", rainChance: 90 },
    { day: "Mon", min: 27, max: 34, condition: "Cloudy", icon: "cloud", rainChance: 55 },
    { day: "Tue", min: 28, max: 35, condition: "Sunny", icon: "sun", rainChance: 20 },
    { day: "Wed", min: 28, max: 36, condition: "Sunny", icon: "sun", rainChance: 10 },
    { day: "Thu", min: 27, max: 34, condition: "Partly Cloudy", icon: "cloud-sun", rainChance: 40 },
    { day: "Fri", min: 27, max: 33, condition: "Rain", icon: "cloud-rain", rainChance: 70 },
  ],
};

export const mockNotifications: AppNotification[] = [
  {
    id: "no1",
    type: "scheme",
    title: "New Scheme Added",
    message: "Namo Drone Didi scheme is now live. Check eligibility for women SHGs.",
    createdAt: "2026-07-25T08:30:00Z",
    read: false,
  },
  {
    id: "no2",
    type: "deadline",
    title: "Deadline Approaching",
    message: "PMFBY Kharif 2026 enrolment closes on 31 July. Enrol your crop now.",
    createdAt: "2026-07-24T18:00:00Z",
    read: false,
  },
  {
    id: "no3",
    type: "weather",
    title: "Weather Alert",
    message: "Heavy rainfall expected in Varanasi over the next 48 hours.",
    createdAt: "2026-07-24T12:00:00Z",
    read: false,
  },
  {
    id: "no4",
    type: "update",
    title: "Government Update",
    message: "PM-KISAN 20th instalment release date announced.",
    createdAt: "2026-07-23T10:00:00Z",
    read: true,
  },
  {
    id: "no5",
    type: "market",
    title: "Market Alert",
    message: "MSP increased for 14 Kharif crops for the 2026-27 season.",
    createdAt: "2026-07-22T09:00:00Z",
    read: true,
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
];

export const CROPS = [
  "Rice / Paddy", "Wheat", "Maize", "Sugarcane", "Cotton", "Soybean",
  "Groundnut", "Pulses (Arhar/Moong)", "Mustard", "Bajra", "Jowar",
  "Potato", "Onion", "Tomato", "Vegetables", "Fruits/Horticulture",
];
