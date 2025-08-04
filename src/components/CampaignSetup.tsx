import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  onBack: () => void;
  onGenerate: () => void;
}

export const CampaignSetup = ({ onBack, onGenerate }: CampaignSetupProps) => {
  const [projectName, setProjectName] = useState("PUMA Essentials Sportswear Collection");
  const [selectedGoal, setSelectedGoal] = useState("Sales");
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
      icon: Target,
      color: "bg-blue-500"
    },
    {
      id: "Leads", 
      title: "Leads",
      subtitle: "Lead Recommendation",
      description: "Collect contact information from potential customers.",
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: "Sales",
      title: "Sales", 
      subtitle: "AI Smart Optimization",
      description: "Drive purchases of your products or services.",
      icon: ShoppingCart,
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Campaign Setup
            </span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Configure Your <span className="text-primary">Ad Campaign</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Set your campaign goals and targeting to generate optimized Meta Ads
          </p>
        </div>

        <Card className="p-8 shadow-elegant">
          <div className="space-y-8">
            {/* Project Name */}
            <div>
              <Label htmlFor="project-name" className="text-lg font-semibold mb-3 block">
                Project name
              </Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Ad Goal Selection */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Ad Goal</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adGoals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <Card
                      key={goal.id}
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        selectedGoal === goal.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${goal.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{goal.title}</h4>
                            {selectedGoal === goal.id && (
                              <Badge variant="secondary" className="text-xs">
                                Selected
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-primary font-medium mb-2">
                            {goal.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground">
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
            <div>
              <Label htmlFor="conversion-button" className="text-lg font-semibold mb-3 block">
                Ad Conversion Button
              </Label>
              <Input
                id="conversion-button"
                placeholder="e.g., Shop Now, Learn More, Sign Up"
                value={conversionButton}
                onChange={(e) => setConversionButton(e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block">Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block">End date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Target Cities */}
            <div>
              <Label htmlFor="target-cities" className="text-lg font-semibold mb-3 block flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Cities and Countries to Advertise
              </Label>
              <Input
                id="target-cities"
                placeholder="Add a city or country"
                value={targetCities}
                onChange={(e) => setTargetCities(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button variant="outline" size="lg" onClick={onBack}>
                Previous
              </Button>
              <Button variant="hero" size="lg" onClick={onGenerate} className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Proposal
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};