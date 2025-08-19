

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Navigation } from "./Navigation";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useLocation } from "wouter";
// import axios from "axios";
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Target, 
//   TrendingUp, 
//   Zap, 
//   BarChart3, 
//   Users, 
//   MessageSquare, 
//   Globe,
//   Smartphone,
//   Brain,
//   Camera,
//   Link,
//   Upload,
//   Star,
//   Loader2
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type InputTab = 'website' | 'images';

// export const HeroSection = () => {
//   const navigate = useNavigate()
//   const [, setLocation] = useLocation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
  
//   // Form states for preview
//   const [activeTab, setActiveTab] = useState<InputTab>('website');
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [description, setDescription] = useState('');
  
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Handle analyze button - call API and redirect
//   const handleAnalyze = async () => {
//     if (activeTab === 'website' && !websiteUrl.trim()) {
//       alert('Please enter a website URL');
//       return;
//     }

//     setIsAnalyzing(true);
    
//     try {
//       // Prepare the request data
//       const requestData = {
//         url: activeTab === 'website' ? websiteUrl.trim() : '',
        
//       };

//       // Call the API
//       const response = await axios.post(
//         'https://digi-ai.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/projectbrief',
//         requestData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 60000 // 60 second timeout
//         }
//       );

//       // Store the API response data
//       if (response.data && response.data.length > 0) {
//         const analysisData = response.data[0]?.message?.content;
//         if (analysisData) {
//           // Store the analysis data for the product insights page
//           const storageData = {
//             analysisData,
//             originalUrl: websiteUrl,
//             originalDescription: description,
//             activeTab,
//             timestamp: new Date().toISOString()
//           };
          
//           // Store data in sessionStorage (avoiding localStorage as per instructions)
//           sessionStorage.setItem('productAnalysis', JSON.stringify(storageData));
          
//           // Navigate to product insights page
//           navigate('/product-insights');
//         } else {
//           throw new Error('Invalid response format from API');
//         }
//       } else {
//         throw new Error('No analysis data received from API');
//       }
//     } catch (error) {
//       console.error('API call failed:', error);
      
