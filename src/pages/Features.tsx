// import React from 'react';
// import { Navigation } from '@/components/Navigation';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Brain, 
//   Target, 
//   TrendingUp, 
//   Zap, 
//   Users, 
//   Shield, 
//   BarChart3, 
//   Globe, 
//   Smartphone, 
//   Palette,
//   Clock,
//   CheckCircle
// } from 'lucide-react';

// const Features: React.FC = () => {
//   const features = [
//     {
//       icon: Brain,
//       title: "AI-Powered Analysis",
//       description: "Our advanced AI analyzes your business, products, and target audience to create highly optimized ad campaigns.",
//       color: "bg-gradient-to-r from-blue-500 to-purple-600",
//       image: "/placeholder.svg"
//     },
//     {
//       icon: Target,
//       title: "Precision Targeting",
//       description: "Reach your ideal customers with laser-focused targeting based on demographics, interests, and behavior.",
//       color: "bg-gradient-to-r from-green-500 to-emerald-600",
//       image: "/placeholder.svg"
//     },
//     {
//       icon: TrendingUp,
//       title: "Performance Optimization",
//       description: "Continuous A/B testing and real-time optimization to maximize your ROI and campaign performance.",
//       color: "bg-gradient-to-r from-orange-500 to-red-600",
//       image: "/placeholder.svg"
//     },
//     {
//       icon: Globe,
//       title: "Multi-Platform Support",
//       description: "Create ads for Meta, Google, YouTube, Amazon, TikTok, LinkedIn, and more platforms from one dashboard.",
//       color: "bg-gradient-to-r from-purple-500 to-pink-600",
//       image: "/placeholder.svg"
//     },
//     {
//       icon: Palette,
//       title: "Creative Generation",
//       description: "AI generates compelling ad creatives, headlines, and descriptions that convert your audience.",
//       color: "bg-gradient-to-r from-indigo-500 to-blue-600",
//       image: "/placeholder.svg"
//     },
//     {
//       icon: BarChart3,
//       title: "Advanced Analytics",
//       description: "Comprehensive reporting and analytics to track performance, ROI, and campaign insights.",
//       color: "bg-gradient-to-r from-teal-500 to-cyan-600",
//       image: "/placeholder.svg"
//     }
//   ];

//   const benefits = [
//     {
//       icon: Zap,
//       title: "Lightning Fast",
//       description: "Generate complete ad campaigns in minutes, not hours"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise Security",
//       description: "Bank-level security to protect your data and campaigns"
//     },
//     {
//       icon: Users,
//       title: "Team Collaboration",
//       description: "Work together with your team on campaigns and strategies"
//     },
//     {
//       icon: Smartphone,
//       title: "Mobile Optimized",
//       description: "Manage campaigns on-the-go with our mobile app"
//     },
//     {
//       icon: Clock,
//       title: "24/7 Support",
//       description: "Round-the-clock support to help you succeed"
//     },
//     {
//       icon: CheckCircle,
//       title: "Compliance Ready",
//       description: "Built-in compliance with all major advertising platforms"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
//               Features
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Powerful Features for
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Modern Advertising
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover how SANDWICHLAB AI revolutionizes your advertising with cutting-edge AI technology, 
//               multi-platform support, and advanced analytics.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Features */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
//                 <CardHeader className="pb-4">
//                   <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                     <feature.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
//                   <CardDescription className="text-gray-600">
//                     {feature.description}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
//                     <img 
//                       src={feature.image} 
//                       alt={feature.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Why Choose SANDWICHLAB AI?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience the future of advertising with our comprehensive suite of features designed for success.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {benefits.map((benefit, index) => (
//               <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <benefit.icon className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">{benefit.title}</h3>
//                   <p className="text-gray-600 text-sm">{benefit.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-blue-600 mb-2">250%</div>
//               <div className="text-gray-600">Average ROAS Increase</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-green-600 mb-2">15K+</div>
//               <div className="text-gray-600">Successful Campaigns</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-purple-600 mb-2">5 Min</div>
//               <div className="text-gray-600">Campaign Setup Time</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
//               <div className="text-gray-600">Uptime Guarantee</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Advertising?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of businesses already using SANDWICHLAB AI to scale their advertising efforts.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//               Start Free Trial
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
//               View Pricing
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Features; 








import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  Users, 
  Shield, 
  BarChart3, 
  Globe, 
  Smartphone, 
  Palette,
  Clock,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your business, products, and target audience to create highly optimized ad campaigns.",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "0s"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach your ideal customers with laser-focused targeting based on demographics, interests, and behavior.",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "0.5s"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Continuous A/B testing and real-time optimization to maximize your ROI and campaign performance.",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "1s"
    },
    {
      icon: Globe,
      title: "Multi-Platform Support",
      description: "Create ads for Meta, Google, YouTube, Amazon, TikTok, LinkedIn, and more platforms from one dashboard.",
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "1.5s"
    },
    {
      icon: Palette,
      title: "Creative Generation",
      description: "AI generates compelling ad creatives, headlines, and descriptions that convert your audience.",
      color: "bg-gradient-to-r from-indigo-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "2s"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track performance, ROI, and campaign insights.",
      color: "bg-gradient-to-r from-teal-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      delay: "2.5s"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate complete ad campaigns in minutes, not hours"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security to protect your data and campaigns"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team on campaigns and strategies"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Manage campaigns on-the-go with our mobile app"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support to help you succeed"
    },
    {
      icon: CheckCircle,
      title: "Compliance Ready",
      description: "Built-in compliance with all major advertising platforms"
    }
  ];

  const stats = [
    { value: "250%", label: "Average ROAS Increase", color: "text-primary", delay: "0.1s" },
    { value: "15K+", label: "Successful Campaigns", color: "text-emerald-500", delay: "0.2s" },
    { value: "5 Min", label: "Campaign Setup Time", color: "text-purple-500", delay: "0.3s" },
    { value: "99.9%", label: "Uptime Guarantee", color: "text-orange-500", delay: "0.4s" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="block text-shimmer">
                Modern Advertising
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how <span className="brand-font-alt">TEadifyz.AI</span> revolutionizes your advertising with cutting-edge AI technology, 
              multi-platform support, and advanced analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="gradient-border card-glow group hover:scale-105 transition-all duration-300 animate-float"
                style={{ animationDelay: feature.delay }}
              >
                <div className="gradient-border-content p-6">
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-glow`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose <span className="brand-font">TEadifyz.AI</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of advertising with our comprehensive suite of features designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl hover:bg-card/80 transition-all duration-300 card-glow group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-slide-up" 
                style={{ animationDelay: stat.delay }}
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2 animate-glow`}>{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="py-20 cta-section bg-gradient-to-r from-primary to-purple-600 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="relative max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-slide-up">
      Ready to Transform Your Advertising?
    </h2>
    <p className="text-xl text-white/90 mb-8 animate-slide-up stagger-1">
      Join thousands of businesses already using <span className="brand-font-alt">TEadifyz.AI</span> to scale their advertising efforts.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
      <Button className="btn-glow bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105">
        Start Free Trial
      </Button>
      <Button variant="outline" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-white/25">
        View Pricing
      </Button>
    </div>
  </div>
</section>

    </div>
  );
};

export default Features;
