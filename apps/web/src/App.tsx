import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";
import { ToastProvider } from "@/context/ToastContext";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PageLoader } from "@/components/ui/PageLoader";

// Lazy-loaded pages (code splitting / performance)
const Home = lazy(() => import("@/pages/Home"));
const Schemes = lazy(() => import("@/pages/Schemes"));
const SchemeDetail = lazy(() => import("@/pages/SchemeDetail"));
const CurrentSchemes = lazy(() => import("@/pages/CurrentSchemes"));
const Updates = lazy(() => import("@/pages/Updates"));
const News = lazy(() => import("@/pages/News"));
const Weather = lazy(() => import("@/pages/Weather"));
const Assistant = lazy(() => import("@/pages/Assistant"));
const EligibilityChecker = lazy(() => import("@/pages/EligibilityChecker"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppDataProvider>
            <ToastProvider>
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/schemes" element={<Schemes />} />
                      <Route path="/schemes/:slug" element={<SchemeDetail />} />
                      <Route path="/current-schemes" element={<CurrentSchemes />} />
                      <Route path="/updates" element={<Updates />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/assistant" element={<Assistant />} />
                      <Route path="/eligibility" element={<EligibilityChecker />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute role="admin">
                            <Admin />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ToastProvider>
          </AppDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
