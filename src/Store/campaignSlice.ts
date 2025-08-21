

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// /** -------- Types -------- */
// export type MarketingAngle = {
//   angle_name: string;
//   hook_line: string;
//   emotional_trigger: string;
//   target_audience: string;
//   visual_idea: string;
//   platform_recommendation: string;
//   Estimate_ads_Budget?: string;
//   ["Estimate ads Budget"]?: string; // in case you get it like this
// };

// export type CampaignConfig = {
//   projectName: string;
//   adGoal: "REACH" | "LEAD_GENERATION" | "CONVERSIONS";
//   conversionButton: string;
//   startDate: string | null; // ISO string or null
//   endDate: string | null;   // ISO string or null
//   targetingLocation: string;
//   selectedCountry?: string;
//   selectedLocation?: { lat: number; lng: number } | null;
//   productDescription?: string;
//   dailyBudget?: number;
// };

// export type AdSet = {
//   ad_set_name: string;
//   campaign_objective: string;
//   target_audience: {
//     location: string;
//     age_range: string;
//     gender: string;
//     interests: string[];
//   };
//   placements: string[];
//   creative_brief: string;
//   ad_copy_variations: {
//     short_form: string[];
//     long_form: string[];
//   };
//   primary_text: string;
//   headline: string;
//   call_to_action?: string;
//   daily_budget?: string;
// };

// type CreateCampaignArgs = {
//   marketingAngles: MarketingAngle[];
// };

// // API returns: [{ ad_sets: AdSet[] }]
// type CreateCampaignResponse = Array<{
//   ad_set_name: any; ad_sets: AdSet[] 
// }>;

// /** -------- Async Thunk -------- */
// export const createCampaign = createAsyncThunk<
//   AdSet[],                // what we put into Redux on success
//   CreateCampaignArgs,     // args from component
//   { rejectValue: string } // error message
// >(
//   "campaign/createCampaign",
//   async ({ marketingAngles }, { rejectWithValue }) => {
//     try {
//       console.log("Creating campaign with marketing angles:", marketingAngles);
      
//       // Map EXACTLY as you showed
//       const campaignData = [
//         {
//           angels: marketingAngles.map((angle) => ({
//             angle_name: angle.angle_name,
//             hook_line: angle.hook_line,
//             emotional_trigger: angle.emotional_trigger,
//             target_audience: angle.target_audience,
//             visual_idea: angle.visual_idea,
//             platform_recommendation: angle.platform_recommendation,
//             Estimate_ads_Budget:
//               angle.Estimate_ads_Budget || angle["Estimate ads Budget"] || "",
//           })),
//         },
//       ];

//       console.log("Sending campaign data to API:", campaignData);

//       const res = await axios.post<CreateCampaignResponse>(
//         "https://base234.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/adsetcreation",
//         campaignData,
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 30000,
//         }
//       );

//       console.log("Raw API Response:", res.data);

//       // Handle the API response structure
//       let adSets: AdSet[] = [];
      
//       if (Array.isArray(res.data) && res.data.length > 0) {
//         // If API returns [{ ad_sets: [...] }]
//         if (res.data[0]?.ad_sets) {
//           adSets = res.data[0].ad_sets;
//         }
//         // If API returns AdSet[] directly
//         else if (res.data[0]?.ad_set_name) {
//           adSets = res.data as unknown as AdSet[];
//         }
//       }
//       // If API returns { ad_sets: [...] } directly
//       else if (res.data && typeof res.data === 'object' && 'ad_sets' in res.data) {
//         adSets = (res.data as any).ad_sets;
//       }

//       console.log("Processed adSets for Redux:", adSets);

//       if (!Array.isArray(adSets) || adSets.length === 0) {
//         console.warn("No ad sets found in API response");
//         return rejectWithValue("No ad sets were created. Please try again.");
//       }

//       // Validate and clean the ad sets data
//       const validatedAdSets = adSets.map((adSet, index) => ({
//         ...adSet,
//         // Ensure required fields have fallback values
//         ad_set_name: adSet.ad_set_name || `Ad Set ${index + 1}`,
//         campaign_objective: adSet.campaign_objective || "Brand Awareness",
//         target_audience: {
//           location: adSet.target_audience?.location || "Unknown",
//           age_range: adSet.target_audience?.age_range || "18-65",
//           gender: adSet.target_audience?.gender || "All",
//           interests: Array.isArray(adSet.target_audience?.interests) 
//             ? adSet.target_audience.interests 
//             : []
//         },
//         placements: Array.isArray(adSet.placements) ? adSet.placements : [],
//         creative_brief: adSet.creative_brief || "",
//         ad_copy_variations: {
//           short_form: Array.isArray(adSet.ad_copy_variations?.short_form) 
//             ? adSet.ad_copy_variations.short_form 
//             : [],
//           long_form: Array.isArray(adSet.ad_copy_variations?.long_form) 
//             ? adSet.ad_copy_variations.long_form 
//             : []
//         },
//         primary_text: adSet.primary_text || "",
//         headline: adSet.headline || "Campaign Headline",
//         call_to_action: adSet.call_to_action || "Learn More",
//         daily_budget: adSet.daily_budget || "$5"
//       }));

//       console.log("Final validated adSets:", validatedAdSets);
//       return validatedAdSets;

//     } catch (err: any) {
//       console.error("Campaign creation error:", err);
      
