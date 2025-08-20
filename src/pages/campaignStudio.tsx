import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share, Upload, X, Check, ChevronDown, ChevronUp, Youtube, PlayCircle, Rss, MoreHorizontal, UploadCloud, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/Store/hooks"; // Use typed selector
import { toast } from "@/components/ui/use-toast"; // Add toast for debugging

// Updated interface to match your API response exactly
interface AdSet {
  ad_set_name: string;
  campaign_objective: string;
  target_audience: {
    location: string;
    age_range: string;
    gender: string;
    interests: string[];
  };
  placements: string[];
  daily_budget?: string;
  creative_brief: string;
  ad_copy_variations: {
    short_form: string[];
    long_form: string[];
  };
  primary_text: string;
  headline: string;
  call_to_action?: string;
}

export default function CampaignStudio() {
  const navigate = useNavigate();
  // Use typed selector
  const { adSets, status, error } = useAppSelector((state) => state.campaign);
  
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

  // Debug: Log the current state
  useEffect(() => {
    console.log("CampaignStudio - Current state:", {
      adSetsLength: adSets.length,
      status,
      error,
      adSets: adSets.slice(0, 2) // Log first 2 for debugging
    });
    
    if (status === 'succeeded' && adSets.length > 0) {
      toast({
        title: "Campaign Data Loaded",
        description: `Successfully loaded ${adSets.length} ad sets`,
      });
    }
    
    if (status === 'failed' && error) {
      toast({
        title: "Error Loading Campaign",
        description: error,
        variant: "destructive",
      });
    }
  }, [adSets, status, error]);

  // Calculate enabled ad sets based on budget (each ad set costs $5)
  const enabledAdSetCount = Math.max(1, Math.floor(budget / 5)); // Ensure at least 1
  const enabledAdSets = adSets.slice(0, enabledAdSetCount);

  // Auto-select first enabled ad set when budget changes or adSets are loaded
  useEffect(() => {
    if (enabledAdSets.length > 0 && !selectedAdSet) {
      console.log("Auto-selecting first ad set:", enabledAdSets[0]);
      setSelectedAdSet(enabledAdSets[0]);
    }
  }, [enabledAdSetCount, adSets.length, selectedAdSet]);

  const handleBudgetChange = (value: number) => {
    // Ensure value is multiple of 5 and within range
    const maxBudget = Math.max(5, adSets.length * 5);
    const clampedValue = Math.max(5, Math.min(maxBudget, Math.round(value / 5) * 5));
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

  const selectAdSet = (adSet: AdSet, index: number) => {
    // Only allow selection of enabled ad sets
    if (index < enabledAdSetCount) {
      console.log("Selecting ad set:", adSet.ad_set_name);
      setSelectedAdSet(adSet);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
    const handlePrevious = () => {
        console.log("Navigate to previous step");
        // Navigate to your previous page
        navigate('/Campaign');
    };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading campaign data...</p>
          <p className="text-gray-500 text-sm mt-2">Creating your ad sets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Campaign</h2>
            <p className="text-red-600 text-sm mb-4">{error || "Unknown error occurred"}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => window.history.back()} 
                variant="outline"
                className="w-full"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No ad sets available
  if (status === 'succeeded' && adSets.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">No Ad Sets Available</h2>
            <p className="text-gray-600 text-sm mb-4">Please create a campaign first to see ad sets here.</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create Campaign
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-4">
                        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900" onClick={handlePrevious}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font-medium">Back</span>
                        </Button>
                        
                    </div>
        {/* Debug Info (Remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              Debug: Status: {status}, Ad Sets: {adSets.length}, Selected: {selectedAdSet?.ad_set_name || 'None'}
            </p>
          </div>
        )}
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-lg">🎯</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Studio</h1>
            <span className="ml-3 text-sm text-gray-500">({adSets.length} Ad Sets Available)</span>
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
                <div className="text-sm text-gray-500">{enabledAdSetCount} of {adSets.length} Ad Sets</div>
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
                    max={Math.max(5, adSets.length * 5)}
                    step="5"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((budget - 5) / ((adSets.length * 5) - 5)) * 100}%, #e5e7eb ${((budget - 5) / ((adSets.length * 5) - 5)) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$5</span>
                    <span>${adSets.length * 5}</span>
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
                    max={adSets.length * 5}
                    step="5"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value) || 5)}
                    className="w-full pl-6 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Budget Summary */}
            <div className="mt-4 p-3 bg-purple-50 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Available Ad Sets:</span>
                <span className="font-semibold text-purple-800">{enabledAdSetCount} of {adSets.length}</span>
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
                {adSets.map((adSet, index) => {
                  const isEnabled = index < enabledAdSetCount;
                  const isSelected = selectedAdSet?.ad_set_name === adSet.ad_set_name;
                  
                  return (
                    <div
                      key={`${adSet.ad_set_name}-${index}`}
                      className={`p-4 border-b border-gray-100 transition-colors ${
                        isEnabled ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                      } ${
                        isSelected ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                      }`}
                      onClick={() => selectAdSet(adSet, index)}
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
                              {adSet.daily_budget || '$5/day'}
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

          {/* Ad Set Details Panel */}
          <div className="lg:col-span-5">
            {selectedAdSet ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedAdSet.ad_set_name}</h2>
                      <p className="text-sm text-gray-600 mt-1">Campaign targeting based on your marketing angles</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <div className="text-lg font-bold text-purple-600 mt-1">{selectedAdSet.daily_budget || '$5'}/day</div>
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
                          {placement.includes('WhatsApp') && <div className="h-4 w-4 bg-green-600 rounded mr-2" />}
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
                            {selectedAdSet.call_to_action || 'Shop Now'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Short Form Variations */}
                      {selectedAdSet.ad_copy_variations.short_form.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Short Form Variations</div>
                          <div className="space-y-1">
                            {selectedAdSet.ad_copy_variations.short_form.map((variation, idx) => (
                              <p key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {variation}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Long Form Variations */}
                      {selectedAdSet.ad_copy_variations.long_form.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Long Form Variations</div>
                          <div className="space-y-1">
                            {selectedAdSet.ad_copy_variations.long_form.map((variation, idx) => (
                              <p key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {variation}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
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

          {/* Mobile Preview Panel */}
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
                                  {selectedAdSet ? selectedAdSet.primary_text : 'Select an ad set to preview your campaign'}
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
                                    {selectedAdSet ? (selectedAdSet.call_to_action || 'Shop Now') : 'Call to Action'}
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
                                    {selectedAdSet ? (selectedAdSet.call_to_action || 'Shop Now') : 'Call to Action'}
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

        {/* Action Buttons at Bottom */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="px-6 py-2"
          >
            Back to Campaign
          </Button>
          <Button 
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!selectedAdSet}
          >
            Launch Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}


// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Heart, MessageCircle, Share, Upload, X, Check, ChevronDown, ChevronUp, Youtube, PlayCircle, Rss, MoreHorizontal, UploadCloud } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/Store/store";

// interface AdSet {
//   id: number;
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

// // Generate 10 ad sets for the price slider functionality
// const generateAdSets = (): AdSet[] => {

//   const baseAdSets = [
//     {
//       id: 1,
//       ad_set_name: "Traditional Wear Enthusiasts",
//       campaign_objective: "Brand Awareness",
//       target_audience: {
//         location: "India",
//         age_range: "25-50",
//         gender: "Female",
//         interests: ["Sarees", "Ethnic Wear", "Traditional Fashion", "Kanchipuram Silk", "Indian Clothing"]
//       },
//       placements: ["Instagram Feed", "Facebook Feed", "Pinterest Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target women who love traditional Indian fashion and premium sarees, highlighting the luxurious Kanchipuram silk.",
//       ad_copy_variations: {
//         short_form: ["Experience luxury with Kanchipuram silk", "Elegant sarees for special occasions", "Traditional fashion redefined"],
//         long_form: ["Discover the elegance of our Turquoise Bliss Kanchipuram silk saree with Rani Pink Zari border. Perfect for weddings, festivals, and celebrations."]
//       },
//       primary_text: "Add timeless elegance to your wardrobe with our exquisite Kanchipuram silk saree.",
//       headline: "Turquoise Bliss Silk Saree",
//       call_to_action: "Shop Now"
//     },
//     {
//       id: 2,
//       ad_set_name: "Festive Shoppers",
//       campaign_objective: "Conversions",
//       target_audience: {
//         location: "India",
//         age_range: "25-45",
//         gender: "Female",
//         interests: ["Festivals", "Diwali Shopping", "Wedding Shopping", "Indian Ethnic Wear"]
//       },
//       placements: ["Instagram Stories", "Facebook Stories", "YouTube Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target women preparing for festive seasons or weddings, highlighting this saree as a perfect gift or purchase.",
//       ad_copy_variations: {
//         short_form: ["Shine this festive season", "Perfect saree for weddings", "Celebrate in style"],
//         long_form: ["Celebrate your special occasions in style with the Turquoise Bliss Kanchipuram silk saree, featuring a stunning Rani Pink Zari border."]
//       },
//       primary_text: "Step into the spotlight this festive season with a saree that blends tradition and luxury.",
//       headline: "Festive Luxury Saree",
//       call_to_action: "Buy Now"
//     },
//     {
//       id: 3,
//       ad_set_name: "Luxury Fashion Buyers",
//       campaign_objective: "Lead Generation",
//       target_audience: {
//         location: "India",
//         age_range: "30-55",
//         gender: "Female",
//         interests: ["Luxury Fashion", "Designer Sarees", "Premium Clothing", "Online Shopping"]
//       },
//       placements: ["Google Ads", "Instagram Feed", "Facebook Feed"],
//       daily_budget: "5.00",
//       creative_brief: "Target women who shop for luxury and designer ethnic wear online.",
//       ad_copy_variations: {
//         short_form: ["Designer Kanchipuram sarees", "Luxury woven elegance", "Premium sarees online"],
//         long_form: ["Indulge in luxury with our Turquoise Bliss Kanchipuram silk saree. Perfectly woven with a Rani Pink Zari border for an elegant touch."]
//       },
//       primary_text: "Elevate your ethnic wear collection with our premium Kanchipuram silk saree.",
//       headline: "Luxury Kanchipuram Saree",
//       call_to_action: "Shop Online"
//     },
//     {
//       id: 4,
//       ad_set_name: "Wedding Shoppers",
//       campaign_objective: "Conversions",
//       target_audience: {
//         location: "India",
//         age_range: "25-40",
//         gender: "Female",
//         interests: ["Wedding Sarees", "Bridal Wear", "Indian Weddings", "Bridal Shopping"]
//       },
//       placements: ["Instagram Reels", "Facebook Stories", "Pinterest Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target brides-to-be and wedding shoppers looking for elegant Kanchipuram sarees for ceremonies.",
//       ad_copy_variations: {
//         short_form: ["Your perfect wedding saree", "Elegant bridal wear", "Celebrate in style"],
//         long_form: ["Make your wedding celebrations unforgettable with the Turquoise Bliss Kanchipuram silk saree with stunning Rani Pink Zari detailing."]
//       },
//       primary_text: "Find the perfect blend of tradition and style for your wedding or festive celebrations.",
//       headline: "Bridal & Festive Saree",
//       call_to_action: "Order Now"
//     },
//     {
//       id: 5,
//       ad_set_name: "Young Fashion Lovers",
//       campaign_objective: "Engagement",
//       target_audience: {
//         location: "India",
//         age_range: "20-35",
//         gender: "Female",
//         interests: ["Fashion Trends", "Ethnic Fashion", "Instagram Fashion Influencers"]
//       },
//       placements: ["Instagram Feed", "Instagram Stories", "TikTok Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target young women looking for trendy and stylish ethnic wear for social media-worthy looks.",
//       ad_copy_variations: {
//         short_form: ["Trendy ethnic sarees", "Style meets tradition", "Social media ready fashion"],
//         long_form: ["Turn heads with our Turquoise Bliss Kanchipuram silk saree with Rani Pink Zari border – perfect for fashion-forward women."]
//       },
//       primary_text: "Stay stylish while embracing tradition with our luxurious Kanchipuram saree.",
//       headline: "Trendy Kanchipuram Silk",
//       call_to_action: "Shop Trendy"
//     },
//     {
//       id: 6,
//       ad_set_name: "Gift Shoppers",
//       campaign_objective: "Traffic",
//       target_audience: {
//         location: "India",
//         age_range: "25-50",
//         gender: "Female",
//         interests: ["Gift Ideas", "Luxury Gifts", "Sarees as Gifts", "Festive Shopping"]
//       },
//       placements: ["Facebook Feed", "Instagram Feed", "Google Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target shoppers looking to gift premium sarees for special occasions and festivals.",
//       ad_copy_variations: {
//         short_form: ["Gift elegance", "Premium sarees for loved ones", "Celebrate in style"],
//         long_form: ["Surprise your loved ones with the Turquoise Bliss Kanchipuram silk saree featuring an elegant Rani Pink Zari border."]
//       },
//       primary_text: "Give the gift of luxury and tradition with our Kanchipuram silk saree.",
//       headline: "Perfect Gift Saree",
//       call_to_action: "Buy Gift"
//     },
//     {
//       id: 7,
//       ad_set_name: "Regional Fashion Lovers",
//       campaign_objective: "Brand Awareness",
//       target_audience: {
//         location: "South India",
//         age_range: "25-50",
//         gender: "Female",
//         interests: ["South Indian Fashion", "Kanchipuram Sarees", "Traditional Silk Sarees"]
//       },
//       placements: ["Instagram Feed", "Facebook Feed", "Pinterest Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target women in South India who are interested in authentic Kanchipuram silk sarees.",
//       ad_copy_variations: {
//         short_form: ["Authentic Kanchipuram silk", "South Indian elegance", "Traditional silk sarees"],
//         long_form: ["Embrace South Indian tradition with our Turquoise Bliss Kanchipuram silk saree with a Rani Pink Zari border."]
//       },
//       primary_text: "Celebrate tradition with the finest Kanchipuram silk saree for South Indian fashion lovers.",
//       headline: "Authentic Silk Saree",
//       call_to_action: "Shop Now"
//     },
//     {
//       id: 8,
//       ad_set_name: "Festival Ready Women",
//       campaign_objective: "Engagement",
//       target_audience: {
//         location: "India",
//         age_range: "25-45",
//         gender: "Female",
//         interests: ["Diwali Fashion", "Navratri Fashion", "Festive Sarees", "Traditional Wear"]
//       },
//       placements: ["Instagram Reels", "Facebook Stories", "Pinterest Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target women looking for festive sarees for upcoming celebrations.",
//       ad_copy_variations: {
//         short_form: ["Festive sarees you’ll love", "Celebrate in elegance", "Perfect festival look"],
//         long_form: ["Step into festive celebrations in style with our Turquoise Bliss Kanchipuram silk saree with beautiful Rani Pink Zari detailing."]
//       },
//       primary_text: "Be festival-ready with the perfect traditional silk saree.",
//       headline: "Festival Elegance",
//       call_to_action: "Shop Festive"
//     },
//     {
//       id: 9,
//       ad_set_name: "Online Shoppers",
//       campaign_objective: "Conversions",
//       target_audience: {
//         location: "India",
//         age_range: "25-50",
//         gender: "Female",
//         interests: ["Online Shopping", "E-commerce Fashion", "Luxury Sarees Online"]
//       },
//       placements: ["Google Ads", "Instagram Feed", "Facebook Feed"],
//       daily_budget: "5.00",
//       creative_brief: "Target women who prefer buying ethnic wear online and are comfortable with e-commerce platforms.",
//       ad_copy_variations: {
//         short_form: ["Shop luxury sarees online", "Easy online saree shopping", "Premium sarees delivered to you"],
//         long_form: ["Get the Turquoise Bliss Kanchipuram silk saree delivered right to your doorstep and enjoy premium online shopping."]
//       },
//       primary_text: "Shop premium sarees online with ease and elegance.",
//       headline: "Online Silk Saree Shopping",
//       call_to_action: "Order Online"
//     },
//     {
//       id: 10,
//       ad_set_name: "Ethnic Fashion Influencers",
//       campaign_objective: "Engagement",
//       target_audience: {
//         location: "India",
//         age_range: "20-40",
//         gender: "Female",
//         interests: ["Fashion Blogging", "Ethnic Wear Influencers", "Instagram Fashion"]
//       },
//       placements: ["Instagram Feed", "Instagram Stories", "TikTok Ads"],
//       daily_budget: "5.00",
//       creative_brief: "Target influencers who showcase ethnic wear and traditional fashion on social media.",
//       ad_copy_variations: {
//         short_form: ["Showcase tradition in style", "Influencer-approved sarees", "Trendy Kanchipuram silk"],
//         long_form: ["Feature the Turquoise Bliss Kanchipuram silk saree in your fashion posts and captivate your audience with tradition and elegance."]
//       },
//       primary_text: "Inspire your followers with stunning Kanchipuram silk sarees.",
//       headline: "Influencer Favorite Saree",
//       call_to_action: "Promote Now"
//     }
//   ];

//   return baseAdSets;
// };

// export default function CampaignStudio() {
//   const { adSets, status, error } = useSelector((state: RootState) => state.campaign);
//   const [allAdSets] = useState<AdSet[]>(generateAdSets());
//   const [budget, setBudget] = useState<number>(15);
//   const [selectedAdSet, setSelectedAdSet] = useState<AdSet | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Calculate enabled ad sets based on budget (each ad set costs $5)
//   const enabledAdSetCount = Math.floor(budget / 5);
//   const enabledAdSets = allAdSets.slice(0, enabledAdSetCount);

//   // Auto-select first enabled ad set when budget changes
//   useEffect(() => {
//     if (enabledAdSets.length > 0) {
//       setSelectedAdSet(enabledAdSets[0]); // Always show Tech Enthusiasts when available
//     } else {
//       setSelectedAdSet(null);
//     }
//   }, [budget]);

//   const handleBudgetChange = (value: number) => {
//     // Ensure value is multiple of 5 and within range
//     const clampedValue = Math.max(5, Math.min(50, Math.round(value / 5) * 5));
//     setBudget(clampedValue);
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
//     }
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       handleImageSelection(file);
//     }
//   };

//   const handleImageSelection = (file: File) => {
//     setSelectedFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreviewImage(previewUrl);
//     setUploadedImage(null);
//     setUploadSuccess(false);
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

//     } catch (error) {
//       console.error('Upload error:', error);
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
//     // Only allow selection of enabled ad sets
//     if (enabledAdSets.includes(adSet)) {
//       setSelectedAdSet(adSet);
//     }
//   };

//   const toggleSection = (section: string) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-4 py-6 max-w-7xl">
        
//         {/* Header Section */}
//         <div className="mb-6">
//           <div className="flex items-center mb-4">
//             <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//               <span className="text-purple-600 text-lg">🎯</span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Campaign Studio</h1>
//           </div>
          
//           {/* Budget Control Panel */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">Budget Configuration</h3>
//                 <p className="text-sm text-gray-600">Each ad set costs $5. Adjust your budget to enable more ad sets.</p>
//               </div>
//               <div className="text-right">
//                 <div className="text-2xl font-bold text-purple-600">${budget}</div>
//                 <div className="text-sm text-gray-500">{enabledAdSetCount} Ad Sets</div>
//               </div>
//             </div>
            
//             {/* Price Controls */}
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <label className="block text-xs font-medium text-gray-700 mb-2">Budget Range</label>
//                 <div className="relative">
//                   <input
//                     type="range"
//                     min="5"
//                     max="50"
//                     step="5"
//                     value={budget}
//                     onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
//                     className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                     style={{
//                       background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((budget - 5) / (50 - 5)) * 100}%, #e5e7eb ${((budget - 5) / (50 - 5)) * 100}%, #e5e7eb 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-xs text-gray-500 mt-1">
//                     <span>$5</span>
//                     <span>$50</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-24">
//                 <label className="block text-xs font-medium text-gray-700 mb-2">Amount</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
//                   <input
//                     type="number"
//                     min="5"
//                     max="50"
//                     step="5"
//                     value={budget}
//                     onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
//                     className="w-full pl-6 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Budget Summary */}
//             <div className="mt-4 p-3 bg-purple-50 rounded-md">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-purple-700">Available Ad Sets:</span>
//                 <span className="font-semibold text-purple-800">{enabledAdSetCount} of 10</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-12 gap-6">
          
//           {/* Ad Sets Sidebar */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//               <div className="p-4 border-b border-gray-200 bg-gray-50">
//                 <h3 className="font-semibold text-gray-900">Ad Sets</h3>
//                 <p className="text-xs text-gray-600 mt-1">Select ad sets within your budget</p>
//               </div>
              
//               <div className="max-h-96 overflow-y-auto">
//                 {allAdSets.map((adSet, index) => {
//                   const isEnabled = enabledAdSets.includes(adSet);
//                   const isSelected = selectedAdSet?.id === adSet.id;
                  
//                   return (
//                     <div
//                       key={adSet.id}
//                       className={`p-4 border-b border-gray-100 transition-colors ${
//                         isEnabled ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
//                       } ${
//                         isSelected ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
//                       }`}
//                       onClick={() => selectAdSet(adSet)}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 ${
//                           isEnabled && isSelected
//                             ? 'bg-purple-600 border-purple-600'
//                             : isEnabled
//                             ? 'bg-purple-600 border-purple-600'
//                             : 'border-gray-300'
//                         }`}>
//                           {isEnabled && (
//                             <Check className="h-2.5 w-2.5 text-white" />
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between">
//                             <h4 className={`text-sm font-medium truncate ${
//                               isEnabled ? 'text-gray-900' : 'text-gray-500'
//                             }`}>
//                               {adSet.ad_set_name}
//                             </h4>
//                             <span className={`text-xs font-medium ${
//                               isEnabled ? 'text-green-600' : 'text-gray-500'
//                             }`}>
//                               $5.00
//                             </span>
//                           </div>
//                           <p className={`text-xs mt-1 ${
//                             isEnabled ? 'text-gray-600' : 'text-gray-500'
//                           }`}>
//                             {adSet.target_audience.location} • {adSet.target_audience.age_range} • {adSet.campaign_objective}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
//                               isEnabled
//                                 ? 'bg-green-100 text-green-800'
//                                 : 'bg-gray-100 text-gray-600'
//                             }`}>
//                               {isEnabled ? 'Enabled' : 'Disabled'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Tech Enthusiasts Details Panel */}
//           <div className="lg:col-span-5">
//             {selectedAdSet ? (
//               <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//                 <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900">{selectedAdSet.ad_set_name}</h2>
//                       <p className="text-sm text-gray-600 mt-1">Campaign targeting technology enthusiasts and early adopters</p>
//                     </div>
//                     <div className="text-right">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                         Active
//                       </span>
//                       <div className="text-lg font-bold text-purple-600 mt-1">${selectedAdSet.daily_budget}/day</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6 space-y-6">
//                   {/* Campaign Details Grid */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Objective</div>
//                       <div className="text-sm font-semibold text-gray-900">{selectedAdSet.campaign_objective}</div>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location</div>
//                       <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.location}</div>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Age Range</div>
//                       <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.age_range}</div>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Gender</div>
//                       <div className="text-sm font-semibold text-gray-900">{selectedAdSet.target_audience.gender}</div>
//                     </div>
//                   </div>
                  
//                   {/* Target Audience */}
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 mb-3">Target Interests</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedAdSet.target_audience.interests.map((interest, idx) => (
//                         <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                           {interest}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Placements */}
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 mb-3">Ad Placements</h4>
//                     <div className="space-y-2">
//                       {selectedAdSet.placements.map((placement, idx) => (
//                         <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
//                           {placement.includes('YouTube') && <Youtube className="h-4 w-4 text-red-600 mr-2" />}
//                           {placement.includes('Instagram') && <div className="h-4 w-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded mr-2" />}
//                           {placement.includes('Facebook') && <div className="h-4 w-4 bg-blue-600 rounded mr-2" />}
//                           <span className="text-sm text-gray-700">{placement}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Creative Brief */}
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 mb-3">Creative Brief</h4>
//                     <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
//                       {selectedAdSet.creative_brief}
//                     </p>
//                   </div>
                  
//                   {/* Ad Copy Variations */}
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 mb-3">Ad Copy Variations</h4>
//                     <div className="space-y-3">
//                       <div>
//                         <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Primary Text</div>
//                         <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border-l-4 border-purple-500">
//                           {selectedAdSet.primary_text}
//                         </p>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Headline</div>
//                           <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded">{selectedAdSet.headline}</p>
//                         </div>
//                         <div>
//                           <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Call to Action</div>
//                           <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
//                             {selectedAdSet.call_to_action}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
//                 <p className="text-gray-500">Increase your budget to enable ad sets</p>
//               </div>
//             )}
//           </div>

//           {/* Mobile Preview Panel - Preserved from original */}
//           <div className="lg:col-span-4">
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
//                                     <span className="text-white text-xs font-bold">AD</span>
//                                   </div>
//                                   <div>
//                                     <p className="font-semibold text-gray-900 text-sm">
//                                       {selectedAdSet ? selectedAdSet.ad_set_name : 'Campaign Studio'}
//                                     </p>
//                                     <p className="text-gray-500 text-xs">Sponsored</p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Preview Content */}
//                               <div className="p-4">
//                                 <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//                                   {selectedAdSet ? selectedAdSet.primary_text : 'Select an ad set to preview'}
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
//                                     {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
//                                   </h4>

//                                   <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm">
//                                     {selectedAdSet ? selectedAdSet.call_to_action : 'Call to Action'}
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
//                               <button
//                                 onClick={cancelPreview}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               <div className="h-full relative">
//                                 <img
//                                   src={previewImage}
//                                   alt="Image preview"
//                                   className="w-full h-full object-contain bg-black"
//                                 />

//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
//                                   <div className="text-white mb-4">
//                                     <h4 className="font-bold text-sm mb-2">
//                                       {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
//                                     </h4>
//                                     <p className="text-xs opacity-90">
//                                       {selectedAdSet ? selectedAdSet.primary_text : 'Campaign description'}
//                                     </p>
//                                   </div>

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
//                               <button
//                                 onClick={removeUploadedImage}
//                                 className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
//                               >
//                                 <X className="h-4 w-4" />
//                               </button>

//                               <div className="absolute top-2 left-2 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
//                                 <Check className="h-3 w-3 mr-1" />
//                                 Uploaded
//                               </div>

//                               <div className="h-full relative">
//                                 <img
//                                   src={uploadedImage}
//                                   alt="Uploaded campaign image"
//                                   className="w-full h-full object-contain bg-black"
//                                 />

//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
//                                   <h4 className="font-bold text-sm mb-2">
//                                     {selectedAdSet ? selectedAdSet.headline : 'Campaign Headline'}
//                                   </h4>
//                                   <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm mb-3">
//                                     {selectedAdSet ? selectedAdSet.call_to_action : 'Call to Action'}
//                                   </Button>

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
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }
