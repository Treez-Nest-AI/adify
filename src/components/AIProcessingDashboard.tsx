import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Search, 
  Target, 
  Image, 
  FileText, 
  TrendingUp,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

export const AIProcessingDashboard = () => {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'content-analysis',
      title: 'Content Analysis',
      description: 'Analyzing your website, images, and documents',
      icon: Search,
      status: 'processing',
      progress: 75
    },
    {
      id: 'audience-identification',
      title: 'Audience Identification',
      description: 'Identifying your target demographics and interests',
      icon: Target,
      status: 'processing',
      progress: 45
    },
    {
      id: 'creative-generation',
      title: 'Creative Generation',
      description: 'Creating ad visuals and copy variations',
      icon: Image,
      status: 'pending',
      progress: 0
    },
    {
      id: 'copy-optimization',
      title: 'Copy Optimization',
      description: 'Crafting compelling headlines and descriptions',
      icon: FileText,
      status: 'pending',
      progress: 0
    },
    {
      id: 'performance-forecasting',
      title: 'Performance Forecasting',
      description: 'Predicting CTR, CPC, and ROAS metrics',
      icon: TrendingUp,
      status: 'pending',
      progress: 0
    }
  ]);

  const [overallProgress, setOverallProgress] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => prev.map(step => {
        if (step.status === 'processing' && step.progress < 100) {
          return { ...step, progress: Math.min(step.progress + 5, 100) };
        } else if (step.status === 'processing' && step.progress >= 100) {
          return { ...step, status: 'completed' };
        }
        return step;
      }));

      setOverallProgress(prev => Math.min(prev + 2, 85));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'processing': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Brain;
      default: return Clock;
    }
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              AI Processing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Ads Are Being <span className="text-primary">Created</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI is analyzing your content and generating optimized Meta Ads campaigns
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="p-6 mb-8 shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Badge variant="secondary" className="text-sm">
              {overallProgress}% Complete
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Estimated time remaining: 2-3 minutes
          </p>
        </Card>

        {/* Processing Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const StepIcon = step.icon;
            
            return (
              <Card key={step.id} className="p-6 shadow-card">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getStatusColor(step.status)}`}>
                    <StepIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{step.title}</h4>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${
                          step.status === 'completed' ? 'text-success' :
                          step.status === 'processing' ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          {step.status === 'completed' ? 'Completed' :
                           step.status === 'processing' ? 'Processing...' : 'Waiting'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">
                      {step.description}
                    </p>
                    
                    {step.status !== 'pending' && (
                      <Progress value={step.progress} className="h-2" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Live insights */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">Live AI Insights</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • Detected primary audience: Women 25-45 interested in sustainable fashion
            </p>
            <p className="text-muted-foreground">
              • Brand tone: Professional, eco-conscious, premium
            </p>
            <p className="text-muted-foreground">
              • Optimal ad format: Carousel with lifestyle imagery
            </p>
            <p className="text-muted-foreground">
              • Projected ROAS: 3.2x - 4.8x based on similar campaigns
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};