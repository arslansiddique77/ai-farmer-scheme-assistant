import { api, USE_REAL_API } from "./api";
import { delay } from "@/lib/utils";
import type { User } from "@/types";

/**
 * Auth service. With a backend it hits real JWT endpoints; offline it uses a
 * localStorage-backed mock so login/register/roles work in demos.
 */

const TOKEN_KEY = "kisaniyat_token";
const USER_KEY = "kisaniyat_user";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  occupation: string;
  password: string;
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

function persist(user: User, token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function login(email: string, password: string): Promise<User> {
  if (USE_REAL_API) {
    const { data } = await api.post<{ user: User; token: string }>(
      "/auth/login",
      { email, password },
    );
    persist(data.user, data.token);
    return data.user;
  }
  // Mock: admin@kisaniyat.in => admin role, anything else => farmer
  const isAdmin = email.toLowerCase().startsWith("admin@");
  const user: User = {
    id: "u-" + Date.now(),
    name: isAdmin ? "Admin User" : email.split("@")[0].replace(/\W/g, " "),
    email,
    role: isAdmin ? "admin" : "farmer",
    state: "Uttar Pradesh",
    district: "Varanasi",
    category: "Small Farmer",
  };
  persist(user, "mock-jwt-token");
  return delay(user, 600);
}

export async function register(payload: RegisterPayload): Promise<User> {
  if (USE_REAL_API) {
    const { data } = await api.post<{ user: User; token: string }>(
      "/auth/register",
      payload,
    );
    persist(data.user, data.token);
    return data.user;
  }
  const user: User = {
    id: "u-" + Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    state: payload.state,
    district: payload.district,
    occupation: payload.occupation,
    role: "farmer",
    category: "Small Farmer",
  };
  persist(user, "mock-jwt-token");
  return delay(user, 700);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function updateProfile(patch: Partial<User>): User {
  const current = getStoredUser();
  if (!current) throw new Error("Not authenticated");
  const updated = { ...current, ...patch };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  return updated;
}
