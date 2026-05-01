import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Public Pages
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import AIFeatures from "@/pages/AIFeatures";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

// Dashboard Pages
import Dashboard from "@/pages/dashboard/Dashboard";
import Cases from "@/pages/dashboard/Cases";
import NewCase from "@/pages/dashboard/NewCase";
import CaseDetail from "@/pages/dashboard/CaseDetail";
import Clients from "@/pages/dashboard/Clients";
import Documents from "@/pages/dashboard/Documents";
import Team from "@/pages/dashboard/Team";
import Settings from "@/pages/dashboard/Settings";
import ClientDashboard from "@/pages/dashboard/ClientDashboard";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminFirms from "@/pages/admin/AdminFirms";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions";

// Court GEO Pages
import DelhiHighCourt from "@/pages/courts/DelhiHighCourt";
import GurgaonDistrictCourt from "@/pages/courts/GurgaonDistrictCourt";

import NotFound from "@/pages/NotFound";
import AcceptInvite from "@/pages/AcceptInvite";
import { RoleGuard } from "@/components/RoleGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/ai-features" element={<AIFeatures />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/courts/delhi-high-court" element={<DelhiHighCourt />} />
              <Route path="/courts/gurgaon-district-court" element={<GurgaonDistrictCourt />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/invite/:token" element={<AcceptInvite />} />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <RoleGuard allow={["lawyer_owner", "lawyer_team", "admin"]}>
                  <DashboardLayout />
                </RoleGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="cases" element={<Cases />} />
              <Route path="cases/new" element={<NewCase />} />
              <Route path="cases/:id" element={<CaseDetail />} />
              <Route path="clients" element={<Clients />} />
              <Route path="documents" element={<Documents />} />
              <Route path="team" element={<Team />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Client Dashboard Route */}
            <Route
              path="/client"
              element={
                <RoleGuard allow={["client"]} redirectForbidden={false}>
                  <ClientDashboard />
                </RoleGuard>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RoleGuard allow={["admin"]} redirectForbidden={false}>
                  <AdminLayout />
                </RoleGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="firms" element={<AdminFirms />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
