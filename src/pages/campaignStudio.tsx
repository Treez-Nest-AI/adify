// // import { useState, useRef, useEffect } from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Heart, MessageCircle, Share, Upload, Star, Target, RotateCcw, X, Check } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // interface Campaign {
// //   id: number;
// //   title: string;
// //   description: string;
// //   buttonText: string;
// //   buttonColor: string;
// //   type: string;
// //   aiScore: number;
// //   rating: number;
// //   ctr: string;
// //   cpc: string;
// //   roas: string;
// // }

// // const campaigns: Campaign[] = [
// //   {
// //     id: 1,
// //     title: "Transform Your Marketing with AI-Powered Campaign Studio",
// //     description: "Experience the future of digital advertising with intelligent campaign generation, real-time optimization, and predictive analytics that deliver exceptional ROI.",
// //     buttonText: "Start Free Trial",
// //     buttonColor: "from-slate-700 to-slate-900",
// //     type: "Carousel",
// //     aiScore: 96,
// //     rating: 4.9,
// //     ctr: "4.2%",
// //     cpc: "$0.42",
// //     roas: "5.1x"
// //   },
// //   {
// //     id: 2,
// //     title: "Scale Your Business with Intelligent Ad Automation",
// //     description: "Join thousands of marketers who've increased their campaign performance by 300% using our AI-driven platform. Data-backed strategies that actually work.",
// //     buttonText: "Get Demo",
// //     buttonColor: "from-emerald-500 to-emerald-600",
// //     type: "Conversion",
// //     aiScore: 93,
// //     rating: 4.8,
// //     ctr: "3.8%",
// //     cpc: "$0.38",
// //     roas: "4.7x"
// //   },
// //   {
// //     id: 3,
// //     title: "See Campaign Studio AI in Action",
// //     description: "Watch how our platform creates, tests, and optimizes campaigns automatically. Real results from real businesses using next-generation marketing technology.",
// //     buttonText: "Watch Video",
// //     buttonColor: "from-slate-700 to-slate-900",
// //     type: "Video",
// //     aiScore: 98,
// //     rating: 4.9,
// //     ctr: "5.1%",
// //     cpc: "$0.35",
// //     roas: "6.2x"
// //   }
// // ];

// // // Sample ad sets data
// // const sampleAdSets = [
// //   {
// //     "ad_set_name": "Ultimate Driving Experience - Thrill Seekers 18-40",
// //     "campaign_objective": "Video Views",
// //     "target_audience": {
// //       "location": "Global",
// //       "age_range": "18-40",
// //       "gender": "All",
// //       "interests": ["Car Enthusiasts", "Driving", "Sports Cars", "Car Racing", "BMW"]
// //     },
// //     "placements": ["YouTube In-Stream Ads", "YouTube Shorts Ads", "YouTube Feed"],
// //     "daily_budget": "250 USD",
// //     "creative_brief": "Use high-energy action shots of BMW cars on mountain roads to evoke excitement and passion for driving, paired with an energetic soundtrack that captures the thrill and performance of BMW vehicles.",
// //     "ad_copy_variations": {
// //       "short_form": [
// //         "Unleash your inner driver with BMW.",
// //         "Feel the thrill of every turn in a BMW.",
// //         "BMW — where passion meets performance."
// //       ],
// //       "long_form": [
// //         "Experience the ultimate driving thrill with BMW. Every turn ignites passion and delivers unmatched performance for those who crave excitement behind the wheel.",
// //         "Dive into a driving experience designed for thrill seekers. BMW offers precision handling and adrenaline-pumping performance for car enthusiasts aged 18-40."
// //       ]
// //     },
// //     "primary_text": "Unleash your inner driver with BMW—where every turn ignites passion and performance.",
// //     "headline": "Ignite Your Driving Passion",
// //     "call_to_action": "Learn More"
// //   },
// //   {
// //     "ad_set_name": "Luxury Meets Innovation - Tech-Savvy Pros 28-50",
// //     "campaign_objective": "Conversions",
// //     "target_audience": {
// //       "location": "Global",
// //       "age_range": "28-50",
// //       "gender": "All",
// //       "interests": ["Luxury Cars", "Technology", "BMW", "Infotainment Systems", "Smart Devices", "Professional Networking"]
// //     },
// //     "placements": ["Instagram Feed", "Instagram Stories", "Instagram Reels"],
// //     "daily_budget": "220 USD",
// //     "creative_brief": "Show cinematic lifestyle videos highlighting BMW's advanced infotainment systems and customizable technology features that appeal to sophisticated, tech-savvy professionals seeking confidence and luxury.",
// //     "ad_copy_variations": {
// //       "short_form": [
// //         "Step into luxury with BMW tech.",
// //         "Luxury and innovation, redefined.",
// //         "Drive confidently with BMW technology."
// //       ],
// //       "long_form": [
// //         "Embrace the future of luxury driving with BMW. Advanced technology and sophisticated design come together for professionals who demand the best.",
// //         "Experience BMW's cutting-edge infotainment and customization options crafted for tech-savvy drivers who value innovation and elegance."
// //       ]
// //     },
// //     "primary_text": "Step into the future of luxury with BMW—crafted technology for the sophisticated driver.",
// //     "headline": "Luxury Driven by Innovation",
// //     "call_to_action": "Learn More"
// //   }
// // ];

// // export default function CampaignStudio() {
// //   const navigate = useNavigate();
// //   const [campaignConfigData, setCampaignConfigData] = useState<any>(null);
// //   const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaigns[0]);
// //   const [previewImage, setPreviewImage] = useState<string | null>(null);
// //   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [dragActive, setDragActive] = useState(false);
// //   const [uploadSuccess, setUploadSuccess] = useState(false);
// //   const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   // Load campaign config data from sessionStorage
// //   useEffect(() => {
// //     const storedData = sessionStorage.getItem('campaignConfigData');
// //     if (storedData) {
// //       setCampaignConfigData(JSON.parse(storedData));
// //     } else {
// //       // If no data found, redirect back to config
// //       navigate('/CampaignConfig');
// //     }
// //   }, [navigate]);

// //   const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
// //     console.log(`Toast: ${title} - ${description}`);
// //   };

// //   const handleDragEnter = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(true);
// //   };

// //   const handleDragLeave = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
// //   };

// //   const handleDragOver = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //   };

// //   const handleDrop = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);

// //     const files = e.dataTransfer.files;
// //     if (files.length > 0 && files[0].type.startsWith('image/')) {
// //       handleImageSelection(files[0]);
// //     } else {
// //       showToast("Invalid file", "Please drop a valid image file", "destructive");
// //     }
// //   };

// //   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file && file.type.startsWith('image/')) {
// //       handleImageSelection(file);
// //     } else {
// //       showToast("Invalid file", "Please select a valid image file", "destructive");
// //     }
// //   };

// //   const handleImageSelection = (file: File) => {
// //     setSelectedFile(file);
// //     const previewUrl = URL.createObjectURL(file);
// //     setPreviewImage(previewUrl);
// //     setUploadedImage(null);
// //     setUploadSuccess(false);
// //     showToast("Image ready", "Review your image and click Upload to confirm");
// //   };

// //   const confirmUpload = async () => {
// //     if (!selectedFile) return;

// //     setIsUploading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append('img', selectedFile);

// //       const response = await fetch('https://spideyxxx.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/img-hash', {
// //         method: 'POST',
// //         body: formData
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();
// //       console.log('Image Upload API Response:', result);

// //       setUploadedImage(previewImage);
// //       setPreviewImage(null);
// //       setSelectedFile(null);
// //       setUploadSuccess(true);

// //       showToast("Success", "Image uploaded successfully!");