//       if (err?.code === "ECONNABORTED") {
//         return rejectWithValue("Request timed out. Please try again.");
//       }
//       if (err?.response?.status === 400) {
//         return rejectWithValue("Invalid campaign data. Please check your marketing angles and try again.");
//       }
//       if (err?.response?.status >= 500) {
//         return rejectWithValue("Server error. Please try again later.");
//       }
//       if (err?.response?.data?.error) {
//         return rejectWithValue(`API Error: ${err.response.data.error}`);
//       }
//       if (err?.message) {
//         return rejectWithValue(`Network Error: ${err.message}`);
//       }
      
//       return rejectWithValue("Failed to create campaign. Please try again.");
//     }
//   }
// );

// /** -------- Slice -------- */
// type CampaignState = {
//   campaignConfig: CampaignConfig;
//   adSets: AdSet[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   lastCreated: string | null; // timestamp of when campaign was created
// };

// const initialState: CampaignState = {
//   campaignConfig: {
//     projectName: "",
//     adGoal: "REACH",
//     conversionButton: "",
//     startDate: null,
//     endDate: null,
//     targetingLocation: "",
//     selectedCountry: undefined,
//     selectedLocation: null,
//     productDescription: "",
//     dailyBudget: 50,
//   },
//   adSets: [],
//   status: "idle",
//   error: null,
//   lastCreated: null,
// };

