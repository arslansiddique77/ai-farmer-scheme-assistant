import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/types";
import * as authService from "@/services/authService";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (p: authService.RegisterPayload) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getStoredUser());
    setLoading(false);
  }, []);

  const value: AuthCtx = {
    user,
    loading,
    login: async (email, password) => {
      const u = await authService.login(email, password);
      setUser(u);
      return u;
    },
    register: async (p) => {
      const u = await authService.register(p);
      setUser(u);
      return u;
    },
    logout: () => {
      authService.logout();
      setUser(null);
    },
    updateProfile: (patch) => {
      setUser(authService.updateProfile(patch));
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