// //     } catch (error) {
// //       console.error('Upload error:', error);
// //       showToast("Upload failed", "Please check your connection and try again", "destructive");
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   const cancelPreview = () => {
// //     if (previewImage) {
// //       URL.revokeObjectURL(previewImage);
// //     }
// //     setPreviewImage(null);
// //     setSelectedFile(null);
// //   };

// //   const removeUploadedImage = () => {
// //     if (uploadedImage) {
// //       URL.revokeObjectURL(uploadedImage);
// //     }
// //     setUploadedImage(null);
// //     setUploadSuccess(false);
// //   };

// //   const openFileDialog = () => {
// //     fileInputRef.current?.click();
// //   };

// //   const selectCampaign = (campaign: Campaign) => {
// //     setSelectedCampaign(campaign);
// //   };
// //   const formatDateForAPI = (date: Date | string | null | undefined): string => {
// //     try {
// //       // Handle null/undefined
// //       if (!date) {
// //         return new Date().toISOString();
// //       }
      
// //       // If it's already a Date object
// //       if (date instanceof Date) {
// //         if (isNaN(date.getTime())) {
// //           console.error('Invalid Date object:', date);
// //           return new Date().toISOString();
// //         }
// //         return date.toISOString();
// //       }
      
// //       // If it's a string, convert to Date
// //       if (typeof date === 'string') {
// //         const dateObj = new Date(date);
// //         if (isNaN(dateObj.getTime())) {
// //           console.error('Invalid date string:', date);
// //           return new Date().toISOString();
// //         }
// //         return dateObj.toISOString();
// //       }
      
// //       // Fallback for any other type
// //       console.warn('Unexpected date type:', typeof date, date);
// //       return new Date().toISOString();
      
// //     } catch (error) {
// //       console.error('Error formatting date:', error, 'Original value:', date);
// //       return new Date().toISOString();
// //     }
// //   };

// //   const handleCreateCampaign = async () => {
// //     if (!uploadSuccess) {
// //       showToast("Image Required", "Please upload an image before creating the campaign", "destructive");
// //       return;
// //     }

// //     if (!campaignConfigData) {
// //       showToast("Configuration Missing", "Campaign configuration data is missing", "destructive");
// //       return;
// //     }

// //     setIsCreatingCampaign(true);

// //     try {
// //       const budgetInCents = Math.round(campaignConfigData.dailyBudget * 100);

// //       // Build the comprehensive API payload
// //       const apiPayload = {
// //         campaign: {
// //           name: campaignConfigData.projectName,
// //           objective: campaignConfigData.adGoal,
// //           status: "PAUSED",
// //           special_ad_categories: []
// //         },
// //         adsets: [
// //           {
// //             name: `${campaignConfigData.projectName} - Ad Set 1`,
// //             daily_budget: budgetInCents.toString(),
// //             start_time: formatDateForAPI(campaignConfigData.startDate),
// //             end_time: formatDateForAPI(campaignConfigData.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
// //             status: "PAUSED",
// //             billing_event: "IMPRESSIONS",
// //             optimization_goal: campaignConfigData.adGoal === "REACH" ? "REACH" : "CONVERSIONS",
// //             bid_strategy: "LOWEST_COST_WITHOUT_CAP",
// //             targeting: {
// //               geo_locations: {
// //                 countries: [campaignConfigData.selectedCountry || "US"],
// //                 location_types: ["home", "recent"]
// //               }
// //             }
// //           }
// //         ],
// //         // Add campaign studio data
// //         studio_data: {
// //           selected_campaign: selectedCampaign,
// //           product_description: campaignConfigData.productDescription,
// //           conversion_button: campaignConfigData.conversionButton,
// //           uploaded_image: uploadedImage ? true : false,
// //           campaign_type: selectedCampaign.type,
// //           ai_score: selectedCampaign.aiScore
// //         },
// //         // Add the sample ad sets from your requirements
// //         ai_generated_adsets: sampleAdSets
// //       };

// //       console.log("Sending to API:", apiPayload);

// //       const response = await fetch("https://spideyxxx.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/meta-ad-setup", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(apiPayload)
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("Campaign Creation API Response:", result);
// //         showToast("Success", "Campaign created successfully!");

// //         // Clear stored data
// //         sessionStorage.removeItem('campaignConfigData');

// //         // Navigate to success page or campaign dashboard
// //         navigate('/CampaignCard');
// //       } else {
// //         console.error("API Error:", response.status, response.statusText);
// //         showToast("Creation Failed", "Failed to create campaign. Please try again.", "destructive");
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       showToast("Network Error", "Please check your connection and try again.", "destructive");
// //     } finally {
// //       setIsCreatingCampaign(false);
// //     }
// //   };

// //   const handlePrevious = () => {
// //     navigate('/CampaignConfig');
// //   };

// //   const getTypeColor = (type: string) => {
// //     switch (type.toLowerCase()) {
// //       case 'carousel': return 'bg-blue-100 text-blue-800';
// //       case 'conversion': return 'bg-green-100 text-green-800';
// //       case 'video': return 'bg-purple-100 text-purple-800';
// //       default: return 'bg-slate-100 text-slate-800';
// //     }
// //   };

// //   const getTypeIcon = (type: string) => {
// //     switch (type.toLowerCase()) {
// //       case 'carousel': return '🖼️';
// //       case 'conversion': return '📢';
// //       case 'video': return '▶️';
// //       default: return '📱';
// //     }
// //   };

// //   if (!campaignConfigData) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading campaign data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
// //       <div className="container mx-auto px-4 py-8 max-w-7xl">

// //         {/* Header Section */}
// //         <div className="text-center mb-12">
// //           <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
// //             <span className="mr-2">🤖</span>
// //             AI-Powered Campaign Studio
// //           </div>
// //           <h1 className="text-4xl font-bold text-slate-900 mb-4">
// //             Transform Your Marketing with Intelligent Campaigns
// //           </h1>
// //           <p className="text-xl text-slate-600 max-w-3xl mx-auto">
// //             Campaign: <span className="font-semibold text-slate-800">{campaignConfigData.projectName}</span>
// //           </p>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-8">

// //           {/* Campaign Selection Panel */}
// //           <div className="lg:col-span-2 space-y-6">
// //             <div className="flex items-center justify-between mb-6">
// //               <h2 className="text-2xl font-bold text-slate-900">AI-Generated Campaigns</h2>
// //               <Button variant="outline" className="inline-flex items-center">
// //                 <RotateCcw className="h-4 w-4 mr-2" />
// //                 Regenerate
// //               </Button>
// //             </div>

// //             {/* Campaign Cards */}
// //             {campaigns.map((campaign) => (
// //               <Card
// //                 key={campaign.id}
// //                 className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-slate-300 ${selectedCampaign.id === campaign.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
// //                   }`}
// //                 onClick={() => selectCampaign(campaign)}
// //                 data-testid={`card-campaign-${campaign.id}`}
// //               >
// //                 <CardContent className="p-0">
// //                   <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
// //                     <div className="flex items-start justify-between mb-3">
// //                       <div className="flex items-center space-x-3">
// //                         <span className={`${getTypeColor(campaign.type)} flex items-center space-x-1 px-3 py-1 rounded-full`}>
// //                           <span className="text-xs">{getTypeIcon(campaign.type)}</span>
// //                           <span className="capitalize font-medium text-sm">{campaign.type}</span>
// //                         </span>
// //                         <div className="bg-white rounded-full px-3 py-1 border border-slate-200">
// //                           <span className="text-emerald-600 font-bold text-sm">{campaign.aiScore}%</span>
// //                           <span className="text-slate-500 text-xs ml-1">AI Score</span>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center space-x-1 bg-amber-50 rounded-full px-3 py-1">
// //                         <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
// //                         <span className="font-bold text-amber-700 text-sm">{campaign.rating}</span>
// //                       </div>
// //                     </div>

// //                     <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
// //                       {campaign.title}
// //                     </h4>

// //                     <p className="text-slate-600 leading-relaxed">
// //                       {campaign.description}
// //                     </p>
// //                   </div>

// //                   <div className="p-6">
// //                     <div className="grid grid-cols-3 gap-4 mb-6">
// //                       <div className="text-center p-3 bg-blue-50 rounded-xl">
// //                         <p className="text-blue-600 text-xs font-medium uppercase tracking-wide">CTR</p>
// //                         <p className="text-xl font-bold text-blue-700">{campaign.ctr}</p>
// //                       </div>
// //                       <div className="text-center p-3 bg-green-50 rounded-xl">
// //                         <p className="text-green-600 text-xs font-medium uppercase tracking-wide">CPC</p>
// //                         <p className="text-xl font-bold text-green-700">{campaign.cpc}</p>
// //                       </div>
// //                       <div className="text-center p-3 bg-purple-50 rounded-xl">
// //                         <p className="text-purple-600 text-xs font-medium uppercase tracking-wide">ROAS</p>
// //                         <p className="text-xl font-bold text-purple-700">{campaign.roas}</p>
// //                       </div>
// //                     </div>

// //                     <Button
// //                       className={`w-full bg-gradient-to-r ${campaign.buttonColor} text-white hover:opacity-90 transition-opacity`}
// //                       data-testid={`button-preview-${campaign.id}`}
// //                     >
// //                       Preview Campaign
// //                     </Button>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}

// //             {/* Targeting Strategy Card */}
// //             <Card className="mt-8">
// //               <CardContent className="p-6">
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
// //                   <Target className="h-5 w-5 mr-2 text-blue-600" />
// //                   AI-Optimized Targeting Strategy
// //                 </h3>

// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <div>
// //                     <h4 className="font-medium text-slate-700 mb-2">Campaign Name</h4>
// //                     <p className="text-slate-600 text-sm">{campaignConfigData.projectName}</p>
// //                   </div>

// //                   <div>
// //                     <h4 className="font-medium text-slate-700 mb-2">Daily Budget</h4>
// //                     <p className="text-slate-600 text-sm">${campaignConfigData.dailyBudget}/day</p>
// //                   </div>

// //                   <div>
// //                     <h4 className="font-medium text-slate-700 mb-2">Target Location</h4>
// //                     <p className="text-slate-600 text-sm">{campaignConfigData.targetingLocation}</p>
// //                   </div>

// //                   <div>
// //                     <h4 className="font-medium text-slate-700 mb-2">Campaign Duration</h4>
// //                     <p className="text-slate-600 text-sm">
// //                       {campaignConfigData.startDate ? new Date(campaignConfigData.startDate).toLocaleDateString() : 'Not set'} - {campaignConfigData.endDate ? new Date(campaignConfigData.endDate).toLocaleDateString() : 'Not set'}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Mobile Preview Panel */}
// //           <div className="lg:col-span-1">
// //             <Card className="sticky top-8">
// //               <CardContent className="p-6">
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
// //                   <div className={`w-2 h-2 rounded-full mr-2 ${uploadSuccess ? 'bg-green-400' :
// //                       previewImage ? 'bg-orange-400' : 'bg-blue-400'
// //                     } animate-pulse`}></div>
// //                   {uploadSuccess ? 'Image Uploaded!' :
// //                     previewImage ? 'Preview Mode' :
// //                       'Live Preview with Image Upload'}
// //                 </h3>

// //                 {/* Mobile Device Frame */}
// //                 <div className="relative mx-auto max-w-sm" data-testid="mobile-preview">
// //                   {/* Phone Frame */}
// //                   <div className="bg-slate-900 rounded-3xl p-2 shadow-2xl">
// //                     {/* Screen */}
// //                     <div className="bg-black rounded-2xl p-1">
// //                       <div className="bg-white rounded-xl overflow-hidden relative">
// //                         {/* Status Bar */}
// //                         <div className="bg-slate-50 px-4 py-2 flex justify-between items-center text-xs relative z-10">
// //                           <span className="font-medium">9:41</span>
// //                           <div className="flex items-center space-x-1">
// //                             <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
// //                             <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
// //                             <div className="w-6 h-3 border border-slate-400 rounded-sm">
// //                               <div className="w-4 h-2 bg-green-400 rounded-sm m-0.5"></div>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         {/* Main Content Area */}
// //                         <div className="relative" style={{ minHeight: '500px' }}>
// //                           {/* STATE 1: Default Content (No Image) */}
// //                           {!previewImage && !uploadedImage && (
// //                             <div data-testid="default-content">
// //                               {/* App Header */}
// //                               <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200">
// //                                 <div className="flex items-center space-x-3">
// //                                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
// //                                     <span className="text-white text-xs font-bold">CS</span>
// //                                   </div>
// //                                   <div>
// //                                     <p className="font-semibold text-slate-900 text-sm">Campaign Studio</p>
// //                                     <p className="text-slate-500 text-xs">Sponsored</p>
// //                                   </div>
// //                                 </div>
// //                               </div>

// //                               {/* Preview Content */}
// //                               <div className="p-4">
// //                                 <p className="text-slate-700 text-sm mb-4 leading-relaxed" data-testid="text-campaign-description">
// //                                   {selectedCampaign.description}
// //                                 </p>

// //                                 {/* Image Upload Area */}
// //                                 <div className="mb-4" data-testid="upload-area">
// //                                   <div
// //                                     className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive
// //                                         ? 'border-blue-500 bg-blue-50'
// //                                         : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
// //                                       }`}
// //                                     onDrop={handleDrop}
// //                                     onDragOver={handleDragOver}
// //                                     onDragEnter={handleDragEnter}
// //                                     onDragLeave={handleDragLeave}
// //                                     onClick={openFileDialog}
// //                                     data-testid="drop-zone"
// //                                   >
// //                                     <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
// //                                     <p className="text-slate-600 text-sm font-medium mb-1">Upload Campaign Image</p>
// //                                     <p className="text-slate-500 text-xs">Drag & drop or click to select</p>
// //                                   </div>

// //                                   {/* Hidden File Input */}
// //                                   <input
// //                                     ref={fileInputRef}
// //                                     type="file"
// //                                     accept="image/*"
// //                                     style={{ display: 'none' }}
// //                                     onChange={handleFileInput}
// //                                     data-testid="input-file"
// //                                   />
// //                                 </div>

// //                                 {/* Campaign Title and CTA */}
// //                                 <div className="text-center mb-4">
// //                                   <h4 className="font-bold text-slate-900 text-sm mb-3" data-testid="text-campaign-title">
// //                                     {selectedCampaign.title}
// //                                   </h4>

// //                                   <Button
// //                                     className={`w-full bg-gradient-to-r ${selectedCampaign.buttonColor} text-white text-sm`}
// //                                     data-testid="button-campaign-cta"
// //                                   >
// //                                     {selectedCampaign.buttonText}
// //                                   </Button>
// //                                 </div>

// //                                 {/* Social Engagement */}
// //                                 <div className="flex items-center justify-between text-slate-500 text-xs pt-3 border-t border-slate-200">
// //                                   <div className="flex items-center space-x-4">
// //                                     <span className="flex items-center space-x-1">
// //                                       <Heart className="h-3 w-3" />
// //                                       <span>324</span>
// //                                     </span>
// //                                     <span className="flex items-center space-x-1">
// //                                       <MessageCircle className="h-3 w-3" />
// //                                       <span>12</span>
// //                                     </span>
// //                                   </div>
// //                                   <span className="flex items-center space-x-1">
// //                                     <Share className="h-3 w-3" />
// //                                     <span>Share</span>
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* STATE 2: Preview Mode (Before Upload) */}
// //                           {previewImage && (
// //                             <div className="absolute inset-0" data-testid="preview-mode">
// //                               {/* Close Button */}
// //                               <button
// //                                 onClick={cancelPreview}
// //                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
// //                                 data-testid="button-cancel-preview"
// //                               >
// //                                 <X className="h-4 w-4" />
// //                               </button>

