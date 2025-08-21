
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MetaModal } from "@/components/ui/MetaModal";
import logo from "@/assets/logoo.png"
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { createCampaign } from "@/Store/campaignSlice";
import { Toast } from "@radix-ui/react-toast"; // or your toast

import {
  ChevronLeft,
  RotateCcw,
  Rocket,
  ImageIcon,
  Loader2,
  Brain,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface MarketingAngle {
  angle_name: string;
  hook_line: string;
  emotional_trigger: string;
  target_audience: string;
  visual_idea: string;
  platform_recommendation: string;
  Estimate_ads_Budget: string;
}

interface MarketingAnglesResponse {
  marketing_angles: MarketingAngle[];
}

const ProductDescriptionPage = () => {
  const dispatch = useAppDispatch();
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [marketingAngles, setMarketingAngles] = useState<MarketingAngle[]>([]);
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Load stored analysis data and call marketing angles API
  useEffect(() => {
    const initializeAnglesData = async () => {
      try {
        const storedData = sessionStorage.getItem('productAnalysis');

        if (!storedData) {
          setError('No analysis data found. Please start from the home page.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        const parsedData = JSON.parse(storedData);

        // Validate that we have the required analysis data
        if (!parsedData.analysisData) {
          setError('Product analysis not found. Please complete the analysis first.');
          setTimeout(() => navigate('/product-insights'), 3000);
          return;
        }

        setProductData(parsedData.analysisData);

        // Check if we already have marketing angles data that's still valid
        const storedAngles = sessionStorage.getItem('marketingAngles');

        if (storedAngles) {
          try {
            const anglesData = JSON.parse(storedAngles);

            // Check if angles data is still valid (not expired)
            if (anglesData.angles && anglesData.timestamp && isAnglesDataValid(anglesData)) {
              console.log('Found valid existing marketing angles, displaying directly');
              setMarketingAngles(anglesData.angles);
              setIsLoading(false);
              return;
            }
          } catch (err) {
            console.error('Error parsing stored angles:', err);
            // Continue to generate new angles if stored data is invalid
          }
        }

        // Generate new marketing angles if we don't have valid stored data
        await generateMarketingAngles(parsedData);

      } catch (err) {
        console.error('Error initializing angles data:', err);
        setError('Error loading analysis data. Please try again.');
        setIsLoading(false);
      }
    };

    initializeAnglesData();
  }, [navigate]);

  // Check if stored angles data is still valid (not expired)
  const isAnglesDataValid = (anglesData: any) => {
    if (!anglesData.timestamp) return false;

    const now = Date.now();
    const dataTime = new Date(anglesData.timestamp).getTime();
    const hoursPassed = (now - dataTime) / (1000 * 60 * 60);

    // Angles data is valid for 12 hours
    return hoursPassed < 12;
  };

  // Enhanced response parsing function
  // Enhanced response parsing function - FIXED VERSION
  const parseMarketingAnglesResponse = (responseData: any): MarketingAngle[] => {
    console.log('Raw API Response:', responseData);

    let angles: MarketingAngle[] = [];

    try {
      // Case 1: Direct array response
      if (Array.isArray(responseData) && responseData.length > 0) {

        // Check if it's a direct array of marketing angles
        if (responseData[0].angle_name) {
          console.log('Found direct array format');
          angles = responseData;
        }
        // Case 2: Array with nested structure (message.content.angles)
        else if (responseData[0]?.message?.content?.angles) {
          console.log('Found nested message.content.angles format');
          angles = responseData[0].message.content.angles;
        }
        // Case 3: Array with nested structure (message.content.angels) - TYPO CASE
        else if (responseData[0]?.message?.content?.angels) {
          console.log('Found nested message.content.angels format (typo fixed)');
          angles = responseData[0].message.content.angels;
        }
        // Case 4: Array with result property
        else if (responseData[0]?.result && Array.isArray(responseData[0].result)) {
          console.log('Found result array format');
          angles = responseData[0].result;
        }
        // Case 5: Array with angels property (typo case) - YOUR API RESPONSE
        else if (responseData[0]?.angels && Array.isArray(responseData[0].angels)) {
          console.log('Found object with angels array (typo fixed)');
          angles = responseData[0].angels;
        }
        // Case 6: Array with angles property
        else if (responseData[0]?.angles && Array.isArray(responseData[0].angles)) {
          console.log('Found object with angles array');
          angles = responseData[0].angles;
        }
      }
      // Case 7: Object with result property
      else if (responseData?.result && Array.isArray(responseData.result)) {
        console.log('Found object with result array');
        angles = responseData.result;
      }
      // Case 8: Object with angels property (typo case)
      else if (responseData?.angels && Array.isArray(responseData.angels)) {
        console.log('Found object with angels array (typo fixed)');
        angles = responseData.angels;
      }
      // Case 9: Object with angles property
      else if (responseData?.angles && Array.isArray(responseData.angles)) {
        console.log('Found object with angles array');
        angles = responseData.angles;
      }
      // Case 10: Object with marketing_angles property
      else if (responseData?.marketing_angles && Array.isArray(responseData.marketing_angles)) {
        console.log('Found object with marketing_angles array');
        angles = responseData.marketing_angles;
      }
      // Case 11: Single object response (wrap in array)
      else if (responseData?.angle_name) {
        console.log('Found single angle object, wrapping in array');
        angles = [responseData];
      }

      // Validate that we have valid angles
      if (angles.length > 0) {
        // Validate each angle has required properties
        const validAngles = angles.filter(angle =>
          angle &&
          typeof angle === 'object' &&
          angle.angle_name &&
          angle.hook_line
        );

        if (validAngles.length === 0) {
          throw new Error('No valid marketing angles found in response');
        }

        console.log(`Successfully parsed ${validAngles.length} marketing angles`);
        return validAngles;
      } else {
        console.error('Response structure analysis:', {
          isArray: Array.isArray(responseData),
          hasFirstElement: responseData?.[0] ? true : false,
          firstElementKeys: responseData?.[0] ? Object.keys(responseData[0]) : [],
          responseDataKeys: typeof responseData === 'object' ? Object.keys(responseData) : []
        });
        throw new Error('No marketing angles found in response');
      }

    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      console.error('Full response data:', JSON.stringify(responseData, null, 2));
      throw new Error(`Failed to parse marketing angles: ${parseError.message}`);
    }
  };
  const generateMarketingAngles = async (storedData: any) => {
    try {
      setIsLoading(true);
      setError(null);

      // Prepare request body with URL and description
      const requestBody = {
        url: storedData.originalUrl || '',
        description: storedData.analysisData?.detailed_description || storedData.analysisData?.product_name || 'Product analysis'
      };

      console.log('Calling marketing angles API with:', requestBody);

      const response = await axios.post(
        'https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/projectangles',

        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000 // 60 second timeout
        }
      );

      console.log('Marketing angles API response:', response.data);

      // Use the enhanced parsing function
      const parsedAngles = parseMarketingAnglesResponse(response.data);

      setMarketingAngles(parsedAngles);

      // Store the angles data with timestamp for persistence
      const anglesStorageData = {
        angles: parsedAngles,
        timestamp: new Date().toISOString(),
        originalUrl: storedData.originalUrl,
        productData: storedData.analysisData
      };

      sessionStorage.setItem('marketingAngles', JSON.stringify(anglesStorageData));
      console.log('Successfully set and stored marketing angles:', parsedAngles);

    } catch (error: any) {
      console.error('Marketing angles API call failed:', error);

      let errorMessage = 'Failed to generate marketing angles. Please try again.';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid request data. Please check and try again.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message.includes('Failed to parse')) {
        errorMessage = 'Received invalid data format from server. Please try again.';
      } else if (error.response?.data?.error) {
        errorMessage = `API Error: ${error.response.data.error}`;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleRegenerateAngles = async () => {
    const storedData = sessionStorage.getItem('productAnalysis');
    if (storedData) {
      setIsRegenerating(true);
      setError(null); // Clear any existing errors

      // Clear existing angles data
      sessionStorage.removeItem('marketingAngles');
      setMarketingAngles([]);

      const parsedData = JSON.parse(storedData);
      await generateMarketingAngles(parsedData);

      // Show success toast only if no error occurred and we have angles
      if (!error && marketingAngles.length > 0) {
        toast({
          title: "Success",
          description: "Marketing angles regenerated successfully",
        });
      }
    } else {
      setError('No analysis data found. Please start from the home page.');
      setTimeout(() => navigate('/'), 3000);
    }
  };





  // const handleCreateCampaign = async () => {
  //   // you already have marketingAngles[] in this page
  //   const resultAction = await dispatch(createCampaign({ marketingAngles }));
  //   console.log("Campaign creation result:", resultAction);

  //   if (createCampaign.fulfilled.match(resultAction)) {
  //     toast({ title: "Success!", description: "Campaign created successfully!" });
  //     // if you still want a copy in sessionStorage (optional)
  //     sessionStorage.setItem("campaignResponse", JSON.stringify(resultAction.payload));
  //     navigate("/Campaign"); // <- go to the page that reads ad sets
  //   } else {
  //     const msg = resultAction.payload ?? "Failed to create campaign. Please try again.";
  //     toast({ title: "Error", description: String(msg), variant: "destructive" });
  //   }
  // };


  const CampaignCreationLoading = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-0">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            <span className="font-medium">Back</span>
          </Button>

          <div className="text-center max-w-lg mx-auto">
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto mb-8 relative">
                <div className="w-24 h-24 border-4 border-gray-100 rounded-full animate-spin"></div>
                <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-26 h-24 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="TEadifyz.AI Logo"
                      className="w-26 h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Generating Adsets</h2>
            <p className="text-lg text-gray-600 mb-8">Our AI is creating targeted advertising campaigns for your marketing angles...</p>

            <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // added loadinhg
  // If campaign creation is in progress, show loading screen
    if (isCreatingCampaign) {
    return <CampaignCreationLoading />;
  }

  // Updated handleCreateCampaign function with loading state
  const handleCreateCampaign = async () => {
    try {
      // Set loading state to true
      setIsCreatingCampaign(true);

      // Clear any existing errors
      setError(null);

      console.log("Starting campaign creation with marketing angles:", marketingAngles);

      // Dispatch the createCampaign action
      const resultAction = await dispatch(createCampaign({ marketingAngles }));
      console.log("Campaign creation result:", resultAction);

      // Check if the action was fulfilled successfully
      if (createCampaign.fulfilled.match(resultAction)) {
        // Show success toast
        toast({
          title: "Success!",
          description: "Adsets generated successfully!"
        });

        // Optional: Store a copy in sessionStorage
        sessionStorage.setItem("campaignResponse", JSON.stringify(resultAction.payload));

        // Navigate to the next page
        navigate("/Campaign");

      } else {
        // Handle error case
        const errorMsg = resultAction.payload ?? "Failed to generate adsets. Please try again.";
        console.error("Campaign creation failed:", errorMsg);

        // Show error toast
        toast({
          title: "Error",
          description: String(errorMsg),
          variant: "destructive"
        });

        // Set error state for UI display
        setError(String(errorMsg));
      }

    } catch (error) {
      // Handle any unexpected errors
      console.error("Unexpected error during campaign creation:", error);

      const errorMessage = "An unexpected error occurred while generating adsets. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      setError(errorMessage);

    } finally {
      // Always set loading to false when done
      setIsCreatingCampaign(false);
    }
  };


  const getPlatformBadgeColor = (platform: string) => {
    const colors: Record<string, string> = {
      'LinkedIn': 'bg-blue-50 text-blue-700 border-blue-200',
      'YouTube': 'bg-red-50 text-red-700 border-red-200',
      'Google Ads': 'bg-green-50 text-green-700 border-green-200',
      'Google display ads': 'bg-green-50 text-green-700 border-green-200',
      'Instagram': 'bg-pink-50 text-pink-700 border-pink-200',
      'Instagram Reels': 'bg-pink-50 text-pink-700 border-pink-200',
      'Instagram Stories': 'bg-pink-50 text-pink-700 border-pink-200',
      'Facebook': 'bg-blue-50 text-blue-700 border-blue-200',
      'TikTok': 'bg-gray-50 text-gray-700 border-gray-200',
      'Reddit': 'bg-orange-50 text-orange-700 border-orange-200',
      'Twitter': 'bg-sky-50 text-sky-700 border-sky-200',
      'Amazon': 'bg-purple-50 text-purple-700 border-purple-200',
      'Pinterest': 'bg-red-50 text-red-700 border-red-200',
      'WhatsApp': 'bg-green-50 text-green-700 border-green-200'
    };
    return colors[platform] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getTriggerBadgeColor = (trigger: string) => {
    const colors: Record<string, string> = {
      'confidence': 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200',
      'trust': 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200',
      'reliability': 'bg-gradient-to-r from-green-100 to-teal-100 text-green-700 border-green-200',
      'excitement': 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 border-pink-200',
      'achievement': 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200',
      'desire': 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200',
      'curiosity': 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-200',
      'pride': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200',
      'admiration': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200',
      'comfort': 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-green-200',
      'creativity': 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200',
      'generosity': 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200',
      'nostalgia': 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200',
      'glamour': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200',
      'connection': 'bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 border-blue-200',
      'Security': 'bg-gradient-to-r from-green-100 to-teal-100 text-green-700 border-green-200',
      'Comfort': 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-green-200',
      'Empowerment': 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200',
      'Trust': 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200',
      'Excitement': 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 border-pink-200',
      'Pride': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200',
      'Reliability': 'bg-gradient-to-r from-green-100 to-teal-100 text-green-700 border-green-200',
      'Convenience': 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200',
      'Confidence': 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200'
    };
    return colors[trigger] || 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200';
  };

  // Error Screen
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              <span className="font-medium">Back</span>
            </Button>

            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Marketing Angles</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleGoBack} className="bg-gray-600 hover:bg-gray-700">
                  Back
                </Button>
                <Button onClick={handleRegenerateAngles} className="bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              <span className="font-medium">Back</span>
            </Button>

            <div className="text-center max-w-lg mx-auto">
              <div className="mb-12">
                <div className="w-24 h-24 mx-auto mb-8 relative">
                  <div className="w-24 h-24 border-4 border-gray-100 rounded-full animate-spin"></div>
                  <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <Brain className="text-blue-600 w-8 h-8" /> */}
                    <div className="w-26 h-24 flex items-center justify-center">
                      <img
                        src={logo}
                        alt="TEadifyz.AI Logo"
                        className="w-26 h-20 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Generating Marketing Angles</h2>
              <p className="text-lg text-gray-600 mb-8">Our AI is analyzing your product and creating targeted marketing strategies...</p>

              <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <p className="text-sm text-gray-500">This may take a few moments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-0 pb-32">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Button */}
          <Button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 border-none shadow-none"
            data-testid="button-back-description"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            <span className="font-medium">Back</span>
          </Button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">AI Marketing Strategy</span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Marketing <span className="text-blue-600">Angles</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI-generated marketing strategies and campaign angles tailored for your product
            </motion.p>
          </div>

          {/* Product Info Card */}
          {productData && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="product-name">
                      {productData.brand_name ? `${productData.brand_name} - ` : ''}{productData.product_name || 'Product Analysis'}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed" data-testid="product-description">
                      {productData.detailed_description || 'AI-generated marketing angles for your product'}
                    </p>
                    {productData.price_range && (
                      <div className="mt-4">
                        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
                          Price: {productData.price_range}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Marketing Angles Grid */}
          {marketingAngles.length > 0 && (
            <div className="mb-8">
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                AI-Generated Marketing Angles ({marketingAngles.length})
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {marketingAngles.map((angle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                  >
                    <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300" data-testid={`marketing-angle-card-${index}`}>
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-gray-900 flex-1 mr-4" data-testid={`angle-name-${index}`}>
                            {angle.angle_name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold border whitespace-nowrap ${getTriggerBadgeColor(angle.emotional_trigger)}`}
                            data-testid={`emotional-trigger-${index}`}
                          >
                            {angle.emotional_trigger}
                          </span>
                        </div>
                        <p className="text-xl font-semibold text-gray-700 mb-4 leading-relaxed" data-testid={`hook-line-${index}`}>
                          "{angle.hook_line}"
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Target Audience</h4>
                          <p className="text-gray-600" data-testid={`target-audience-${index}`}>
                            {angle.target_audience}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Visual Idea</h4>
                          <p className="text-gray-600" data-testid={`visual-idea-${index}`}>
                            {angle.visual_idea}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Platform</h4>
                            <span
                              className={`px-3 py-1 rounded-lg text-sm font-medium border transition-transform duration-200 hover:scale-105 ${getPlatformBadgeColor(angle.platform_recommendation)}`}
                              data-testid={`platform-badge-${index}`}
                            >
                              {angle.platform_recommendation}
                            </span>
                          </div>
                          <div className="text-right">
                            <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Estimated Budget</h4>
                            <span className="text-2xl font-bold text-green-600" data-testid={`budget-${index}`}>
                              {angle.Estimate_ads_Budget}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* No angles message */}
          {!isLoading && marketingAngles.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Marketing Angles Generated</h3>
              <p className="text-gray-600 mb-6">Unable to generate marketing angles at this time.</p>
              <Button onClick={handleRegenerateAngles} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handleCreateCampaign}
              disabled={marketingAngles.length === 0}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              data-testid="button-create-campaign"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Create Campaign
            </Button>


            <Button
              onClick={handleRegenerateAngles}
              disabled={isRegenerating || isLoading}
              className="flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-50"
              data-testid="button-regenerate-angles"
            >
              {isRegenerating ? (
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              ) : (
                <RotateCcw className="mr-2 w-5 h-5" />
              )}
              {isRegenerating ? 'Regenerating...' : 'Regenerate Angles'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;