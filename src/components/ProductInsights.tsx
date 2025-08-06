import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Package, 
  DollarSign, 
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Zap
} from "lucide-react";

interface ApiResponse {
  price_range: string;
  brand_analysis: string;
  product_analysis: string;
  target_audience: string[];
  key_selling_points: string[];
  product_description: string;
}

interface ProductInsightsProps {
  onContinue: () => void;
  websiteData?: {
    url: string;
    title: string;
    image: string;
    price: string;
    brand: string;
    description: string;
    details: string;
  };
  apiResponse?: ApiResponse;
}

export const ProductInsights = ({ onContinue, websiteData, apiResponse }: ProductInsightsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);

  const productData = websiteData || {
    title: 'Product Analysis',
    price: 'Price not specified',
    description: 'Product analyzed from website',
    brand: 'Brand',
    details: 'Product details from analysis',
    image: '/api/placeholder/400/300'
  };

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const insights = [
    {
      category: "Target Audience",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      items: apiResponse?.target_audience || ["Young professionals", "Tech-savvy consumers", "Quality-conscious buyers"]
    },
    {
      category: "Key Selling Points",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      items: apiResponse?.key_selling_points || ["Premium quality", "Innovative design", "Competitive pricing"]
    },
    {
      category: "Market Analysis",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      items: ["High market demand", "Growing industry", "Strong competition"]
    },
    {
      category: "Brand Positioning",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      items: [apiResponse?.brand_analysis || "Premium brand positioning", "Quality-focused", "Customer-centric"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Brain className="w-8 h-8 text-blue-400" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">
                {isGenerating ? 'AI Analysis In Progress' : 'AI Analysis Complete'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Product
              <span className="block">Insights</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-powered analysis of your product reveals key insights for your marketing strategy
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Showcase */}
            <div className={`transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <Card className="p-8 bg-white border border-gray-200 shadow-2xl flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6 w-full">
                  <Package className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-900">Product Analysis</h3>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="relative group w-full max-w-xl mx-auto mb-6">
                    <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
                      {productData.image ? (
                        <img 
                          src={productData.image} 
                          alt="Product Screenshot"
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className="text-gray-400 text-center p-8">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Product Image</p>
                        <p className="text-sm text-gray-500">Will be displayed here</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500/90 border-green-400 text-white shadow">AI Analyzed</Badge>
                    </div>
                  </div>
                  <div className="w-full max-w-xl mx-auto space-y-4">
                    {/* Product Title */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600">Product Title</Badge>
                      <h4 className="text-xl font-bold text-gray-900">{productData.title}</h4>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      <div>
                        <Badge variant="outline" className="mb-1 border-green-400 text-green-600">Price Range</Badge>
                        <div className="text-lg font-bold text-green-600">
                          {apiResponse?.price_range || productData.price}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Description from API */}
                    {apiResponse?.product_description && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <Badge variant="outline" className="mb-2 border-purple-400 text-purple-600">Product Analysis</Badge>
                        <p className="text-sm text-gray-700 leading-relaxed">{apiResponse.product_description}</p>
                      </div>
                    )}
                    
                    {/* Fallback to original details if no API description */}
                    {!apiResponse?.product_description && productData.details && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600">Product Details</Badge>
                        <p className="text-sm text-gray-700 leading-relaxed">{productData.details}</p>
                      </div>
                    )}
                    
                    {/* Original description if available */}
                    {productData.description && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <Badge variant="outline" className="mb-2 border-purple-400 text-purple-600">Marketing Description</Badge>
                        <p className="text-sm text-gray-700 leading-relaxed">{productData.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* AI Insights */}
            <div className={`transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <Card 
                    key={index} 
                    className={`p-6 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                      activeInsight === index ? 'bg-white/20' : 'bg-white/10'
                    }`}
                    onClick={() => setActiveInsight(index)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                        <insight.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-lg">{insight.category}</h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {insight.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-start gap-3 text-gray-300 leading-relaxed"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              onClick={onContinue}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Continue to Campaign Setup
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 