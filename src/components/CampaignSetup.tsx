import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Target, 
  TrendingUp, 
  ShoppingCart, 
  Users,
  MapPin,
  Calendar as CalendarIcon,
  ArrowLeft,
  Sparkles
} from "lucide-react";

interface CampaignSetupProps {
  onBack?: () => void;
  onGenerate?: () => void;
}

export const CampaignSetup = ({ onBack, onGenerate }: CampaignSetupProps) => {
  const [projectName, setProjectName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("Traffic");
  const [conversionButton, setConversionButton] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [targetCities, setTargetCities] = useState("");

  const adGoals = [
    {
      id: "Traffic",
      title: "Traffic",
      subtitle: "AI Smart Optimization",
      description: "Get more people to visit your website.",
      icon: Target
    },
    {
      id: "Leads", 
      title: "Leads",
      subtitle: "Lead Recommendation",
      description: "Collect contact information from potential customers.",
      icon: Users
    },
    {
      id: "Sales",
      title: "Sales", 
      subtitle: "AI Smart Optimization",
      description: "Drive purchases of your products or services.",
      icon: ShoppingCart
    }
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    } else {
      console.log("Generate proposal:", {
        projectName,
        selectedGoal,
        conversionButton,
        startDate,
        endDate,
        targetCities
      });
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="flex items-center gap-2 text-slate-300 hover:text-slate-50 transition-all duration-200 group animate-hover-lift"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-slate-300 uppercase tracking-wide">
              Campaign Setup
            </span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-50">
            Configure Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-700">
              Ad Campaign
            </span>
          </h2>
          <p className="text-lg text-slate-300">
            Set your campaign goals and targeting to generate optimized Meta Ads
          </p>
        </div>

        {/* Main Form Card */}
        <div className="gradient-border animate-scale-in">
          <Card className="gradient-border-content p-8 shadow-elegant border-0 bg-slate-900 ">
            <div className="space-y-8">
              {/* Project Name */}
              <div className="animate-stagger-1">
                <Label htmlFor="project-name" className="text-lg font-semibold mb-3 block text-slate-50">
                  Project name
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  placeholder="Enter your Project Name"
                  onChange={(e) => setProjectName(e.target.value)}
                  className="text-lg bg-slate-800 border-slate-700 text-slate-50 focus:border-primary transition-all duration-200 hover:border-slate-600"
                />
              </div>

              {/* Ad Goal Selection */}
              <div className="animate-stagger-2">
                <Label className="text-lg font-semibold mb-4 block text-slate-50">Ad Goal</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {adGoals.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = selectedGoal === goal.id;
                    return (
                      <Card
                        key={goal.id}
                        className={`p-4 cursor-pointer transition-all duration-300 border-2 hover:scale-105 animate-hover-lift  ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-glow animate-pulse-glow' 
                            : 'border-slate-700 hover:border-primary/50 hover:bg-slate-800/50'
                        } bg-slate-900 bg-white/10 `}
                        onClick={() => setSelectedGoal(goal.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-50">{goal.title}</h4>
                              {isSelected && (
                                <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-0 animate-scale-in">
                                  Selected
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-primary font-medium mb-2">
                              {goal.subtitle}
                            </p>
                            <p className="text-sm text-slate-300">
                              {goal.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Conversion Button */}
              <div className="animate-stagger-3">
                <Label htmlFor="conversion-button" className="text-lg font-semibold mb-3 block text-slate-50">
                  Ad Conversion Button
                </Label>
                <Input
                  id="conversion-button"
                  placeholder="e.g., Shop Now, Learn More, Sign Up"
                  value={conversionButton}
                  onChange={(e) => setConversionButton(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-400 focus:border-primary transition-all duration-200 hover:border-slate-600"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-stagger-1">
                <div>
                  <Label className="text-lg font-semibold mb-3 block text-slate-50">Start date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-slate-50 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="bg-slate-800"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-3 block text-slate-50">End date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-slate-50 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="bg-slate-800"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Target Cities */}
              <div className="animate-stagger-2">
                <Label htmlFor="target-cities" className="text-lg font-semibold mb-3 block flex items-center gap-2 text-slate-50">
                  <MapPin className="w-4 h-4" />
                  Cities and Countries to Advertise
                </Label>
                <Input
                  id="target-cities"
                  placeholder="Add a city or country"
                  value={targetCities}
                  onChange={(e) => setTargetCities(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-400 focus:border-primary transition-all duration-200 hover:border-slate-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-stagger-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleBack}
                  className="animate-hover-lift bg-slate-800 border-slate-700 text-slate-300 hover:text-slate-50 hover:bg-slate-700 transition-all duration-200"
                >
                  Previous
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleGenerate} 
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-lg hover:shadow-glow transition-all duration-200 animate-hover-lift"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Proposal
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CampaignSetup;