//       // Show user-friendly error message
//       let errorMessage = 'Analysis failed. Please try again.';
//       if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timed out. Please try again.';
//       } else if (error.response?.status === 400) {
//         errorMessage = 'Invalid website URL. Please check and try again.';
//       } else if (error.response?.status >= 500) {
//         errorMessage = 'Server error. Please try again later.';
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const performanceMetrics = [
//     { value: "3x", label: "ROI Increase", icon: TrendingUp, color: "text-emerald-500" },
//     { value: "50%", label: "Cost Reduction", icon: BarChart3, color: "text-blue-500" },
//     { value: "24/7", label: "AI Monitoring", icon: Brain, color: "text-purple-500" },
//     { value: "18000+", label: "Active Users", icon: Users, color: "text-orange-500" }
//   ];

//   const workflowSteps = [
//     {
//       title: "Upload Content",
//       description: "Website, images, or descriptions",
//       icon: Globe,
//       color: "from-blue-500 to-cyan-500",
//       delay: "0s"
//     },
//     {
//       title: "AI Analysis",
//       description: "Deep business intelligence",
//       icon: Brain,
//       color: "from-purple-500 to-pink-500",
//       delay: "0.2s"
//     },
//     {
//       title: "Generate Ads",
//       description: "High-converting creatives",
//       icon: Target,
//       color: "from-green-500 to-emerald-500",
//       delay: "0.4s"
//     },
//     {
//       title: "Launch & Optimize",
//       description: "24/7 performance monitoring",
//       icon: TrendingUp,
//       color: "from-orange-500 to-red-500",
//       delay: "0.6s"
//     }
//   ];

//   const features = [
//     {
//       title: "Multi-Platform Support",
//       description: "Meta, Google, WhatsApp and more",
//       icon: Smartphone,
//       color: "text-blue-500"
//     },
//     {
//       title: "AI-Powered Optimization",
//       description: "Real-time campaign adjustments",
//       icon: Brain,
//       color: "text-purple-500"
//     },
//     {
//       title: "Advanced Analytics",
//       description: "Deep insights & performance tracking",
//       icon: BarChart3,
//       color: "text-green-500"
//     },
//     {
//       title: "24/7 Support",
//       description: "Expert assistance anytime",
//       icon: MessageSquare,
//       color: "text-orange-500"
//     }
//   ];

//   const testimonials = [
//     {
//       quote: "TEadifyz.AI revolutionized our ad campaigns. We saw a 300% increase in ROAS within the first month.",
//       author: "Sarah Johnson",
//       role: "Marketing Director, TechCorp",
//       avatar: "SJ"
//     },
//     {
//       quote: "The AI optimization is incredible. Our costs dropped by 45% while maintaining the same performance.",
//       author: "Mike Chen",
//       role: "CEO, StartupXYZ",
//       avatar: "MC"
//     },
//     {
//       quote: "Setup was incredibly easy. From upload to live campaign in under 5 minutes. Game changer!",
//       author: "Emma Rodriguez",
//       role: "Founder, EcomStore",
//       avatar: "ER"
//     }
//   ];

//   const tabs = [
//     { id: 'website' as InputTab, label: 'Website', icon: Globe, color: 'purple' },
//     { id: 'images' as InputTab, label: 'Images', icon: Camera, color: 'blue' },
//   ];

//   return (
//     <div className="relative min-h-screen bg-white overflow-hidden">
//       <Navigation />
      
//       {/* Animated background particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-2 h-2 bg-purple-200 rounded-full animate-float opacity-60"></div>
//         <div className="absolute top-40 right-20 w-3 h-3 bg-blue-200 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-200 rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
//         <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-orange-200 rounded-full animate-float opacity-30" style={{animationDelay: '6s'}}></div>
//         <div className="absolute bottom-60 left-1/2 w-3 h-3 bg-purple-200 rounded-full animate-float opacity-40" style={{animationDelay: '8s'}}></div>
//       </div>

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center pt-20">
//         {/* Main content */}
//         <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
//           <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//             <div className="flex items-center justify-center gap-2 mb-6">
//               <Sparkles className="w-6 h-6 text-purple-400 animate-pulse-glow" />
//               <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
//                 AI-Powered Campaign Creation
//               </Badge>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight" data-testid="hero-title">
//               Transform Your
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//                 {' '}Business{' '}
//               </span>
//               with AI Ads
//             </h1>
            
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
//               Create high-converting ad campaigns in minutes. Our AI analyzes your business, generates compelling creatives, and optimizes performance across all platforms.
//             </p>
            
//             {/* Performance Metrics */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
//               {performanceMetrics.map((metric, index) => (
//                 <Card 
//                   key={index} 
//                   className="p-6 bg-white border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                   data-testid={`metric-${index}`}
//                 >
//                   <div className="flex items-center justify-center mb-3">
//                     <div className={`w-12 h-12 ${
//                       metric.color === 'text-emerald-500' ? 'bg-emerald-50' :
//                       metric.color === 'text-blue-500' ? 'bg-blue-50' :
//                       metric.color === 'text-purple-500' ? 'bg-purple-50' :
//                       'bg-orange-50'
//                     } rounded-lg flex items-center justify-center`}>
//                       <metric.icon className={`w-6 h-6 ${metric.color}`} />
//                     </div>
//                   </div>
//                   <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
//                   <div className="text-sm text-gray-600">{metric.label}</div>
//                 </Card>
//               ))}
//             </div>

//             {/* Quick Start Form */}
//             <div className="max-w-4xl mx-auto mb-16">
//               <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg" data-testid="analysis-form">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Campaign Analysis</h2>
//                   <p className="text-gray-600">Upload your content and let our AI create optimized campaigns for you</p>
//                 </div>

//                 {/* Tab Selection */}
//                 <div className=" flex flex-row justify-center mb-8">
//                   <div className="bg-gray-50 p-1 rounded-lg border border-gray-200">
//                     {tabs.map((tab) => {
//                       const Icon = tab.icon;
//                       return (
//                         <button
//                           key={tab.id}
//                           onClick={() => setActiveTab(tab.id)}
//                           className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
//                             activeTab === tab.id
//                               ? 'bg-white text-purple-600 shadow-sm border border-gray-200'
//                               : 'text-gray-600 hover:text-gray-900'
//                           }`}
//                           data-testid={`tab-${tab.id}`}
//                           disabled={isAnalyzing}
//                         >
//                           <Icon className="w-4 h-4" />
//                           <span>{tab.label}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="space-y-6">
//                   <AnimatePresence mode="wait">
//                     {activeTab === 'website' && (
//                       <motion.div
//                         key="website"
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 50 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         <div>
//                           <Label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
//                             Website URL *
//                           </Label>
//                           <div className="relative">
//                             <Input
//                               id="website-url"
//                               type="url"
//                               placeholder="https://example.com"
//                               value={websiteUrl}
//                               onChange={(e) => setWebsiteUrl(e.target.value)}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 pr-10"
//                               data-testid="input-website-url"
//                               disabled={isAnalyzing}
//                               required
//                             />
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                               <Link className="w-5 h-5 text-gray-400" />
//                             </div>
//                           </div>
//                         </div>

//                         <div>
//                           <Label htmlFor="website-description" className="block text-sm font-medium text-gray-700 mb-2">
//                             Additional Description (Optional)
//                           </Label>
//                           <textarea
//                             id="website-description"
//                             rows={3}
//                             placeholder="Any additional information about your website or product..."
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//                             disabled={isAnalyzing}
//                           />
//                         </div>
//                       </motion.div>
//                     )}

//                     {activeTab === 'images' && (
//                       <motion.div
//                         key="images"
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 50 }}
//                         transition={{ duration: 0.5 }}
//                         className="space-y-6"
//                       >
//                         <div>
//                           <Label htmlFor="image-title" className="block text-sm font-medium text-gray-700 mb-2">
//                             Image Title
//                           </Label>
//                           <Input
//                             id="image-title"
//                             placeholder="Enter a title for the image"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             data-testid="input-image-title"
//                             disabled={isAnalyzing}
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
//                             Product Price
//                           </Label>
//                           <Input
//                             id="product-price"
//                             placeholder="Enter a Product Price $10"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             data-testid="input-product-price"
//                             disabled={isAnalyzing}
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="image-description" className="block text-sm font-medium text-gray-700 mb-2">
//                             Image Description
//                           </Label>
//                           <textarea
//                             id="image-description"
//                             rows={4}
//                             placeholder="Enter a short description for the image"
//                             className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             data-testid="textarea-image-description"
//                             disabled={isAnalyzing}
//                           />
//                         </div>