// //                               {/* Full Screen Image Preview */}
// //                               <div className="h-full relative">
// //                                 <img
// //                                   src={previewImage}
// //                                   alt="Image preview"
// //                                   className="w-full h-full object-contain bg-black"
// //                                   data-testid="img-preview"
// //                                 />

// //                                 {/* Overlay with Confirmation Controls */}
// //                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
// //                                   {/* Campaign Info */}
// //                                   <div className="text-white mb-4">
// //                                     <h4 className="font-bold text-sm mb-2">
// //                                       {selectedCampaign.title}
// //                                     </h4>
// //                                   </div>

// //                                   {/* Confirmation Buttons */}
// //                                   <div className="flex gap-2">
// //                                     <Button
// //                                       onClick={cancelPreview}
// //                                       variant="secondary"
// //                                       className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
// //                                       data-testid="button-cancel"
// //                                     >
// //                                       <X className="h-4 w-4 mr-2" />
// //                                       Cancel
// //                                     </Button>
// //                                     <Button
// //                                       onClick={confirmUpload}
// //                                       disabled={isUploading}
// //                                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
// //                                       data-testid="button-confirm-upload"
// //                                     >
// //                                       <Upload className="h-4 w-4 mr-2" />
// //                                       {isUploading ? 'Uploading...' : 'Upload'}
// //                                     </Button>
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* STATE 3: Final Uploaded Image */}
// //                           {uploadedImage && (
// //                             <div className="absolute inset-0" data-testid="uploaded-image">
// //                               {/* Close Button */}
// //                               <button
// //                                 onClick={removeUploadedImage}
// //                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
// //                                 data-testid="button-remove-uploaded"
// //                               >
// //                                 <X className="h-4 w-4" />
// //                               </button>

// //                               {/* Success Badge */}
// //                               <div className="absolute top-2 left-2 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
// //                                 <Check className="h-3 w-3 mr-1" />
// //                                 Uploaded
// //                               </div>

// //                               {/* Final Image Display */}
// //                               <div className="h-full relative">
// //                                 <img
// //                                   src={uploadedImage}
// //                                   alt="Uploaded campaign image"
// //                                   className="w-full h-full object-contain bg-black"
// //                                   data-testid="img-uploaded"
// //                                 />

// //                                 {/* Campaign Overlay */}
// //                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
// //                                   <h4 className="font-bold text-sm mb-2">
// //                                     {selectedCampaign.title}
// //                                   </h4>
// //                                   <Button
// //                                     className={`w-full bg-gradient-to-r ${selectedCampaign.buttonColor} text-white text-sm mb-3`}
// //                                   >
// //                                     {selectedCampaign.buttonText}
// //                                   </Button>

// //                                   {/* Social Engagement */}
// //                                   <div className="flex items-center justify-between text-white/80 text-xs">
// //                                     <div className="flex items-center space-x-4">
// //                                       <span className="flex items-center space-x-1">
// //                                         <Heart className="h-3 w-3" />
// //                                         <span>567</span>
// //                                       </span>
// //                                       <span className="flex items-center space-x-1">
// //                                         <MessageCircle className="h-3 w-3" />
// //                                         <span>34</span>
// //                                       </span>
// //                                     </div>
// //                                     <span className="flex items-center space-x-1">
// //                                       <Share className="h-3 w-3" />
// //                                       <span>Share</span>
// //                                     </span>
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Upload Loading Overlay */}
// //                           {isUploading && (
// //                             <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-30" data-testid="upload-loading">
// //                               <div className="text-center">
// //                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
// //                                 <p className="text-slate-700 font-medium">Uploading image...</p>
// //                                 <p className="text-slate-500 text-sm">Please wait</p>
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Status Messages */}
// //                 <div className="mt-4">
// //                   {previewImage && !isUploading && (
// //                     <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
// //                       <div className="flex items-center">
// //                         <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
// //                         <span className="text-orange-800 text-sm font-medium">Preview ready - Click Upload to confirm</span>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {uploadSuccess && (
// //                     <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
// //                       <div className="flex items-center">
// //                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
// //                         <span className="text-green-800 text-sm font-medium">Image uploaded successfully!</span>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom Action Bar */}
// //       <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40">
// //         <div className="max-w-7xl mx-auto px-6 py-4">
// //           <div className="flex items-center justify-center space-x-4">
// //             <Button
// //               onClick={handlePrevious}
// //               className="flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-50"
// //               data-testid="button-previous"
// //             >
// //               Previous
// //             </Button>
// //             <Button
// //               onClick={handleCreateCampaign}
// //               disabled={!uploadSuccess || isCreatingCampaign}
// //               className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
// //               data-testid="button-create-campaign"
// //             >
// //               {isCreatingCampaign ? "Creating..." : "Create Campaign"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Heart, MessageCircle, Share, Upload, X, Check, ChevronDown } from "lucide-react";

// interface AdSet {
//   ad_set_name: string;
//   campaign_objective: string;
//   target_audience: {
//     location: string;
//     age_range: string;
//     gender: string;
//     interests: string[];
//   };
//   placements: string[];
//   daily_budget: string;
//   creative_brief: string;
//   ad_copy_variations: {
//     short_form: string[];
//     long_form: string[];
//   };
//   primary_text: string;
//   headline: string;
//   call_to_action: string;
// }

// const adSetsData: AdSet[] = [
//   {
//     ad_set_name: "Ultimate Driving Experience - Thrill Seekers 18-40",
//     campaign_objective: "Video Views",
//     target_audience: {
//       location: "Global",
//       age_range: "18-40",
//       gender: "All",
//       interests: ["Car Enthusiasts", "Driving", "Sports Cars", "Car Racing", "BMW"]
//     },
//     placements: ["YouTube In-Stream Ads", "YouTube Shorts Ads", "YouTube Feed"],
//     daily_budget: "250 USD",
//     creative_brief: "Use high-energy action shots of BMW cars on mountain roads to evoke excitement and passion for driving, paired with an energetic soundtrack that captures the thrill and performance of BMW vehicles.",
//     ad_copy_variations: {
//       short_form: [
//         "Unleash your inner driver with BMW.",
//         "Feel the thrill of every turn in a BMW.",
//         "BMW — where passion meets performance."
//       ],
//       long_form: [
//         "Experience the ultimate driving thrill with BMW. Every turn ignites passion and delivers unmatched performance for those who crave excitement behind the wheel.",
//         "Dive into a driving experience designed for thrill seekers. BMW offers precision handling and adrenaline-pumping performance for car enthusiasts aged 18-40."
//       ]
//     },
//     primary_text: "Unleash your inner driver with BMW—where every turn ignites passion and performance.",
//     headline: "Ignite Your Driving Passion",
//     call_to_action: "Learn More"
//   },
//   {
//     ad_set_name: "Luxury Meets Innovation - Tech-Savvy Pros 28-50",
//     campaign_objective: "Conversions",
//     target_audience: {
//       location: "Global",
//       age_range: "28-50",
//       gender: "All",
//       interests: ["Luxury Cars", "Technology", "BMW", "Infotainment Systems", "Smart Devices", "Professional Networking"]
//     },
//     placements: ["Instagram Feed", "Instagram Stories", "Instagram Reels"],
//     daily_budget: "220 USD",
//     creative_brief: "Show cinematic lifestyle videos highlighting BMW's advanced infotainment systems and customizable technology features that appeal to sophisticated, tech-savvy professionals seeking confidence and luxury.",
//     ad_copy_variations: {
//       short_form: [
//         "Step into luxury with BMW tech.",
//         "Luxury and innovation, redefined.",
//         "Drive confidently with BMW technology."
//       ],
//       long_form: [
//         "Embrace the future of luxury driving with BMW. Advanced technology and sophisticated design come together for professionals who demand the best.",
//         "Experience BMW's cutting-edge infotainment and customization options crafted for tech-savvy drivers who value innovation and elegance."
//       ]
//     },
//     primary_text: "Step into the future of luxury with BMW—crafted technology for the sophisticated driver.",
//     headline: "Luxury Driven by Innovation",
//     call_to_action: "Learn More"
//   },
//   {
//     ad_set_name: "Sustainable Luxury Lifestyle - Eco-Conscious 30-55",
//     campaign_objective: "Brand Awareness",
//     target_audience: {
//       location: "Global",
//       age_range: "30-55",
//       gender: "All",
//       interests: ["Electric Vehicles", "Sustainability", "Luxury Lifestyle", "BMW", "Eco-Friendly Products", "Green Living"]
//     },
//     placements: ["Facebook Feed", "Facebook Stories", "Facebook Marketplace"],
//     daily_budget: "200 USD",
//     creative_brief: "Present elegant shots of BMW electric models in upscale, eco-friendly neighborhoods featuring solar charging stations and green spaces, emphasizing responsible pride in sustainable luxury.",
//     ad_copy_variations: {
//       short_form: [
//         "Luxury meets sustainability with BMW.",
//         "Drive green, live elegant.",
//         "BMW electric: luxury without compromise."
//       ],
//       long_form: [
//         "Experience sustainable luxury like never before with BMW's eco-friendly innovations. Drive in elegance while making a positive impact on the planet.",
//         "Join affluent eco-conscious drivers who choose BMW for a sustainable lifestyle that doesn't sacrifice luxury or performance."
//       ]
//     },
//     primary_text: "Drive in elegance while protecting the planet—experience BMW's eco-friendly innovation.",
//     headline: "Eco-Friendly Luxury Driving",
//     call_to_action: "Learn More"
//   }
// ];

