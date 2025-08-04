// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   Package,
//   DollarSign,
//   Star,
//   Target,
//   TrendingUp,
//   Users,
//   Palette,
//   Tag,
//   ArrowRight,
//   Brain,
//   Zap,
//   Eye,
//   BarChart3,
//   Sparkles,
//   Lightbulb,
//   Globe,
//   Award
// } from "lucide-react";
// import { useEffect, useState } from "react";

// interface ProductInsightsProps {
//   onContinue: () => void;
//   websiteData?: {
//     url: string;
//     title: string;
//     image: string;
//     price: string;
//     brand: string;
//     description: string;
//     details: string;
//   };
// }

// export const ProductInsights = ({ onContinue, websiteData }: ProductInsightsProps) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeInsight, setActiveInsight] = useState(0);

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setActiveInsight((prev) => (prev + 1) % 4);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Use websiteData if available, otherwise fallback to sample data
//   const productData = websiteData || {
//     title: "Men's Slim Fit Polo T-shirt from PUMA in Mustard Seed color",
//     price: "₹895",
//     image: "/lovable-uploads/d602eb6b-20c5-44da-8a72-e581dced1cd6.png",
//     details: "Ribbed collar, front button placket, slim fit, and PUMA Cat logo at chest. Made of 52% cotton, 48% polyester (shell) and 49% cotton, 48% polyester, 3% elastane (rib).",
//     description: "Step up your game with this Ess Men's Polo T-shirt from PUMA that offers both style and function for sporting events or casual outings. Breathable fabric keeps you cool and comfortable, while the sleek design ensures you look your best both on and off the field. The classic cat logo branding adds a premium touch to this versatile polo with a ribbed collar for a polished look.",
//     brand: "PUMA",
//     url: "https://puma.com"
//   };

//   // Generate dynamic insights based on the brand
//   const generateBrandInsights = (brand: string) => {
//     const brandData: { [key: string]: any } = {
//       "PUMA": {
//         brandAnalysis: [
//           "Premium athletic wear brand with strong recognition",
//           "Focus on performance and lifestyle positioning", 
//           "Strong logo presence and brand consistency"
//         ],
//         targetAudience: [
//           "Men aged 25-45 interested in fitness and sports",
//           "Style-conscious consumers seeking athletic casual wear",
//           "Brand loyalists who value quality and performance"
//         ]
//       },
//       "NIKE": {
//         brandAnalysis: [
//           "World's leading sportswear brand with iconic swoosh",
//           "Innovation-driven with 'Just Do It' mentality",
//           "Strong athlete endorsements and premium positioning"
//         ],
//         targetAudience: [
//           "Athletes and fitness enthusiasts across all age groups",
//           "Fashion-forward consumers who value streetwear trends",
//           "Performance-driven individuals seeking cutting-edge technology"
//         ]
//       },
//       "REEBOK": {
//         brandAnalysis: [
//           "Fitness-focused brand with CrossFit heritage",
//           "Emphasis on functional training and lifestyle",
//           "Strong community-driven brand positioning"
//         ],
//         targetAudience: [
//           "Fitness enthusiasts and CrossFit athletes",
//           "Active lifestyle consumers aged 20-40",
//           "Individuals seeking authentic fitness experiences"
//         ]
//       },
//       "ADIDAS": {
//         brandAnalysis: [
//           "German heritage brand with three-stripes identity",
//           "Strong in sports performance and street culture",
//           "Focus on innovation and sustainability"
//         ],
//         targetAudience: [
//           "Sports athletes and performance-focused consumers",
//           "Streetwear enthusiasts and fashion-conscious youth",
//           "Environmentally conscious consumers"
//         ]
//       }
//     };

//     const defaultData = {
//       brandAnalysis: [
//         "Established brand with market presence",
//         "Focus on quality and customer satisfaction",
//         "Building brand recognition and trust"
//       ],
//       targetAudience: [
//         "General consumers interested in the product category",
//         "Quality-conscious buyers seeking value",
//         "Brand-aware customers looking for reliability"
//       ]
//     };

