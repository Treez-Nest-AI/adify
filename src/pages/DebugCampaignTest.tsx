import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Store/store";
import { createCampaign, setAdSets } from "@/Store/campaignSlice";
import { Button } from "@/components/ui/button";

// Test data based on your API response
const testAdSets = [
  {
    "ad_set_name": "Regal Radiance - Traditional Elegance",
    "campaign_objective": "Brand Awareness",
    "target_audience": {
      "location": "India",
      "age_range": "25-45",
      "gender": "Women",
      "interests": [
        "Traditional Clothing",
        "Sarees",
        "Cultural Events",
        "Indian Festivals",
        "Jewelry",
        "Handicrafts"
      ]
    },
    "placements": [
      "Instagram Feed",
      "Instagram Stories",
      "Instagram Reels"
    ],
    "daily_budget": "$150",
    "creative_brief": "Feature a model draping the Turquoise Bliss saree with traditional jewelry in a majestic outdoor setting, highlighting elegant zari work and rich colors to evoke confidence and celebrate modern-traditional fusion.",
    "ad_copy_variations": {
      "short_form": [
        "Step into the spotlight with Turquoise Bliss.",
        "Elegance redefined—feel confident and radiant.",
        "Tradition meets modern grace."
      ],
      "long_form": [
        "Step into the spotlight in our Turquoise Bliss saree—where tradition meets modern elegance for unforgettable moments. Feel confident and radiant at every cultural event.",
        "Celebrate your confidence and style with the Turquoise Bliss saree, featuring intricate zari work and rich colors perfect for your special occasions."
      ]
    },
    "primary_text": "Step into the spotlight in our Turquoise Bliss saree—where tradition meets modern elegance for unforgettable moments.",
    "headline": "Confidence In Every Drape"
  },
  {
    "ad_set_name": "Heritage Meets Trend - Style Forward",
    "campaign_objective": "Engagement",
    "target_audience": {
      "location": "India",
      "age_range": "20-40",
      "gender": "All",
      "interests": [
        "Fashion",
        "Cultural Heritage",
        "Traditional Clothing",
        "Modern Fashion",
        "Sarees",
        "Ethnic Wear"
      ]
    },
    "placements": [
      "Facebook Feed",
      "Facebook Stories",
      "Facebook Video Feeds"
    ],
    "daily_budget": "$100",
    "creative_brief": "Visualize a split-screen showing traditional celebrations contrasted with modern fashion scenes, emphasizing the Turquoise Bliss saree as a versatile garment that bridges cultural heritage with contemporary style.",
    "ad_copy_variations": {
      "short_form": [
        "Celebrate roots with a modern twist.",
        "Your style, your heritage.",
        "Tradition meets trend perfectly."
      ],
      "long_form": [
        "Celebrate your roots while making a style statement with the Turquoise Bliss saree—perfectly blending cultural heritage and contemporary fashion for every occasion.",
        "Whether it's a traditional festivity or a modern gathering, our Turquoise Bliss saree fits seamlessly into your wardrobe—honoring heritage and setting trends."
      ]
    },
    "primary_text": "Celebrate your roots while making a style statement with our exquisite Turquoise Bliss saree, perfect for any occasion.",
    "headline": "Traditional Style, Modern You"
  },
  {
    "ad_set_name": "Gift of Elegance - Thoughtful Gifts",
    "campaign_objective": "Conversions",
    "target_audience": {
      "location": "India",
      "age_range": "30-55",
      "gender": "All",
      "interests": [
        "Gift Shopping",
        "Weddings",
        "Festivals",
        "Luxury Gifts",
        "Traditional Wear",
        "Family"
      ]
    },
    "placements": [
      "WhatsApp Messages",
      "WhatsApp Status"
    ],
    "daily_budget": "$50",
    "creative_brief": "Capture emotional family moments where loved ones exchange the Turquoise Bliss saree beautifully wrapped with notes, highlighting the love and thoughtfulness behind gifting timeless elegance.",
    "ad_copy_variations": {
      "short_form": [
        "Give the gift of timeless elegance.",
        "Make her feel extraordinary today.",
        "A gift that speaks from the heart."
      ],
      "long_form": [
        "Surprise your loved ones with the gift of timeless elegance—because every woman deserves to feel extraordinary on special occasions.",
        "Celebrate your love with the gift of the Turquoise Bliss saree, a perfect choice for weddings, festivals, and heartfelt moments."
      ]
    },
    "primary_text": "Surprise your loved ones with the gift of timeless elegance—because every woman deserves to feel extraordinary!",
    "headline": "Elegant Gifts For Loved Ones"
  },
  {
    "ad_set_name": "Versatile Sophistication - Empower Women",
    "campaign_objective": "Video Views",
    "target_audience": {
      "location": "India",
      "age_range": "25-50",
      "gender": "Women",
      "interests": [
        "Fashion",
        "Women's Empowerment",
        "Ethnic Wear",
        "Comfortable Fashion",
        "Workwear",
        "Versatile Style"
      ]
    },
    "placements": [
      "YouTube In-Stream Ads",
      "YouTube Video Discovery"
    ],
    "daily_budget": "$250",
    "creative_brief": "Showcase a time-lapse video of a woman styling the Turquoise Bliss saree in multiple ways—from festive grandeur to stylish daily wear—highlighting empowerment through versatile, comfortable fashion.",
    "ad_copy_variations": {
      "short_form": [
        "Wear your power, every day.",
        "One saree, endless styles.",
        "Empower your wardrobe."
      ],
      "long_form": [
        "Transform your wardrobe with the Turquoise Bliss saree—designed to transition effortlessly from grand festivities to chic daily wear, empowering you to be a style icon.",
        "Experience versatile sophistication with the Turquoise Bliss saree, combining comfort and high fashion to empower your everyday look."
      ]
    },
    "primary_text": "Transform your wardrobe with a saree that transitions effortlessly from grand festivities to chic daily wear—be the style icon you were meant to be!",
    "headline": "Style That Empowers You"
  }
];