//                         <motion.div
//                           className="border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer group hover:border-purple-500 transition-colors duration-300"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           data-testid="upload-area"
//                         >
//                           <div className="text-center">
//                             <motion.div
//                               animate={{ y: [0, -5, 0] }}
//                               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                             >
//                               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
//                             </motion.div>
//                             <p className="text-gray-600 mb-4 text-lg">Drag and drop images here, or click to browse</p>
//                             <Button 
//                               className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all" 
//                               data-testid="button-choose-files"
//                               disabled={isAnalyzing}
//                             >
//                               Choose Files
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   <button
//                     onClick={handleAnalyze}
//                     disabled={isAnalyzing || (activeTab === 'website' && !websiteUrl.trim())}
//                     className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                     data-testid="button-analyze"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         <span>Analyzing...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles className="w-5 h-5" />
//                         <span>Analyze with AI</span>
//                         <ArrowRight className="w-5 h-5" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               From upload to launch in just a few minutes
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {workflowSteps.map((step, index) => (
//               <div key={index} className="relative">
//                 <Card 
//                   className="p-8 text-center bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 transform hover:scale-105"
//                   data-testid={`workflow-step-${index}`}
//                 >
//                   <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
//                     <step.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
//                   <p className="text-gray-600">{step.description}</p>
//                 </Card>
//                 {index < workflowSteps.length - 1 && (
//                   <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Everything you need to create and manage successful campaigns
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <Card key={index} className="p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all" data-testid={`feature-${index}`}>
//                 <div className={`w-12 h-12 ${
//                   feature.color === 'text-blue-500' ? 'bg-blue-50' :
//                   feature.color === 'text-purple-500' ? 'bg-purple-50' :
//                   feature.color === 'text-green-500' ? 'bg-green-50' :
//                   'bg-orange-50'
//                 } rounded-lg flex items-center justify-center mb-6`}>
//                   <feature.icon className={`w-6 h-6 ${feature.color}`} />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Join thousands of businesses already succeeding with TEadifyz.AI
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <Card key={index} className="p-8 bg-white border border-gray-200 shadow-sm" data-testid={`testimonial-${index}`}>
//                 <div className="flex items-center mb-4">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="w-5 h-5 fill-current" />
//                     ))}
//                   </div>
//                 </div>
//                 <blockquote className="text-gray-700 mb-6 italic">
//                   "{testimonial.quote}"
//                 </blockquote>
//                 <div className="flex items-center">
//                   <div className={`w-12 h-12 ${
//                     index === 0 ? 'bg-purple-100' : 
//                     index === 1 ? 'bg-blue-100' : 
//                     'bg-green-100'
//                   } rounded-full flex items-center justify-center mr-4`}>
//                     <span className={`${
//                       index === 0 ? 'text-purple-600' : 
//                       index === 1 ? 'text-blue-600' : 
//                       'text-green-600'
//                     } font-semibold`}>
//                       {testimonial.avatar}
//                     </span>
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">{testimonial.author}</div>
//                     <div className="text-gray-600 text-sm">{testimonial.role}</div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white" data-testid="cta-section">
//               <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Ads?</h2>
//               <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
//                 Join thousands of businesses already using AI to create better campaigns
//               </p>
//               <Button 
//                 onClick={() => setLocation('/product-insights')}
//                 className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105 inline-flex items-center space-x-2"
//                 data-testid="button-start-trial"
//               >
//                 <span>Start Free Trial</span>
//                 <ArrowRight className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-50 border-t border-gray-200 py-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//                   <Zap className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-gray-900">TEadifyz.AI</span>
//               </div>
//               <p className="text-gray-600 mb-4">AI-powered campaign creation for modern businesses.</p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">API</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Integrations</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Documentation</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Status</a></li>
//                 <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
//             <p>&copy; 2024 TEadifyz.AI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };












import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import axios from "axios";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Globe,
  Smartphone,
  Brain,
  Camera,
  Link,
  Upload,
  Star,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type InputTab = 'website' | 'images';

export const HeroSection = () => {
  const navigate = useNavigate()
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Form states for preview
  const [activeTab, setActiveTab] = useState<InputTab>('website');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Updated URL validation function - more robust
const isValidUrl = (url: string) => {
  if (!url || url.trim() === '') return false;
  
  try {
    // Add protocol if missing
    const urlToTest = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
    
    // Create URL object to validate
    const urlObj = new URL(urlToTest);
    
    // Check if it has a valid domain structure
    const domainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Validate hostname
    if (!urlObj.hostname || !domainPattern.test(urlObj.hostname)) {
      return false;
    }
    
    // Check for minimum domain structure (at least one dot for TLD)
    if (!urlObj.hostname.includes('.')) {
      return false;
    }
    
    // Protocol should be http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

// Updated handleUrlChange function with better validation
const handleUrlChange = (e) => {
  const value = e.target.value;
  setWebsiteUrl(value);
  
  // Clear error if input is empty
  if (!value.trim()) {
    setUrlError('');
    return;
  }
  
  // Validate URL
  if (!isValidUrl(value.trim())) {
    setUrlError('Please enter a valid website URL (e.g., example.com or https://example.com)');
  } else {
    setUrlError('');
  }
};

// Updated handleAnalyze function with stricter validation
const handleAnalyze = async () => {
  if (activeTab === 'website') {
    const trimmedUrl = websiteUrl.trim();
    
    // Check if URL is empty
    if (!trimmedUrl) {
      setUrlError('Please enter a website URL');
      return;
    }
    
    // Validate URL format
    if (!isValidUrl(trimmedUrl)) {
      setUrlError('Please enter a valid website URL (e.g., example.com or https://example.com)');
      return;
    }
    
    // Additional check for minimum length and structure
    if (trimmedUrl.length < 4 || !trimmedUrl.includes('.')) {
      setUrlError('Please enter a valid website URL with a domain name');
      return;
    }
  }

  // Prepare the request data
  const requestData = {
    url: activeTab === 'website' ? websiteUrl.trim() : '',
  };

  // Store request data immediately and navigate
  const storageData = {
    originalUrl: websiteUrl,
    activeTab,
    timestamp: new Date().toISOString(),
    requestData
  };
  
  sessionStorage.setItem('productAnalysis', JSON.stringify(storageData));
  
  // Navigate immediately to product insights page
  navigate('/product-insights');
};

// Alternative even more strict validation function if needed
const isValidUrlStrict = (url: string) => {
  if (!url || url.trim() === '') return false;
  
  // More comprehensive regex for URL validation
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})(\/.*)?$/i;
  
  // Test the basic pattern first
  if (!urlPattern.test(url.trim())) {
    return false;
  }
  
  try {
    const urlToTest = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
    
    const urlObj = new URL(urlToTest);
    
    // Must have a hostname
    if (!urlObj.hostname) return false;
    
    // Must have at least one dot (for TLD)
    if (!urlObj.hostname.includes('.')) return false;
    
    // Hostname should not start or end with dot or dash
    if (urlObj.hostname.startsWith('.') || urlObj.hostname.endsWith('.') ||
        urlObj.hostname.startsWith('-') || urlObj.hostname.endsWith('-')) {
      return false;
    }
    
    // Check for valid TLD (at least 2 characters)
    const parts = urlObj.hostname.split('.');
    const tld = parts[parts.length - 1];
    if (!tld || tld.length < 2) return false;
    
    return true;
  } catch {
    return false;
  }
};

  // Handle analyze button - call API and redirect immediately
  // const handleAnalyze = async () => {
  //   if (activeTab === 'website') {
  //     if (!websiteUrl.trim()) {
  //       setUrlError('Please enter a website URL');
  //       return;
  //     }
      
  //     if (!isValidUrl(websiteUrl.trim())) {
  //       setUrlError('Please enter a valid URL');
  //       return;
  //     }
  //   }

  //   // Prepare the request data
  //   const requestData = {
  //     url: activeTab === 'website' ? websiteUrl.trim() : '',
  //   };

  //   // Store request data immediately and navigate
  //   const storageData = {
  //     originalUrl: websiteUrl,
  //     activeTab,
  //     timestamp: new Date().toISOString(),
  //     requestData
  //   };
    
  //   sessionStorage.setItem('productAnalysis', JSON.stringify(storageData));
    
  //   // Navigate immediately to product insights page
  //   navigate('/product-insights');
  // };

  const performanceMetrics = [
    { value: "3x", label: "ROI Increase", icon: TrendingUp, color: "text-emerald-500" },
    { value: "50%", label: "Cost Reduction", icon: BarChart3, color: "text-blue-500" },
    { value: "24/7", label: "AI Monitoring", icon: Brain, color: "text-purple-500" },
    { value: "18000+", label: "Active Users", icon: Users, color: "text-orange-500" }
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
      description: "High-converting creatives",
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
      color: "text-blue-500"
    },
    {
      title: "AI-Powered Optimization",
      description: "Real-time campaign adjustments",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights & performance tracking",
      icon: BarChart3,
      color: "text-green-500"
    },
    {
      title: "24/7 Support",
      description: "Expert assistance anytime",
      icon: MessageSquare,
      color: "text-orange-500"
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

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-200 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-200 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-green-200 rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-orange-200 rounded-full animate-float opacity-30" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-60 left-1/2 w-3 h-3 bg-purple-200 rounded-full animate-float opacity-40" style={{animationDelay: '8s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Main content */}
        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse-glow" />
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                AI-Powered Campaign Creation
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight" data-testid="hero-title">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {' '}Business{' '}
              </span>
              with AI Ads
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              Create high-converting ad campaigns in minutes. Our AI analyzes your business, generates compelling creatives, and optimizes performance across all platforms.
            </p>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {performanceMetrics.map((metric, index) => (
                <Card 
                  key={index} 
                  className="p-6 bg-white border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`metric-${index}`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`w-12 h-12 ${
                      metric.color === 'text-emerald-500' ? 'bg-emerald-50' :
                      metric.color === 'text-blue-500' ? 'bg-blue-50' :
                      metric.color === 'text-purple-500' ? 'bg-purple-50' :
                      'bg-orange-50'
                    } rounded-lg flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </Card>
              ))}
            </div>

            {/* Quick Start Form */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg" data-testid="analysis-form">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Campaign Analysis</h2>
                  <p className="text-gray-600">Upload your content and let our AI create optimized campaigns for you</p>
                </div>

                {/* Tab Selection - Side by Side */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
                            activeTab === tab.id
                              ? 'bg-white text-purple-600 shadow-sm border border-gray-200'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                          data-testid={`tab-${tab.id}`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'website' && (
                      <motion.div
                        key="website"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div>
                          <Label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
                            Website URL *
                          </Label>
                          <div className="relative">
                            <Input
                              id="website-url"
                              type="url"
                              placeholder="https://example.com"
                              value={websiteUrl}
                              onChange={handleUrlChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 pr-10 ${
                                urlError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500'
                              }`}
                              data-testid="input-website-url"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <Link className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                          {urlError && (
                            <p className="mt-2 text-sm text-red-600" data-testid="url-error">
                              {urlError}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'images' && (
                      <motion.div
                        key="images"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="image-title" className="block text-sm font-medium text-gray-700 mb-2">
                            Image Title
                          </Label>
                          <Input
                            id="image-title"
                            placeholder="Enter a title for the image"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            data-testid="input-image-title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Price
                          </Label>
                          <Input
                            id="product-price"
                            placeholder="Enter a Product Price $10"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            data-testid="input-product-price"
                          />
                        </div>

                        <div>
                          <Label htmlFor="image-description" className="block text-sm font-medium text-gray-700 mb-2">
                            Image Description
                          </Label>
                          <textarea
                            id="image-description"
                            rows={4}
                            placeholder="Enter a short description for the image"
                            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            data-testid="textarea-image-description"
                          />
                        </div>

                        <motion.div
                          className="border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer group hover:border-purple-500 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          data-testid="upload-area"
                        >
                          <div className="text-center">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
                            </motion.div>
                            <p className="text-gray-600 mb-4 text-lg">Drag and drop images here, or click to browse</p>
                            <Button 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all" 
                              data-testid="button-choose-files"
                            >
                              Choose Files
                            </Button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleAnalyze}
                    disabled={activeTab === 'website' && (!websiteUrl.trim() || !!urlError)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    data-testid="button-analyze"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze with AI</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From upload to launch in just a few minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  className="p-8 text-center bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 transform hover:scale-105"
                  data-testid={`workflow-step-${index}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create and manage successful campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all" data-testid={`feature-${index}`}>
                <div className={`w-12 h-12 ${
                  feature.color === 'text-blue-500' ? 'bg-blue-50' :
                  feature.color === 'text-purple-500' ? 'bg-purple-50' :
                  feature.color === 'text-green-500' ? 'bg-green-50' :
                  'bg-orange-50'
                } rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses already succeeding with TEadifyz.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white border border-gray-200 shadow-sm" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${
                    index === 0 ? 'bg-purple-100' : 
                    index === 1 ? 'bg-blue-100' : 
                    'bg-green-100'
                  } rounded-full flex items-center justify-center mr-4`}>
                    <span className={`${
                      index === 0 ? 'text-purple-600' : 
                      index === 1 ? 'text-blue-600' : 
                      'text-green-600'
                    } font-semibold`}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white" data-testid="cta-section">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Ads?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using AI to create better campaigns
              </p>
              <Button 
                onClick={() => setLocation('/product-insights')}
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105 inline-flex items-center space-x-2"
                data-testid="button-start-trial"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TEadifyz.AI</span>
              </div>
              <p className="text-gray-600 mb-4">AI-powered campaign creation for modern businesses.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 TEadifyz.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