// const campaignSlice = createSlice({
//   name: "campaign",
//   initialState,
//   reducers: {
//     // Merge partial updates from your form
//     upsertCampaignConfig(state, action: PayloadAction<Partial<CampaignConfig>>) {
//       state.campaignConfig = { ...state.campaignConfig, ...action.payload };
//     },
//     resetCampaign(state) {
//       state.campaignConfig = initialState.campaignConfig;
//       state.adSets = [];
//       state.status = "idle";
//       state.error = null;
//       state.lastCreated = null;
//     },
//      resetCampaignConfig(state) {
//     state.campaignConfig = initialState.campaignConfig;
//   },
//     // Clear error state
//     clearError(state) {
//       state.error = null;
//     },
//     // Manual ad sets setter (for debugging or manual data entry)
//     setAdSets(state, action: PayloadAction<AdSet[]>) {
//       state.adSets = action.payload;
//       state.status = "succeeded";
//       state.lastCreated = new Date().toISOString();
//     }
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCampaign.pending, (state) => {
//         console.log("Campaign creation pending...");
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(createCampaign.fulfilled, (state, action) => {
//         console.log("Campaign creation fulfilled with:", action.payload);
//         state.status = "succeeded";
//         state.adSets = action.payload;
//         state.error = null;
//         state.lastCreated = new Date().toISOString();
//       })
//       .addCase(createCampaign.rejected, (state, action) => {
//         console.log("Campaign creation rejected:", action.payload);
//         state.status = "failed";
//         state.error = action.payload ?? "Unknown error occurred";
//         state.adSets = []; // Clear any previous ad sets on failure
//       });
//   },
// });

// export const { upsertCampaignConfig, resetCampaign, clearError, setAdSets,resetCampaignConfig } = campaignSlice.actions;
// export default campaignSlice.reducer;





//  second Slice


// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Slice } from "lucide-react";

// /** -------- Types -------- */
// export type MarketingAngle = {
//   angle_name: string;
//   hook_line: string;
//   emotional_trigger: string;
//   target_audience: string;
//   visual_idea: string;
//   platform_recommendation: string;
//   Estimate_ads_Budget?: string;
//   ["Estimate ads Budget"]?: string; // in case you get it like this
// };

// export type CampaignConfig = {
//   projectName: string;
//   adGoal: "REACH" | "LEAD_GENERATION" | "CONVERSIONS";
//   conversionButton: string;
//   startDate: string | null; // ISO string or null
//   endDate: string | null;   // ISO string or null
//   targetingLocation: string;
//   selectedCountry?: string;
//   selectedLocation?: { lat: number; lng: number } | null;
//   productDescription?: string;
//   dailyBudget?: number;
// };

// export type AdSet = {
//   ad_set_name: string;
//   campaign_objective: string;
//   target_audience: {
//     location: string;
//     age_range: string;
//     gender: string;
//     interests: string[];
//   };
//   placements: string[];
//   creative_brief: string;
//   ad_copy_variations: {
//     short_form: string[];
//     long_form: string[];
//   };
//   primary_text: string;
//   headline: string;
//   call_to_action?: string;
//   daily_budget?: string;
// };

// export type SelectedAdSetData = {
//   adSet: AdSet;
//   uploadedImage?: string | null;
//   budget: number;
// };

// type CreateCampaignArgs = {
//   marketingAngles: MarketingAngle[];
// };

// type LaunchCampaignArgs = {
//   campaignConfig: CampaignConfig;
//   selectedAdSets: SelectedAdSetData[];
//   totalBudget: number;
// };

// // API returns: [{ ad_sets: AdSet[] }]
// type CreateCampaignResponse = Array<{
//   ad_set_name: any; 
//   ad_sets: AdSet[] 
// }>;

// /** -------- Async Thunks -------- */
// export const createCampaign = createAsyncThunk<
//   AdSet[],                // what we put into Redux on success
//   CreateCampaignArgs,     // args from component
//   { rejectValue: string } // error message
// >(
//   "campaign/createCampaign",
//   async ({ marketingAngles }, { rejectWithValue }) => {
//     try {
//       console.log("Creating campaign with marketing angles:", marketingAngles);
      
//       // Map EXACTLY as you showed
//       const campaignData = [
//         {
//           angels: marketingAngles.map((angle) => ({
//             angle_name: angle.angle_name,
//             hook_line: angle.hook_line,
//             emotional_trigger: angle.emotional_trigger,
//             target_audience: angle.target_audience,
//             visual_idea: angle.visual_idea,
//             platform_recommendation: angle.platform_recommendation,
//             Estimate_ads_Budget:
//               angle.Estimate_ads_Budget || angle["Estimate ads Budget"] || "",
//           })),
//         },
//       ];

//       console.log("Sending campaign data to API:", campaignData);

//       const res = await axios.post<CreateCampaignResponse>(
//         "https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/adsetcreation",
//         campaignData,
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 30000,
//         }
//       );

//       console.log("Raw API Response:", res.data);

//       // Handle the API response structure
//       let adSets: AdSet[] = [];
      
//       if (Array.isArray(res.data) && res.data.length > 0) {
//         // If API returns [{ ad_sets: [...] }]
//         if (res.data[0]?.ad_sets) {
//           adSets = res.data[0].ad_sets;
//         }
//         // If API returns AdSet[] directly
//         else if (res.data[0]?.ad_set_name) {
//           adSets = res.data as unknown as AdSet[];
//         }
//       }
//       // If API returns { ad_sets: [...] } directly
//       else if (res.data && typeof res.data === 'object' && 'ad_sets' in res.data) {
//         adSets = (res.data as any).ad_sets;
//       }

//       console.log("Processed adSets for Redux:", adSets);

//       if (!Array.isArray(adSets) || adSets.length === 0) {
//         console.warn("No ad sets found in API response");
//         return rejectWithValue("No ad sets were created. Please try again.");
//       }

//       // Validate and clean the ad sets data
//       const validatedAdSets = adSets.map((adSet, index) => ({
//         ...adSet,
//         // Ensure required fields have fallback values
//         ad_set_name: adSet.ad_set_name || `Ad Set ${index + 1}`,
//         campaign_objective: adSet.campaign_objective || "Brand Awareness",
//         target_audience: {
//           location: adSet.target_audience?.location || "Unknown",
//           age_range: adSet.target_audience?.age_range || "18-65",
//           gender: adSet.target_audience?.gender || "All",
//           interests: Array.isArray(adSet.target_audience?.interests) 
//             ? adSet.target_audience.interests 
//             : []
//         },
//         placements: Array.isArray(adSet.placements) ? adSet.placements : [],
//         creative_brief: adSet.creative_brief || "",
//         ad_copy_variations: {
//           short_form: Array.isArray(adSet.ad_copy_variations?.short_form) 
//             ? adSet.ad_copy_variations.short_form 
//             : [],
//           long_form: Array.isArray(adSet.ad_copy_variations?.long_form) 
//             ? adSet.ad_copy_variations.long_form 
//             : []
//         },
//         primary_text: adSet.primary_text || "",
//         headline: adSet.headline || "Campaign Headline",
//         call_to_action: adSet.call_to_action || "Learn More",
//         daily_budget: adSet.daily_budget || "$5"
//       }));

//       console.log("Final validated adSets:", validatedAdSets);
//       return validatedAdSets;

//     } catch (err: any) {
//       console.error("Campaign creation error:", err);
      
//       if (err?.code === "ECONNABORTED") {
//         return rejectWithValue("Request timed out. Please try again.");
//       }
//       if (err?.response?.status === 400) {
//         return rejectWithValue("Invalid campaign data. Please check your marketing angles and try again.");
//       }
//       if (err?.response?.status >= 500) {
//         return rejectWithValue("Server error. Please try again later.");
//       }
//       if (err?.response?.data?.error) {
//         return rejectWithValue(`API Error: ${err.response.data.error}`);
//       }
//       if (err?.message) {
//         return rejectWithValue(`Network Error: ${err.message}`);
//       }
      
//       return rejectWithValue("Failed to create campaign. Please try again.");
//     }
//   }
// );

// // New thunk for launching the final campaign
// export const launchCampaign = createAsyncThunk<
//   any,                    // API response
//   LaunchCampaignArgs,     // args from component
//   { rejectValue: string } // error message
// >(
//   "campaign/launchCampaign",
//   async ({ campaignConfig, selectedAdSets, totalBudget }, { rejectWithValue }) => {
//     try {
//       console.log("Launching campaign with config:", campaignConfig);
//       console.log("Selected ad sets:", selectedAdSets);
//       console.log("Total budget:", totalBudget);
      
//       // Prepare launch data
//       const launchData = {
//         campaign_config: {
//           project_name: campaignConfig.projectName,
//           ad_goal: campaignConfig.adGoal,
//           conversion_button: campaignConfig.conversionButton,
//           start_date: campaignConfig.startDate,
//           end_date: campaignConfig.endDate,
//           targeting_location: campaignConfig.targetingLocation,
//           selected_country: campaignConfig.selectedCountry,
//           selected_location: campaignConfig.selectedLocation,
//           product_description: campaignConfig.productDescription,
//           daily_budget: campaignConfig.dailyBudget,
//           total_budget: totalBudget
//         },
//         selected_ad_sets: selectedAdSets.map(item => ({
//           ad_set: item.adSet,
//           uploaded_image: item.uploadedImage,
//           budget: item.budget
//         })),
//         launch_timestamp: new Date().toISOString()
//       };

//       console.log("Sending launch data to API:", launchData);

//       // Replace with your actual launch API endpoint
//       const res = await axios.post(
//         "https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai//meta-ad-setup",
//         launchData,
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 30000,
//         }
//       );

//       console.log("Launch API Response:", res.data);
//       return res.data;

//     } catch (err: any) {
//       console.error("Campaign launch error:", err);
      
//       if (err?.code === "ECONNABORTED") {
//         return rejectWithValue("Request timed out. Please try again.");
//       }
//       if (err?.response?.status === 400) {
//         return rejectWithValue("Invalid launch data. Please check your campaign configuration.");
//       }
//       if (err?.response?.status >= 500) {
//         return rejectWithValue("Server error. Please try again later.");
//       }
//       if (err?.response?.data?.error) {
//         return rejectWithValue(`API Error: ${err.response.data.error}`);
//       }
//       if (err?.message) {
//         return rejectWithValue(`Network Error: ${err.message}`);
//       }
      
//       return rejectWithValue("Failed to launch campaign. Please try again.");
//     }
//   }
// );

// /** -------- Slice -------- */
// type CampaignState = {
//   campaignConfig: CampaignConfig;
//   adSets: AdSet[];
//   selectedAdSets: SelectedAdSetData[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   launchStatus: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   launchError: string | null;
//   lastCreated: string | null; // timestamp of when campaign was created
//   lastLaunched: string | null; // timestamp of when campaign was launched
// };

// const initialState: CampaignState = {
//   campaignConfig: {
//     projectName: "",
//     adGoal: "REACH",
//     conversionButton: "",
//     startDate: null,
//     endDate: null,
//     targetingLocation: "",
//     selectedCountry: undefined,
//     selectedLocation: null,
//     productDescription: "",
//     dailyBudget: 50,
//   },
//   adSets: [],
//   selectedAdSets: [],
//   status: "idle",
//   launchStatus: "idle",
//   error: null,
//   launchError: null,
//   lastCreated: null,
//   lastLaunched: null,
// };

// const campaignSlice = createSlice({
//   name: "campaign",
//   initialState,
//   reducers: {
//     // Merge partial updates from your form
//     upsertCampaignConfig(state, action: PayloadAction<Partial<CampaignConfig>>) {
//       state.campaignConfig = { ...state.campaignConfig, ...action.payload };
//     },
//     resetCampaign(state) {
//       state.campaignConfig = initialState.campaignConfig;
//       state.adSets = [];
//       state.selectedAdSets = [];
//       state.status = "idle";
//       state.launchStatus = "idle";
//       state.error = null;
//       state.launchError = null;
//       state.lastCreated = null;
//       state.lastLaunched = null;
//     },
//     resetCampaignConfig(state) {
//       state.campaignConfig = initialState.campaignConfig;
//     },
//     // Clear error states
//     clearError(state) {
//       state.error = null;
//     },
//     clearLaunchError(state) {
//       state.launchError = null;
//     },
//     // Manual ad sets setter (for debugging or manual data entry)
//     setAdSets(state, action: PayloadAction<AdSet[]>) {
//       state.adSets = action.payload;
//       state.status = "succeeded";
//       state.lastCreated = new Date().toISOString();
//     },
//     // Add/update selected ad sets for campaign studio
//     updateSelectedAdSets(state, action: PayloadAction<SelectedAdSetData[]>) {
//       state.selectedAdSets = action.payload;
//     },
//     // Add single selected ad set
//     addSelectedAdSet(state, action: PayloadAction<SelectedAdSetData>) {
//       const existingIndex = state.selectedAdSets.findIndex(
//         item => item.adSet.ad_set_name === action.payload.adSet.ad_set_name
//       );
      
//       if (existingIndex >= 0) {
//         state.selectedAdSets[existingIndex] = action.payload;
//       } else {
//         state.selectedAdSets.push(action.payload);
//       }
//     },
//     // Remove selected ad set
//     removeSelectedAdSet(state, action: PayloadAction<string>) {
//       state.selectedAdSets = state.selectedAdSets.filter(
//         item => item.adSet.ad_set_name !== action.payload
//       );
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create campaign reducers
//       .addCase(createCampaign.pending, (state) => {
//         console.log("Campaign creation pending...");
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(createCampaign.fulfilled, (state, action) => {
//         console.log("Campaign creation fulfilled with:", action.payload);
//         state.status = "succeeded";
//         state.adSets = action.payload;
//         state.error = null;
//         state.lastCreated = new Date().toISOString();
//       })
//       .addCase(createCampaign.rejected, (state, action) => {
//         console.log("Campaign creation rejected:", action.payload);
//         state.status = "failed";
//         state.error = action.payload ?? "Unknown error occurred";
//         state.adSets = []; // Clear any previous ad sets on failure
//       })
//       // Launch campaign reducers
//       .addCase(launchCampaign.pending, (state) => {
//         console.log("Campaign launch pending...");
//         state.launchStatus = "loading";
//         state.launchError = null;
//       })
//       .addCase(launchCampaign.fulfilled, (state, action) => {
//         console.log("Campaign launched successfully:", action.payload);
//         state.launchStatus = "succeeded";
//         state.launchError = null;
//         state.lastLaunched = new Date().toISOString();
//       })
//       .addCase(launchCampaign.rejected, (state, action) => {
//         console.log("Campaign launch rejected:", action.payload);
//         state.launchStatus = "failed";
//         state.launchError = action.payload ?? "Unknown error occurred";
//       });
//   },
// });

// export const { 
//   upsertCampaignConfig, 
//   resetCampaign, 
//   resetCampaignConfig,
//   clearError, 
//   clearLaunchError,
//   setAdSets,
//   updateSelectedAdSets,
//   addSelectedAdSet,
//   removeSelectedAdSet
// } = campaignSlice.actions;

// export default campaignSlice.reducer;




import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

/** -------- Types -------- */
export type MarketingAngle = {
  angle_name: string;
  hook_line: string;
  emotional_trigger: string;
  target_audience: string;
  visual_idea: string;
  platform_recommendation: string;
  Estimate_ads_Budget?: string;
  ["Estimate ads Budget"]?: string; // in case you get it like this
};

export type CampaignConfig = {
  projectName: string;
  adGoal: "REACH" | "LEAD_GENERATION" | "CONVERSIONS";
  conversionButton: string;
  startDate: string | null; // ISO string or null
  endDate: string | null;   // ISO string or null
  targetingLocation: string;
  selectedCountry?: string;
  selectedLocation?: { lat: number; lng: number } | null;
  productDescription?: string;
  dailyBudget?: number;
};

export type AdSet = {
  ad_set_name: string;
  campaign_objective: string;
  target_audience: {
    location: string;
    age_range: string;
    gender: string;
    interests: string[];
  };
  placements: string[];
  creative_brief: string;
  ad_copy_variations: {
    short_form: string[];
    long_form: string[];
  };
  primary_text: string;
  headline: string;
  call_to_action?: string;
  daily_budget?: string;
};

export type SelectedAdSetData = {
  adSet: AdSet;
  uploadedImage?: string | null;
  imageHash?: string | null; // Add image hash
  budget: number;
};

type CreateCampaignArgs = {
  marketingAngles: MarketingAngle[];
};

// New type for image upload
type UploadImageArgs = {
  imageFile: File;
  adSetName: string;
};

type UploadImageResponse = {
  imageHash: string;
  imageUrl?: string;
  message?: string;
};

type LaunchCampaignArgs = {
  campaignConfig: CampaignConfig;
  selectedAdSets: SelectedAdSetData[];
  totalBudget: number;
};

// API returns: [{ ad_sets: AdSet[] }]
type CreateCampaignResponse = Array<{
  ad_set_name: any; 
  ad_sets: AdSet[] 
}>;

/** -------- Async Thunks -------- */

// New thunk for image upload
export const uploadImage = createAsyncThunk<
  { imageHash: string; imageUrl: string; adSetName: string },
  UploadImageArgs,
  { rejectValue: string }
>(
  "campaign/uploadImage",
  async ({ imageFile, adSetName }, { rejectWithValue }) => {
    try {
      console.log("Uploading image for ad set:", adSetName);
      
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('ad_set_name', adSetName);

      const res = await axios.post<UploadImageResponse>(
        "https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/img-hash",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data" 
          },
          timeout: 60000, // Longer timeout for image upload
        }
      );

      console.log("Image upload response:", res.data);

      // Create object URL for local preview
      const imageUrl = URL.createObjectURL(imageFile);

      return {
        imageHash: res.data.imageHash,
        imageUrl: imageUrl,
        adSetName: adSetName
      };

    } catch (err: any) {
      console.error("Image upload error:", err);
      
      if (err?.code === "ECONNABORTED") {
        return rejectWithValue("Upload timed out. Please try again.");
      }
      if (err?.response?.status === 400) {
        return rejectWithValue("Invalid image file. Please try a different image.");
      }
      if (err?.response?.status === 413) {
        return rejectWithValue("Image file too large. Please compress and try again.");
      }
      if (err?.response?.status >= 500) {
        return rejectWithValue("Server error. Please try again later.");
      }
      if (err?.response?.data?.error) {
        return rejectWithValue(`Upload Error: ${err.response.data.error}`);
      }
      if (err?.message) {
        return rejectWithValue(`Network Error: ${err.message}`);
      }
      
      return rejectWithValue("Failed to upload image. Please try again.");
    }
  }
);

export const createCampaign = createAsyncThunk<
  AdSet[],                // what we put into Redux on success
  CreateCampaignArgs,     // args from component
  { rejectValue: string } // error message
>(
  "campaign/createCampaign",
  async ({ marketingAngles }, { rejectWithValue }) => {
    try {
      console.log("Creating campaign with marketing angles:", marketingAngles);
      
      // Map EXACTLY as you showed
      const campaignData = [
        {
          angels: marketingAngles.map((angle) => ({
            angle_name: angle.angle_name,
            hook_line: angle.hook_line,
            emotional_trigger: angle.emotional_trigger,
            target_audience: angle.target_audience,
            visual_idea: angle.visual_idea,
            platform_recommendation: angle.platform_recommendation,
            Estimate_ads_Budget:
              angle.Estimate_ads_Budget || angle["Estimate ads Budget"] || "",
          })),
        },
      ];

      console.log("Sending campaign data to API:", campaignData);

      const res = await axios.post<CreateCampaignResponse>(
        "https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/adsetcreation",
        campaignData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      console.log("Raw API Response:", res.data);

      // Handle the API response structure
      let adSets: AdSet[] = [];
      
      if (Array.isArray(res.data) && res.data.length > 0) {
        // If API returns [{ ad_sets: [...] }]
        if (res.data[0]?.ad_sets) {
          adSets = res.data[0].ad_sets;
        }
        // If API returns AdSet[] directly
        else if (res.data[0]?.ad_set_name) {
          adSets = res.data as unknown as AdSet[];
        }
      }
      // If API returns { ad_sets: [...] } directly
      else if (res.data && typeof res.data === 'object' && 'ad_sets' in res.data) {
        adSets = (res.data as any).ad_sets;
      }

      console.log("Processed adSets for Redux:", adSets);

      if (!Array.isArray(adSets) || adSets.length === 0) {
        console.warn("No ad sets found in API response");
        return rejectWithValue("No ad sets were created. Please try again.");
      }

      // Validate and clean the ad sets data
      const validatedAdSets = adSets.map((adSet, index) => ({
        ...adSet,
        // Ensure required fields have fallback values
        ad_set_name: adSet.ad_set_name || `Ad Set ${index + 1}`,
        campaign_objective: adSet.campaign_objective || "Brand Awareness",
        target_audience: {
          location: adSet.target_audience?.location || "Unknown",
          age_range: adSet.target_audience?.age_range || "18-65",
          gender: adSet.target_audience?.gender || "All",
          interests: Array.isArray(adSet.target_audience?.interests) 
            ? adSet.target_audience.interests 
            : []
        },
        placements: Array.isArray(adSet.placements) ? adSet.placements : [],
        creative_brief: adSet.creative_brief || "",
        ad_copy_variations: {
          short_form: Array.isArray(adSet.ad_copy_variations?.short_form) 
            ? adSet.ad_copy_variations.short_form 
            : [],
          long_form: Array.isArray(adSet.ad_copy_variations?.long_form) 
            ? adSet.ad_copy_variations.long_form 
            : []
        },
        primary_text: adSet.primary_text || "",
        headline: adSet.headline || "Campaign Headline",
        call_to_action: adSet.call_to_action || "Learn More",
        daily_budget: adSet.daily_budget || "$5"
      }));

      console.log("Final validated adSets:", validatedAdSets);
      return validatedAdSets;

    } catch (err: any) {
      console.error("Campaign creation error:", err);
      
      if (err?.code === "ECONNABORTED") {
        return rejectWithValue("Request timed out. Please try again.");
      }
      if (err?.response?.status === 400) {
        return rejectWithValue("Invalid campaign data. Please check your marketing angles and try again.");
      }
      if (err?.response?.status >= 500) {
        return rejectWithValue("Server error. Please try again later.");
      }
      if (err?.response?.data?.error) {
        return rejectWithValue(`API Error: ${err.response.data.error}`);
      }
      if (err?.message) {
        return rejectWithValue(`Network Error: ${err.message}`);
      }
      
      return rejectWithValue("Failed to create campaign. Please try again.");
    }
  }
);

// Updated launch campaign thunk with image hash
export const launchCampaign = createAsyncThunk<
  any,                    // API response
  LaunchCampaignArgs,     // args from component
  { rejectValue: string } // error message
>(
  "campaign/launchCampaign",
  async ({ campaignConfig, selectedAdSets, totalBudget }, { rejectWithValue }) => {
    try {
      console.log("Launching campaign with config:", campaignConfig);
      console.log("Selected ad sets:", selectedAdSets);
      console.log("Total budget:", totalBudget);
      
      // Prepare launch data with the exact format from your example
      const launchData = {
        campaign: {
          name: campaignConfig.projectName,
          objective: campaignConfig.adGoal,
          status: "PAUSED",
          special_ad_categories: []
        },
        additional_info: {
          start_time: campaignConfig.startDate,
          end_time: campaignConfig.endDate,
          location: campaignConfig.targetingLocation,
          img_hash: selectedAdSets.find(ads => ads.imageHash)?.imageHash || "96f09eb5639952f9adaf1fd93451ebbf", // Get first available image hash
          call_to_action: campaignConfig.conversionButton,
          // daily_budget: totalBudget.toString()
          daily_budget: "9500"
        },
        ad_sets: selectedAdSets.map(item => ({
          ad_set_name: item.adSet.ad_set_name,
          campaign_objective: item.adSet.campaign_objective,
          target_audience: {
            // age_range: item.adSet.target_audience.age_range,
            // gender: item.adSet.target_audience.gender,
            age_min: "23",
            age_max: "55",
              genders: [1,2],
            interests: item.adSet.target_audience.interests
          },
          placements: item.adSet.placements,
          creative_brief: item.adSet.creative_brief,
          ad_copy_variations: item.adSet.ad_copy_variations,
          primary_text: item.adSet.primary_text,
          headline: item.adSet.headline,
          // call_to_action: item.adSet.call_to_action,
          // daily_budget: item.budget.toString(), 
          
        }))
      };

      console.log("Sending launch data to API:", launchData);

      const res = await axios.post(
        "https://dead11.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/meta-ad-setup",
        launchData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      console.log("Launch API Response:", res.data);
      return res.data;

    } catch (err: any) {
      console.error("Campaign launch error:", err);
      
      if (err?.code === "ECONNABORTED") {
        return rejectWithValue("Request timed out. Please try again.");
      }
      if (err?.response?.status === 400) {
        return rejectWithValue("Invalid launch data. Please check your campaign configuration.");
      }
      if (err?.response?.status >= 500) {
        return rejectWithValue("Server error. Please try again later.");
      }
      if (err?.response?.data?.error) {
        return rejectWithValue(`API Error: ${err.response.data.error}`);
      }
      if (err?.message) {
        return rejectWithValue(`Network Error: ${err.message}`);
      }
      
      return rejectWithValue("Failed to launch campaign. Please try again.");
    }
  }
);

/** -------- Slice -------- */
type CampaignState = {
  campaignConfig: CampaignConfig;
  adSets: AdSet[];
  selectedAdSets: SelectedAdSetData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  launchStatus: "idle" | "loading" | "succeeded" | "failed";
  uploadStatus: "idle" | "loading" | "succeeded" | "failed"; // Add upload status
  error: string | null;
  launchError: string | null;
  uploadError: string | null; // Add upload error
  lastCreated: string | null; // timestamp of when campaign was created
  lastLaunched: string | null; // timestamp of when campaign was launched
  uploadedImages: {[adSetName: string]: {url: string; hash: string}}; // Store images with hash
};

const initialState: CampaignState = {
  campaignConfig: {
    projectName: "",
    adGoal: "REACH",
    conversionButton: "",
    startDate: null,
    endDate: null,
    targetingLocation: "",
    selectedCountry: undefined,
    selectedLocation: null,
    productDescription: "",
    dailyBudget: 50,
  },
  adSets: [],
  selectedAdSets: [],
  status: "idle",
  launchStatus: "idle",
  uploadStatus: "idle",
  error: null,
  launchError: null,
  uploadError: null,
  lastCreated: null,
  lastLaunched: null,
  uploadedImages: {},
};

// const campaignSlice = createSlice({
//   name: "campaign",
//   initialState,
//   reducers: {
//     // Merge partial updates from your form
//     upsertCampaignConfig(state, action: PayloadAction<Partial<CampaignConfig>>) {
//       state.campaignConfig = { ...state.campaignConfig, ...action.payload };
//     },
//     resetCampaign(state) {
//       state.campaignConfig = initialState.campaignConfig;
//       state.adSets = [];
//       state.selectedAdSets = [];
//       state.status = "idle";
//       state.launchStatus = "idle";
//       state.uploadStatus = "idle";
//       state.error = null;
//       state.launchError = null;
//       state.uploadError = null;
//       state.lastCreated = null;
//       state.lastLaunched = null;
//       state.uploadedImages = {};
//     },
//     resetCampaignConfig(state) {
//       state.campaignConfig = initialState.campaignConfig;
//     },
  
//     // Clear error states
//     clearError(state) {
//       state.error = null;
//     },
//     clearLaunchError(state) {
//       state.launchError = null;
//     },
//     clearUploadError(state) {
//       state.uploadError = null;
//     },
//     // Manual ad sets setter (for debugging or manual data entry)
//     setAdSets(state, action: PayloadAction<AdSet[]>) {
//       state.adSets = action.payload;
//       state.status = "succeeded";
//       state.lastCreated = new Date().toISOString();
//     },
//     // Add/update selected ad sets for campaign studio
//     updateSelectedAdSets(state, action: PayloadAction<SelectedAdSetData[]>) {
//       state.selectedAdSets = action.payload;
//     },
//     // Add single selected ad set
//     addSelectedAdSet(state, action: PayloadAction<SelectedAdSetData>) {
//       const existingIndex = state.selectedAdSets.findIndex(
//         item => item.adSet.ad_set_name === action.payload.adSet.ad_set_name
//       );
      
//       if (existingIndex >= 0) {
//         state.selectedAdSets[existingIndex] = action.payload;
//       } else {
//         state.selectedAdSets.push(action.payload);
//       }
//     },
//     // Remove selected ad set
//     removeSelectedAdSet(state, action: PayloadAction<string>) {
//       state.selectedAdSets = state.selectedAdSets.filter(
//         item => item.adSet.ad_set_name !== action.payload
//       );
//     },
//     // Remove uploaded image
//     removeUploadedImage(state, action: PayloadAction<string>) {
//       const adSetName = action.payload;
//       if (state.uploadedImages[adSetName]) {
//         // Clean up object URL
//         URL.revokeObjectURL(state.uploadedImages[adSetName].url);
//         delete state.uploadedImages[adSetName];
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create campaign reducers
//       .addCase(createCampaign.pending, (state) => {
//         console.log("Campaign creation pending...");
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(createCampaign.fulfilled, (state, action) => {
//         console.log("Campaign creation fulfilled with:", action.payload);
//         state.status = "succeeded";
//         state.adSets = action.payload;
//         state.error = null;
//         state.lastCreated = new Date().toISOString();
//       })
//       .addCase(createCampaign.rejected, (state, action) => {
//         console.log("Campaign creation rejected:", action.payload);
//         state.status = "failed";
//         state.error = action.payload ?? "Unknown error occurred";
//         state.adSets = []; // Clear any previous ad sets on failure
//       })
//       // Image upload reducers
//       .addCase(uploadImage.pending, (state) => {
//         console.log("Image upload pending...");
//         state.uploadStatus = "loading";
//         state.uploadError = null;
//       })
//       .addCase(uploadImage.fulfilled, (state, action) => {
//         console.log("Image upload fulfilled:", action.payload);
//         state.uploadStatus = "succeeded";
//         state.uploadError = null;
        
//         // Store uploaded image with hash
//         state.uploadedImages[action.payload.adSetName] = {
//           url: action.payload.imageUrl,
//           hash: action.payload.imageHash
//         };
        
//         // Update selected ad sets with image hash
//         state.selectedAdSets = state.selectedAdSets.map(item => 
//           item.adSet.ad_set_name === action.payload.adSetName 
//             ? { ...item, uploadedImage: action.payload.imageUrl, imageHash: action.payload.imageHash }
//             : item
//         );
//       })
//       .addCase(uploadImage.rejected, (state, action) => {
//         console.log("Image upload rejected:", action.payload);
//         state.uploadStatus = "failed";
//         state.uploadError = action.payload ?? "Unknown error occurred";
//       })
//       // Launch campaign reducers
//       .addCase(launchCampaign.pending, (state) => {
//         console.log("Campaign launch pending...");
//         state.launchStatus = "loading";
//         state.launchError = null;
//       })
//       .addCase(launchCampaign.fulfilled, (state, action) => {
//         console.log("Campaign launched successfully:", action.payload);
//         state.launchStatus = "succeeded";
//         state.launchError = null;
//         state.lastLaunched = new Date().toISOString();
//       })
//       .addCase(launchCampaign.rejected, (state, action) => {
//         console.log("Campaign launch rejected:", action.payload);
//         state.launchStatus = "failed";
//         state.launchError = action.payload ?? "Unknown error occurred";
//       });
//   },
// });


const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    // Merge partial updates from form pages
    upsertCampaignConfig(state, action: PayloadAction<Partial<CampaignConfig>>) {
      state.campaignConfig = { ...state.campaignConfig, ...action.payload };
    },

    // ✅ Full reset (use after final API submit)
    clearAllState() {
      return initialState;
    },

    // ✅ Reset campaign-specific state (lighter reset)
    resetCampaign(state) {
      state.campaignConfig = initialState.campaignConfig;
      state.adSets = [];
      state.selectedAdSets = [];
      state.status = "idle";
      state.launchStatus = "idle";
      state.uploadStatus = "idle";
      state.error = null;
      state.launchError = null;
      state.uploadError = null;
      state.lastCreated = null;
      state.lastLaunched = null;
      state.uploadedImages = {};
    },

    resetCampaignConfig(state) {
      state.campaignConfig = initialState.campaignConfig;
    },

    // Error clearing helpers
    clearError(state) {
      state.error = null;
    },
    clearLaunchError(state) {
      state.launchError = null;
    },
    clearUploadError(state) {
      state.uploadError = null;
    },

    // AdSets management
    setAdSets(state, action: PayloadAction<AdSet[]>) {
      state.adSets = action.payload;
      state.status = "succeeded";
      state.lastCreated = new Date().toISOString();
    },

    updateSelectedAdSets(state, action: PayloadAction<SelectedAdSetData[]>) {
      state.selectedAdSets = action.payload;
    },

    addSelectedAdSet(state, action: PayloadAction<SelectedAdSetData>) {
      const existingIndex = state.selectedAdSets.findIndex(
        (item) => item.adSet.ad_set_name === action.payload.adSet.ad_set_name
      );
      if (existingIndex >= 0) {
        state.selectedAdSets[existingIndex] = action.payload;
      } else {
        state.selectedAdSets.push(action.payload);
      }
    },

    removeSelectedAdSet(state, action: PayloadAction<string>) {
      state.selectedAdSets = state.selectedAdSets.filter(
        (item) => item.adSet.ad_set_name !== action.payload
      );
    },

    removeUploadedImage(state, action: PayloadAction<string>) {
      const adSetName = action.payload;
      if (state.uploadedImages[adSetName]) {
        URL.revokeObjectURL(state.uploadedImages[adSetName].url);
        delete state.uploadedImages[adSetName];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Create campaign reducers
      .addCase(createCampaign.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adSets = action.payload;
        state.error = null;
        state.lastCreated = new Date().toISOString();
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error occurred";
        state.adSets = [];
      })

      // Image upload reducers
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = "loading";
        state.uploadError = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.uploadError = null;

        state.uploadedImages[action.payload.adSetName] = {
          url: action.payload.imageUrl,
          hash: action.payload.imageHash,
        };

        state.selectedAdSets = state.selectedAdSets.map((item) =>
          item.adSet.ad_set_name === action.payload.adSetName
            ? {
                ...item,
                uploadedImage: action.payload.imageUrl,
                imageHash: action.payload.imageHash,
              }
            : item
        );
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = action.payload ?? "Unknown error occurred";
      })

      // Launch campaign reducers
      .addCase(launchCampaign.pending, (state) => {
        state.launchStatus = "loading";
        state.launchError = null;
      })
      .addCase(launchCampaign.fulfilled, (state, action) => {
        state.launchStatus = "succeeded";
        state.launchError = null;
        state.lastLaunched = new Date().toISOString();
      })
      .addCase(launchCampaign.rejected, (state, action) => {
        state.launchStatus = "failed";
        state.launchError = action.payload ?? "Unknown error occurred";
      });
  },
});


export const { 
  clearAllState,
  upsertCampaignConfig, 
  resetCampaign, 
  resetCampaignConfig,
  clearError, 
  clearLaunchError,
  clearUploadError,
  setAdSets,
  updateSelectedAdSets,
  addSelectedAdSet,
  removeSelectedAdSet,
  removeUploadedImage
} = campaignSlice.actions;

export default campaignSlice.reducer;