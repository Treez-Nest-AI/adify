// import React from 'react';
// import { Navigation } from '@/components/Navigation';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Users, 
//   Target, 
//   TrendingUp, 
//   Globe, 
//   Award, 
//   Heart,
//   Lightbulb,
//   Shield,
//   Zap,
//   Star
// } from 'lucide-react';

// const About: React.FC = () => {
//   const values = [
//     {
//       icon: Target,
//       title: "Innovation",
//       description: "Constantly pushing boundaries with cutting-edge AI technology"
//     },
//     {
//       icon: Heart,
//       title: "Customer Success",
//       description: "Your success is our mission - we're committed to your growth"
//     },
//     {
//       icon: Shield,
//       title: "Trust & Security",
//       description: "Enterprise-grade security protecting your data and campaigns"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Serving businesses worldwide with localized expertise"
//     }
//   ];

//   const milestones = [
//     {
//       year: "2020",
//       title: "Company Founded",
//       description: "Treez Enterprise was established with a vision to revolutionize digital advertising"
//     },
//     {
//       year: "2021",
//       title: "AI Platform Launch",
//       description: "Launched our first AI-powered advertising platform with 100+ early adopters"
//     },
//     {
//       year: "2022",
//       title: "Global Expansion",
//       description: "Expanded to serve clients across 25+ countries with localized solutions"
//     },
//     {
//       year: "2023",
//       title: "Market Leadership",
//       description: "Became the leading AI advertising platform with 10,000+ successful campaigns"
//     },
//     {
//       year: "2024",
//       title: "Future Forward",
//       description: "Continuing to innovate with next-generation AI and multi-platform integration"
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
//               About Us
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               About
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Treez Enterprise
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Pioneering the future of AI-powered advertising with innovative solutions that drive real business results.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Company Story */}
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
//             <div className="prose prose-lg max-w-none text-left">
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 Treez Enterprise was founded in 2020 with a bold vision: to democratize access to advanced advertising technology 
//                 and make AI-powered marketing accessible to businesses of all sizes. What started as a small team of passionate 
//                 technologists and marketing experts has grown into a global force in digital advertising innovation.
//               </p>
              
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 Our journey began when our founders recognized a critical gap in the market. While large enterprises had access 
//                 to sophisticated advertising tools and AI capabilities, small and medium businesses were left behind, struggling 
//                 with manual processes and limited resources. This observation sparked the creation of SANDWICHLAB AI - a platform 
//                 that would level the playing field and empower businesses to compete effectively in the digital marketplace.
//               </p>
              
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 Today, Treez Enterprise stands as a testament to innovation, perseverance, and unwavering commitment to customer 
//                 success. We've helped over 10,000 businesses across 25+ countries transform their advertising strategies, 
//                 collectively generating billions in revenue through our AI-powered campaigns. Our platform processes millions of 
//                 data points daily, continuously learning and improving to deliver better results for our clients.
//               </p>
              
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 What sets Treez Enterprise apart is our deep understanding that technology alone isn't enough. We combine 
//                 cutting-edge AI with human expertise, ensuring that every campaign is not just technically optimized, but 
//                 strategically sound. Our team of marketing veterans, data scientists, and AI specialists work together to 
//                 create solutions that drive real business outcomes - increased sales, higher ROI, and sustainable growth.
//               </p>
              
//               <p className="text-gray-700 leading-relaxed">
//                 As we look to the future, Treez Enterprise remains committed to our founding principles: innovation, 
//                 accessibility, and customer success. We're constantly exploring new frontiers in AI and advertising technology, 
//                 always with the goal of making powerful marketing tools available to businesses that need them most. 
//                 Whether you're a startup looking to make your first mark or an established enterprise seeking to scale, 
//                 we're here to help you succeed in the digital age.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <Card className="border-0 shadow-lg">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                   <Target className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <CardTitle className="text-2xl">Our Mission</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 leading-relaxed">
//                   To democratize access to advanced advertising technology, empowering businesses of all sizes to compete 
//                   effectively in the digital marketplace through AI-powered solutions that drive measurable results and 
//                   sustainable growth.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//                   <Lightbulb className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <CardTitle className="text-2xl">Our Vision</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 leading-relaxed">
//                   To become the world's leading AI-powered advertising platform, setting the standard for intelligent, 
//                   ethical, and effective digital marketing that transforms how businesses connect with their customers.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               The principles that guide everything we do at Treez Enterprise
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                     <value.icon className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h3 className="font-semibold mb-2">{value.title}</h3>
//                   <p className="text-gray-600 text-sm">{value.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Milestones */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Key milestones in our growth and development
//             </p>
//           </div>

//           <div className="space-y-8">
//             {milestones.map((milestone, index) => (
//               <div key={index} className="flex items-start gap-6">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-blue-600 font-bold">{milestone.year}</span>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
//                   <p className="text-gray-600">{milestone.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Meet the passionate individuals behind Treez Enterprise
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Card className="text-center border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
//                 <h3 className="font-semibold mb-1">Sarah Johnson</h3>
//                 <p className="text-blue-600 mb-2">CEO & Co-Founder</p>
//                 <p className="text-gray-600 text-sm">
//                   Former Google Ads executive with 15+ years in digital marketing
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
//                 <h3 className="font-semibold mb-1">Michael Chen</h3>
//                 <p className="text-blue-600 mb-2">CTO & Co-Founder</p>
//                 <p className="text-gray-600 text-sm">
//                   AI/ML expert with PhD from Stanford and 20+ patents
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
//                 <h3 className="font-semibold mb-1">Emily Rodriguez</h3>
//                 <p className="text-blue-600 mb-2">Head of Product</p>
//                 <p className="text-gray-600 text-sm">
//                   Product leader with experience at Meta and Twitter
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Join Our Mission
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Be part of the future of AI-powered advertising with Treez Enterprise
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//               Start Free Trial
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
//               Contact Us
//             </Button>
//           </div>
//         </div>
//       </section>
//   </div>
// );
// };

