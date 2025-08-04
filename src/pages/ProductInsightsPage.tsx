// import { useState } from "react";
// import { Navigation } from "@/components/Navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { 
//   Brain, 
//   Globe, 
//   Camera, 
//   FileText, 
//   Type, 
//   Sparkles, 
//   Plus,
//   Link,
//   Upload
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// type InputTab = 'website' | 'images' | 'documents' | 'description';

// const ProductInsightsPage = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<InputTab>('website');
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [description, setDescription] = useState('');

//   const handleAnalyze = () => {
//     // Navigate to the product insights analysis page
//     navigate('/product-analysis', { state: { websiteUrl, description } });
//   };

//   const handleAddMoreContent = () => {
//     // Switch to next tab or add more content
//     const tabs: InputTab[] = ['website', 'images', 'documents', 'description'];
//     const currentIndex = tabs.indexOf(activeTab);
//     const nextTab = tabs[(currentIndex + 1) % tabs.length];
//     setActiveTab(nextTab);
//   };

//   const tabs = [
//     { id: 'website' as InputTab, label: 'Website', icon: Globe },
//     { id: 'images' as InputTab, label: 'Images', icon: Camera },
//     { id: 'documents' as InputTab, label: 'Documents', icon: FileText },
//     { id: 'description' as InputTab, label: 'Description', icon: Type }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <Navigation />
      