//     return brandData[brand.toUpperCase()] || defaultData;
//   };

//   const brandInsights = generateBrandInsights(productData.brand);

//   const insights = [
//     {
//       category: "Brand Analysis",
//       items: brandInsights.brandAnalysis,
//       icon: Star,
//       color: "from-yellow-400 to-orange-500",
//       bgColor: "bg-yellow-50"
//     },
//     {
//       category: "Target Audience", 
//       items: brandInsights.targetAudience,
//       icon: Target,
//       color: "from-blue-400 to-purple-500",
//       bgColor: "bg-blue-50"
//     },
//     {
//       category: "Key Selling Points",
//       items: [
//         "High-quality materials and construction",
//         "Versatile design for multiple use cases",
//         "Competitive pricing in the market segment",
//         "Brand reputation and customer trust"
//       ],
//       icon: TrendingUp,
//       color: "from-green-400 to-emerald-500",
//       bgColor: "bg-green-50"
//     },
//     {
//       category: "Marketing Angles",
//       items: [
//         "Quality meets affordability positioning",
//         "Lifestyle and functionality combination",
//         "Brand heritage and reliability",
//         "Customer satisfaction and value proposition"
//       ],
//       icon: Palette,
//       color: "from-pink-400 to-rose-500",
//       bgColor: "bg-pink-50"
//     }
//   ];

//   const performanceMetrics = [
//     { label: "Projected ROAS", value: "3.2x - 4.8x", icon: TrendingUp, color: "text-green-600" },
//     { label: "Expected CTR", value: "2.1% - 3.5%", icon: Target, color: "text-blue-600" },
//     { label: "Est. CPC Range", value: "₹12 - ₹18", icon: DollarSign, color: "text-purple-600" },
//     { label: "Conversion Rate", value: "4.2% - 6.8%", icon: BarChart3, color: "text-orange-600" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <section className="relative py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className="relative">
//                 <Brain className="w-8 h-8 text-blue-400" />
//                 <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">
//                 AI Analysis Complete
//               </span>
//             </div>
//             <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Product
//               <span className="block">Insights</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Our AI has analyzed your product and uncovered powerful insights to drive your advertising success
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Product Showcase */}
//             <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//               <Card className="p-8 bg-white border border-gray-200 shadow-2xl flex flex-col items-center">
//                 <div className="flex items-center gap-3 mb-6 w-full">
//                   <Package className="w-6 h-6 text-blue-400" />
//                   <h3 className="text-2xl font-bold text-gray-900">Product Analysis</h3>
//                 </div>
//                 <div className="w-full flex flex-col items-center">
//                   <div className="relative group w-full max-w-xl mx-auto mb-6">
//                     <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
//                       <img 
//                         src={productData.image} 
//                         alt="Product"
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <div className="absolute top-4 right-4">
//                       <Badge className="bg-green-500/90 border-green-400 text-white shadow">AI Analyzed</Badge>
//                     </div>
//                   </div>
//                   <div className="w-full max-w-xl mx-auto space-y-4">
//                     <h4 className="text-xl font-bold text-gray-900">{productData.title}</h4>
//                     <div className="flex items-center gap-3">
//                       <DollarSign className="w-6 h-6 text-green-400" />
//                       <span className="text-2xl font-bold text-green-600">{productData.price}</span>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600">Product Details</Badge>
//                       <p className="text-sm text-gray-700 leading-relaxed">{productData.details}</p>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                       <Badge variant="outline" className="mb-2 border-purple-400 text-purple-600">Marketing Description</Badge>
//                       <p className="text-sm text-gray-700 leading-relaxed">{productData.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* AI Insights */}
//             <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//               <div className="space-y-6">
//                 {insights.map((insight, index) => (
//                   <Card 
//                     key={index} 
//                     className={`p-6 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 hover:scale-105 ${
//                       activeInsight === index ? 'bg-white/20' : 'bg-white/10'
//                     }`}
//                     onClick={() => setActiveInsight(index)}
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
//                         <insight.icon className="w-5 h-5 text-white" />
//                       </div>
//                       <h4 className="font-bold text-white text-lg">{insight.category}</h4>
//                     </div>
                    
