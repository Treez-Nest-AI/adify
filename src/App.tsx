import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentPlans from "./pages/PaymentPlans";
import PaymentDetails from "./pages/PaymentDetails";
import Features from "./pages/Features";
import ForgotPassword from "./pages/ForgotPassword";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductInsightsPage from "./pages/ProductInsightsPage";
import ProductAnalysisPage from "./pages/ProductAnalysisPage";
import { CampaignSetup } from "@/components/CampaignSetup";
import { Navigation } from "@/components/Navigation";
import { AdPreviewGenerator } from "./components/AdPreviewGenerator";

const CampaignSetupPage = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <CampaignSetup onBack={() => window.history.back()} onGenerate={() => window.location.assign('/payment-plans')} />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId="278428109318-l6iv9e1tfmbihejtd0e3tqkn2q3npltf.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payment-plans" element={<PaymentPlans />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/product-insights" element={<ProductInsightsPage />} />
            <Route path="/product-analysis" element={<ProductAnalysisPage />} />
            <Route path="/campaign-setup" element={<CampaignSetupPage />} />
            <Route path="/ad-preview" element={<AdPreviewGenerator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