//       <div className="max-w-4xl mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Brain className="w-8 h-8 text-purple-600" />
//             <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
//               MULTI-MODAL AI INPUT
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Feed Your <span className="text-purple-600">AI Marketing Brain</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             The more you share, the smarter your ads become. Upload any combination of content and watch AI create your perfect Meta Ads strategy.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-8">
//           <div className="flex bg-white rounded-lg p-1 shadow-sm border">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200 ${
//                     activeTab === tab.id
//                       ? 'bg-white text-purple-600 shadow-sm'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Content Area */}
//         <Card className="p-8 shadow-lg border-2 border-dashed border-gray-300 bg-white">
//           {activeTab === 'website' && (
//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Link className="w-10 h-10 text-purple-600" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Website Analysis</h3>
//               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                 Enter your website URL and let AI extract insights about your business, products, and audience.
//               </p>
//               <div className="max-w-md mx-auto">
//                 <Label htmlFor="website-url" className="text-left block mb-2 font-medium">
//                   Website URL
//                 </Label>
//                 <Input
//                   id="website-url"
//                   type="url"
//                   placeholder="https://your-website.com"
//                   value={websiteUrl}
//                   onChange={(e) => setWebsiteUrl(e.target.value)}
//                   className="text-lg"
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === 'images' && (
//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Camera className="w-10 h-10 text-blue-600" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Image Upload</h3>
//               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                 Upload product images, logos, or marketing materials for AI analysis.
//               </p>
//               <div className="max-w-md mx-auto">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
//                   <Button variant="outline">Choose Files</Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'documents' && (
//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                   <FileText className="w-10 h-10 text-green-600" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Document Upload</h3>
//               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                 Upload PDFs, presentations, or any documents that describe your business and products.
//               </p>
//               <div className="max-w-md mx-auto">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-4">Drag and drop documents here, or click to browse</p>
//                   <Button variant="outline">Choose Files</Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'description' && (
//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
//                   <Type className="w-10 h-10 text-orange-600" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Description</h3>
//               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                 Describe your business, target audience, and marketing goals in detail.
//               </p>
//               <div className="max-w-2xl mx-auto">
//                 <Label htmlFor="description" className="text-left block mb-2 font-medium">
//                   Business Description
//                 </Label>
//                 <textarea
//                   id="description"
//                   rows={6}
//                   placeholder="Describe your business, products, target audience, and marketing goals..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           )}
//         </Card>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
//           <Button 
//             size="lg" 
//             className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
//             onClick={handleAnalyze}
//           >
//             <Sparkles className="w-5 h-5 mr-2" />
//             Analyze & Generate Ads
//           </Button>
//           <Button 
//             variant="outline" 
//             size="lg" 
//             className="text-lg px-8 py-4 border-gray-300 hover:bg-gray-50"
//             onClick={handleAddMoreContent}
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add More Content
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInsightsPage; 




// seconfd one

// import { useState } from "react";
// import { Navigation } from "@/components/Navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { useNavigate } from 'react-router-dom';
// import { 
//   Brain, 
//   Globe, 
//   Camera, 
//   FileText, 
//   Type, 
//   Sparkles, 
//   Plus,
//   Link,
//   Upload
// } from "lucide-react";
// import { useLocation } from "wouter";
// import { motion, AnimatePresence } from "framer-motion";

// type InputTab = 'website' | 'images' | 'documents' | 'description';

// const ProductInsightsPage = () => {
//   const navigate = useNavigate();
//   const [, setLocation] = useLocation();
//   const [activeTab, setActiveTab] = useState<InputTab>('website');
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [description, setDescription] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   const handleAnalyze = () => {
//         // Navigate to the product insights analysis page
//         navigate('/product-analysis', { state: { websiteUrl, description } });
//       };

//   const handleAddMoreContent = () => {
//     const tabs: InputTab[] = ['website', 'images',];
//     const currentIndex = tabs.indexOf(activeTab);
//     const nextTab = tabs[(currentIndex + 1) % tabs.length];
//     setActiveTab(nextTab);
//   };

//   const tabs = [
//     { id: 'website' as InputTab, label: 'Website', icon: Globe, color: 'purple' },
//     { id: 'images' as InputTab, label: 'Images', icon: Camera, color: 'blue' },
   
//   ];

//   // Animated background particles
//   const particles = Array.from({ length: 9 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 3 + 1,
//     left: (i + 1) * 10,
//     delay: i * 2,
//     duration: 15 + Math.random() * 5
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 relative overflow-hidden">
//       {/* Animated Background Particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="particle absolute rounded-full"
//             style={{
//               width: `${particle.size * 4}px`,
//               height: `${particle.size * 4}px`,
//               left: `${particle.left}%`,
//             }}
//             animate={{
//               y: ['100vh', '-100vh'],
//               rotate: [0, 360]
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating Background Elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
//       <div className="absolute top-40 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      
//       <Navigation />
      
//       <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
//         {/* Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.div 
//             className="flex items-center justify-center gap-3 mb-6"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
//               <Brain className="w-7 h-7 text-white" />
//             </div>
//             <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
//               MULTI-MODAL AI INPUT
//             </span>
//           </motion.div>
//           <motion.h1 
//             className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Feed Your <span className="gradient-text">AI Marketing Brain</span>
//           </motion.h1>
//           <motion.p 
//             className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             The more you share, the smarter your ads become. Upload any combination of content and watch AI create your perfect Meta Ads strategy.
//           </motion.p>
//         </motion.div>

//         {/* Tabs */}
//         <motion.div 
//           className="flex justify-center mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.6 }}
//         >
//           <div className="glass-effect rounded-xl p-2 shadow-2xl">
//             <div className="flex space-x-2">
//               {tabs.map((tab, index) => {
//                 const Icon = tab.icon;
//                 return (
//                   <motion.button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 font-medium ${
//                       activeTab === tab.id
//                         ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
//                         : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + index * 0.1 }}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span>{tab.label}</span>
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* Content Area */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//         >
//           <Card className="glass-effect p-10 shadow-2xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all duration-500 bg-transparent">
//             {/* <AnimatePresence mode="wait">
//               {activeTab === 'website' && (
//                 <motion.div 
//                   key="website"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div 
//                       className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                     >
//                       <Link className="w-12 h-12 text-purple-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Website Analysis</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Enter your website URL and let AI extract insights about your business, products, and audience.
//                   </p>
//                   <div className="max-w-lg mx-auto">
//                     <Label htmlFor="website-url" className="text-left block mb-3 font-semibold text-gray-200">
//                       Website URL
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="website-url"
//                         type="url"
//                         placeholder="https://your-website.com"
//                         value={websiteUrl}
//                         onChange={(e) => setWebsiteUrl(e.target.value)}
//                         className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'images' && (
//                 <motion.div 
//                   key="images"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div 
//                       className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                     >
//                       <Camera className="w-12 h-12 text-blue-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Image Upload</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Upload product images, logos, or marketing materials for AI analysis.
//                   </p>
//                   <div className="max-w-lg mx-auto">
//                     <motion.div 
//                       className="upload-zone-hover border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer group"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <div className="text-center">
//                         <motion.div
//                           animate={{ y: [0, -5, 0] }}
//                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         >
//                           <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
//                         </motion.div>
//                         <p className="text-gray-300 mb-4 text-lg">Drag and drop images here, or click to browse</p>
//                         <Button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all btn-ripple">
//                           Choose Files
//                         </Button>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'documents' && (
//                 <motion.div 
//                   key="documents"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div 
//                       className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//                     >
//                       <FileText className="w-12 h-12 text-green-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Document Upload</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Upload PDFs, presentations, or any documents that describe your business and products.
//                   </p>
//                   <div className="max-w-lg mx-auto">
//                     <motion.div 
//                       className="upload-zone-hover border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer group"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <div className="text-center">
//                         <motion.div
//                           animate={{ y: [0, -5, 0] }}
//                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         >
//                           <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-green-400 transition-colors duration-300" />
//                         </motion.div>
//                         <p className="text-gray-300 mb-4 text-lg">Drag and drop documents here, or click to browse</p>
//                         <Button className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all btn-ripple">
//                           Choose Files
//                         </Button>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'description' && (
//                 <motion.div 
//                   key="description"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div 
//                       className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
//                     >
//                       <Type className="w-12 h-12 text-orange-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Business Description</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Describe your business, target audience, and marketing goals in detail.
//                   </p>
//                   <div className="max-w-2xl mx-auto">
//                     <Label htmlFor="description" className="text-left block mb-3 font-semibold text-gray-200">
//                       Business Description
//                     </Label>
//                     <div className="relative">
//                       <textarea
//                         id="description"
//                         rows={8}
//                         placeholder="Describe your business, products, target audience, and marketing goals..."
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="w-full p-6 bg-gray-800/50 border border-gray-600 rounded-xl resize-none text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm text-lg leading-relaxed"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence> */}
//             <>
//             <AnimatePresence mode="wait">
//     {activeTab === 'website' && (
//       <motion.div
//         key="website"
//         className="text-center"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 50 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex justify-center mb-8">
//           <motion.div
//             className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <Link className="w-12 h-12 text-purple-400" />
//           </motion.div>
//         </div>
//         <h3 className="text-3xl font-bold text-white mb-4">Website Analysis</h3>
//         <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//           Enter your website URL and let AI extract insights about your business, products, and audience.
//         </p>
//         <div className="max-w-lg mx-auto">
//           <Label htmlFor="website-url" className="text-left block mb-3 font-semibold text-gray-200">
//             Website URL
//           </Label>
//           <div className="relative">
//             <Input
//               id="website-url"
//               type="url"
//               placeholder="https://your-website.com"
//               value={websiteUrl}
//               onChange={(e) => setWebsiteUrl(e.target.value)}
//               className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
//           </div>
//         </div>
//       </motion.div>
//     )}

//     {activeTab === 'images' && (
//       <motion.div
//         key="images"
//         className="text-center"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 50 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex justify-center mb-8">
//           <motion.div
//             className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <Camera className="w-12 h-12 text-blue-400" />
//           </motion.div>
//         </div>
//         <h3 className="text-3xl font-bold text-white mb-4">Image Upload</h3>
//         <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//           Upload product images, logos, or marketing materials for AI analysis.
//         </p>

//         <div className="max-w-xl mx-auto space-y-6">
//           <div>
//             <Label htmlFor="image-title" className="block mb-2 text-gray-200 font-semibold text-left">
//               Image Title
//             </Label>
//             <Input
//               id="image-title"
//               placeholder="Enter a title for the image"
//               className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
//             />
//           </div>
//           <div>
//             <Label htmlFor="image-title" className="block mb-2 text-gray-200 font-semibold text-left">
//                Product Price
//             </Label>
//             <Input
//               id="product-price"
//               placeholder="Enter a Product Price $10"
//               className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
//             />
//           </div>

//           <div>
//             <Label htmlFor="image-description" className="block mb-2 text-gray-200 font-semibold text-left">
//               Image Description
//             </Label>
//             <textarea
//               id="image-description"
//               rows={4}
//               placeholder="Enter a short description for the image"
//               className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl resize-none text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
//             />
//           </div>

//           <motion.div
//             className="upload-zone-hover border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer group"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <div className="text-center">
//               <motion.div
//                 animate={{ y: [0, -5, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//               >
//                 <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
//               </motion.div>
//               <p className="text-gray-300 mb-4 text-lg">Drag and drop images here, or click to browse</p>
//               <Button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all btn-ripple">
//                 Choose Files
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
//             </>

            
//           </Card>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div 
//           className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.6 }}
//         >
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button 
//               size="lg" 
//               className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-5 rounded-xl font-bold transition-all duration-300 shadow-xl btn-ripple min-w-[250px]"
//               onClick={handleAnalyze}
//               disabled={isAnalyzing}
//             >
//               {isAnalyzing ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   >
//                     <Sparkles className="w-5 h-5" />
//                   </motion.div>
//                   <span>Analyzing...</span>
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-3">
//                   <Sparkles className="w-5 h-5" />
//                   <span>Analyze & Generate Ads</span>
//                 </span>
//               )}
//             </Button>
//           </motion.div>
         
//         </motion.div>

//         {/* Progress Indicators */}
//         <motion.div 
//   className="mt-16 text-center"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 1.4, duration: 0.6 }}
// >
//   <div className="flex justify-center items-center gap-4 mb-4">
//     <motion.div 
//       className={`w-3 h-3 rounded-full ${activeTab === 'website' ? 'bg-purple-500' : 'bg-gray-600'}`}
//       animate={activeTab === 'website' ? { scale: [1, 1.2, 1] } : {}}
//       transition={{ duration: 2, repeat: Infinity }}
//     />
//     <motion.div 
//       className={`w-3 h-3 rounded-full ${activeTab === 'images' ? 'bg-purple-500' : 'bg-gray-600'}`}
//       animate={activeTab === 'images' ? { scale: [1, 1.2, 1] } : {}}
//       transition={{ duration: 2, repeat: Infinity }}
//     />
//   </div>
//   {/* <p className="text-gray-400 text-sm">
//     {activeTab === 'website' ? 'Step 1 of 2: Website Input' : 'Step 2 of 2: Image Upload'}
//   </p> */}
// </motion.div>

//       </div>
//     </div>
//   );
// };

// export default ProductInsightsPage;

// response2

// import { useState } from "react";
// import { Navigation } from "@/components/Navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { useNavigate } from 'react-router-dom';
// import { 
//   Brain, 
//   Globe, 
//   Camera, 
//   FileText, 
//   Type, 
//   Sparkles, 
//   Plus,
//   Link,
//   Upload,
//   AlertCircle
// } from "lucide-react";
// import { useLocation } from "wouter";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from 'axios';

// type InputTab = 'website' | 'images' | 'documents' | 'description';

// const ProductInsightsPage = () => {
//   const navigate = useNavigate();
//   const [, setLocation] = useLocation();
//   const [activeTab, setActiveTab] = useState<InputTab>('website');
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [description, setDescription] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // URL validation function
//   const isValidUrl = (url: string): boolean => {
//     try {
//       const urlPattern = /^https?:\/\/.+\..+/;
//       return urlPattern.test(url) && url.length > 0;
//     } catch {
//       return false;
//     }
//   };

//   // API call function
//   const sendUrlToAPI = async (url: string) => {
//     try {
//       const response = await axios.post(
//         'https://shashankdoom.app.n8n.cloud/webhook-test/start-campaign-setup',
//         { url: url },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 30000, // 30 seconds timeout
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
//         } else if (error.request) {
//           throw new Error('Network error: Unable to reach the server');
//         } else {
//           throw new Error('Request error: ' + error.message);
//         }
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   };