// export default About; 





import { useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Globe, 
  Award, 
  Heart,
  Lightbulb,
  Shield,
  Zap,
  Star
} from 'lucide-react';

export default function About() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge AI technology",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Your success is our mission - we're committed to your growth",
      color: "pink"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Enterprise-grade security protecting your data and campaigns",
      color: "green"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving businesses worldwide with localized expertise",
      color: "blue"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Treez Enterprise was established with a vision to revolutionize digital advertising",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      year: "2021",
      title: "AI Platform Launch",
      description: "Launched our first AI-powered advertising platform with 100+ early adopters",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve clients across 25+ countries with localized solutions",
      gradient: "from-green-500 to-blue-600"
    },
    {
      year: "2023",
      title: "Market Leadership",
      description: "Became the leading AI advertising platform with 10,000+ successful campaigns",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Continuing to innovate with next-generation AI and multi-platform integration",
      gradient: "from-purple-500 to-blue-600"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      description: "Former Google Ads executive with 15+ years in digital marketing"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      description: "AI/ML expert with PhD from Stanford and 20+ patents"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Product leader with experience at Meta and Twitter"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 glass-effect rounded-full">
              <Badge className="bg-transparent border-0 text-blue-400 font-medium">
                About Us
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up stagger-1">
              About
              <span className="block text-shimmer animate-float">
                Treez Enterprise
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up stagger-2">
              Pioneering the future of AI-powered advertising with innovative solutions that drive real business results.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shimmer">Our Story</h2>
            <div className="space-y-6 text-left">
              <p className="text-gray-300 leading-relaxed">
                Treez Enterprise was founded in 2020 with a bold vision: to democratize access to advanced advertising technology 
                and make AI-powered marketing accessible to businesses of all sizes. What started as a small team of passionate 
                technologists and marketing experts has grown into a global force in digital advertising innovation.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Our journey began when our founders recognized a critical gap in the market. While large enterprises had access 
                to sophisticated advertising tools and AI capabilities, small and medium businesses were left behind, struggling 
                with manual processes and limited resources. This observation sparked the creation of <span className="brand-font-alt">TEadifyz.AI</span> - a platform 
                that would level the playing field and empower businesses to compete effectively in the digital marketplace.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Today, Treez Enterprise stands as a testament to innovation, perseverance, and unwavering commitment to customer 
                success. We've helped over 10,000 businesses across 25+ countries transform their advertising strategies, 
                collectively generating billions in revenue through our AI-powered campaigns. Our platform processes millions of 
                data points daily, continuously learning and improving to deliver better results for our clients.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                What sets Treez Enterprise apart is our deep understanding that technology alone isn't enough. We combine 
                cutting-edge AI with human expertise, ensuring that every campaign is not just technically optimized, but 
                strategically sound. Our team of marketing veterans, data scientists, and AI specialists work together to 
                create solutions that drive real business outcomes - increased sales, higher ROI, and sustainable growth.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                As we look to the future, Treez Enterprise remains committed to our founding principles: innovation, 
                accessibility, and customer success. We're constantly exploring new frontiers in AI and advertising technology, 
                always with the goal of making powerful marketing tools available to businesses that need them most. 
                Whether you're a startup looking to make your first mark or an established enterprise seeking to scale, 
                we're here to help you succeed in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="feature-card card-glow rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 animate-float">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To democratize access to advanced advertising technology, empowering businesses of all sizes to compete 
                effectively in the digital marketplace through AI-powered solutions that drive measurable results and 
                sustainable growth.
              </p>
            </div>

            <div className="feature-card card-glow rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 animate-float" style={{animationDelay: '1s'}}>
                <Lightbulb className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the world's leading AI-powered advertising platform, setting the standard for intelligent, 
                ethical, and effective digital marketing that transforms how businesses connect with their customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shimmer">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Treez Enterprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="feature-card card-glow text-center border-0 shadow-none animate-slide-up">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${value.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float`} 
                       style={{animationDelay: `${index}s`}}>
                    <value.icon className={`w-6 h-6 text-${value.color}-400`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shimmer">Our Journey</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Key milestones in our growth and development
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-start gap-6 animate-slide-up stagger-${index + 1}`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${milestone.gradient} rounded-full flex items-center justify-center flex-shrink-0 animate-float`}
                     style={{animationDelay: `${index}s`}}>
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shimmer">Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the passionate individuals behind Treez Enterprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="feature-card card-glow text-center border-0 shadow-none animate-slide-up">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-blue-400 mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-section">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-slide-up">
            Ready to Transform Your Advertising?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-slide-up stagger-1">
            Join thousands of businesses that trust Treez Enterprise to power their growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
            <Button className="btn-glow bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-white/25">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