// export default function CampaignStudio() {
//   const [selectedAdSet, setSelectedAdSet] = useState<AdSet>(adSetsData[0]);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [expandedSections, setExpandedSections] = useState<{[key: number]: {[key: string]: boolean}}>({});
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const showToast = (title: string, description: string) => {
//     console.log(`Toast: ${title} - ${description}`);
//   };

//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const files = e.dataTransfer.files;
//     if (files.length > 0 && files[0].type.startsWith('image/')) {
//       handleImageSelection(files[0]);
//     } else {
//       showToast("Invalid file", "Please drop a valid image file");
//     }
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       handleImageSelection(file);
//     } else {
//       showToast("Invalid file", "Please select a valid image file");
//     }
//   };

//   const handleImageSelection = (file: File) => {
//     setSelectedFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreviewImage(previewUrl);
//     setUploadedImage(null);
//     setUploadSuccess(false);
//     showToast("Image ready", "Review your image and click Upload to confirm");
//   };

//   const confirmUpload = async () => {
//     if (!selectedFile) return;

//     setIsUploading(true);

//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       setUploadedImage(previewImage);
//       setPreviewImage(null);
//       setSelectedFile(null);
//       setUploadSuccess(true);

//       showToast("Success", "Image uploaded successfully!");

//     } catch (error) {
//       console.error('Upload error:', error);
//       showToast("Upload failed", "Please check your connection and try again");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const cancelPreview = () => {
//     if (previewImage) {
//       URL.revokeObjectURL(previewImage);
//     }
//     setPreviewImage(null);
//     setSelectedFile(null);
//   };

//   const removeUploadedImage = () => {
//     if (uploadedImage) {
//       URL.revokeObjectURL(uploadedImage);
//     }
//     setUploadedImage(null);
//     setUploadSuccess(false);
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   const selectAdSet = (adSet: AdSet) => {
//     setSelectedAdSet(adSet);
//   };

//   const toggleSection = (adSetIndex: number, section: string) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [adSetIndex]: {
//         ...prev[adSetIndex],
//         [section]: !prev[adSetIndex]?.[section]
//       }
//     }));
//   };

//   const getObjectiveColor = (objective: string) => {
//     switch (objective) {
//       case 'Video Views': return 'bg-purple-100 text-purple-800';
//       case 'Conversions': return 'bg-green-100 text-green-800';
//       case 'Brand Awareness': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const extractBudgetAmount = (budget: string) => {
//     const match = budget.match(/\d+/);
//     return match ? `$${match[0]}` : budget;
//   };

//   const formatAgeRange = (ageRange: string) => {
//     return ageRange.replace('-', ' - ');
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4 py-6 max-w-7xl">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             🎯 Top - Performing Ad Sets
//           </h1>
//           <p className="text-gray-600">
//             Select an ad set to preview and customize your campaign
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-5 gap-6">

//           {/* Left Side - Ad Sets List */}
//           <div className="lg:col-span-3 space-y-4">
//             {adSetsData.map((adSet, index) => (
//               <Card
//                 key={index}
//                 className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
//                   selectedAdSet.ad_set_name === adSet.ad_set_name 
//                     ? 'ring-2 ring-blue-500 bg-blue-50' 
//                     : 'hover:bg-gray-50'
//                 }`}
//                 onClick={() => selectAdSet(adSet)}
//               >
//                 <CardContent className="p-6">
//                   {/* Ad Set Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-2">
//                       <div className={`w-3 h-3 rounded-full ${
//                         selectedAdSet.ad_set_name === adSet.ad_set_name 
//                           ? 'bg-green-500' 
//                           : 'bg-gray-300'
//                       }`}></div>
//                       <span className="text-sm text-gray-600 font-medium">
//                         Ad Set - {String(index + 1).padStart(2, '0')}
//                       </span>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getObjectiveColor(adSet.campaign_objective)}`}>
//                       {adSet.campaign_objective}
//                     </span>
//                   </div>

//                   {/* Ad Set Name */}
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     {adSet.ad_set_name}
//                   </h3>

//                   {/* Key Metrics */}
//                   <div className="grid grid-cols-4 gap-4 mb-4">
//                     <div className="text-center">
//                       <p className="text-xs text-gray-500 font-medium">Age</p>
//                       <p className="text-sm font-bold text-gray-900">{formatAgeRange(adSet.target_audience.age_range)}</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-gray-500 font-medium">Gender</p>
//                       <p className="text-sm font-bold text-gray-900">{adSet.target_audience.gender}</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-gray-500 font-medium">Location</p>
//                       <p className="text-sm font-bold text-gray-900">{adSet.target_audience.location}</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-gray-500 font-medium">Ad Set Spend</p>
//                       <p className="text-sm font-bold text-gray-900">{extractBudgetAmount(adSet.daily_budget)}</p>
//                     </div>
//                   </div>

//                   {/* Expandable Sections */}
//                   <div className="space-y-3">
//                     {/* Audience Description */}
//                     <div className="border rounded-lg">
//                       <button
//                         className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleSection(index, 'audience');
//                         }}
//                       >
//                         <span className="font-medium text-gray-700">Audience Description</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${
//                           expandedSections[index]?.audience ? 'rotate-180' : ''
//                         }`} />
//                       </button>
//                       {expandedSections[index]?.audience && (
//                         <div className="px-4 pb-4">
//                           <p className="text-sm text-gray-600 mb-3">{adSet.creative_brief}</p>
//                           <div className="space-y-2">
//                             <p className="text-xs font-medium text-gray-700">Interests:</p>
//                             <div className="flex flex-wrap gap-2">
//                               {adSet.target_audience.interests.map((interest, idx) => (
//                                 <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
//                                   {interest}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Ad Copy */}
//                     <div className="border rounded-lg">
//                       <button
//                         className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleSection(index, 'adcopy');
//                         }}
//                       >
//                         <span className="font-medium text-gray-700">Ad Copy</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${
//                           expandedSections[index]?.adcopy ? 'rotate-180' : ''
//                         }`} />
//                       </button>
//                       {expandedSections[index]?.adcopy && (
//                         <div className="px-4 pb-4 space-y-3">
//                           <div>
//                             <p className="text-xs font-medium text-gray-700 mb-1">Primary Text:</p>
//                             <p className="text-sm text-gray-600">{adSet.primary_text}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs font-medium text-gray-700 mb-1">Headline:</p>
//                             <p className="text-sm text-gray-600">{adSet.headline}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs font-medium text-gray-700 mb-1">Call to Action:</p>
//                             <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                               {adSet.call_to_action}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Audience Tags */}
//                     <div className="border rounded-lg">
//                       <button
//                         className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleSection(index, 'tags');
//                         }}
//                       >
//                         <span className="font-medium text-gray-700">Audience Tags</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${
//                           expandedSections[index]?.tags ? 'rotate-180' : ''
//                         }`} />
//                       </button>
//                       {expandedSections[index]?.tags && (
//                         <div className="px-4 pb-4">
//                           <div className="space-y-2">
//                             <p className="text-xs font-medium text-gray-700">Placements:</p>
//                             <div className="flex flex-wrap gap-2">
//                               {adSet.placements.map((placement, idx) => (
//                                 <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
//                                   {placement}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Right Side - Mobile Preview */}
//           <div className="lg:col-span-2">
//             <Card className="sticky top-6">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <div className={`w-2 h-2 rounded-full mr-2 ${uploadSuccess ? 'bg-green-400' :
//                       previewImage ? 'bg-orange-400' : 'bg-blue-400'
//                     } animate-pulse`}></div>
//                   {uploadSuccess ? 'Image Uploaded!' :
//                     previewImage ? 'Preview Mode' :
//                       'Live Preview with Image Upload'}
//                 </h3>

//                 {/* Mobile Device Frame */}
//                 <div className="relative mx-auto max-w-sm">
//                   {/* Phone Frame */}
//                   <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
//                     {/* Screen */}
//                     <div className="bg-black rounded-2xl p-1">
//                       <div className="bg-white rounded-xl overflow-hidden relative">
//                         {/* Status Bar */}
//                         <div className="bg-gray-50 px-4 py-2 flex justify-between items-center text-xs relative z-10">
//                           <span className="font-medium">9:41</span>
//                           <div className="flex items-center space-x-1">
//                             <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
//                             <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                             <div className="w-6 h-3 border border-gray-400 rounded-sm">
//                               <div className="w-4 h-2 bg-green-400 rounded-sm m-0.5"></div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="relative" style={{ minHeight: '500px' }}>
//                           {/* Default Content (No Image) */}
//                           {!previewImage && !uploadedImage && (
//                             <div>
//                               {/* App Header */}
//                               <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 border-b border-gray-200">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                                     <span className="text-white text-xs font-bold">BMW</span>
//                                   </div>
//                                   <div>
//                                     <p className="font-semibold text-gray-900 text-sm">{selectedAdSet.ad_set_name.split(' - ')[0]}</p>
//                                     <p className="text-gray-500 text-xs">Sponsored</p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Preview Content */}
//                               <div className="p-4">
//                                 <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//                                   {selectedAdSet.primary_text}
//                                 </p>

//                                 {/* Image Upload Area */}
//                                 <div className="mb-4">
//                                   <div
//                                     className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive
//                                         ? 'border-blue-500 bg-blue-50'
//                                         : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
//                                       }`}
//                                     onDrop={handleDrop}
//                                     onDragOver={handleDragOver}
//                                     onDragEnter={handleDragEnter}
//                                     onDragLeave={handleDragLeave}
//                                     onClick={openFileDialog}
//                                   >
//                                     <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
//                                     <p className="text-gray-600 text-sm font-medium mb-1">Upload Campaign Image</p>
//                                     <p className="text-gray-500 text-xs">Drag & drop or click to select</p>
//                                   </div>

//                                   <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     accept="image/*"
//                                     style={{ display: 'none' }}
//                                     onChange={handleFileInput}
//                                   />
//                                 </div>

//                                 {/* Campaign Title and CTA */}
//                                 <div className="text-center mb-4">
//                                   <h4 className="font-bold text-gray-900 text-sm mb-3">
//                                     {selectedAdSet.headline}
//                                   </h4>

//                                   <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm">
//                                     {selectedAdSet.call_to_action}
//                                   </Button>
//                                 </div>

//                                 {/* Social Engagement */}
//                                 <div className="flex items-center justify-between text-gray-500 text-xs pt-3 border-t border-gray-200">
//                                   <div className="flex items-center space-x-4">
//                                     <span className="flex items-center space-x-1">
//                                       <Heart className="h-3 w-3" />
//                                       <span>324</span>
//                                     </span>
//                                     <span className="flex items-center space-x-1">
//                                       <MessageCircle className="h-3 w-3" />
//                                       <span>12</span>
//                                     </span>
//                                   </div>
//                                   <span className="flex items-center space-x-1">
//                                     <Share className="h-3 w-3" />
//                                     <span>Share</span>
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Preview Mode (Before Upload) */}
//                           {previewImage && (
//                             <div className="absolute inset-0">
//                               {/* Close Button */}
//                               <button
//                                 onClick={cancelPreview}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               {/* Full Screen Image Preview */}
//                               <div className="h-full relative">
//                                 <img
//                                   src={previewImage}
//                                   alt="Image preview"
//                                   className="w-full h-full object-contain bg-black"
//                                 />

//                                 {/* Overlay with Confirmation Controls */}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
//                                   {/* Campaign Info */}
//                                   <div className="text-white mb-4">
//                                     <h4 className="font-bold text-sm mb-2">
//                                       {selectedAdSet.headline}
//                                     </h4>
//                                     <p className="text-xs opacity-90">
//                                       {selectedAdSet.primary_text}
//                                     </p>
//                                   </div>

//                                   {/* Confirmation Buttons */}
//                                   <div className="flex gap-2">
//                                     <Button
//                                       onClick={cancelPreview}
//                                       variant="secondary"
//                                       className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
//                                     >
//                                       <X className="h-4 w-4 mr-2" />
//                                       Cancel
//                                     </Button>
//                                     <Button
//                                       onClick={confirmUpload}
//                                       disabled={isUploading}
//                                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//                                     >
//                                       <Upload className="h-4 w-4 mr-2" />
//                                       {isUploading ? 'Uploading...' : 'Upload'}
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Final Uploaded Image */}
//                           {uploadedImage && (
//                             <div className="absolute inset-0">
//                               {/* Close Button */}
//                               <button
//                                 onClick={removeUploadedImage}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               {/* Success Badge */}
//                               <div className="absolute top-2 left-2 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
//                                 <Check className="h-3 w-3 mr-1" />
//                                 Uploaded
//                               </div>

//                               {/* Final Image Display */}
//                               <div className="h-full relative">
//                                 <img
//                                   src={uploadedImage}
//                                   alt="Uploaded campaign image"
//                                   className="w-full h-full object-contain bg-black"
//                                 />

//                                 {/* Campaign Overlay */}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
//                                   <h4 className="font-bold text-sm mb-2">
//                                     {selectedAdSet.headline}
//                                   </h4>
//                                   <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm mb-3">
//                                     {selectedAdSet.call_to_action}
//                                   </Button>

