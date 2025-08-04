import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ProductInsights } from "@/components/ProductInsights";
import { useNavigate, useLocation } from "react-router-dom";

interface WebsiteData {
  url: string;
  title: string;
  image: string;
  price: string;
  brand: string;
  description: string;
  details: string;
}

const ProductAnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis based on the input data
    const simulateAnalysis = () => {
      const inputData = location.state;
      const url = inputData?.websiteUrl || "https://example.com";
      
      // Mock analysis based on URL content
      const mockWebsiteData = analyzeWebsiteFromURL(url);
      setWebsiteData(mockWebsiteData);
      
      // Simulate processing time
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    simulateAnalysis();
  }, [location.state]);

  // Mock function to simulate website analysis
  const analyzeWebsiteFromURL = (url: string): WebsiteData => {
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

  const handleContinue = () => {
    // Navigate to campaign setup page
    navigate('/campaign-setup');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Content</h2>
            <p className="text-gray-600">AI is processing your inputs to generate insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProductInsights onContinue={handleContinue} websiteData={websiteData} />
    </div>
  );
};

export default ProductAnalysisPage; 