//                     <ul className="space-y-3">
//                       {insight.items.map((item, itemIndex) => (
//                         <li 
//                           key={itemIndex} 
//                           className="flex items-start gap-3 text-gray-300 leading-relaxed"
//                         >
//                           <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${insight.color} mt-2 flex-shrink-0`} />
//                           <span className="text-sm">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Performance Metrics */}
//           <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <Card className="p-8 bg-white border border-gray-200 shadow-2xl rounded-xl">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-10 h-10 rounded-xl bg-green-400 flex items-center justify-center">
//                   <BarChart3 className="w-5 h-5 text-white" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 {performanceMetrics.map((metric, index) => (
//                   <div 
//                     key={index}
//                     className="flex flex-col items-center justify-center py-6"
//                   >
//                     <metric.icon className={`w-10 h-10 mb-3 ${metric.color}`} />
//                     <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
//                     <div className="text-base text-gray-500">{metric.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Action Buttons */}
//           <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <Button 
//               onClick={onContinue} 
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
//             >
//               <Zap className="w-5 h-5" />
//               Continue to Campaign Setup
//               <ArrowRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };



// my code



// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   Package,
//   DollarSign,
//   Star,
//   Target,
//   TrendingUp,
//   Users,
//   Palette,
//   Tag,
//   ArrowRight,
//   Brain,
//   Zap,
//   Eye,
//   BarChart3,
//   Sparkles,
//   Lightbulb,
//   Globe,
//   Award
// } from "lucide-react";
// import { useEffect, useState } from "react";

// interface ApiResponse {
//   price_range: string;
//   brand_analysis: string;
//   product_analysis: string;
//   target_audience: string[];
//   key_selling_points: string[];
//   product_description: string;
// }

// interface ProductInsightsProps {
//   onContinue: () => void;
//   websiteData?: {
//     url: string;
//     title: string;
//     image: string;
//     price: string;
//     brand: string;
//     description: string;
//     details: string;
//   };
//   apiResponse?: ApiResponse;
// }

// export const ProductInsights = ({ onContinue, websiteData, apiResponse }: ProductInsightsProps) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeInsight, setActiveInsight] = useState(0);

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setActiveInsight((prev) => (prev + 1) % 4);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Use websiteData if available, otherwise fallback to sample data
//   const productData = websiteData || {
//     title: "Premium Product",
//     price: "₹2,499",
//     image: "/api/placeholder/400/300",
//     details: "High-quality product with premium materials and excellent craftsmanship.",
//     description: "Experience the perfect blend of style, comfort, and functionality with this premium product designed for modern consumers.",
//     brand: "Premium Brand",
//     url: "https://example.com"
//   };

//   // Generate insights from API response or use fallback data
//   const generateInsightsFromAPI = () => {
//     if (!apiResponse) {
//       // Fallback insights when no API data
//       return [
//         {
//           category: "Brand Analysis",
//           items: [
//             "Established brand with market presence",
//             "Focus on quality and customer satisfaction",
//             "Building brand recognition and trust"
//           ],
//           icon: Star,
//           color: "from-yellow-400 to-orange-500",
//           bgColor: "bg-yellow-50"
//         },
//         {
//           category: "Target Audience", 
//           items: [
//             "General consumers interested in the product category",
//             "Quality-conscious buyers seeking value",
//             "Brand-aware customers looking for reliability"
//           ],
//           icon: Target,
//           color: "from-blue-400 to-purple-500",
//           bgColor: "bg-blue-50"
//         },
//         {
//           category: "Key Selling Points",
//           items: [
//             "High-quality materials and construction",
//             "Versatile design for multiple use cases",
//             "Competitive pricing in the market segment",
//             "Brand reputation and customer trust"
//           ],
//           icon: TrendingUp,
//           color: "from-green-400 to-emerald-500",
//           bgColor: "bg-green-50"
//         },
//         {
//           category: "Marketing Angles",
//           items: [
//             "Quality meets affordability positioning",
//             "Lifestyle and functionality combination",
//             "Brand heritage and reliability",
//             "Customer satisfaction and value proposition"
//           ],
//           icon: Palette,
//           color: "from-pink-400 to-rose-500",
//           bgColor: "bg-pink-50"
//         }
//       ];
//     }