//                                   {/* Social Engagement */}
//                                   <div className="flex items-center justify-between text-white/80 text-xs">
//                                     <div className="flex items-center space-x-4">
//                                       <span className="flex items-center space-x-1">
//                                         <Heart className="h-3 w-3" />
//                                         <span>567</span>
//                                       </span>
//                                       <span className="flex items-center space-x-1">
//                                         <MessageCircle className="h-3 w-3" />
//                                         <span>34</span>
//                                       </span>
//                                     </div>
//                                     <span className="flex items-center space-x-1">
//                                       <Share className="h-3 w-3" />
//                                       <span>Share</span>
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Upload Loading Overlay */}
//                           {isUploading && (
//                             <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-30">
//                               <div className="text-center">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
//                                 <p className="text-gray-700 font-medium">Uploading image...</p>
//                                 <p className="text-gray-500 text-sm">Please wait</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status Messages */}
//                 <div className="mt-4">
//                   {previewImage && !isUploading && (
//                     <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
//                         <span className="text-orange-800 text-sm font-medium">Preview ready - Click Upload to confirm</span>
//                       </div>
//                     </div>
//                   )}

//                   {uploadSuccess && (
//                     <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                         <span className="text-green-800 text-sm font-medium">Image uploaded successfully!</span>
//                       </div>
//                     </div>
//                   )}

//                   {!previewImage && !uploadedImage && (
//                     <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                         <span className="text-blue-800 text-sm font-medium">Upload an image to complete your ad preview</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Heart, MessageCircle, Share, Upload, Star, Target, RotateCcw, X, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface Campaign {
//   id: number;
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonColor: string;
//   type: string;
//   aiScore: number;
//   rating: number;
//   ctr: string;
//   cpc: string;
//   roas: string;
// }

// const campaigns: Campaign[] = [
//   {
//     id: 1,
//     title: "Transform Your Marketing with AI-Powered Campaign Studio",
//     description: "Experience the future of digital advertising with intelligent campaign generation, real-time optimization, and predictive analytics that deliver exceptional ROI.",
//     buttonText: "Start Free Trial",
//     buttonColor: "from-slate-700 to-slate-900",
//     type: "Carousel",
//     aiScore: 96,
//     rating: 4.9,
//     ctr: "4.2%",
//     cpc: "$0.42",
//     roas: "5.1x"
//   },
//   {
//     id: 2,
//     title: "Scale Your Business with Intelligent Ad Automation",
//     description: "Join thousands of marketers who've increased their campaign performance by 300% using our AI-driven platform. Data-backed strategies that actually work.",
//     buttonText: "Get Demo",
//     buttonColor: "from-emerald-500 to-emerald-600",
//     type: "Conversion",
//     aiScore: 93,
//     rating: 4.8,
//     ctr: "3.8%",
//     cpc: "$0.38",
//     roas: "4.7x"
//   },
//   {
//     id: 3,
//     title: "See Campaign Studio AI in Action",
//     description: "Watch how our platform creates, tests, and optimizes campaigns automatically. Real results from real businesses using next-generation marketing technology.",
//     buttonText: "Watch Video",
//     buttonColor: "from-slate-700 to-slate-900",
//     type: "Video",
//     aiScore: 98,
//     rating: 4.9,
//     ctr: "5.1%",
//     cpc: "$0.35",
//     roas: "6.2x"
//   }
// ];

// // Sample ad sets data
// const sampleAdSets = [
//   {
//     "ad_set_name": "Ultimate Driving Experience - Thrill Seekers 18-40",
//     "campaign_objective": "Video Views",
//     "target_audience": {
//       "location": "Global",
//       "age_range": "18-40",
//       "gender": "All",
//       "interests": ["Car Enthusiasts", "Driving", "Sports Cars", "Car Racing", "BMW"]
//     },
//     "placements": ["YouTube In-Stream Ads", "YouTube Shorts Ads", "YouTube Feed"],
//     "daily_budget": "250 USD",
//     "creative_brief": "Use high-energy action shots of BMW cars on mountain roads to evoke excitement and passion for driving, paired with an energetic soundtrack that captures the thrill and performance of BMW vehicles.",
//     "ad_copy_variations": {
//       "short_form": [
//         "Unleash your inner driver with BMW.",
//         "Feel the thrill of every turn in a BMW.",
//         "BMW — where passion meets performance."
//       ],
//       "long_form": [
//         "Experience the ultimate driving thrill with BMW. Every turn ignites passion and delivers unmatched performance for those who crave excitement behind the wheel.",
//         "Dive into a driving experience designed for thrill seekers. BMW offers precision handling and adrenaline-pumping performance for car enthusiasts aged 18-40."
//       ]
//     },
//     "primary_text": "Unleash your inner driver with BMW—where every turn ignites passion and performance.",
//     "headline": "Ignite Your Driving Passion",
//     "call_to_action": "Learn More"
//   },
//   {
//     "ad_set_name": "Luxury Meets Innovation - Tech-Savvy Pros 28-50",
//     "campaign_objective": "Conversions",
//     "target_audience": {
//       "location": "Global",
//       "age_range": "28-50",
//       "gender": "All",
//       "interests": ["Luxury Cars", "Technology", "BMW", "Infotainment Systems", "Smart Devices", "Professional Networking"]
//     },
//     "placements": ["Instagram Feed", "Instagram Stories", "Instagram Reels"],
//     "daily_budget": "220 USD",
//     "creative_brief": "Show cinematic lifestyle videos highlighting BMW's advanced infotainment systems and customizable technology features that appeal to sophisticated, tech-savvy professionals seeking confidence and luxury.",
//     "ad_copy_variations": {
//       "short_form": [
//         "Step into luxury with BMW tech.",
//         "Luxury and innovation, redefined.",
//         "Drive confidently with BMW technology."
//       ],
//       "long_form": [
//         "Embrace the future of luxury driving with BMW. Advanced technology and sophisticated design come together for professionals who demand the best.",
//         "Experience BMW's cutting-edge infotainment and customization options crafted for tech-savvy drivers who value innovation and elegance."
//       ]
//     },
//     "primary_text": "Step into the future of luxury with BMW—crafted technology for the sophisticated driver.",
//     "headline": "Luxury Driven by Innovation",
//     "call_to_action": "Learn More"
//   }
// ];

// export default function CampaignStudio() {
//   const navigate = useNavigate();
//   const [campaignConfigData, setCampaignConfigData] = useState<any>(null);
//   const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaigns[0]);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Load campaign config data from sessionStorage
//   useEffect(() => {
//     const storedData = sessionStorage.getItem('campaignConfigData');
//     if (storedData) {
//       setCampaignConfigData(JSON.parse(storedData));
//     } else {
//       // If no data found, redirect back to config
//       navigate('/CampaignConfig');
//     }
//   }, [navigate]);

//   const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
//     console.log(`Toast: ${title} - ${description}`);
//   };

//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const files = e.dataTransfer.files;
//     if (files.length > 0 && files[0].type.startsWith('image/')) {
//       handleImageSelection(files[0]);
//     } else {
//       showToast("Invalid file", "Please drop a valid image file", "destructive");
//     }
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       handleImageSelection(file);
//     } else {
//       showToast("Invalid file", "Please select a valid image file", "destructive");
//     }
//   };

//   const handleImageSelection = (file: File) => {
//     setSelectedFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreviewImage(previewUrl);
//     setUploadedImage(null);
//     setUploadSuccess(false);
//     showToast("Image ready", "Review your image and click Upload to confirm");
//   };

//   const confirmUpload = async () => {
//     if (!selectedFile) return;

//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('img', selectedFile);

//       const response = await fetch('https://spideyxxx.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/img-hash', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Image Upload API Response:', result);

//       setUploadedImage(previewImage);
//       setPreviewImage(null);
//       setSelectedFile(null);
//       setUploadSuccess(true);

//       showToast("Success", "Image uploaded successfully!");

//     } catch (error) {
//       console.error('Upload error:', error);
//       showToast("Upload failed", "Please check your connection and try again", "destructive");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const cancelPreview = () => {
//     if (previewImage) {
//       URL.revokeObjectURL(previewImage);
//     }
//     setPreviewImage(null);
//     setSelectedFile(null);
//   };

