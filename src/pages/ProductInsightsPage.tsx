








import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logoo.png"
import { 
  Brain, 
  Sparkles, 
  Globe,
  Tag,
  Users,
  Lightbulb,
  ChevronLeft,
  Star,
  Box,
  Rocket,
  RotateCcw,
  DollarSign,
  Target,
  TrendingUp,
  Eye,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { motion } from "framer-motion";
import axios from "axios";

const ProductInsightsPage = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<'loading' | 'analysis' | 'results'>('loading');
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('Initializing analysis...');
  const [currentStep, setCurrentStep] = useState(0);
  const [typingTexts, setTypingTexts] = useState(['', '', '', '']);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    {
      icon: Globe,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Analyzing Website Content',
      text: 'Scanning website structure and extracting product information from your provided URL...'
    },
    {
      icon: Tag,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'Extracting Product Details',
      text: 'Analyzing product features, pricing, specifications, and brand positioning...'
    },
    {
      icon: Users,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Identifying Target Audience',
      text: 'Identifying target demographics, customer personas, and market segments...'
    },
    {
      icon: Lightbulb,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Generating Marketing Insights',
      text: 'Generating comprehensive marketing insights and campaign recommendations...'
    }
  ];

  const typeText = (text: string, stepIndex: number, speed = 30): Promise<void> => {
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setTypingTexts(prev => {
            const newTexts = [...prev];
            newTexts[stepIndex] = text.slice(0, i);
            return newTexts;
          });
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  useEffect(() => {
    // Check if we have stored analysis data
    const storedData = sessionStorage.getItem('productAnalysis');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        
        // If we already have analysis data, skip API call
        if (parsedData.analysisData) {
          setAnalysisData(parsedData.analysisData);
          runAnalysisAnimation();
        } else {
          // Make API call with the stored request data
          makeApiCall(parsedData);
        }
      } catch (err) {
        console.error('Error parsing stored data:', err);
        setError('Invalid analysis data. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      }
    } else {
      setError('No analysis data found. Please start from the home page.');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [navigate]);

  const makeApiCall = async (storedData) => {
    try {
      // Start the analysis animation first
      runAnalysisAnimation();
      
      console.log('Making API call with data:', storedData.requestData);
      
      // Call the API
      const response = await axios.post(
        'https://base234.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/projectbrief',
        storedData.requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000 // 60 second timeout
        }
      );
  
      // DEBUG: Log the entire response to see what we're getting
      console.log('Full API response:', response);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data length:', response.data?.length);
  
      // Check if response.data exists and has content
      if (response.data) {
        console.log('Response data structure:', JSON.stringify(response.data, null, 2));
        
        // Try different possible response structures
        let analysisData = null;
        
        // Option 1: Check if response.data is directly the analysis data (object)
        if (typeof response.data === 'object' && !Array.isArray(response.data) && response.data.product_name) {
          console.log('Found analysis data directly in response.data');
          analysisData = response.data;
        }
        // Option 2: Check if response.data is an array with analysis data
        else if (Array.isArray(response.data) && response.data.length > 0) {
          console.log('Response is array, checking first element...');
          
          // Check if first element has message.content structure
          if (response.data[0]?.message?.content) {
            console.log('Found analysis data in response.data[0].message.content');
            analysisData = response.data[0].message.content;
          }
          // Check if first element is directly the analysis data
          else if (response.data[0]?.product_name) {
            console.log('Found analysis data directly in response.data[0]');
            analysisData = response.data[0];
          }
          // Check if the array contains the analysis data directly
          else {
            console.log('Checking if array contains analysis data directly');
            analysisData = response.data[0];
          }
        }
        // Option 3: Check if response.data has a nested structure
        else if (response.data.content || response.data.analysis || response.data.result) {
          console.log('Found analysis data in nested structure');
          analysisData = response.data.content || response.data.analysis || response.data.result;
        }
        
        console.log('Final analysisData:', analysisData);
        console.log('AnalysisData type:', typeof analysisData);
        
        if (analysisData) {
          // If analysisData is a string, try to parse it as JSON
          if (typeof analysisData === 'string') {
            try {
              analysisData = JSON.parse(analysisData);
              console.log('Successfully parsed string response as JSON');
            } catch (parseError) {
              console.error('Failed to parse response as JSON:', parseError);
              throw new Error('Invalid JSON response format');
            }
          }
          
          // Update stored data with the analysis results
          const updatedStorageData = {
            ...storedData,
            analysisData,
            timestamp: new Date().toISOString()
          };
          
          sessionStorage.setItem('productAnalysis', JSON.stringify(updatedStorageData));
          setAnalysisData(analysisData);
        } else {
          console.error('No valid analysis data found in response');
          console.error('Available response keys:', Object.keys(response.data || {}));
          throw new Error('No analysis data found in API response');
        }
      } else {
        console.error('No response data received');
        throw new Error('Empty response from API');
      }
    } catch (error) {
      console.error('API call failed:', error);
      
      // Log more details about the error
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      
      // Show user-friendly error message
      let errorMessage = 'Analysis failed. Please try again.';
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid website URL. Please check and try again.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      setError(errorMessage);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  const runAnalysisAnimation = async () => {
    // Initial loading phase
    setProgressText('Initializing AI analysis engine...');
    setProgress(15);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setProgressText('Connecting to product analysis systems...');
    setProgress(40);
    
    await new Promise(resolve => setTimeout(resolve, 700));
    setProgressText('Preparing advanced algorithms...');
    setProgress(70);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setProgressText('Starting analysis...');
    setProgress(100);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Transition to analysis screen
    setCurrentScreen('analysis');
    
    // Start analysis steps
    await runAnalysisSteps();
  };

  const runAnalysisSteps = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await typeText(steps[i].text, i);
      await new Promise(resolve => setTimeout(resolve, 1800));
    }
    
    // Transition to results
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentScreen('results');
  };

  const handleGoBack = () => {
    sessionStorage.removeItem('productAnalysis');
    navigate('/');
  };

  const handleCreateCampaign = () => {
    navigate('/pricing-plan');
  };

  const handleRegenerate = async () => {
    const storedData = sessionStorage.getItem('productAnalysis');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      try {
        // Show loading state
        setCurrentScreen('loading');
        setProgress(0);
        setCurrentStep(0);
        setTypingTexts(['', '', '', '']);
        setProgressText('Regenerating analysis...');
        
        // Call the SAME API endpoint as in HeroSection
        const response = await axios.post(
          'https://spideyxxx.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/projectbrief',
          {
            url: parsedData.originalUrl,
            // Include description if it was provided originally
            ...(parsedData.originalDescription && { description: parsedData.originalDescription })
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 60000
          }
        );
  
        if (response.data && response.data.length > 0) {
          const newAnalysisData = response.data[0]?.message?.content;
          if (newAnalysisData) {
            // Update stored data with new analysis
            const updatedStoredData = {
              ...parsedData,
              analysisData: newAnalysisData,
              timestamp: new Date().toISOString()
            };
            sessionStorage.setItem('productAnalysis', JSON.stringify(updatedStoredData));
            setAnalysisData(newAnalysisData);
            
            // Start the analysis animation again
            runAnalysisAnimation();
          } else {
            throw new Error('Invalid response format from API');
          }
        } else {
          throw new Error('No analysis data received from API');
        }
      } catch (error) {
        console.error('Regeneration failed:', error);
        
        // Show user-friendly error message
        let errorMessage = 'Regeneration failed. Please try again.';
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (error.response?.status === 400) {
          errorMessage = 'Invalid website URL. Please check and try again.';
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        alert(errorMessage);
        
        // Return to results screen on error
        setCurrentScreen('results');
      }
    } else {
      alert('No original data found. Please start from the home page.');
      navigate('/');
    }
  };

  // Error Screen
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (currentScreen === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
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
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis Starting</h2>
          <p className="text-lg text-gray-600 mb-12">Our advanced AI is preparing to analyze your product and generate comprehensive insights...</p>
          
          <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-base text-gray-500 font-medium">{progressText}</p>
        </div>
      </div>
    );
  }

  // Analysis Progress Screen
  if (currentScreen === 'analysis') {
    return (
      <div className="min-h-screen bg-white">
        {/* <Navigation /> */}
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Button 
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
              data-testid="button-back-analysis"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Button>

            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                {/* <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg"> */}
                <div className="w-26 h-24 flex items-center justify-center">
                <img
                  src={logo}
                  alt="TEadifyz.AI Logo"
                  className="w-26 h-20 object-contain"
                />
              </div>
                {/* </div> */}
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">AI Analysis in Progress</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Generating Product <span className="text-blue-600">Insights</span></h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Advanced AI algorithms are analyzing your content to extract valuable product information and market insights</p>
            </div>

            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index <= currentStep;
                  const isCurrentStep = index === currentStep;
                  
                  return (
                    <motion.div
                      key={index}
                      className={`flex items-start space-x-6 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                      initial={{ opacity: 0.4, x: -20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.4,
                        x: isActive ? 0 : -20 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center mt-1 shadow-sm border-2 ${isCurrentStep ? 'border-blue-200' : 'border-transparent'}`}>
                        <StepIcon className={`${step.iconColor} w-6 h-6`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className={`text-lg text-gray-600 leading-relaxed ${isCurrentStep ? 'typing-cursor' : ''}`}>
                          {typingTexts[index]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen - Display actual API data
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading analysis data...</p>
        </div>
      </div>
    );
  }

  return (
    
     
      <div className="pt-0">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
            data-testid="button-back-results"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Button>
          
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
            <div className="w-26 h-24 flex items-center justify-center">
                <img
                  src={logo}
                  alt="TEadifyz.AI Logo"
                  className="w-26 h-20 object-contain"
                />
              </div>
              <span className="text-green-600 font-bold uppercase tracking-wide text-sm">Analysis Complete</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">Product Insights <span className="text-blue-600">Ready</span></h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive AI-powered analysis of your product with actionable marketing insights</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Product Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Overview */}
              <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 border-2 border-blue-100">
                    <Box className="text-blue-600 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Product Overview</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {analysisData.brand_name ? `${analysisData.brand_name} - ` : ''}{analysisData.product_name || 'Product Analysis'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {analysisData.detailed_description || 'Detailed product analysis and insights generated by AI.'}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Price Range</h4>
                      <p className="text-3xl font-bold text-blue-600">
                        {analysisData.price_range || 'Not specified'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Category</h4>
                      <p className="text-lg font-semibold text-purple-600">
                        {analysisData.product_category?.main_category || 'General Product'}
                        {analysisData.product_category?.subcategory && (
                          <><br /><span className="text-sm text-purple-500">{analysisData.product_category.subcategory}</span></>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Specifications */}
              {analysisData.specifications && analysisData.specifications.length > 0 && (
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4 border-2 border-green-100">
                      <Target className="text-green-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Key Specifications</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {analysisData.specifications.map((spec, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 font-medium">{spec}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Target Audience */}
              {analysisData.target_audience && (
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mr-4 border-2 border-purple-100">
                      <Users className="text-purple-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Target Audience</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {analysisData.target_audience.demographics && (
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                        <h4 className="font-bold text-gray-900 mb-3">Demographics</h4>
                        <p className="text-gray-600">{analysisData.target_audience.demographics}</p>
                      </div>
                    )}
                    {analysisData.target_audience.interests && (
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="font-bold text-gray-900 mb-3">Interests</h4>
                        <p className="text-gray-600">{analysisData.target_audience.interests}</p>
                      </div>
                    )}
                    {analysisData.target_audience.lifestyle && (
                      <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-bold text-gray-900 mb-3">Lifestyle</h4>
                        <p className="text-gray-600">{analysisData.target_audience.lifestyle}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Key Selling Points */}
              {analysisData.key_selling_points && analysisData.key_selling_points.length > 0 && (
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4 border-2 border-green-100">
                      <Star className="text-green-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Key Selling Points</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {analysisData.key_selling_points.map((point, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 ${
                          index % 4 === 0 ? 'bg-blue-600' :
                          index % 4 === 1 ? 'bg-purple-600' :
                          index % 4 === 2 ? 'bg-green-600' : 'bg-orange-600'
                        } rounded-full`}></div>
                        <p className="text-gray-700 font-medium">{point}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Emotional Appeal */}
              {analysisData.emotional_appeal && (
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mr-4 border-2 border-orange-100">
                      <MessageSquare className="text-orange-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Emotional Appeal</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{analysisData.emotional_appeal}</p>
                </Card>
              )}

              {/* Use Cases */}
              {analysisData.possible_use_cases && analysisData.possible_use_cases.length > 0 && (
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 border-2 border-blue-100">
                      <Eye className="text-blue-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Use Cases</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysisData.possible_use_cases.map((useCase, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-gray-700 font-medium">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Additional Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-24">
                {/* Brand Info */}
                <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Information</h3>
                    <p className="text-gray-600">AI-extracted brand details</p>
                  </div>
                  
                  <div className="space-y-4">
                    {analysisData.brand_name && (
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Brand</span>
                        <span className="font-bold text-gray-900">{analysisData.brand_name}</span>
                      </div>
                    )}
                    {analysisData.product_name && (
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Product</span>
                        <span className="font-bold text-gray-900">{analysisData.product_name}</span>
                      </div>
                    )}
                    {analysisData.price_range && (
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-gray-600 font-medium">Price</span>
                        <span className="font-bold text-gray-900">{analysisData.price_range}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-3">
                      <Star className="text-yellow-400 fill-current w-5 h-5" />
                      <Star className="text-yellow-400 fill-current w-5 h-5" />
                      <Star className="text-yellow-400 fill-current w-5 h-5" />
                      <Star className="text-yellow-400 fill-current w-5 h-5" />
                      <Star className="text-yellow-400 fill-current w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">AI Analysis Complete</p>
                  </div>
                </Card>

                {/* Recommended Platforms */}
                {analysisData.recommended_platforms && analysisData.recommended_platforms.length > 0 && (
                  <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Platforms</h3>
                    <div className="space-y-2">
                      {analysisData.recommended_platforms.slice(0, 6).map((platform, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
                          <span className="text-sm font-medium text-gray-700">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* SEO Keywords Preview */}
                {analysisData.seo_keywords && analysisData.seo_keywords.length > 0 && (
                  <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">SEO Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.seo_keywords.slice(0, 8).map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Upsell Opportunities */}
                {analysisData.upsell_opportunities && analysisData.upsell_opportunities.length > 0 && (
                  <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Upsell Opportunities</h3>
                    <div className="space-y-3">
                      {analysisData.upsell_opportunities.slice(0, 4).map((opportunity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <ShoppingCart className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Competitor Analysis */}
          {analysisData.competitor_analysis && (
            <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mr-4 border-2 border-red-100">
                  <TrendingUp className="text-red-600 w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Competitor Analysis</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{analysisData.competitor_analysis}</p>
            </Card>
          )}

          {/* Potential Pain Points */}
          {analysisData.potential_pain_points && analysisData.potential_pain_points.length > 0 && (
            <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mr-4 border-2 border-yellow-100">
                  <Target className="text-yellow-600 w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Potential Challenges</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {analysisData.potential_pain_points.map((point, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                    <p className="text-gray-700 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Content Suggestions */}
          {analysisData.content_suggestions && analysisData.content_suggestions.length > 0 && (
            <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 border-2 border-indigo-100">
                  <Lightbulb className="text-indigo-600 w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Content Suggestions</h2>
              </div>
              
              <div className="space-y-4">
                {analysisData.content_suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 font-medium">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col  sm:flex-row gap-6 justify-center fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-400">
          <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button 
              onClick={handleCreateCampaign}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              data-testid="button-create-campaign"
            >
              <Rocket className="mr-3 w-5 h-5" />
              Create Campaign
            </Button>
            <Button 
              onClick={handleRegenerate}
              className="bg-gray-600 hover:bg-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              data-testid="button-regenerate"
            >
              <RotateCcw className="mr-3 w-5 h-5" />
              Regenerate Analysis
            </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ProductInsightsPage;





// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navigation } from "@/components/Navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import logo from "@/assets/logoo.png"
// import { 
//   Brain, 
//   Sparkles, 
//   Globe,
//   Tag,
//   Users,
//   Lightbulb,
//   ChevronLeft,
//   Star,
//   Box,
//   Rocket,
//   RotateCcw,
//   DollarSign,
//   Target,
//   TrendingUp,
//   Eye,
//   ShoppingCart,
//   MessageSquare
// } from 'lucide-react';
// import { motion } from "framer-motion";
// import axios from "axios";

// const ProductInsightsPage = () => {
//   const navigate = useNavigate();
//   const [currentScreen, setCurrentScreen] = useState<'loading' | 'analysis' | 'results'>('loading');
//   const [progress, setProgress] = useState(0);
//   const [progressText, setProgressText] = useState('Initializing analysis...');
//   const [currentStep, setCurrentStep] = useState(0);
//   const [typingTexts, setTypingTexts] = useState(['', '', '', '']);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [error, setError] = useState(null);

//   const steps = [
//     {
//       icon: Globe,
//       iconColor: 'text-blue-600',
//       bgColor: 'bg-blue-50',
//       title: 'Analyzing Website Content',
//       text: 'Scanning website structure and extracting product information from your provided URL...'
//     },
//     {
//       icon: Tag,
//       iconColor: 'text-purple-600',
//       bgColor: 'bg-purple-50',
//       title: 'Extracting Product Details',
//       text: 'Analyzing product features, pricing, specifications, and brand positioning...'
//     },
//     {
//       icon: Users,
//       iconColor: 'text-green-600',
//       bgColor: 'bg-green-50',
//       title: 'Identifying Target Audience',
//       text: 'Identifying target demographics, customer personas, and market segments...'
//     },
//     {
//       icon: Lightbulb,
//       iconColor: 'text-orange-600',
//       bgColor: 'bg-orange-50',
//       title: 'Generating Marketing Insights',
//       text: 'Generating comprehensive marketing insights and campaign recommendations...'
//     }
//   ];

//   const typeText = (text: string, stepIndex: number, speed = 30): Promise<void> => {
//     return new Promise(resolve => {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i <= text.length) {
//           setTypingTexts(prev => {
//             const newTexts = [...prev];
//             newTexts[stepIndex] = text.slice(0, i);
//             return newTexts;
//           });
//           i++;
//         } else {
//           clearInterval(interval);
//           resolve();
//         }
//       }, speed);
//     });
//   };

//   useEffect(() => {
//     const initializeData = () => {
//       try {
//         // Check if we have stored analysis data
//         const storedData = sessionStorage.getItem('productAnalysis');
        
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
          
//           // If we already have analysis data and it's still valid, show it directly
//           if (parsedData.analysisData && isDataValid(parsedData)) {
//             console.log('Found valid existing analysis data, displaying results');
//             setAnalysisData(parsedData.analysisData);
//             setCurrentScreen('results');
//             return;
//           }
          
//           // If we have stored request data but no analysis data, make API call
//           if (parsedData.requestData || parsedData.originalUrl) {
//             console.log('Found request data, making API call');
//             makeApiCall(parsedData);
//             return;
//           }
//         }
        
//         // No stored data found, redirect to home
//         console.log('No valid data found, redirecting to home');
//         setError('No analysis data found. Please start from the home page.');
//         setTimeout(() => navigate('/'), 3000);
        
//       } catch (err) {
//         console.error('Error initializing data:', err);
//         setError('Invalid analysis data. Please try again.');
//         setTimeout(() => navigate('/'), 3000);
//       }
//     };

//     initializeData();
//   }, [navigate]);

//   // Check if stored data is still valid (not expired)
//   const isDataValid = (storedData) => {
//     if (!storedData.timestamp) return false;
    
//     const now = Date.now();
//     const dataTime = new Date(storedData.timestamp).getTime();
//     const hoursPassed = (now - dataTime) / (1000 * 60 * 60);
    
//     // Data is valid for 24 hours
//     return hoursPassed < 24;
//   };

//   const makeApiCall = async (storedData) => {
//     try {
//       // Start the analysis animation first
//       setCurrentScreen('loading');
//       setProgress(0);
//       setCurrentStep(0);
//       setTypingTexts(['', '', '', '']);
//       runAnalysisAnimation();
      
//       // Prepare request data
//       const requestData = storedData.requestData || {
//         url: storedData.originalUrl,
//         ...(storedData.originalDescription && { description: storedData.originalDescription })
//       };
      
//       console.log('Making API call with data:', requestData);
      
//       // Call the API
//       const response = await axios.post(
//         'https://tedifyz.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/projectbrief',
//         requestData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 60000 // 60 second timeout
//         }
//       );
  
//       // DEBUG: Log the entire response to see what we're getting
//       console.log('Full API response:', response);
//       console.log('Response data:', response.data);
//       console.log('Response data type:', typeof response.data);
//       console.log('Response data length:', response.data?.length);
  
//       // Check if response.data exists and has content
//       if (response.data) {
//         console.log('Response data structure:', JSON.stringify(response.data, null, 2));
        
//         // Try different possible response structures
//         let analysisData = null;
        
//         // Option 1: Check if response.data is directly the analysis data (object)
//         if (typeof response.data === 'object' && !Array.isArray(response.data) && response.data.product_name) {
//           console.log('Found analysis data directly in response.data');
//           analysisData = response.data;
//         }
//         // Option 2: Check if response.data is an array with analysis data
//         else if (Array.isArray(response.data) && response.data.length > 0) {
//           console.log('Response is array, checking first element...');
          
//           // Check if first element has message.content structure
//           if (response.data[0]?.message?.content) {
//             console.log('Found analysis data in response.data[0].message.content');
//             analysisData = response.data[0].message.content;
//           }
//           // Check if first element is directly the analysis data
//           else if (response.data[0]?.product_name) {
//             console.log('Found analysis data directly in response.data[0]');
//             analysisData = response.data[0];
//           }
//           // Check if the array contains the analysis data directly
//           else {
//             console.log('Checking if array contains analysis data directly');
//             analysisData = response.data[0];
//           }
//         }
//         // Option 3: Check if response.data has a nested structure
//         else if (response.data.content || response.data.analysis || response.data.result) {
//           console.log('Found analysis data in nested structure');
//           analysisData = response.data.content || response.data.analysis || response.data.result;
//         }
        
//         console.log('Final analysisData:', analysisData);
//         console.log('AnalysisData type:', typeof analysisData);
        
//         if (analysisData) {
//           // If analysisData is a string, try to parse it as JSON
//           if (typeof analysisData === 'string') {
//             try {
//               analysisData = JSON.parse(analysisData);
//               console.log('Successfully parsed string response as JSON');
//             } catch (parseError) {
//               console.error('Failed to parse response as JSON:', parseError);
//               throw new Error('Invalid JSON response format');
//             }
//           }
          
//           // Update stored data with the analysis results and timestamp
//           const updatedStorageData = {
//             requestData,
//             originalUrl: requestData.url,
//             originalDescription: requestData.description,
//             analysisData,
//             timestamp: new Date().toISOString()
//           };
          
//           sessionStorage.setItem('productAnalysis', JSON.stringify(updatedStorageData));
//           setAnalysisData(analysisData);
//         } else {
//           console.error('No valid analysis data found in response');
//           console.error('Available response keys:', Object.keys(response.data || {}));
//           throw new Error('No analysis data found in API response');
//         }
//       } else {
//         console.error('No response data received');
//         throw new Error('Empty response from API');
//       }
//     } catch (error) {
//       console.error('API call failed:', error);
      
//       // Log more details about the error
//       if (error.response) {
//         console.error('Error response status:', error.response.status);
//         console.error('Error response data:', error.response.data);
//         console.error('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         console.error('Error request:', error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
      
//       // Show user-friendly error message
//       let errorMessage = 'Analysis failed. Please try again.';
//       if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timed out. Please try again.';
//       } else if (error.response?.status === 400) {
//         errorMessage = 'Invalid website URL. Please check and try again.';
//       } else if (error.response?.status >= 500) {
//         errorMessage = 'Server error. Please try again later.';
//       }
      
//       setError(errorMessage);
//       setTimeout(() => navigate('/'), 3000);
//     }
//   };

//   const runAnalysisAnimation = async () => {
//     // Initial loading phase
//     setProgressText('Initializing AI analysis engine...');
//     setProgress(15);
    
//     await new Promise(resolve => setTimeout(resolve, 600));
//     setProgressText('Connecting to product analysis systems...');
//     setProgress(40);
    
//     await new Promise(resolve => setTimeout(resolve, 700));
//     setProgressText('Preparing advanced algorithms...');
//     setProgress(70);
    
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setProgressText('Starting analysis...');
//     setProgress(100);
    
//     await new Promise(resolve => setTimeout(resolve, 200));
    
//     // Transition to analysis screen
//     setCurrentScreen('analysis');
    
//     // Start analysis steps
//     await runAnalysisSteps();
//   };

//   const runAnalysisSteps = async () => {
//     for (let i = 0; i < steps.length; i++) {
//       setCurrentStep(i);
//       await typeText(steps[i].text, i);
//       await new Promise(resolve => setTimeout(resolve, 1800));
//     }
    
//     // Transition to results
//     await new Promise(resolve => setTimeout(resolve, 800));
//     setCurrentScreen('results');
//   };

//   const handleGoBack = () => {
//     // Clear all stored data when going back to home
//     sessionStorage.removeItem('productAnalysis');
//     navigate('/');
//   };

//   const handleCreateCampaign = () => {
//     navigate('/pricing-plan');
//   };

//   const handleRegenerate = async () => {
//     const storedData = sessionStorage.getItem('productAnalysis');
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
      
//       try {
//         // Clear existing analysis data but keep request data
//         const requestData = parsedData.requestData || {
//           url: parsedData.originalUrl,
//           ...(parsedData.originalDescription && { description: parsedData.originalDescription })
//         };
        
//         // Update storage with cleared analysis data
//         const clearedData = {
//           requestData,
//           originalUrl: requestData.url,
//           originalDescription: requestData.description,
//           analysisData: null, // Clear existing analysis
//           timestamp: new Date().toISOString()
//         };
        
//         sessionStorage.setItem('productAnalysis', JSON.stringify(clearedData));
        
//         // Reset state
//         setError(null);
//         setAnalysisData(null);
        
//         // Make new API call
//         await makeApiCall(clearedData);
        
//       } catch (error) {
//         console.error('Regeneration failed:', error);
        
//         // Show user-friendly error message
//         let errorMessage = 'Regeneration failed. Please try again.';
//         if (error.code === 'ECONNABORTED') {
//           errorMessage = 'Request timed out. Please try again.';
//         } else if (error.response?.status === 400) {
//           errorMessage = 'Invalid website URL. Please check and try again.';
//         } else if (error.response?.status >= 500) {
//           errorMessage = 'Server error. Please try again later.';
//         }
        
//         setError(errorMessage);
//       }
//     } else {
//       setError('No original data found. Please start from the home page.');
//       setTimeout(() => navigate('/'), 3000);
//     }
//   };

//   // Error Screen
//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center max-w-lg mx-auto px-6">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
//             <div className="w-8 h-8 bg-red-500 rounded-full"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700">
//             Go Back Home
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // Loading Screen
//   if (currentScreen === 'loading') {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center max-w-lg mx-auto px-6">
//           <div className="mb-12">
//             <div className="w-24 h-24 mx-auto mb-8 relative">
//               <div className="w-24 h-24 border-4 border-gray-100 rounded-full animate-spin"></div>
//               <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-26 h-24 flex items-center justify-center">
//                 <img
//                   src={logo}
//                   alt="TEadifyz.AI Logo"
//                   className="w-26 h-20 object-contain"
//                 />
//               </div>
//               </div>
//             </div>
//           </div>
          
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis Starting</h2>
//           <p className="text-lg text-gray-600 mb-12">Our advanced AI is preparing to analyze your product and generate comprehensive insights...</p>
          
//           <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
//             <div 
//               className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-base text-gray-500 font-medium">{progressText}</p>
//         </div>
//       </div>
//     );
//   }

//   // Analysis Progress Screen
//   if (currentScreen === 'analysis') {
//     return (
//       <div className="min-h-screen bg-white">
//         <div className="pt-20">
//           <div className="max-w-4xl mx-auto px-6 py-8">
//             <Button 
//               onClick={handleGoBack}
//               className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
//               data-testid="button-back-analysis"
//             >
//               <ChevronLeft className="mr-2 w-5 h-5" />
//               <span className="font-medium">Back to Home</span>
//             </Button>

//             <div className="text-center mb-16">
//               <div className="flex items-center justify-center mb-6">
//                 <div className="w-26 h-24 flex items-center justify-center">
//                 <img
//                   src={logo}
//                   alt="TEadifyz.AI Logo"
//                   className="w-26 h-20 object-contain"
//                 />
//               </div>
//                 <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">AI Analysis in Progress</span>
//               </div>
//               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Generating Product <span className="text-blue-600">Insights</span></h1>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">Advanced AI algorithms are analyzing your content to extract valuable product information and market insights</p>
//             </div>

//             <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
//               <div className="space-y-8">
//                 {steps.map((step, index) => {
//                   const StepIcon = step.icon;
//                   const isActive = index <= currentStep;
//                   const isCurrentStep = index === currentStep;
                  
//                   return (
//                     <motion.div
//                       key={index}
//                       className={`flex items-start space-x-6 ${isActive ? 'opacity-100' : 'opacity-40'}`}
//                       initial={{ opacity: 0.4, x: -20 }}
//                       animate={{ 
//                         opacity: isActive ? 1 : 0.4,
//                         x: isActive ? 0 : -20 
//                       }}
//                       transition={{ duration: 0.6, ease: "easeOut" }}
//                     >
//                       <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center mt-1 shadow-sm border-2 ${isCurrentStep ? 'border-blue-200' : 'border-transparent'}`}>
//                         <StepIcon className={`${step.iconColor} w-6 h-6`} />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
//                         <p className={`text-lg text-gray-600 leading-relaxed ${isCurrentStep ? 'typing-cursor' : ''}`}>
//                           {typingTexts[index]}
//                         </p>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Results Screen - Display actual API data
//   if (!analysisData) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">Loading analysis data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-0">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <Button 
//           onClick={handleGoBack}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-transparent hover:bg-gray-50 border-none shadow-none p-2"
//           data-testid="button-back-results"
//         >
//           <ChevronLeft className="mr-2 w-5 h-5" />
//           <span className="font-medium">Back to Home</span>
//         </Button>
        
//         {/* Results Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-6">
//           <div className="w-26 h-24 flex items-center justify-center">
//               <img
//                 src={logo}
//                 alt="TEadifyz.AI Logo"
//                 className="w-26 h-20 object-contain"
//               />
//             </div>
//             <span className="text-green-600 font-bold uppercase tracking-wide text-sm">Analysis Complete</span>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">Product Insights <span className="text-blue-600">Ready</span></h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive AI-powered analysis of your product with actionable marketing insights</p>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           {/* Left Column - Product Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Product Overview */}
//             <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 border-2 border-blue-100">
//                   <Box className="text-blue-600 w-6 h-6" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">Product Overview</h2>
//               </div>
              
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {analysisData.brand_name ? `${analysisData.brand_name} - ` : ''}{analysisData.product_name || 'Product Analysis'}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {analysisData.detailed_description || 'Detailed product analysis and insights generated by AI.'}
//                   </p>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
//                     <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Price Range</h4>
//                     <p className="text-3xl font-bold text-blue-600">
//                       {analysisData.price_range || 'Not specified'}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
//                     <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Category</h4>
//                     <p className="text-lg font-semibold text-purple-600">
//                       {analysisData.product_category?.main_category || 'General Product'}
//                       {analysisData.product_category?.subcategory && (
//                         <><br /><span className="text-sm text-purple-500">{analysisData.product_category.subcategory}</span></>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Rest of the component remains the same... */}
//             {/* I'll include the key components for brevity, but the full structure should remain */}

//             {/* Specifications */}
//             {analysisData.specifications && analysisData.specifications.length > 0 && (
//               <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
//                 <div className="flex items-center mb-6">
//                   <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4 border-2 border-green-100">
//                     <Target className="text-green-600 w-6 h-6" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900">Key Specifications</h2>
//                 </div>
                
//                 <div className="space-y-4">
//                   {analysisData.specifications.map((spec, index) => (
//                     <div key={index} className="flex items-start space-x-4">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
//                       <p className="text-gray-700 font-medium">{spec}</p>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Continue with all other sections... */}
//           </div>

//           {/* Right Column - Additional Info */}
//           <div className="lg:col-span-1">
//             <div className="space-y-8 sticky top-24">
//               {/* Brand Info and other cards remain the same */}
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-6 justify-center fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-400">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-center space-x-4">
//           <Button 
//             onClick={handleCreateCampaign}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             data-testid="button-create-campaign"
//           >
//             <Rocket className="mr-3 w-5 h-5" />
//             Create Campaign
//           </Button>
//           <Button 
//             onClick={handleRegenerate}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             data-testid="button-regenerate"
//           >
//             <RotateCcw className="mr-3 w-5 h-5" />
//             Regenerate Analysis
//           </Button>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInsightsPage;