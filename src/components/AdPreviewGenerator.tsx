import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Star,
  ShoppingCart,
  Play,
  ThumbsUp,
  RefreshCw
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const adVariants = [
  {
    id: 1,
    type: "Single Image",
    headline: "Transform Your Style with Sustainable Fashion",
    description: "Discover eco-friendly clothing that doesn't compromise on style. Premium materials, ethical production, and designs that make a statement.",
    cta: "Shop Now",
    metrics: { ctr: "3.2%", cpc: "$0.45", roas: "4.2x" },
    confidence: 92
  },
  {
    id: 2,
    type: "Carousel",
    headline: "From Closet to Conscience: Fashion That Matters",
    description: "See how sustainable fashion fits into your lifestyle. Swipe to explore our collection of mindfully-made pieces.",
    cta: "Learn More",
    metrics: { ctr: "2.8%", cpc: "$0.52", roas: "3.8x" },
    confidence: 88
  },
  {
    id: 3,
    type: "Video",
    headline: "Behind the Seams: Your Sustainable Style Journey",
    description: "Watch how every piece is crafted with care for people and planet. Quality you can feel, impact you can trust.",
    cta: "Watch Story",
    metrics: { ctr: "4.1%", cpc: "$0.38", roas: "4.7x" },
    confidence: 95
  }
];

const targetingData = {
  demographics: "Women, 25-45 years",
  interests: ["Sustainable Fashion", "Eco-friendly Products", "Premium Brands"],
  locations: ["United States", "Canada", "United Kingdom"],
  budget: "$50-100/day",
  reach: "15,000 - 42,000 people/day"
};

export const AdPreviewGenerator = () => {
  const [selectedAd, setSelectedAd] = useState(adVariants[0]);
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              AI-Generated Campaigns
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your <span className="text-primary">Meta Ads</span> Are Ready
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI has analyzed your content and created multiple high-converting ad variations 
            with targeting and performance predictions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ad Previews */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Ad Variations</h3>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate More
              </Button>
            </div>

            {adVariants.map((ad) => (
              <Card 
                key={ad.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-elegant ${
                  selectedAd.id === ad.id ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                onClick={() => setSelectedAd(ad)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{ad.type}</Badge>
                    <Badge variant="outline" className="text-success">
                      {ad.confidence}% Confidence
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{ad.metrics.roas}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-lg mb-2">{ad.headline}</h4>
                <p className="text-muted-foreground mb-4">{ad.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>CTR: {ad.metrics.ctr}</span>
                    <span>CPC: {ad.metrics.cpc}</span>
                    <span>ROAS: {ad.metrics.roas}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {ad.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Live Preview</h3>
            
            {/* Mobile-style Facebook ad preview */}
            <Card className="p-4 bg-[#18191a] text-white max-w-sm mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">ES</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">EcoStyle</div>
                  <div className="text-xs text-gray-300">Sponsored</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              {/* Content */}
              <div className="mb-3">
                <p className="text-sm mb-3">{selectedAd.description}</p>
                
                {/* Image placeholder */}
                <div className="w-full h-48 bg-gradient-primary rounded-lg flex items-center justify-center mb-2">
                  {selectedAd.type === "Video" ? (
                    <Play className="w-12 h-12 text-white/80" />
                  ) : selectedAd.type === "Carousel" ? (
                    <div className="text-center">
                      <ShoppingCart className="w-8 h-8 text-white/80 mx-auto mb-1" />
                      <span className="text-xs text-white/80">Swipe to see more</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img className="w-12 h-12 text-white/80" />
                      <span className="text-xs text-white/80">Product Image</span>
                    </div>
                  )}
                </div>

                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-xs text-gray-400 uppercase mb-1">ECOSTYLE.COM</div>
                  <div className="font-semibold text-sm mb-1">{selectedAd.headline}</div>
                  <Button variant="secondary" size="sm" className="w-full">
                    {selectedAd.cta}
                  </Button>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between text-gray-400 text-sm border-t border-gray-700 pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Targeting Info */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Targeting Strategy</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Demographics:</span>
                  <span className="ml-2 text-muted-foreground">{targetingData.demographics}</span>
                </div>
                <div>
                  <span className="font-medium">Interests:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {targetingData.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Daily Budget:</span>
                  <span className="ml-2 text-muted-foreground">{targetingData.budget}</span>
                </div>
                <div>
                  <span className="font-medium">Estimated Reach:</span>
                  <span className="ml-2 text-muted-foreground">{targetingData.reach}</span>
                </div>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="hero" className="flex-1" onClick={() => navigate('/payment-plans')}>
                Launch Campaign
              </Button>
              <Button variant="outline">
                Export Ads
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};