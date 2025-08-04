import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentPlans from "./pages/PaymentPlans";
import PaymentDetails from "./pages/PaymentDetails";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductInsightsPage from "./pages/ProductInsightsPage";
import ProductAnalysisPage from "./pages/ProductAnalysisPage";
import { CampaignSetup } from "@/components/CampaignSetup";
import { Navigation } from "@/components/Navigation";

const CampaignSetupPage = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <CampaignSetup onBack={() => window.history.back()} onGenerate={() => window.location.assign('/payment-plans')} />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment-plans" element={<PaymentPlans />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/product-insights" element={<ProductInsightsPage />} />
          <Route path="/product-analysis" element={<ProductAnalysisPage />} />
          <Route path="/campaign-setup" element={<CampaignSetupPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
