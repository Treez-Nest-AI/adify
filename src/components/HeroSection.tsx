// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Target, 
//   TrendingUp, 
//   Zap, 
//   BarChart3, 
//   Users, 
//   MessageSquare, 
//   Mail, 
//   Play,
//   CheckCircle,
//   Star,
//   Globe,
//   Smartphone,
//   Monitor,
//   Brain
// } from "lucide-react";
// import heroImage from "@/assets/hero-bg.jpg";
// import { useNavigate } from "react-router-dom";

// export const HeroSection = () => {
//   const navigate = useNavigate();
  
//   // Navigate to the AI Marketing Brain page
//   const handleStartClick = () => {
//     navigate('/product-insights');
//   };

//   const handleSignUpClick = () => {
//     navigate('/signup');
//   };

//   const performanceMetrics = [
//     { value: "3x", label: "ROI", icon: TrendingUp, color: "text-green-400" },
//     { value: "50%", label: "Lower Costs", icon: BarChart3, color: "text-blue-400" },
//     { value: "24/7", label: "AI Monitoring", icon: Brain, color: "text-purple-400" },
//     { value: "18000M", label: "Mail Services", icon: Mail, color: "text-orange-400" }
//   ];

//   const workflowSteps = [
//     {
//       title: "Upload Content",
//       description: "Website, images, or descriptions",
//       icon: Globe,
//       color: "bg-blue-500"
//     },
//     {
//       title: "AI Analysis",
//       description: "Deep business intelligence",
//       icon: Brain,
//       color: "bg-purple-500"
//     },
//     {
//       title: "Generate Ads",
//       description: (
//         <div>
//           <div>High-converting</div>
//           <div>creatives</div>
//         </div>
//       ),
//       icon: Target,
//       color: "bg-green-500"
//     },
//     {
//       title: "Launch & Optimize",
//       description: "24/7 performance monitoring",
//       icon: TrendingUp,
//       color: "bg-orange-500"
//     }
//   ];

//   const features = [
//     {
//       title: "Multi-Platform Support",
//       description: "Meta, Google, whatsApp and more",
//       icon: Smartphone,
//       color: "text-blue-500"
//     },
//     {
//       title: "AI-Powered Optimization",
//       description: "Real-time campaign adjustments",
//       icon: Brain,
//       color: "text-purple-500"
//     },
//     {
//       title: "Advanced Analytics",
//       description: "Deep insights & performance tracking",
//       icon: BarChart3,
//       color: "text-green-500"
//     },
//     {
//       title: "24/7 Support",
//       description: "Expert assistance anytime",
//       icon: MessageSquare,
//       color: "text-orange-500"
//     }
//   ];

//   return (
//     <div className="relative">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background with gradient overlay */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-20"
//           style={{ backgroundImage: `url(${heroImage})` }}
//         />
//         <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
//         {/* Floating elements */}
//         <div className="absolute top-20 left-10 animate-float">
//           <Card className="p-4 bg-white/10 backdrop-blur-glass border border-white/20">
//             <Target className="w-8 h-8 text-primary-glow" />
//           </Card>
//         </div>
//         <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '2s' }}>
//           <Card className="p-4 bg-white/10 backdrop-blur-glass border border-white/20">
//             <TrendingUp className="w-8 h-8 text-accent" />
//           </Card>
//         </div>
        
//         {/* Main content */}
//         <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
//           <div className="animate-fade-in-up">
//             <div className="flex items-center justify-center gap-2 mb-6">
//               <Sparkles className="w-6 h-6 text-primary-glow" />
//               <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
//                 AI-Powered Marketing Platform
//               </span>
//             </div>
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               Transform Your
//               <span className="block bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
//                 Digital Marketing
//               </span>
//             </h1>
//             <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
//               Upload websites, images, docs, or descriptions. Our AI analyzes your business and generates 
//               high-converting ads across all platforms with intelligent targeting, creatives, and performance forecasting.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
//               <Button variant="hero" size="lg" className="text-lg px-8 py-4" onClick={handleStartClick}>
//                 Start Creating Ads
//                 <ArrowRight className="ml-2" />
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-glass border-white/20 text-white hover:bg-white/20" onClick={handleSignUpClick}>
//                 Sign Up
//               </Button>
//             </div>
            
