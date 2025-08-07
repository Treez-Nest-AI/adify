

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Play,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Brain,
  Rocket,
  Shield,
  Lightbulb,
  Camera,
  Link,
  AlertCircle,
  Upload,
  Type,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

type InputTab = 'website' | 'images';

interface ApiResponse {
  product_title: string;
  price_range: string;
  brand_analysis: string;
  product_analysis: string;
  target_audience: string[];
  key_selling_points: string[];
  product_description: string;
}

export const HeroSection = () => {
  const navigate = useNavigate();
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Analysis form states
  const [activeTab, setActiveTab] = useState<InputTab>('website');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInsights, setShowInsights] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [websiteData, setWebsiteData] = useState<any>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // URL validation function
  const isValidUrl = (url: string): boolean => {
    try {
      const urlPattern = /^https?:\/\/.+\..+/;
      return urlPattern.test(url) && url.length > 0;
    } catch {
      return false;
    }
  };

  // API call function
  const sendUrlToAPI = async (url: string) => {
    try {
      const response = await fetch(
        'https://shashankdoom.app.n8n.cloud/webhook-test/start-campaign-setup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to reach the server');
      }
      throw error;
    }
  };

  // Handle analyze function
  // const handleAnalyze = async () => {
  //   const fakeData = {
  //     product_description: 'This is a dummy product description for development.',
  //     price: '$49',
  //     product_analysis: 'This product is innovative and useful.',
  //     product_title: 'Dummy Product',
  //     price_range: '$40 - $60',
  //     brand_analysis: 'Dummy Brand is well-known for quality products.',
  //     target_audience: ['Tech enthusiasts', 'Early adopters'],
  //     key_selling_points: ['Affordable', 'High quality', 'Great design'],
  //   };

  //   // Clear previous messages
  //   setError('');
  //   setSuccess('');

  //   // Validation
  //   if (!websiteUrl.trim()) {
  //     setError('Please enter a website URL');
  //     return;
  //   }

  //   if (!isValidUrl(websiteUrl)) {
  //     setError('Please enter a valid URL (must start with http:// or https://)');
  //     return;
  //   }

  //   setIsAnalyzing(true);

  //   try {
  //     setSuccess('Analysis complete! Generating insights...');
      
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 2000));
      
  //     setApiResponse(fakeData);
  //     setWebsiteData({
  //       url: websiteUrl || 'https://example.com',
  //       title: extractDomainName(websiteUrl || 'https://example.com'),
  //       description: fakeData.product_description,
  //       brand: extractBrandFromUrl(websiteUrl || 'https://example.com'),
  //       price: fakeData.price,
  //       details: fakeData.product_analysis,
  //       image: '/api/placeholder/400/300',
  //     });

  //     setTimeout(() => {
  //       setShowInsights(true);
  //       // Navigate to campaign setup or show insights
  //       navigate('/campaign-setup');
  //     }, 1500);

  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'Failed to analyze website');
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };




  const handleAnalyze = async () => {
    const fakeData = {
      product_description: 'This is a dummy product description for development.',
      price: '$49',
      product_analysis: 'This product is innovative and useful.',
      product_title: 'Dummy Product',
      price_range: '$40 - $60',
      brand_analysis: 'Dummy Brand is well-known for quality products.',
      target_audience: ['Tech enthusiasts', 'Early adopters'], // ✅ fix here
      key_selling_points: ['Affordable', 'High quality', 'Great design'],
    };
  
    setApiResponse(fakeData);
  
    setWebsiteData({
      url: websiteUrl || 'https://example.com',
      title: extractDomainName(websiteUrl || 'https://example.com'),
      description: fakeData.product_description,
      brand: extractBrandFromUrl(websiteUrl || 'https://example.com'),
      price: fakeData.price,
      details: fakeData.product_analysis,
      image: '/api/placeholder/400/300',
    });
  
    setShowInsights(true);
  };
  

  // Helper function to extract domain name
  const extractDomainName = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Website Product';
    }
  };

  // Helper function to extract brand from URL
  const extractBrandFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      const brandName = domain.replace('www.', '').split('.')[0];
      return brandName.charAt(0).toUpperCase() + brandName.slice(1);
    } catch {
      return 'Brand';
    }
  };

  const performanceMetrics = [
    { value: "3x", label: "ROI Increase", icon: TrendingUp, color: "text-emerald-400" },
    { value: "50%", label: "Cost Reduction", icon: BarChart3, color: "text-blue-400" },
    { value: "24/7", label: "AI Monitoring", icon: Brain, color: "text-purple-400" },
    { value: "18000+", label: "Active Users", icon: Users, color: "text-orange-400" }
  ];

  const workflowSteps = [
    {
      title: "Upload Content",
      description: "Website, images, or descriptions",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      delay: "0s"
    },
    {
      title: "AI Analysis",
      description: "Deep business intelligence",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      delay: "0.2s"
    },
    {
      title: "Generate Ads",
      description: (
                <div>
                  <div>High-converting</div>
                  <div>creatives</div>
                </div>
              ),
      icon: Target,
      color: "from-green-500 to-emerald-500",
      delay: "0.4s"
    },
    {
      title: "Launch & Optimize",
      description: "24/7 performance monitoring",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      delay: "0.6s"
    }
  ];

  const features = [
    {
      title: "Multi-Platform Support",
      description: "Meta, Google, WhatsApp and more",
      icon: Smartphone,
      color: "text-blue-400"
    },
    {
      title: "AI-Powered Optimization",
      description: "Real-time campaign adjustments",
      icon: Brain,
      color: "text-purple-400"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights & performance tracking",
      icon: BarChart3,
      color: "text-green-400"
    },
    {
      title: "24/7 Support",
      description: "Expert assistance anytime",
      icon: MessageSquare,
      color: "text-orange-400"
    }
  ];

  const testimonials = [
    {
      quote: "TEadifyz.AI revolutionized our ad campaigns. We saw a 300% increase in ROAS within the first month.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      avatar: "SJ"
    },
    {
      quote: "The AI optimization is incredible. Our costs dropped by 45% while maintaining the same performance.",
      author: "Mike Chen",
      role: "CEO, StartupXYZ",
      avatar: "MC"
    },
    {
      quote: "Setup was incredibly easy. From upload to live campaign in under 5 minutes. Game changer!",
      author: "Emma Rodriguez",
      role: "Founder, EcomStore",
      avatar: "ER"
    }
  ];

  const tabs = [
    { id: 'website' as InputTab, label: 'Website', icon: Globe, color: 'purple' },
    { id: 'images' as InputTab, label: 'Images', icon: Camera, color: 'blue' },
  ];

  // Animated background particles
  const particles = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: (i + 1) * 10,
    delay: i * 2,
    duration: 15 + Math.random() * 5
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 20}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        
        {/* Animated Background Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="particle absolute rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                left: `${particle.left}%`,
                background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4))',
              }}
              animate={{
                y: ['100vh', '-100vh'],
                rotate: [0, 360]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Main content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse-glow" />
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-purple-400/30 backdrop-blur-sm">
                AI-Powered Marketing Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="brand-font">
                TEadifyz AI
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload websites, images, docs, or descriptions. Our AI analyzes your business and generates 
              high-converting ads across all platforms with intelligent targeting, creatives, and performance forecasting.
            </p>
            
            {/* Website/Images Analysis Section - Replacing the buttons */}
            <div className="max-w-4xl mx-auto mb-12">
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center justify-center gap-3 mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                    MULTI-MODAL AI INPUT
                  </span>
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Feed Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Marketing Brain</span>
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  The more you share, the smarter your ads become. Upload any combination of content and watch AI create your perfect Meta Ads strategy.
                </motion.p>
              </motion.div>

              {/* Tabs */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-2 shadow-2xl border border-white/20">
                  <div className="flex space-x-2">
                    {tabs.map((tab, index) => {
                      const Icon = tab.icon;
                      return (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 font-medium ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{tab.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Error/Success Messages */}
              <AnimatePresence>
                {(error || success) && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl mx-auto mb-8"
                  >
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${
                      error 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                        : 'bg-green-500/10 border border-green-500/20 text-green-400'
                    }`}>
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{error || success}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl p-10 shadow-2xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all duration-500">
                  <AnimatePresence mode="wait">
                    {activeTab === 'website' && (
                      <motion.div
                        key="website"
                        className="text-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-center mb-8">
                          <motion.div
                            className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Link className="w-12 h-12 text-purple-400" />
                          </motion.div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Website Analysis</h3>
                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                          Enter your website URL and let AI extract insights about your business, products, and audience.
                        </p>
                        <div className="max-w-lg mx-auto">
                          <Label htmlFor="website-url" className="text-left block mb-3 font-semibold text-gray-200">
                            Website URL *
                          </Label>
                          <div className="relative">
                            <Input
                              id="website-url"
                              type="url"
                              placeholder="https://your-website.com"
                              value={websiteUrl}
                              onChange={(e) => {
                                setWebsiteUrl(e.target.value);
                                setError(''); // Clear error when user types
                              }}
                              className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl text-lg text-white placeholder-gray-400 focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                                error && !websiteUrl
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                  : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                              }`}
                              disabled={isAnalyzing}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </div>
                          <p className="text-xs text-gray-400 mt-2 text-left">
                            * Required field - Must be a valid URL starting with http:// or https://
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'images' && (
                      <motion.div
                        key="images"
                        className="text-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-center mb-8">
                          <motion.div
                            className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Camera className="w-12 h-12 text-blue-400" />
                          </motion.div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Image Upload</h3>
                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                          Upload product images, logos, or marketing materials for AI analysis.
                        </p>

                        <div className="max-w-xl mx-auto space-y-6">
                          <div>
                            <Label htmlFor="image-title" className="block mb-2 text-gray-200 font-semibold text-left">
                              Image Title
                            </Label>
                            <Input
                              id="image-title"
                              placeholder="Enter a title for the image"
                              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="product-price" className="block mb-2 text-gray-200 font-semibold text-left">
                              Product Price
                            </Label>
                            <Input
                              id="product-price"
                              placeholder="Enter a Product Price $10"
                              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                            />
                          </div>

                          <div>
                            <Label htmlFor="image-description" className="block mb-2 text-gray-200 font-semibold text-left">
                              Image Description
                            </Label>
                            <textarea
                              id="image-description"
                              rows={4}
                              placeholder="Enter a short description for the image"
                              className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl resize-none text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
                            />
                          </div>

                          <motion.div
                            className="border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer group hover:border-purple-500 transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
                              </motion.div>
                              <p className="text-gray-300 mb-4 text-lg">Drag and drop images here, or click to browse</p>
                              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all">
                                Choose Files
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>

              {/* Action Button */}
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-5 rounded-xl font-bold transition-all duration-300 shadow-xl min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span>Analyzing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        <span>Analyze & Generate Ads</span>
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {performanceMetrics.map((metric, index) => (
                <Card 
                  key={index} 
                  className={`p-6 glass-effect border-white/10 text-center bg-white/10 transition-all duration-300 transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-white/70 text-sm">{metric.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered platform streamlines your entire advertising workflow in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  className={`p-8 text-center glass-effect border-white/10 bg-white/5 transition-all duration-500 transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: step.delay }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </Card>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-white/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="brand-font">TEadifyz.AI</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of digital advertising with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 text-center glass-effect border-white/10 bg-white/5 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join thousands of businesses that have transformed their advertising with our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 text-center glass-effect border-white/10 bg-white/5 transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-section bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
            Ready to Transform Your Advertising?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up stagger-1">
            Join thousands of businesses that have already revolutionized their digital marketing with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 btn-ripple group font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105" 
              onClick={() => navigate('/product-insights')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-white/25"
              onClick={() => navigate('/product-insights')}
            >
              <Shield className="mr-2 w-5 h-5" />
              Schedule Demo
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-white/70 animate-slide-up stagger-2">
            <CheckCircle className="w-5 h-5" />
            <span>No credit card required • 14-day free trial</span>
          </div>
        </div>
      </section>

    </div>
  );
};