//     // Generate insights from API response
//     const brandAnalysisItems = apiResponse.brand_analysis 
//       ? apiResponse.brand_analysis.split('.').filter(item => item.trim().length > 0).slice(0, 3)
//       : ["Brand analysis not available"];

//     return [
//       {
//         category: "Brand Analysis",
//         items: brandAnalysisItems.length > 0 ? brandAnalysisItems : ["Brand analysis not available"],
//         icon: Star,
//         color: "from-yellow-400 to-orange-500",
//         bgColor: "bg-yellow-50"
//       },
//       {
//         category: "Target Audience", 
//         items: apiResponse.target_audience && apiResponse.target_audience.length > 0 
//           ? apiResponse.target_audience 
//           : ["Target audience data not available"],
//         icon: Target,
//         color: "from-blue-400 to-purple-500",
//         bgColor: "bg-blue-50"
//       },
//       {
//         category: "Key Selling Points",
//         items: apiResponse.key_selling_points && apiResponse.key_selling_points.length > 0 
//           ? apiResponse.key_selling_points 
//           : ["Key selling points not available"],
//         icon: TrendingUp,
//         color: "from-green-400 to-emerald-500",
//         bgColor: "bg-green-50"
//       },
//       {
//         category: "Product Analysis",
//         items: apiResponse.product_analysis 
//           ? apiResponse.product_analysis.split('.').filter(item => item.trim().length > 0).slice(0, 4)
//           : ["Product analysis not available"],
//         icon: Palette,
//         color: "from-pink-400 to-rose-500",
//         bgColor: "bg-pink-50"
//       }
//     ];
//   };

//   const insights = generateInsightsFromAPI();

//   // Generate performance metrics based on price range
//   const generatePerformanceMetrics = () => {
//     const baseMetrics = [
//       { label: "Projected ROAS", value: "3.2x - 4.8x", icon: TrendingUp, color: "text-green-600" },
//       { label: "Expected CTR", value: "2.1% - 3.5%", icon: Target, color: "text-blue-600" },
//       { label: "Est. CPC Range", value: "₹12 - ₹18", icon: DollarSign, color: "text-purple-600" },
//       { label: "Conversion Rate", value: "4.2% - 6.8%", icon: BarChart3, color: "text-orange-600" }
//     ];

//     // Adjust metrics based on price range if available
//     if (apiResponse?.price_range) {
//       const priceRange = apiResponse.price_range.toLowerCase();
//       if (priceRange.includes('premium') || priceRange.includes('high')) {
//         baseMetrics[0].value = "4.5x - 6.2x";
//         baseMetrics[1].value = "3.2% - 4.8%";
//         baseMetrics[2].value = "₹18 - ₹28";
//         baseMetrics[3].value = "5.8% - 8.2%";
//       } else if (priceRange.includes('budget') || priceRange.includes('low')) {
//         baseMetrics[0].value = "2.8x - 3.5x";
//         baseMetrics[1].value = "1.8% - 2.8%";
//         baseMetrics[2].value = "₹8 - ₹15";
//         baseMetrics[3].value = "3.5% - 5.2%";
//       }
//     }

//     return baseMetrics;
//   };