//   const handleAnalyze = async () => {
//     // Clear previous messages
//     setError('');
//     setSuccess('');

//     // Validation
//     if (!websiteUrl.trim()) {
//       setError('Please enter a website URL');
//       return;
//     }

//     if (!isValidUrl(websiteUrl)) {
//       setError('Please enter a valid URL (must start with http:// or https://)');
//       return;
//     }

//     setIsAnalyzing(true);

//     try {
//       const result = await sendUrlToAPI(websiteUrl);
//       setSuccess('URL sent successfully! Generating analysis...');
      
//       // Optional: Navigate to analysis page after successful API call
//       setTimeout(() => {
//         navigate('/product-analysis', { 
//           state: { 
//             websiteUrl, 
//             description,
//             apiResponse: result 
//           } 
//         });
//       }, 2000);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to analyze website');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleAddMoreContent = () => {
//     const tabs: InputTab[] = ['website', 'images',];
//     const currentIndex = tabs.indexOf(activeTab);
//     const nextTab = tabs[(currentIndex + 1) % tabs.length];
//     setActiveTab(nextTab);
//   };

//   const tabs = [
//     { id: 'website' as InputTab, label: 'Website', icon: Globe, color: 'purple' },
//     { id: 'images' as InputTab, label: 'Images', icon: Camera, color: 'blue' },
//   ];