//   const removeUploadedImage = () => {
//     if (uploadedImage) {
//       URL.revokeObjectURL(uploadedImage);
//     }
//     setUploadedImage(null);
//     setUploadSuccess(false);
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   const selectCampaign = (campaign: Campaign) => {
//     setSelectedCampaign(campaign);
//   };
//   const formatDateForAPI = (date: Date | string | null | undefined): string => {
//     try {
//       // Handle null/undefined
//       if (!date) {
//         return new Date().toISOString();
//       }
      
//       // If it's already a Date object
//       if (date instanceof Date) {
//         if (isNaN(date.getTime())) {
//           console.error('Invalid Date object:', date);
//           return new Date().toISOString();
//         }
//         return date.toISOString();
//       }
      
//       // If it's a string, convert to Date
//       if (typeof date === 'string') {
//         const dateObj = new Date(date);
//         if (isNaN(dateObj.getTime())) {
//           console.error('Invalid date string:', date);
//           return new Date().toISOString();
//         }
//         return dateObj.toISOString();
//       }
      
//       // Fallback for any other type
//       console.warn('Unexpected date type:', typeof date, date);
//       return new Date().toISOString();
      
//     } catch (error) {
//       console.error('Error formatting date:', error, 'Original value:', date);
//       return new Date().toISOString();
//     }
//   };

//   const handleCreateCampaign = async () => {
//     if (!uploadSuccess) {
//       showToast("Image Required", "Please upload an image before creating the campaign", "destructive");
//       return;
//     }

//     if (!campaignConfigData) {
//       showToast("Configuration Missing", "Campaign configuration data is missing", "destructive");
//       return;
//     }

//     setIsCreatingCampaign(true);

//     try {
//       const budgetInCents = Math.round(campaignConfigData.dailyBudget * 100);

//       // Build the comprehensive API payload
//       const apiPayload = {
//         campaign: {
//           name: campaignConfigData.projectName,
//           objective: campaignConfigData.adGoal,
//           status: "PAUSED",
//           special_ad_categories: []
//         },
//         adsets: [
//           {
//             name: `${campaignConfigData.projectName} - Ad Set 1`,
//             daily_budget: budgetInCents.toString(),
//             start_time: formatDateForAPI(campaignConfigData.startDate),
//             end_time: formatDateForAPI(campaignConfigData.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
//             status: "PAUSED",
//             billing_event: "IMPRESSIONS",
//             optimization_goal: campaignConfigData.adGoal === "REACH" ? "REACH" : "CONVERSIONS",
//             bid_strategy: "LOWEST_COST_WITHOUT_CAP",
//             targeting: {
//               geo_locations: {
//                 countries: [campaignConfigData.selectedCountry || "US"],
//                 location_types: ["home", "recent"]
//               }
//             }
//           }
//         ],
//         // Add campaign studio data
//         studio_data: {
//           selected_campaign: selectedCampaign,
//           product_description: campaignConfigData.productDescription,
//           conversion_button: campaignConfigData.conversionButton,
//           uploaded_image: uploadedImage ? true : false,
//           campaign_type: selectedCampaign.type,
//           ai_score: selectedCampaign.aiScore
//         },
//         // Add the sample ad sets from your requirements
//         ai_generated_adsets: sampleAdSets
//       };

//       console.log("Sending to API:", apiPayload);

//       const response = await fetch("https://spideyxxx.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/meta-ad-setup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(apiPayload)
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Campaign Creation API Response:", result);
//         showToast("Success", "Campaign created successfully!");

//         // Clear stored data
//         sessionStorage.removeItem('campaignConfigData');

//         // Navigate to success page or campaign dashboard
//         navigate('/CampaignCard');
//       } else {
//         console.error("API Error:", response.status, response.statusText);
//         showToast("Creation Failed", "Failed to create campaign. Please try again.", "destructive");
//       }
//     } catch (error) {
//       console.error("Network Error:", error);
//       showToast("Network Error", "Please check your connection and try again.", "destructive");
//     } finally {
//       setIsCreatingCampaign(false);
//     }
//   };

//   const handlePrevious = () => {
//     navigate('/CampaignConfig');
//   };

//   const getTypeColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case 'carousel': return 'bg-blue-100 text-blue-800';
//       case 'conversion': return 'bg-green-100 text-green-800';
//       case 'video': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-slate-100 text-slate-800';
//     }
//   };

//   const getTypeIcon = (type: string) => {
//     switch (type.toLowerCase()) {
//       case 'carousel': return '🖼️';
//       case 'conversion': return '📢';
//       case 'video': return '▶️';
//       default: return '📱';
//     }
//   };

//   if (!campaignConfigData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading campaign data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">

//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
//             <span className="mr-2">🤖</span>
//             AI-Powered Campaign Studio
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">
//             Transform Your Marketing with Intelligent Campaigns
//           </h1>
//           <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//             Campaign: <span className="font-semibold text-slate-800">{campaignConfigData.projectName}</span>
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Campaign Selection Panel */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-slate-900">AI-Generated Campaigns</h2>
//               <Button variant="outline" className="inline-flex items-center">
//                 <RotateCcw className="h-4 w-4 mr-2" />
//                 Regenerate
//               </Button>
//             </div>

//             {/* Campaign Cards */}
//             {campaigns.map((campaign) => (
//               <Card
//                 key={campaign.id}
//                 className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-slate-300 ${selectedCampaign.id === campaign.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
//                   }`}
//                 onClick={() => selectCampaign(campaign)}
//                 data-testid={`card-campaign-${campaign.id}`}
//               >
//                 <CardContent className="p-0">
//                   <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center space-x-3">
//                         <span className={`${getTypeColor(campaign.type)} flex items-center space-x-1 px-3 py-1 rounded-full`}>
//                           <span className="text-xs">{getTypeIcon(campaign.type)}</span>
//                           <span className="capitalize font-medium text-sm">{campaign.type}</span>
//                         </span>
//                         <div className="bg-white rounded-full px-3 py-1 border border-slate-200">
//                           <span className="text-emerald-600 font-bold text-sm">{campaign.aiScore}%</span>
//                           <span className="text-slate-500 text-xs ml-1">AI Score</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-1 bg-amber-50 rounded-full px-3 py-1">
//                         <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
//                         <span className="font-bold text-amber-700 text-sm">{campaign.rating}</span>
//                       </div>
//                     </div>

//                     <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
//                       {campaign.title}
//                     </h4>

//                     <p className="text-slate-600 leading-relaxed">
//                       {campaign.description}
//                     </p>
//                   </div>

//                   <div className="p-6">
//                     <div className="grid grid-cols-3 gap-4 mb-6">
//                       <div className="text-center p-3 bg-blue-50 rounded-xl">
//                         <p className="text-blue-600 text-xs font-medium uppercase tracking-wide">CTR</p>
//                         <p className="text-xl font-bold text-blue-700">{campaign.ctr}</p>
//                       </div>
//                       <div className="text-center p-3 bg-green-50 rounded-xl">
//                         <p className="text-green-600 text-xs font-medium uppercase tracking-wide">CPC</p>
//                         <p className="text-xl font-bold text-green-700">{campaign.cpc}</p>
//                       </div>
//                       <div className="text-center p-3 bg-purple-50 rounded-xl">
//                         <p className="text-purple-600 text-xs font-medium uppercase tracking-wide">ROAS</p>
//                         <p className="text-xl font-bold text-purple-700">{campaign.roas}</p>
//                       </div>
//                     </div>

//                     <Button
//                       className={`w-full bg-gradient-to-r ${campaign.buttonColor} text-white hover:opacity-90 transition-opacity`}
//                       data-testid={`button-preview-${campaign.id}`}
//                     >
//                       Preview Campaign
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//             {/* Targeting Strategy Card */}
//             <Card className="mt-8">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
//                   <Target className="h-5 w-5 mr-2 text-blue-600" />
//                   AI-Optimized Targeting Strategy
//                 </h3>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-medium text-slate-700 mb-2">Campaign Name</h4>
//                     <p className="text-slate-600 text-sm">{campaignConfigData.projectName}</p>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-slate-700 mb-2">Daily Budget</h4>
//                     <p className="text-slate-600 text-sm">${campaignConfigData.dailyBudget}/day</p>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-slate-700 mb-2">Target Location</h4>
//                     <p className="text-slate-600 text-sm">{campaignConfigData.targetingLocation}</p>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-slate-700 mb-2">Campaign Duration</h4>
//                     <p className="text-slate-600 text-sm">
//                       {campaignConfigData.startDate ? new Date(campaignConfigData.startDate).toLocaleDateString() : 'Not set'} - {campaignConfigData.endDate ? new Date(campaignConfigData.endDate).toLocaleDateString() : 'Not set'}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Mobile Preview Panel */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-8">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
//                   <div className={`w-2 h-2 rounded-full mr-2 ${uploadSuccess ? 'bg-green-400' :
//                       previewImage ? 'bg-orange-400' : 'bg-blue-400'
//                     } animate-pulse`}></div>
//                   {uploadSuccess ? 'Image Uploaded!' :
//                     previewImage ? 'Preview Mode' :
//                       'Live Preview with Image Upload'}
//                 </h3>

//                 {/* Mobile Device Frame */}
//                 <div className="relative mx-auto max-w-sm" data-testid="mobile-preview">
//                   {/* Phone Frame */}
//                   <div className="bg-slate-900 rounded-3xl p-2 shadow-2xl">
//                     {/* Screen */}
//                     <div className="bg-black rounded-2xl p-1">
//                       <div className="bg-white rounded-xl overflow-hidden relative">
//                         {/* Status Bar */}
//                         <div className="bg-slate-50 px-4 py-2 flex justify-between items-center text-xs relative z-10">
//                           <span className="font-medium">9:41</span>
//                           <div className="flex items-center space-x-1">
//                             <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
//                             <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
//                             <div className="w-6 h-3 border border-slate-400 rounded-sm">
//                               <div className="w-4 h-2 bg-green-400 rounded-sm m-0.5"></div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="relative" style={{ minHeight: '500px' }}>
//                           {/* STATE 1: Default Content (No Image) */}
//                           {!previewImage && !uploadedImage && (
//                             <div data-testid="default-content">
//                               {/* App Header */}
//                               <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                                     <span className="text-white text-xs font-bold">CS</span>
//                                   </div>
//                                   <div>
//                                     <p className="font-semibold text-slate-900 text-sm">Campaign Studio</p>
//                                     <p className="text-slate-500 text-xs">Sponsored</p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Preview Content */}
//                               <div className="p-4">
//                                 <p className="text-slate-700 text-sm mb-4 leading-relaxed" data-testid="text-campaign-description">
//                                   {selectedCampaign.description}
//                                 </p>

//                                 {/* Image Upload Area */}
//                                 <div className="mb-4" data-testid="upload-area">
//                                   <div
//                                     className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive
//                                         ? 'border-blue-500 bg-blue-50'
//                                         : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
//                                       }`}
//                                     onDrop={handleDrop}
//                                     onDragOver={handleDragOver}
//                                     onDragEnter={handleDragEnter}
//                                     onDragLeave={handleDragLeave}
//                                     onClick={openFileDialog}
//                                     data-testid="drop-zone"
//                                   >
//                                     <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
//                                     <p className="text-slate-600 text-sm font-medium mb-1">Upload Campaign Image</p>
//                                     <p className="text-slate-500 text-xs">Drag & drop or click to select</p>
//                                   </div>

//                                   {/* Hidden File Input */}
//                                   <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     accept="image/*"
//                                     style={{ display: 'none' }}
//                                     onChange={handleFileInput}
//                                     data-testid="input-file"
//                                   />
//                                 </div>

//                                 {/* Campaign Title and CTA */}
//                                 <div className="text-center mb-4">
//                                   <h4 className="font-bold text-slate-900 text-sm mb-3" data-testid="text-campaign-title">
//                                     {selectedCampaign.title}
//                                   </h4>

//                                   <Button
//                                     className={`w-full bg-gradient-to-r ${selectedCampaign.buttonColor} text-white text-sm`}
//                                     data-testid="button-campaign-cta"
//                                   >
//                                     {selectedCampaign.buttonText}
//                                   </Button>
//                                 </div>

//                                 {/* Social Engagement */}
//                                 <div className="flex items-center justify-between text-slate-500 text-xs pt-3 border-t border-slate-200">
//                                   <div className="flex items-center space-x-4">
//                                     <span className="flex items-center space-x-1">
//                                       <Heart className="h-3 w-3" />
//                                       <span>324</span>
//                                     </span>
//                                     <span className="flex items-center space-x-1">
//                                       <MessageCircle className="h-3 w-3" />
//                                       <span>12</span>
//                                     </span>
//                                   </div>
//                                   <span className="flex items-center space-x-1">
//                                     <Share className="h-3 w-3" />
//                                     <span>Share</span>
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* STATE 2: Preview Mode (Before Upload) */}
//                           {previewImage && (
//                             <div className="absolute inset-0" data-testid="preview-mode">
//                               {/* Close Button */}
//                               <button
//                                 onClick={cancelPreview}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                                 data-testid="button-cancel-preview"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               {/* Full Screen Image Preview */}
//                               <div className="h-full relative">
//                                 <img
//                                   src={previewImage}
//                                   alt="Image preview"
//                                   className="w-full h-full object-contain bg-black"
//                                   data-testid="img-preview"
//                                 />

//                                 {/* Overlay with Confirmation Controls */}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
//                                   {/* Campaign Info */}
//                                   <div className="text-white mb-4">
//                                     <h4 className="font-bold text-sm mb-2">
//                                       {selectedCampaign.title}
//                                     </h4>
//                                   </div>

//                                   {/* Confirmation Buttons */}
//                                   <div className="flex gap-2">
//                                     <Button
//                                       onClick={cancelPreview}
//                                       variant="secondary"
//                                       className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
//                                       data-testid="button-cancel"
//                                     >
//                                       <X className="h-4 w-4 mr-2" />
//                                       Cancel
//                                     </Button>
//                                     <Button
//                                       onClick={confirmUpload}
//                                       disabled={isUploading}
//                                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//                                       data-testid="button-confirm-upload"
//                                     >
//                                       <Upload className="h-4 w-4 mr-2" />
//                                       {isUploading ? 'Uploading...' : 'Upload'}
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* STATE 3: Final Uploaded Image */}
//                           {uploadedImage && (
//                             <div className="absolute inset-0" data-testid="uploaded-image">
//                               {/* Close Button */}
//                               <button
//                                 onClick={removeUploadedImage}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                                 data-testid="button-remove-uploaded"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               {/* Success Badge */}
//                               <div className="absolute top-2 left-2 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
//                                 <Check className="h-3 w-3 mr-1" />
//                                 Uploaded
//                               </div>

//                               {/* Final Image Display */}
//                               <div className="h-full relative">
//                                 <img
//                                   src={uploadedImage}
//                                   alt="Uploaded campaign image"
//                                   className="w-full h-full object-contain bg-black"
//                                   data-testid="img-uploaded"
//                                 />