//   const performanceMetrics = generatePerformanceMetrics();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <section className="relative py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className="relative">
//                 <Brain className="w-8 h-8 text-blue-400" />
//                 <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">
//                 AI Analysis Complete
//               </span>
//             </div>
//             <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Product
//               <span className="block">Insights</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Our AI has analyzed your product and uncovered powerful insights to drive your advertising success
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Product Showcase */}
//             <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//               <Card className="p-8 bg-white border border-gray-200 shadow-2xl flex flex-col items-center">
//                 <div className="flex items-center gap-3 mb-6 w-full">
//                   <Package className="w-6 h-6 text-blue-400" />
//                   <h3 className="text-2xl font-bold text-gray-900">Product Analysis</h3>
//                 </div>
//                 <div className="w-full flex flex-col items-center">
//                   <div className="relative group w-full max-w-xl mx-auto mb-6">
//                     <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
//                       {productData.image ? (
//                         <img 
//                           src={productData.image} 
//                           alt="Product"
//                           className="w-full h-full object-contain"
//                           onError={(e) => {
//                             e.currentTarget.style.display = 'none';
//                             e.currentTarget.nextElementSibling?.classList.remove('hidden');
//                           }}
//                         />
//                       ) : null}
//                       <div className="text-gray-400 text-center p-8">
//                         <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">Product Image</p>
//                         <p className="text-sm text-gray-500">Will be displayed here</p>
//                       </div>
//                     </div>
//                     <div className="absolute top-4 right-4">
//                       <Badge className="bg-green-500/90 border-green-400 text-white shadow">AI Analyzed</Badge>
//                     </div>
//                   </div>
//                   <div className="w-full max-w-xl mx-auto space-y-4">
//                     <h4 className="text-xl font-bold text-gray-900">{productData.title}</h4>
//                     <div className="flex items-center gap-3">
//                       <DollarSign className="w-6 h-6 text-green-400" />
//                       <span className="text-2xl font-bold text-green-600">
//                         {apiResponse?.price_range || productData.price}
//                       </span>
//                     </div>
                    
//                     {/* Product Description from API */}
//                     {apiResponse?.product_description && (
//                       <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                         <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600">Product Analysis</Badge>
//                         <p className="text-sm text-gray-700 leading-relaxed">{apiResponse.product_description}</p>
//                       </div>
//                     )}
                    
//                     {/* Fallback to original details if no API description */}
//                     {!apiResponse?.product_description && productData.details && (
//                       <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                         <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600">Product Details</Badge>
//                         <p className="text-sm text-gray-700 leading-relaxed">{productData.details}</p>
//                       </div>
//                     )}
                    
//                     {/* Original description if available */}
//                     {productData.description && (
//                       <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                         <Badge variant="outline" className="mb-2 border-purple-400 text-purple-600">Marketing Description</Badge>
//                         <p className="text-sm text-gray-700 leading-relaxed">{productData.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* AI Insights */}
//             <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//               <div className="space-y-6">
//                 {insights.map((insight, index) => (
//                   <Card 
//                     key={index} 
//                     className={`p-6 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
//                       activeInsight === index ? 'bg-white/20' : 'bg-white/10'
//                     }`}
//                     onClick={() => setActiveInsight(index)}
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
//                         <insight.icon className="w-5 h-5 text-white" />
//                       </div>
//                       <h4 className="font-bold text-white text-lg">{insight.category}</h4>
//                     </div>
                    