const testMarketingAngles = [
  {
    angle_name: "Confidence Booster",
    hook_line: "Step into the spotlight",
    emotional_trigger: "Confidence",
    target_audience: "Women 25-45",
    visual_idea: "Traditional elegance",
    platform_recommendation: "Instagram",
    Estimate_ads_Budget: "$150"
  }
];

export default function DebugCampaignTest() {
  const { adSets, status, error } = useSelector((state: RootState) => state.campaign);
  const dispatch = useDispatch();

  const handleTestAPI = async () => {
    console.log("Testing API call...");
    try {
      // @ts-ignore
      await dispatch(createCampaign({ marketingAngles: testMarketingAngles }));
    } catch (err) {
      console.error("API Test failed:", err);
    }
  };

  const handleSetTestData = () => {
    console.log("Setting test data...");
    // @ts-ignore
    dispatch(setAdSets(testAdSets));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Redux Debug Panel</h1>
      
      {/* Current State */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Current Redux State:</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Error:</strong> {error || "None"}</p>
        <p><strong>Ad Sets Count:</strong> {adSets.length}</p>
        
        {adSets.length > 0 && (
          <div className="mt-2">
            <p><strong>Ad Sets:</strong></p>
            <ul className="list-disc list-inside">
              {adSets.map((adSet, index) => (
                <li key={index}>{adSet.ad_set_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Test Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={handleTestAPI}
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {status === 'loading' ? 'Testing API...' : 'Test API Call'}
        </Button>
        
        <Button 
          onClick={handleSetTestData}
          className="bg-green-600 hover:bg-green-700"
        >
          Set Test Data (Skip API)
        </Button>
      </div>

      {/* Raw JSON Display */}
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Raw Redux State (JSON):</h3>
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify({ adSets, status, error }, null, 2)}
        </pre>
      </div>
    </div>
  );
}