//             {/* Performance Metrics */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
//               {performanceMetrics.map((metric, index) => (
//                 <Card key={index} className="p-6 bg-white/10 backdrop-blur-glass border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
//                   <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
//                   <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
//                   <div className="text-white/70 text-sm">{metric.label}</div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Bottom gradient fade */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
//       </section>

//       {/* Workflow Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our AI-powered platform streamlines your entire advertising workflow in just 4 simple steps
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {workflowSteps.map((step, index) => (
//               <div key={index} className="relative">
//                 <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
//                   <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
//                     <step.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
//                   <p className="text-gray-600">{step.description}</p>
//                 </Card>
//                 {index < workflowSteps.length - 1 && (
//                   <div className="hidden  md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
//                     <ArrowRight className="w-8 h-8 text-gray-300" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Why Choose SANDWICHLAB AI?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Experience the future of digital advertising with our cutting-edge AI technology
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:bg-red-100">
//                 <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 text-sm">{feature.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Social Proof Section */}
//       <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Trusted by Industry Leaders
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Join thousands of businesses that have transformed their advertising with our platform
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Card className="p-8 text-center bg-white shadow-lg">
//               <div className="flex items-center justify-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "SANDWICHLAB AI revolutionized our ad campaigns. We saw a 300% increase in ROAS within the first month."
//               </p>
//               <div className="font-semibold text-gray-900">Sarah Johnson</div>
//               <div className="text-sm text-gray-500">Marketing Director, TechCorp</div>
//             </Card>
            
//             <Card className="p-8 text-center bg-white shadow-lg">
//               <div className="flex items-center justify-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "The AI optimization is incredible. Our costs dropped by 45% while maintaining the same performance."
//               </p>
//               <div className="font-semibold text-gray-900">Mike Chen</div>
//               <div className="text-sm text-gray-500">CEO, StartupXYZ</div>
//             </Card>
            
//             <Card className="p-8 text-center bg-white shadow-lg">
//               <div className="flex items-center justify-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Setup was incredibly easy. From upload to live campaign in under 5 minutes. Game changer!"
//               </p>
//               <div className="font-semibold text-gray-900">Emma Rodriguez</div>
//               <div className="text-sm text-gray-500">Founder, EcomStore</div>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Advertising?
//           </h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Join thousands of businesses that have already revolutionized their digital marketing with our AI-powered platform.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Button size="lg" className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100" onClick={handleStartClick}>
//               Start Free Trial
//               <ArrowRight className="ml-2" />
//             </Button>
//             <Button size="lg" className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100" onClick={handleSignUpClick}>
//               Schedule Demo
//             </Button>
//           </div>
//           <div className="mt-6 flex items-center justify-center gap-2 text-white/70">
//             <CheckCircle className="w-5 h-5" />
//             <span>No credit card required • 14-day free trial</span>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };




import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Play,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Brain,
  Rocket,
  Shield,
  Lightbulb
} from "lucide-react";
import { useLocation } from "wouter";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Navigate to the AI Marketing Brain page
  const handleStartClick = () => {
    navigate('/product-insights');
  };

  const handleSignUpClick = () => {
    setLocation('/product-analysis');
  };

  const performanceMetrics = [
    { value: "3x", label: "ROI Increase", icon: TrendingUp, color: "text-emerald-400" },
    { value: "50%", label: "Cost Reduction", icon: BarChart3, color: "text-blue-400" },
    { value: "24/7", label: "AI Monitoring", icon: Brain, color: "text-purple-400" },
    { value: "18000+", label: "Active Users", icon: Users, color: "text-orange-400" }
  ];

  const workflowSteps = [
    {
      title: "Upload Content",
      description: "Website, images, or descriptions",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      delay: "0s"
    },
    {
      title: "AI Analysis",
      description: "Deep business intelligence",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      delay: "0.2s"
    },
    {
      title: "Generate Ads",
      description: (
                <div>
                  <div>High-converting</div>
                  <div>creatives</div>
                </div>
              ),
      icon: Target,
      color: "from-green-500 to-emerald-500",
      delay: "0.4s"
    },
    {
      title: "Launch & Optimize",
      description: "24/7 performance monitoring",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      delay: "0.6s"
    }
  ];

  const features = [
    {
      title: "Multi-Platform Support",
      description: "Meta, Google, WhatsApp and more",
      icon: Smartphone,
      color: "text-blue-400"
    },
    {
      title: "AI-Powered Optimization",
      description: "Real-time campaign adjustments",
      icon: Brain,
      color: "text-purple-400"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights & performance tracking",
      icon: BarChart3,
      color: "text-green-400"
    },
    {
      title: "24/7 Support",
      description: "Expert assistance anytime",
      icon: MessageSquare,
      color: "text-orange-400"
    }
  ];

  const testimonials = [
    {
      quote: "TEadifyz.AI revolutionized our ad campaigns. We saw a 300% increase in ROAS within the first month.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      avatar: "SJ"
    },
    {
      quote: "The AI optimization is incredible. Our costs dropped by 45% while maintaining the same performance.",
      author: "Mike Chen",
      role: "CEO, StartupXYZ",
      avatar: "MC"
    },
    {
      quote: "Setup was incredibly easy. From upload to live campaign in under 5 minutes. Game changer!",
      author: "Emma Rodriguez",
      role: "Founder, EcomStore",
      avatar: "ER"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 20}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">

        
        {/* Main content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse-glow" />
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-purple-400/30 backdrop-blur-sm">
                AI-Powered Marketing Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="brand-font">
                TEadifyz AI
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload websites, images, docs, or descriptions. Our AI analyzes your business and generates 
              high-converting ads across all platforms with intelligent targeting, creatives, and performance forecasting.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 to-blue-700 btn-ripple group" 
                onClick={handleStartClick}
              >
                Start Creating Ads
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 glass-effect border-white/20 text-white bg-white/10" 
                onClick={handleSignUpClick}
              >
                <Play className="mr-2 w-5 h-5" />
                View Demo
              </Button>
            </div>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {performanceMetrics.map((metric, index) => (
                <Card 
                  key={index} 
                  className={`p-6 glass-effect border-white/10 text-center bg-white/10 transition-all duration-300 transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-white/70 text-sm">{metric.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered platform streamlines your entire advertising workflow in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  className={`p-8 text-center glass-effect border-white/10 bg-white/5 transition-all duration-500 transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: step.delay }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </Card>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-white/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="brand-font">TEadifyz.AI</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of digital advertising with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 text-center glass-effect border-white/10 bg-white/5 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join thousands of businesses that have transformed their advertising with our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 text-center glass-effect border-white/10 bg-white/5 transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-section bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="relative max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
      Ready to Transform Your Advertising?
    </h2>
    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up stagger-1">
      Join thousands of businesses that have already revolutionized their digital marketing with our AI-powered platform.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
      <Button 
        size="lg" 
        className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 btn-ripple group font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105" 
        onClick={handleStartClick}
      >
        Start Free Trial
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button 
        size="lg" 
        className="text-lg px-8 py-4 bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-white/25"
        onClick={handleSignUpClick}
      >
        <Shield className="mr-2 w-5 h-5" />
        Schedule Demo
      </Button>
    </div>
    <div className="mt-6 flex items-center justify-center gap-2 text-white/70 animate-slide-up stagger-2">
      <CheckCircle className="w-5 h-5" />
      <span>No credit card required • 14-day free trial</span>
    </div>
  </div>
</section>

    </div>
  );
};