//                     <ul className="space-y-3">
//                       {insight.items.map((item, itemIndex) => (
//                         <li 
//                           key={itemIndex} 
//                           className="flex items-start gap-3 text-gray-300 leading-relaxed"
//                         >
//                           <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${insight.color} mt-2 flex-shrink-0`} />
//                           <span className="text-sm">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Performance Metrics */}
//           <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <Card className="p-8 bg-white border border-gray-200 shadow-2xl rounded-xl">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-10 h-10 rounded-xl bg-green-400 flex items-center justify-center">
//                   <BarChart3 className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">Projected Performance Metrics</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 {performanceMetrics.map((metric, index) => (
//                   <div 
//                     key={index}
//                     className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-gray-200"
//                   >
//                     <metric.icon className={`w-10 h-10 mb-3 ${metric.color}`} />
//                     <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
//                     <div className="text-base text-gray-500 text-center">{metric.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Action Buttons */}
//           <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <Button 
//               onClick={onContinue} 
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
//             >
//               <Zap className="w-5 h-5" />
//               Continue to Campaign Setup
//               <ArrowRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package,
  DollarSign,
  Star,
  Target,
  TrendingUp,
  Users,
  Palette,
  Tag,
  ArrowRight,
  Brain,
  Zap,
  Eye,
  BarChart3,
  Sparkles,
  Lightbulb,
  Globe,
  Award
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const [activeInsight, setActiveInsight] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedLines, setGeneratedLines] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Start the line-by-line generation animation
    if (apiResponse) {
      startGeneratingAnimation();
    }
    
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [apiResponse]);

  // Simulate line-by-line content generation
  const startGeneratingAnimation = () => {
    const allLines = [
      "🔍 Analyzing website content...",
      "🏷️ Extracting product information...",
      "💰 Analyzing pricing strategy...",
      "🎯 Identifying target audience...",
      "⭐ Evaluating brand positioning...",
      "📊 Generating key selling points...",
      "🚀 Creating marketing angles...",
      "📈 Calculating performance metrics...",
      "✨ Finalizing insights...",
      "✅ Analysis complete!"
    ];

    let lineIndex = 0;
    const generateNextLine = () => {
      if (lineIndex < allLines.length) {
        setGeneratedLines(prev => [...prev, allLines[lineIndex]]);
        lineIndex++;
        
        // Vary the timing for more realistic feel
        const delay = lineIndex < 3 ? 800 : lineIndex < 7 ? 1200 : 1500;
        setTimeout(generateNextLine, delay);
      } else {
        // Animation complete, show the actual content
        setTimeout(() => {
          setIsGenerating(false);
          setShowContent(true);
        }, 1000);
      }
    };

    // Start after a brief delay
    setTimeout(generateNextLine, 500);
  };

  // Use websiteData if available, otherwise fallback to sample data
  const productData = websiteData || {
    title: "Premium Product",
    price: "₹2,499",
    image: "/api/placeholder/400/300",
    details: "High-quality product with premium materials and excellent craftsmanship.",
    description: "Experience the perfect blend of style, comfort, and functionality with this premium product designed for modern consumers.",
    brand: "Premium Brand",
    url: "https://example.com"
  };

  // Generate insights from API response or use fallback data
  const generateInsightsFromAPI = () => {
    if (!apiResponse) {
      // Fallback insights when no API data
      return [
        {
          category: "Brand Analysis",
          items: [
            "Established brand with market presence",
            "Focus on quality and customer satisfaction",
            "Building brand recognition and trust"
          ],
          icon: Star,
          color: "from-yellow-400 to-orange-500",
          bgColor: "bg-yellow-50"
        },
        {
          category: "Target Audience", 
          items: [
            "General consumers interested in the product category",
            "Quality-conscious buyers seeking value",
            "Brand-aware customers looking for reliability"
          ],
          icon: Target,
          color: "from-blue-400 to-purple-500",
          bgColor: "bg-blue-50"
        },
        {
          category: "Key Selling Points",
          items: [
            "High-quality materials and construction",
            "Versatile design for multiple use cases",
            "Competitive pricing in the market segment",
            "Brand reputation and customer trust"
          ],
          icon: TrendingUp,
          color: "from-green-400 to-emerald-500",
          bgColor: "bg-green-50"
        },
        {
          category: "Marketing Angles",
          items: [
            "Quality meets affordability positioning",
            "Lifestyle and functionality combination",
            "Brand heritage and reliability",
            "Customer satisfaction and value proposition"
          ],
          icon: Palette,
          color: "from-pink-400 to-rose-500",
          bgColor: "bg-pink-50"
        }
      ];
    }

    // Generate insights from API response
    const brandAnalysisItems = apiResponse.brand_analysis 
      ? apiResponse.brand_analysis.split('.').filter(item => item.trim().length > 0).slice(0, 3)
      : ["Brand analysis not available"];

    return [
      {
        category: "Brand Analysis",
        items: brandAnalysisItems.length > 0 ? brandAnalysisItems : ["Brand analysis not available"],
        icon: Star,
        color: "from-yellow-400 to-orange-500",
        bgColor: "bg-yellow-50"
      },
      {
        category: "Target Audience", 
        items: apiResponse.target_audience && apiResponse.target_audience.length > 0 
          ? apiResponse.target_audience 
          : ["Target audience data not available"],
        icon: Target,
        color: "from-blue-400 to-purple-500",
        bgColor: "bg-blue-50"
      },
      {
        category: "Key Selling Points",
        items: apiResponse.key_selling_points && apiResponse.key_selling_points.length > 0 
          ? apiResponse.key_selling_points 
          : ["Key selling points not available"],
        icon: TrendingUp,
        color: "from-green-400 to-emerald-500",
        bgColor: "bg-green-50"
      },
      {
        category: "Product Analysis",
        items: apiResponse.product_analysis 
          ? apiResponse.product_analysis.split('.').filter(item => item.trim().length > 0).slice(0, 4)
          : ["Product analysis not available"],
        icon: Palette,
        color: "from-pink-400 to-rose-500",
        bgColor: "bg-pink-50"
      }
    ];
  };

  const insights = generateInsightsFromAPI();

  // Generate performance metrics based on price range
  const generatePerformanceMetrics = () => {
    const baseMetrics = [
      { label: "Projected ROAS", value: "3.2x - 4.8x", icon: TrendingUp, color: "text-green-600" },
      { label: "Expected CTR", value: "2.1% - 3.5%", icon: Target, color: "text-blue-600" },
      { label: "Est. CPC Range", value: "₹12 - ₹18", icon: DollarSign, color: "text-purple-600" },
      { label: "Conversion Rate", value: "4.2% - 6.8%", icon: BarChart3, color: "text-orange-600" }
    ];

    // Adjust metrics based on price range if available
    if (apiResponse?.price_range) {
      const priceRange = apiResponse.price_range.toLowerCase();
      if (priceRange.includes('premium') || priceRange.includes('high')) {
        baseMetrics[0].value = "4.5x - 6.2x";
        baseMetrics[1].value = "3.2% - 4.8%";
        baseMetrics[2].value = "₹18 - ₹28";
        baseMetrics[3].value = "5.8% - 8.2%";
      } else if (priceRange.includes('budget') || priceRange.includes('low')) {
        baseMetrics[0].value = "2.8x - 3.5x";
        baseMetrics[1].value = "1.8% - 2.8%";
        baseMetrics[2].value = "₹8 - ₹15";
        baseMetrics[3].value = "3.5% - 5.2%";
      }
    }

    return baseMetrics;
  };

  const performanceMetrics = generatePerformanceMetrics();

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
              {isGenerating 
                ? 'Our AI is analyzing your product and generating powerful insights...'
                : 'Our AI has analyzed your product and uncovered powerful insights to drive your advertising success'
              }
            </p>
          </div>

          {/* Loading Animation */}
          {isGenerating && (
            <div className="max-w-2xl mx-auto mb-16">
              <Card className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Generating Insights</h3>
                  </div>
                  
                  {generatedLines.map((line, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 text-gray-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">{line}</span>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">Processing...</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Main Content - Show after generation is complete */}
          {showContent && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                              alt="Product"
                              className="w-full h-full object-contain"
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
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${insight.color} mt-2 flex-shrink-0`} />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className={`mt-16 transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Card className="p-8 bg-white border border-gray-200 shadow-2xl rounded-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-green-400 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Projected Performance Metrics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {performanceMetrics.map((metric, index) => (
                      <div 
                        key={index}
                        className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <metric.icon className={`w-10 h-10 mb-3 ${metric.color}`} />
                        <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                        <div className="text-base text-gray-500 text-center">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Button 
                  onClick={onContinue} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <Zap className="w-5 h-5" />
                  Continue to Campaign Setup
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

     <style>
  {`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `}
</style>

    </div>
  );
};