//   // Animated background particles
//   const particles = Array.from({ length: 9 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 3 + 1,
//     left: (i + 1) * 10,
//     delay: i * 2,
//     duration: 15 + Math.random() * 5
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 relative overflow-hidden">
//       {/* Animated Background Particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="particle absolute rounded-full"
//             style={{
//               width: `${particle.size * 4}px`,
//               height: `${particle.size * 4}px`,
//               left: `${particle.left}%`,
//             }}
//             animate={{
//               y: ['100vh', '-100vh'],
//               rotate: [0, 360]
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating Background Elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
//       <div className="absolute top-40 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      
//       <Navigation />
      
//       <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
//         {/* Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.div 
//             className="flex items-center justify-center gap-3 mb-6"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
//               <Brain className="w-7 h-7 text-white" />
//             </div>
//             <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
//               MULTI-MODAL AI INPUT
//             </span>
//           </motion.div>
//           <motion.h1 
//             className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Feed Your <span className="gradient-text">AI Marketing Brain</span>
//           </motion.h1>
//           <motion.p 
//             className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             The more you share, the smarter your ads become. Upload any combination of content and watch AI create your perfect Meta Ads strategy.
//           </motion.p>
//         </motion.div>

//         {/* Tabs */}
//         <motion.div 
//           className="flex justify-center mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.6 }}
//         >
//           <div className="glass-effect rounded-xl p-2 shadow-2xl">
//             <div className="flex space-x-2">
//               {tabs.map((tab, index) => {
//                 const Icon = tab.icon;
//                 return (
//                   <motion.button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 font-medium ${
//                       activeTab === tab.id
//                         ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
//                         : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + index * 0.1 }}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span>{tab.label}</span>
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* Error/Success Messages */}
//         <AnimatePresence>
//           {(error || success) && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="max-w-2xl mx-auto mb-8"
//             >
//               <div className={`p-4 rounded-xl flex items-center gap-3 ${
//                 error 
//                   ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
//                   : 'bg-green-500/10 border border-green-500/20 text-green-400'
//               }`}>
//                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-sm font-medium">{error || success}</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Content Area */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//         >
//           <Card className="glass-effect p-10 shadow-2xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all duration-500 bg-transparent">
//             <AnimatePresence mode="wait">
//               {activeTab === 'website' && (
//                 <motion.div
//                   key="website"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div
//                       className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                     >
//                       <Link className="w-12 h-12 text-purple-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Website Analysis</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Enter your website URL and let AI extract insights about your business, products, and audience.
//                   </p>
//                   <div className="max-w-lg mx-auto">
//                     <Label htmlFor="website-url" className="text-left block mb-3 font-semibold text-gray-200">
//                       Website URL *
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="website-url"
//                         type="url"
//                         placeholder="https://your-website.com"
//                         value={websiteUrl}
//                         onChange={(e) => {
//                           setWebsiteUrl(e.target.value);
//                           setError(''); // Clear error when user types
//                         }}
//                         className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl text-lg text-white placeholder-gray-400 focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
//                           error && !websiteUrl
//                             ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
//                             : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
//                         }`}
//                         disabled={isAnalyzing}
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
//                     </div>
//                     <p className="text-xs text-gray-400 mt-2 text-left">
//                       * Required field - Must be a valid URL starting with http:// or https://
//                     </p>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'images' && (
//                 <motion.div
//                   key="images"
//                   className="text-center"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex justify-center mb-8">
//                     <motion.div
//                       className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                     >
//                       <Camera className="w-12 h-12 text-blue-400" />
//                     </motion.div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-4">Image Upload</h3>
//                   <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
//                     Upload product images, logos, or marketing materials for AI analysis.
//                   </p>

