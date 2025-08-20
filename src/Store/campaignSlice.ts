

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

type CreateCampaignArgs = {
  marketingAngles: MarketingAngle[];
};

// API returns: [{ ad_sets: AdSet[] }]
type CreateCampaignResponse = Array<{
  ad_set_name: any; ad_sets: AdSet[] 
}>;

/** -------- Async Thunk -------- */
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
        "https://base234.app.n8n.cloud/webhook/d664dc96-6d9d-419b-aee8-c1cf23dd8fb2/nest-ai/adsetcreation",
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

/** -------- Slice -------- */
type CampaignState = {
  campaignConfig: CampaignConfig;
  adSets: AdSet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastCreated: string | null; // timestamp of when campaign was created
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
  status: "idle",
  error: null,
  lastCreated: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    // Merge partial updates from your form
    upsertCampaignConfig(state, action: PayloadAction<Partial<CampaignConfig>>) {
      state.campaignConfig = { ...state.campaignConfig, ...action.payload };
    },
    resetCampaign(state) {
      state.campaignConfig = initialState.campaignConfig;
      state.adSets = [];
      state.status = "idle";
      state.error = null;
      state.lastCreated = null;
    },
    // Clear error state
    clearError(state) {
      state.error = null;
    },
    // Manual ad sets setter (for debugging or manual data entry)
    setAdSets(state, action: PayloadAction<AdSet[]>) {
      state.adSets = action.payload;
      state.status = "succeeded";
      state.lastCreated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        console.log("Campaign creation pending...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        console.log("Campaign creation fulfilled with:", action.payload);
        state.status = "succeeded";
        state.adSets = action.payload;
        state.error = null;
        state.lastCreated = new Date().toISOString();
      })
      .addCase(createCampaign.rejected, (state, action) => {
        console.log("Campaign creation rejected:", action.payload);
        state.status = "failed";
        state.error = action.payload ?? "Unknown error occurred";
        state.adSets = []; // Clear any previous ad sets on failure
      });
  },
});

export const { upsertCampaignConfig, resetCampaign, clearError, setAdSets } = campaignSlice.actions;
export default campaignSlice.reducer;