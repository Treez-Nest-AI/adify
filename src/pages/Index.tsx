import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AIProcessingDashboard } from "@/components/AIProcessingDashboard";
import { CampaignSetup } from "@/components/CampaignSetup";
import { AdPreviewGenerator } from "@/components/AdPreviewGenerator";

type WorkflowStep = 'upload' | 'processing' | 'setup' | 'preview';

interface WebsiteData {
  url: string;
  title: string;
  image: string;
  price: string;
  brand: string;
  description: string;
  details: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('upload');
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);

  const handleAnalyze = (uploadedData?: { url?: string }) => {
    setCurrentStep('processing');
    
    // Simulate website analysis based on URL
    if (uploadedData?.url) {
      // Mock analysis based on URL content
      const mockWebsiteData = analyzeWebsiteFromURL(uploadedData.url);
      setWebsiteData(mockWebsiteData);
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      setCurrentStep('setup');
    }, 5000);
  };

  // Mock function to simulate website analysis
  const analyzeWebsiteFromURL = (url: string): WebsiteData => {
    // Simple URL-based analysis (in real app, this would be actual web scraping)
    if (url.toLowerCase().includes('puma')) {
      return {
        url,
        title: "Men's Slim Fit Polo T-shirt from PUMA in Mustard Seed color",
        image: "/lovable-uploads/d602eb6b-20c5-44da-8a72-e581dced1cd6.png",
        price: "₹895",
        brand: "PUMA",
        description: "Step up your game with this Ess Men's Polo T-shirt from PUMA that offers both style and function for sporting events or casual outings.",
        details: "Ribbed collar, front button placket, slim fit, and PUMA Cat logo at chest. Made of 52% cotton, 48% polyester."
      };
    } else if (url.toLowerCase().includes('nike')) {
      return {
        url,
        title: "Nike Air Max Running Shoes - Premium Athletic Footwear",
        image: "/lovable-uploads/d602eb6b-20c5-44da-8a72-e581dced1cd6.png",
        price: "$120",
        brand: "NIKE",
        description: "Experience unparalleled comfort and style with Nike Air Max technology for your daily runs and workouts.",
        details: "Air Max cushioning, breathable mesh upper, durable rubber outsole with iconic Nike swoosh branding."
      };
    } else if (url.toLowerCase().includes('reebok')) {
      return {
        url,
        title: "Reebok CrossFit Training Shoes - Ultimate Workout Gear",
        image: "/lovable-uploads/d602eb6b-20c5-44da-8a72-e581dced1cd6.png",
        price: "$95",
        brand: "REEBOK",
        description: "Built for intense CrossFit workouts with superior stability and durability for all training movements.",
        details: "Flexible sole, reinforced heel, breathable materials designed specifically for CrossFit and functional fitness."
      };
    } else {
      return {
        url,
        title: "Premium Product - Quality You Can Trust",
        image: "/lovable-uploads/d602eb6b-20c5-44da-8a72-e581dced1cd6.png",
        price: "$99",
        brand: "Premium Brand",
        description: "High-quality product designed to meet your needs with excellent craftsmanship and attention to detail.",
        details: "Durable construction, modern design, backed by warranty and customer satisfaction guarantee."
      };
    }
  };

  const handleGenerateAds = () => {
    console.log('Generate Proposal clicked');
    setCurrentStep('preview');
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
  };

  console.log('Current step:', currentStep);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {currentStep === 'upload' && (
        <HeroSection />
      )}
      
      {currentStep === 'processing' && <AIProcessingDashboard />}
      
      {currentStep === 'setup' && (
        <CampaignSetup onBack={handleBackToUpload} onGenerate={handleGenerateAds} />
      )}
      
      {currentStep === 'preview' && <AdPreviewGenerator />}
    </div>
  );
};

export default Index;