//                   <div className="max-w-xl mx-auto space-y-6">
//                     <div>
//                       <Label htmlFor="image-title" className="block mb-2 text-gray-200 font-semibold text-left">
//                         Image Title
//                       </Label>
//                       <Input
//                         id="image-title"
//                         placeholder="Enter a title for the image"
//                         className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="product-price" className="block mb-2 text-gray-200 font-semibold text-left">
//                         Product Price
//                       </Label>
//                       <Input
//                         id="product-price"
//                         placeholder="Enter a Product Price $10"
//                         className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="image-description" className="block mb-2 text-gray-200 font-semibold text-left">
//                         Image Description
//                       </Label>
//                       <textarea
//                         id="image-description"
//                         rows={4}
//                         placeholder="Enter a short description for the image"
//                         className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl resize-none text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm text-lg"
//                       />
//                     </div>

//                     <motion.div
//                       className="upload-zone-hover border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer group"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <div className="text-center">
//                         <motion.div
//                           animate={{ y: [0, -5, 0] }}
//                           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                         >
//                           <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6 group-hover:text-purple-400 transition-colors duration-300" />
//                         </motion.div>
//                         <p className="text-gray-300 mb-4 text-lg">Drag and drop images here, or click to browse</p>
//                         <Button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all btn-ripple">
//                           Choose Files
//                         </Button>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </Card>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div 
//           className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.6 }}
//         >
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button 
//               size="lg" 
//               className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-5 rounded-xl font-bold transition-all duration-300 shadow-xl btn-ripple min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={handleAnalyze}
//               disabled={isAnalyzing}
//             >
//               {isAnalyzing ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   >
//                     <Sparkles className="w-5 h-5" />
//                   </motion.div>
//                   <span>Analyzing...</span>
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-3">
//                   <Sparkles className="w-5 h-5" />
//                   <span>Analyze & Generate Ads</span>
//                 </span>
//               )}
//             </Button>
//           </motion.div>
//         </motion.div>