//                                 {/* Campaign Overlay */}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
//                                   <h4 className="font-bold text-sm mb-2">
//                                     {selectedCampaign.title}
//                                   </h4>
//                                   <Button
//                                     className={`w-full bg-gradient-to-r ${selectedCampaign.buttonColor} text-white text-sm mb-3`}
//                                   >
//                                     {selectedCampaign.buttonText}
//                                   </Button>

//                                   {/* Social Engagement */}
//                                   <div className="flex items-center justify-between text-white/80 text-xs">
//                                     <div className="flex items-center space-x-4">
//                                       <span className="flex items-center space-x-1">
//                                         <Heart className="h-3 w-3" />
//                                         <span>567</span>
//                                       </span>
//                                       <span className="flex items-center space-x-1">
//                                         <MessageCircle className="h-3 w-3" />
//                                         <span>34</span>
//                                       </span>
//                                     </div>
//                                     <span className="flex items-center space-x-1">
//                                       <Share className="h-3 w-3" />
//                                       <span>Share</span>
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Upload Loading Overlay */}
//                           {isUploading && (
//                             <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-30" data-testid="upload-loading">
//                               <div className="text-center">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
//                                 <p className="text-slate-700 font-medium">Uploading image...</p>
//                                 <p className="text-slate-500 text-sm">Please wait</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status Messages */}
//                 <div className="mt-4">
//                   {previewImage && !isUploading && (
//                     <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
//                         <span className="text-orange-800 text-sm font-medium">Preview ready - Click Upload to confirm</span>
//                       </div>
//                     </div>
//                   )}

//                   {uploadSuccess && (
//                     <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                         <span className="text-green-800 text-sm font-medium">Image uploaded successfully!</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Action Bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-center space-x-4">
//             <Button
//               onClick={handlePrevious}
//               className="flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-50"
//               data-testid="button-previous"
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={handleCreateCampaign}
//               disabled={!uploadSuccess || isCreatingCampaign}
//               className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
//               data-testid="button-create-campaign"
//             >
//               {isCreatingCampaign ? "Creating..." : "Create Campaign"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Upload, X, Check, ChevronDown, ChevronUp, Youtube, PlayCircle, Rss, MoreHorizontal, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AdSet {
  id: number;
  ad_set_name: string;
  campaign_objective: string;
  target_audience: {
    location: string;
    age_range: string;
    gender: string;
    interests: string[];
  };
  placements: string[];
  daily_budget: string;
  creative_brief: string;
  ad_copy_variations: {
    short_form: string[];
    long_form: string[];
  };
  primary_text: string;
  headline: string;
  call_to_action: string;
}

// Generate 10 ad sets for the price slider functionality
const generateAdSets = (): AdSet[] => {
  const baseAdSets = [
    {
      id: 1,
      ad_set_name: "Traditional Wear Enthusiasts",
      campaign_objective: "Brand Awareness",
      target_audience: {
        location: "India",
        age_range: "25-50",
        gender: "Female",
        interests: ["Sarees", "Ethnic Wear", "Traditional Fashion", "Kanchipuram Silk", "Indian Clothing"]
      },
      placements: ["Instagram Feed", "Facebook Feed", "Pinterest Ads"],
      daily_budget: "5.00",
      creative_brief: "Target women who love traditional Indian fashion and premium sarees, highlighting the luxurious Kanchipuram silk.",
      ad_copy_variations: {
        short_form: ["Experience luxury with Kanchipuram silk", "Elegant sarees for special occasions", "Traditional fashion redefined"],
        long_form: ["Discover the elegance of our Turquoise Bliss Kanchipuram silk saree with Rani Pink Zari border. Perfect for weddings, festivals, and celebrations."]
      },
      primary_text: "Add timeless elegance to your wardrobe with our exquisite Kanchipuram silk saree.",
      headline: "Turquoise Bliss Silk Saree",
      call_to_action: "Shop Now"
    },
    {
      id: 2,
      ad_set_name: "Festive Shoppers",
      campaign_objective: "Conversions",
      target_audience: {
        location: "India",
        age_range: "25-45",
        gender: "Female",
        interests: ["Festivals", "Diwali Shopping", "Wedding Shopping", "Indian Ethnic Wear"]
      },
      placements: ["Instagram Stories", "Facebook Stories", "YouTube Ads"],
      daily_budget: "5.00",
      creative_brief: "Target women preparing for festive seasons or weddings, highlighting this saree as a perfect gift or purchase.",
      ad_copy_variations: {
        short_form: ["Shine this festive season", "Perfect saree for weddings", "Celebrate in style"],
        long_form: ["Celebrate your special occasions in style with the Turquoise Bliss Kanchipuram silk saree, featuring a stunning Rani Pink Zari border."]
      },
      primary_text: "Step into the spotlight this festive season with a saree that blends tradition and luxury.",
      headline: "Festive Luxury Saree",
      call_to_action: "Buy Now"
    },
    {
      id: 3,
      ad_set_name: "Luxury Fashion Buyers",
      campaign_objective: "Lead Generation",
      target_audience: {
        location: "India",
        age_range: "30-55",
        gender: "Female",
        interests: ["Luxury Fashion", "Designer Sarees", "Premium Clothing", "Online Shopping"]
      },
      placements: ["Google Ads", "Instagram Feed", "Facebook Feed"],
      daily_budget: "5.00",
      creative_brief: "Target women who shop for luxury and designer ethnic wear online.",
      ad_copy_variations: {
        short_form: ["Designer Kanchipuram sarees", "Luxury woven elegance", "Premium sarees online"],
        long_form: ["Indulge in luxury with our Turquoise Bliss Kanchipuram silk saree. Perfectly woven with a Rani Pink Zari border for an elegant touch."]
      },
      primary_text: "Elevate your ethnic wear collection with our premium Kanchipuram silk saree.",
      headline: "Luxury Kanchipuram Saree",
      call_to_action: "Shop Online"
    },
    {
      id: 4,
      ad_set_name: "Wedding Shoppers",
      campaign_objective: "Conversions",
      target_audience: {
        location: "India",
        age_range: "25-40",
        gender: "Female",
        interests: ["Wedding Sarees", "Bridal Wear", "Indian Weddings", "Bridal Shopping"]
      },
      placements: ["Instagram Reels", "Facebook Stories", "Pinterest Ads"],
      daily_budget: "5.00",
      creative_brief: "Target brides-to-be and wedding shoppers looking for elegant Kanchipuram sarees for ceremonies.",
      ad_copy_variations: {
        short_form: ["Your perfect wedding saree", "Elegant bridal wear", "Celebrate in style"],
        long_form: ["Make your wedding celebrations unforgettable with the Turquoise Bliss Kanchipuram silk saree with stunning Rani Pink Zari detailing."]
      },
      primary_text: "Find the perfect blend of tradition and style for your wedding or festive celebrations.",
      headline: "Bridal & Festive Saree",
      call_to_action: "Order Now"
    },
    {
      id: 5,
      ad_set_name: "Young Fashion Lovers",
      campaign_objective: "Engagement",
      target_audience: {
        location: "India",
        age_range: "20-35",
        gender: "Female",
        interests: ["Fashion Trends", "Ethnic Fashion", "Instagram Fashion Influencers"]
      },
      placements: ["Instagram Feed", "Instagram Stories", "TikTok Ads"],
      daily_budget: "5.00",
      creative_brief: "Target young women looking for trendy and stylish ethnic wear for social media-worthy looks.",
      ad_copy_variations: {
        short_form: ["Trendy ethnic sarees", "Style meets tradition", "Social media ready fashion"],
        long_form: ["Turn heads with our Turquoise Bliss Kanchipuram silk saree with Rani Pink Zari border – perfect for fashion-forward women."]
      },
      primary_text: "Stay stylish while embracing tradition with our luxurious Kanchipuram saree.",
      headline: "Trendy Kanchipuram Silk",
      call_to_action: "Shop Trendy"
    },
    {
      id: 6,
      ad_set_name: "Gift Shoppers",
      campaign_objective: "Traffic",
      target_audience: {
        location: "India",
        age_range: "25-50",
        gender: "Female",
        interests: ["Gift Ideas", "Luxury Gifts", "Sarees as Gifts", "Festive Shopping"]
      },
      placements: ["Facebook Feed", "Instagram Feed", "Google Ads"],
      daily_budget: "5.00",
      creative_brief: "Target shoppers looking to gift premium sarees for special occasions and festivals.",
      ad_copy_variations: {
        short_form: ["Gift elegance", "Premium sarees for loved ones", "Celebrate in style"],
        long_form: ["Surprise your loved ones with the Turquoise Bliss Kanchipuram silk saree featuring an elegant Rani Pink Zari border."]
      },
      primary_text: "Give the gift of luxury and tradition with our Kanchipuram silk saree.",
      headline: "Perfect Gift Saree",
      call_to_action: "Buy Gift"
    },
    {
      id: 7,
      ad_set_name: "Regional Fashion Lovers",
      campaign_objective: "Brand Awareness",
      target_audience: {
        location: "South India",
        age_range: "25-50",
        gender: "Female",
        interests: ["South Indian Fashion", "Kanchipuram Sarees", "Traditional Silk Sarees"]
      },
      placements: ["Instagram Feed", "Facebook Feed", "Pinterest Ads"],
      daily_budget: "5.00",
      creative_brief: "Target women in South India who are interested in authentic Kanchipuram silk sarees.",
      ad_copy_variations: {
        short_form: ["Authentic Kanchipuram silk", "South Indian elegance", "Traditional silk sarees"],
        long_form: ["Embrace South Indian tradition with our Turquoise Bliss Kanchipuram silk saree with a Rani Pink Zari border."]
      },
      primary_text: "Celebrate tradition with the finest Kanchipuram silk saree for South Indian fashion lovers.",
      headline: "Authentic Silk Saree",
      call_to_action: "Shop Now"
    },
    {
      id: 8,
      ad_set_name: "Festival Ready Women",
      campaign_objective: "Engagement",
      target_audience: {
        location: "India",
        age_range: "25-45",
        gender: "Female",
        interests: ["Diwali Fashion", "Navratri Fashion", "Festive Sarees", "Traditional Wear"]
      },
      placements: ["Instagram Reels", "Facebook Stories", "Pinterest Ads"],
      daily_budget: "5.00",
      creative_brief: "Target women looking for festive sarees for upcoming celebrations.",
      ad_copy_variations: {
        short_form: ["Festive sarees you’ll love", "Celebrate in elegance", "Perfect festival look"],
        long_form: ["Step into festive celebrations in style with our Turquoise Bliss Kanchipuram silk saree with beautiful Rani Pink Zari detailing."]
      },
      primary_text: "Be festival-ready with the perfect traditional silk saree.",
      headline: "Festival Elegance",
      call_to_action: "Shop Festive"
    },
    {
      id: 9,
      ad_set_name: "Online Shoppers",
      campaign_objective: "Conversions",
      target_audience: {
        location: "India",
        age_range: "25-50",
        gender: "Female",
        interests: ["Online Shopping", "E-commerce Fashion", "Luxury Sarees Online"]
      },
      placements: ["Google Ads", "Instagram Feed", "Facebook Feed"],
      daily_budget: "5.00",
      creative_brief: "Target women who prefer buying ethnic wear online and are comfortable with e-commerce platforms.",
      ad_copy_variations: {
        short_form: ["Shop luxury sarees online", "Easy online saree shopping", "Premium sarees delivered to you"],
        long_form: ["Get the Turquoise Bliss Kanchipuram silk saree delivered right to your doorstep and enjoy premium online shopping."]
      },
      primary_text: "Shop premium sarees online with ease and elegance.",
      headline: "Online Silk Saree Shopping",
      call_to_action: "Order Online"
    },
    {
      id: 10,
      ad_set_name: "Ethnic Fashion Influencers",
      campaign_objective: "Engagement",
      target_audience: {
        location: "India",
        age_range: "20-40",
        gender: "Female",
        interests: ["Fashion Blogging", "Ethnic Wear Influencers", "Instagram Fashion"]
      },
      placements: ["Instagram Feed", "Instagram Stories", "TikTok Ads"],
      daily_budget: "5.00",
      creative_brief: "Target influencers who showcase ethnic wear and traditional fashion on social media.",
      ad_copy_variations: {
        short_form: ["Showcase tradition in style", "Influencer-approved sarees", "Trendy Kanchipuram silk"],
        long_form: ["Feature the Turquoise Bliss Kanchipuram silk saree in your fashion posts and captivate your audience with tradition and elegance."]
      },
      primary_text: "Inspire your followers with stunning Kanchipuram silk sarees.",
      headline: "Influencer Favorite Saree",
      call_to_action: "Promote Now"
    }
  ];

  return baseAdSets;
};

