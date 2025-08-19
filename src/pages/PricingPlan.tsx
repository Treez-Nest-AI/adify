import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, X, TrendingUp } from "lucide-react";
import { SiMeta, SiGoogle, SiWhatsapp } from "react-icons/si";

interface Feature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  duration: string;
  popular?: boolean;
  platforms: Array<'meta' | 'google' | 'whatsapp' | 'analytics'>;
  features: Feature[];
  buttonText: string;
  buttonVariant: 'default' | 'secondary' | 'outline';
}

const plans: PricingPlan[] = [
  {
    name: "Lite Version",
    description: "Perfect for getting started with Meta ads",
    price: 19,
    duration: "10 days",
    platforms: ['meta'],
    features: [
      { name: "Meta Ads Campaign Access", included: true },
      { name: "10 Days Full Access", included: true },
      { name: "Basic Campaign Management", included: true },
      { name: "Standard Support", included: true },
      { name: "Google Ads Integration", included: false },
      { name: "WhatsApp Updates", included: false },
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro Version",
    description: "Full platform access with WhatsApp updates",
    price: 41,
    duration: "10 days",
    popular: true,
    platforms: ['meta', 'google', 'whatsapp'],
    features: [
      { name: "Meta Ads Campaign Access", included: true },
      { name: "Google Ads Integration", included: true },
      { name: "WhatsApp Updates", included: true },
      { name: "10 Days Full Access", included: true },
      { name: "Advanced Campaign Management", included: true },
      { name: "Priority Support", included: true },
    ],
    buttonText: "Get Started Now",
    buttonVariant: "default",
  },
  {
    name: "Ultra Pro",
    description: "Complete solution with advanced tracking",
    price: 123,
    duration: "month",
    platforms: ['meta', 'google', 'whatsapp', 'analytics'],
    features: [
      { name: "Meta Ads Campaign Access", included: true },
      { name: "Google Ads Integration", included: true },
      { name: "WhatsApp Track Updates", included: true },
      { name: "1 Month Full Access", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "24/7 Premium Support", included: true },
    ],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
];

const PlatformIcon = ({ platform }: { platform: 'meta' | 'google' | 'whatsapp' | 'analytics' }) => {
  const iconProps = { className: "w-5 h-5" };

  switch (platform) {
    case 'meta':
      return (
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <SiMeta className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      );
    case 'google':
      return (
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <SiGoogle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
      );
    case 'whatsapp':
      return (
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <SiWhatsapp className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      );
    case 'analytics':
      return (
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
      );
    default:
      return null;
  }
};



const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const navigate = useNavigate();
  const handleSelectPlan = () => {
    navigate('/product-description');
    console.log(`Selected plan: ${plan.name}`);
    // TODO: Implement plan selection logic
  };

  return (
    <Card
      className={`relative transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${plan.popular
          ? 'border-2 border-primary shadow-xl'
          : 'border border-gray-200 dark:border-gray-700 shadow-lg'
        }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10 px-2 sm:px-0 w-full max-w-[200px] flex justify-center">
          <span className="bg-primary text-primary-foreground px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shadow-lg">
            <span className="hidden sm:inline">Most Popular</span>
            <span className="sm:hidden">Popular</span>
          </span>
        </div>
      )}

      <CardContent className={`p-4 sm:p-8 ${plan.popular ? 'pt-8 sm:pt-12' : 'pt-4 sm:pt-8'}`}>
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {plan.platforms.map((platform, index) => (
              <PlatformIcon key={index} platform={platform} />
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {plan.name}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            {plan.description}
          </p>

          <div className="mb-4 sm:mb-6">
            <span className={`text-3xl sm:text-5xl font-bold ${plan.popular ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
              }`}>
              ${plan.price}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm sm:text-base">
              / {plan.duration}
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start sm:items-center">
              {feature.included ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-600 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              )}
              <span className={`text-sm sm:text-base ${feature.included
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-500"
                }`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSelectPlan}
          variant={plan.buttonVariant}
          className={`w-full font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-lg ${plan.popular
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
              : plan.buttonVariant === 'secondary'
                ? 'text-white bg-purple-600 hover:bg-purple-700'
                : 'text-white bg-purple-600 hover:bg-purple-700'
            }`}
        >
          {plan.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};





export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get access to powerful ad campaign management tools across Meta and Google platforms with real-time WhatsApp tracking and updates.
          </p>
        </div>


        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>


      </div>
    </div>
  );
}