//         {/* Progress Indicators */}
//         <motion.div 
//           className="mt-16 text-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.4, duration: 0.6 }}
//         >
//           <div className="flex justify-center items-center gap-4 mb-4">
//             <motion.div 
//               className={`w-3 h-3 rounded-full ${activeTab === 'website' ? 'bg-purple-500' : 'bg-gray-600'}`}
//               animate={activeTab === 'website' ? { scale: [1, 1.2, 1] } : {}}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//             <motion.div 
//               className={`w-3 h-3 rounded-full ${activeTab === 'images' ? 'bg-purple-500' : 'bg-gray-600'}`}
//               animate={activeTab === 'images' ? { scale: [1, 1.2, 1] } : {}}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductInsightsPage;


import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {ProductInsights} from "@/components/ProductInsights"
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Globe, 
  Camera, 
  FileText, 
  Type, 
  Sparkles, 
  Plus,
  Link,
  Upload,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


type InputTab = 'website' | 'images';

interface ApiResponse {
  product_title : string;
  price_range: string;
  brand_analysis: string;
  product_analysis: string;
  target_audience: string[];
  key_selling_points: string[];
  product_description: string;
}

const ProductInsightsPage = () => {
   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<InputTab>('website');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInsights, setShowInsights] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [websiteData, setWebsiteData] = useState<any>(null);

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

  // const handleAnalyze = async () => {
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
  //     const result = await sendUrlToAPI(websiteUrl);
      
  //     // Debug: Log the actual response to console
  //     console.log('API Response:', result);
  //     console.log('Response Type:', typeof result);
  //     console.log('Is Array:', Array.isArray(result));
      
  //     setSuccess('Analysis complete! Generating insights...');
      
  //     let content = null;
      
  //     // Try different possible response structures
  //     if (result && Array.isArray(result) && result.length > 0) {
  //       // Case 1: Array format like your example
  //       if (result[0].message && result[0].message.content) {
  //         content = result[0].message.content;
  //         console.log('Found content in array format:', content);
  //       }
  //     } else if (result && result.message && result.message.content) {
  //       // Case 2: Single object with message.content
  //       content = result.message.content;
  //       console.log('Found content in single object format:', content);
  //     } else if (result && result.content) {
  //       // Case 3: Direct content property
  //       content = result.content;
  //       console.log('Found content in direct format:', content);
  //     } else if (result && typeof result === 'object') {
  //       // Case 4: Direct object (the content itself)
  //       if (result.price_range || result.brand_analysis || result.product_analysis) {
  //         content = result;
  //         console.log('Found content as direct object:', content);
  //       }
  //     }
      
  //     if (content && typeof content === 'object') {
  //       setApiResponse(content);
        
  //       // Create website data object with URL info
  //       setWebsiteData({
  //         url: websiteUrl,
  //         title: extractDomainName(websiteUrl),
  //         description: content.product_description || 'Product analyzed from website',
  //         brand: extractBrandFromUrl(websiteUrl) || 'Brand',
  //         price: content.price_range || 'Price not specified',
  //         details: content.product_analysis || 'Product details from analysis',
  //         image: '/api/placeholder/400/300' // Default placeholder
  //       });

  //       // Show insights after a brief delay
  //       setTimeout(() => {
  //         setShowInsights(true);
  //       }, 1500);
  //     } else {
  //       console.error('Could not extract content from response:', result);
  //       throw new Error(`Invalid response format from API. Received: ${JSON.stringify(result)}`);
  //     }

  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'Failed to analyze website');
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };
const fetchScreenshot = async (url: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/screenshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Screenshot API Error: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.screenshot_url || null;
  } catch (error) {
    console.error('Screenshot API Error:', error);
    return null;
  }
};