export default function CampaignStudio() {
  const [allAdSets] = useState<AdSet[]>(generateAdSets());
  const [budget, setBudget] = useState<number>(15);
  const [selectedAdSet, setSelectedAdSet] = useState<AdSet | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate enabled ad sets based on budget (each ad set costs $5)
  const enabledAdSetCount = Math.floor(budget / 5);
  const enabledAdSets = allAdSets.slice(0, enabledAdSetCount);

  // Auto-select first enabled ad set when budget changes
  useEffect(() => {
    if (enabledAdSets.length > 0) {
      setSelectedAdSet(enabledAdSets[0]); // Always show Tech Enthusiasts when available
    } else {
      setSelectedAdSet(null);
    }
  }, [budget]);

  const handleBudgetChange = (value: number) => {
    // Ensure value is multiple of 5 and within range
    const clampedValue = Math.max(5, Math.min(50, Math.round(value / 5) * 5));
    setBudget(clampedValue);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageSelection(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageSelection(file);
    }
  };

  const handleImageSelection = (file: File) => {
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setUploadedImage(null);
    setUploadSuccess(false);
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadedImage(previewImage);
      setPreviewImage(null);
      setSelectedFile(null);
      setUploadSuccess(true);

    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelPreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const removeUploadedImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setUploadSuccess(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const selectAdSet = (adSet: AdSet) => {
    // Only allow selection of enabled ad sets
    if (enabledAdSets.includes(adSet)) {
      setSelectedAdSet(adSet);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-lg">🎯</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Studio</h1>
          </div>
          
          {/* Budget Control Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Budget Configuration</h3>
                <p className="text-sm text-gray-600">Each ad set costs $5. Adjust your budget to enable more ad sets.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">${budget}</div>
                <div className="text-sm text-gray-500">{enabledAdSetCount} Ad Sets</div>
              </div>
            </div>
            
            {/* Price Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-2">Budget Range</label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((budget - 5) / (50 - 5)) * 100}%, #e5e7eb ${((budget - 5) / (50 - 5)) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$5</span>
                    <span>$50</span>
                  </div>
                </div>
              </div>
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="5"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full pl-6 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Budget Summary */}
            <div className="mt-4 p-3 bg-purple-50 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Available Ad Sets:</span>
                <span className="font-semibold text-purple-800">{enabledAdSetCount} of 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Ad Sets Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Ad Sets</h3>
                <p className="text-xs text-gray-600 mt-1">Select ad sets within your budget</p>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {allAdSets.map((adSet, index) => {
                  const isEnabled = enabledAdSets.includes(adSet);
                  const isSelected = selectedAdSet?.id === adSet.id;
                  
                  return (
                    <div
                      key={adSet.id}
                      className={`p-4 border-b border-gray-100 transition-colors ${
                        isEnabled ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                      } ${
                        isSelected ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                      }`}
                      onClick={() => selectAdSet(adSet)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 ${
                          isEnabled && isSelected
                            ? 'bg-purple-600 border-purple-600'
                            : isEnabled
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-300'
                        }`}>
                          {isEnabled && (
                            <Check className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium truncate ${
                              isEnabled ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {adSet.ad_set_name}
                            </h4>
                            <span className={`text-xs font-medium ${
                              isEnabled ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              $5.00
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            isEnabled ? 'text-gray-600' : 'text-gray-500'
                          }`}>
                            {adSet.target_audience.location} • {adSet.target_audience.age_range} • {adSet.campaign_objective}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              isEnabled
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tech Enthusiasts Details Panel */}
          <div className="lg:col-span-5">
            {selectedAdSet ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedAdSet.ad_set_name}</h2>
                      <p className="text-sm text-gray-600 mt-1">Campaign targeting technology enthusiasts and early adopters</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <div className="text-lg font-bold text-purple-600 mt-1">${selectedAdSet.daily_budget}/day</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Campaign Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Objective</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedAdSet.campaign_objective}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.location}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Age Range</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.age_range}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Gender</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.gender}</div>
                    </div>
                  </div>
                  
                  {/* Target Audience */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Target Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdSet.target_audience.interests.map((interest, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Placements */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Ad Placements</h4>
                    <div className="space-y-2">
                      {selectedAdSet.placements.map((placement, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
                          {placement.includes('YouTube') && <Youtube className="h-4 w-4 text-red-600 mr-2" />}
                          {placement.includes('Instagram') && <div className="h-4 w-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded mr-2" />}
                          {placement.includes('Facebook') && <div className="h-4 w-4 bg-blue-600 rounded mr-2" />}
                          <span className="text-sm text-gray-700">{placement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Creative Brief */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Creative Brief</h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {selectedAdSet.creative_brief}
                    </p>
                  </div>
                  
                  {/* Ad Copy Variations */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Ad Copy Variations</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Primary Text</div>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border-l-4 border-purple-500">
                          {selectedAdSet.primary_text}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Headline</div>
                          <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded">{selectedAdSet.headline}</p>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Call to Action</div>
                          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
                            {selectedAdSet.call_to_action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <p className="text-gray-500">Increase your budget to enable ad sets</p>
              </div>
            )}
          </div>

          {/* Mobile Preview Panel - Preserved from original */}
          <div className="lg:col-span-4">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${uploadSuccess ? 'bg-green-400' :
                      previewImage ? 'bg-orange-400' : 'bg-blue-400'
                    } animate-pulse`}></div>
                  {uploadSuccess ? 'Image Uploaded!' :
                    previewImage ? 'Preview Mode' :
                      'Live Preview with Image Upload'}
                </h3>

                {/* Mobile Device Frame */}
                <div className="relative mx-auto max-w-sm">
                  {/* Phone Frame */}
                  <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
                    {/* Screen */}
                    <div className="bg-black rounded-2xl p-1">
                      <div className="bg-white rounded-xl overflow-hidden relative">
                        {/* Status Bar */}
                        <div className="bg-gray-50 px-4 py-2 flex justify-between items-center text-xs relative z-10">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-6 h-3 border border-gray-400 rounded-sm">
                              <div className="w-4 h-2 bg-green-400 rounded-sm m-0.5"></div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="relative" style={{ minHeight: '500px' }}>
                          {/* Default Content (No Image) */}
                          {!previewImage && !uploadedImage && (
                            <div>
                              {/* App Header */}
                              <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">AD</span>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                      {selectedAdSet ? selectedAdSet.ad_set_name : 'Campaign Studio'}
                                    </p>
                                    <p className="text-gray-500 text-xs">Sponsored</p>
                                  </div>
                                </div>
                              </div>

                              {/* Preview Content */}
                              <div className="p-4">
                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                  {selectedAdSet ? selectedAdSet.primary_text : 'Select an ad set to preview'}
                                </p>

                                {/* Image Upload Area */}
                                <div className="mb-4">
                                  <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                      }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onClick={openFileDialog}
                                  >
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600 text-sm font-medium mb-1">Upload Campaign Image</p>
                                    <p className="text-gray-500 text-xs">Drag & drop or click to select</p>
                                  </div>

                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileInput}
                                  />
                                </div>

                                {/* Campaign Title and CTA */}
                                <div className="text-center mb-4">
                                  <h4 className="font-bold text-gray-900 text-sm mb-3">
                                    {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
                                  </h4>

                                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm">
                                    {selectedAdSet ? selectedAdSet.call_to_action : 'Call to Action'}
                                  </Button>
                                </div>

                                {/* Social Engagement */}
                                <div className="flex items-center justify-between text-gray-500 text-xs pt-3 border-t border-gray-200">
                                  <div className="flex items-center space-x-4">
                                    <span className="flex items-center space-x-1">
                                      <Heart className="h-3 w-3" />
                                      <span>324</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <MessageCircle className="h-3 w-3" />
                                      <span>12</span>
                                    </span>
                                  </div>
                                  <span className="flex items-center space-x-1">
                                    <Share className="h-3 w-3" />
                                    <span>Share</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Preview Mode (Before Upload) */}
                          {previewImage && (
                            <div className="absolute inset-0">
                              <button
                                onClick={cancelPreview}
                                className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                              >
                                <X className="h-4 w-4" />
                              </button>

                              <div className="h-full relative">
                                <img
                                  src={previewImage}
                                  alt="Image preview"
                                  className="w-full h-full object-contain bg-black"
                                />

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                                  <div className="text-white mb-4">
                                    <h4 className="font-bold text-sm mb-2">
                                      {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
                                    </h4>
                                    <p className="text-xs opacity-90">
                                      {selectedAdSet ? selectedAdSet.primary_text : 'Campaign description'}
                                    </p>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      onClick={cancelPreview}
                                      variant="secondary"
                                      className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={confirmUpload}
                                      disabled={isUploading}
                                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                      <Upload className="h-4 w-4 mr-2" />
                                      {isUploading ? 'Uploading...' : 'Upload'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Final Uploaded Image */}
                          {uploadedImage && (
                            <div className="absolute inset-0">
                              <button
                                onClick={removeUploadedImage}
                                className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                              >
                                <X className="h-4 w-4" />
                              </button>

                              <div className="absolute top-2 left-2 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Uploaded
                              </div>

                              <div className="h-full relative">
                                <img
                                  src={uploadedImage}
                                  alt="Uploaded campaign image"
                                  className="w-full h-full object-contain bg-black"
                                />

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                                  <h4 className="font-bold text-sm mb-2">
                                    {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
                                  </h4>
                                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm mb-3">
                                    {selectedAdSet ? selectedAdSet.call_to_action : 'Call to Action'}
                                  </Button>

                                  <div className="flex items-center justify-between text-white/80 text-xs">
                                    <div className="flex items-center space-x-4">
                                      <span className="flex items-center space-x-1">
                                        <Heart className="h-3 w-3" />
                                        <span>567</span>
                                      </span>
                                      <span className="flex items-center space-x-1">
                                        <MessageCircle className="h-3 w-3" />
                                        <span>34</span>
                                      </span>
                                    </div>
                                    <span className="flex items-center space-x-1">
                                      <Share className="h-3 w-3" />
                                      <span>Share</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Upload Loading Overlay */}
                          {isUploading && (
                            <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-30">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                                <p className="text-gray-700 font-medium">Uploading image...</p>
                                <p className="text-gray-500 text-sm">Please wait</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Messages */}
                <div className="mt-4">
                  {previewImage && !isUploading && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-orange-800 text-sm font-medium">Preview ready - Click Upload to confirm</span>
                      </div>
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-800 text-sm font-medium">Image uploaded successfully!</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