const handleAnalyze = async () => {
  setError('');
  setSuccess('');

  if (!websiteUrl.trim()) {
    setError('Please enter a website URL');
    return;
  }

  if (!isValidUrl(websiteUrl)) {
    setError('Please enter a valid URL (must start with http:// or https://)');
    return;
  }

  setIsAnalyzing(true);

  try {
    // Call AI analysis API
    const result = await sendUrlToAPI(websiteUrl);
    console.log('🔍 AI Analysis API Response:', result);

    let content = null;

    if (result && Array.isArray(result) && result.length > 0) {
      if (result[0].message?.content) {
        content = result[0].message.content;
      }
    } else if (result?.message?.content) {
      content = result.message.content;
    } else if (result?.content) {
      content = result.content;
    } else if (typeof result === 'object') {
      content = result;
    }

    if (!content || typeof content !== 'object') {
      throw new Error('Invalid response format from AI analysis API');
    }

    // Call screenshot API
    const screenshotUrl = await fetchScreenshot(websiteUrl);
    console.log('🖼️ Screenshot API Response:', screenshotUrl);

    // Set insights and websiteData
    setApiResponse(content);
    setWebsiteData({
      url: websiteUrl,
      title: extractDomainName(websiteUrl),
      description: content.product_description || 'Product analyzed from website',
      brand: extractBrandFromUrl(websiteUrl) || 'Brand',
      price: content.price_range || 'Price not specified',
      details: content.product_analysis || 'Product details from analysis',
      image: screenshotUrl || '/api/placeholder/400/300',
    });

    setSuccess('Analysis complete! Generating insights...');
    setTimeout(() => {
      setShowInsights(true);
    }, 1500);

  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to analyze website');
    console.error('❌ Error:', error);
  } finally {
    setIsAnalyzing(false);
  }
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

  const handleContinue = () => {
    // Navigate to next step - you can implement your routing logic here
    navigate('/campaign-setup');
    console.log('Continue to Campaign Setup');
  };

  const handleBackToInput = () => {
    setShowInsights(false);
    setApiResponse(null);
    setWebsiteData(null);
    setWebsiteUrl('');
    setError('');
    setSuccess('');
  };

  // If showing insights, render the ProductInsights component
  if (showInsights && apiResponse && websiteData) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="pt-8 pb-4 px-6">
            <div className="max-w-7xl mx-auto">
              <Button 
                onClick={handleBackToInput}
                className="mb-4 bg-gray-700 hover:bg-gray-600 text-white"
              >
                ← Back to Input
              </Button>
            </div>
          </div>
          <ProductInsights 
            onContinue={handleContinue}
            websiteData={websiteData}
            apiResponse={apiResponse}
          />
        </div>
      </div>
    );
  }

  const handleAddMoreContent = () => {
    const tabs: InputTab[] = ['website', 'images'];
    const currentIndex = tabs.indexOf(activeTab);
    const nextTab = tabs[(currentIndex + 1) % tabs.length];
    setActiveTab(nextTab);
  };


  // new function for image api clling
// const fetchScreenshot = async (url: string) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/v1/screenshot', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });

//     if (!response.ok) {
//       throw new Error(`Screenshot API Error: ${response.status}`);
//     }

//     const data = await response.json();
//     return data?.data?.screenshot_url || null;
//   } catch (error) {
//     console.error('Screenshot API Error:', error);
//     return null;
//   }
// };








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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 relative overflow-hidden">
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
      
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Feed Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Marketing Brain</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The more you share, the smarter your ads become. Upload any combination of content and watch AI create your perfect Meta Ads strategy.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
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

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
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

        {/* Progress Indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.div 
              className={`w-3 h-3 rounded-full ${activeTab === 'website' ? 'bg-purple-500' : 'bg-gray-600'}`}
              animate={activeTab === 'website' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className={`w-3 h-3 rounded-full ${activeTab === 'images' ? 'bg-purple-500' : 'bg-gray-600'}`}
              animate={activeTab === 'images' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductInsightsPage;