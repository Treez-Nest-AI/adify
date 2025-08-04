// import React, { useState } from 'react';
// import { Navigation } from '@/components/Navigation';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
// import { SiMeta} from 'react-icons/si';
// import { useNavigate } from 'react-router-dom';


// import { SiGoogleads } from 'react-icons/si';
// import { FaHandshake } from 'react-icons/fa';

// const services = [
//   {
//     name: 'Meta Ads',
//     description: 'Facebook & Instagram advertising campaigns',
//     color: 'bg-blue-500',
//     icon:  SiMeta,
//     tiers: [
//       {
//         name: 'Basic',
//         price: 19,
//         features: ['5 Ad campaigns', 'Basic targeting', 'Standard support', 'Campaign analytics']
//       },
//       {
//         name: 'Pro',
//         price: 39,
//         features: ['15 Ad campaigns', 'Advanced targeting', 'A/B testing', 'Priority support', 'Detailed analytics']
//       },
//       {
//         name: 'Premium',
//         price: 79,
//         features: ['Unlimited campaigns', 'AI optimization', 'Custom audiences', '24/7 support', 'Advanced reporting']
//       }
//     ]
//   },
//   {
//     name: 'Google Ads',
//     description: 'Search & Display advertising on Google network',
//     color: 'bg-green-500',
//     icon: SiGoogleads,
//     tiers: [
//       {
//         name: 'Pro',
//         price: 99,
//         features: ['10 Search campaigns', 'Keyword research', 'Quality score optimization', 'Standard support']
//       },
//       {
//         name: 'Premium',
//         price: 199,
//         features: ['25 Search campaigns', 'Display network', 'Shopping ads', 'Priority support', 'Advanced bidding']
//       },
//       {
//         name: 'Ultra',
//         price: 499,
//         features: ['Unlimited campaigns', 'AI-powered optimization', 'Custom audiences', '24/7 dedicated support', 'Advanced reporting']
//       }
//     ]
//   },

//   {
//     name: 'Meta & Google Ads',
//     description: 'Direct messaging campaigns via WhatsApp Business',
//     color: 'bg-emerald-500',
//     icon: FaHandshake,
//     tiers: [
//       {
//         name: 'Pro',
//         price: 49,
//         features: ['1,000 messages/month', 'Basic templates', 'Contact management', 'Standard support']
//       },
//       {
//         name: 'Pro',
//         price: 99,
//         features: ['5,000 messages/month', 'Custom templates', 'Automation flows', 'Priority support', 'Analytics']
//       },
//       {
//         name: 'Pro',
//         price: 199,
//         features: ['15,000 messages/month', 'AI chatbot', 'Advanced automation', '24/7 support', 'Full analytics']
//       }
//     ]
//   }
// ];

// const Pricing: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3));
//   };

//   const getCurrentServices = () => {
//     const startIndex = currentSlide * 3;
//     return services.slice(startIndex, startIndex + 3);
//   };

//   const totalSlides = Math.ceil(services.length / 3);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
//               Pricing
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Transparent Pricing for
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Every Business
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Choose the perfect advertising plan for your business. All plans include our AI-powered 
//               optimization and multi-platform support.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Plans */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Navigation Buttons */}
         

//           {/* Services Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//             {getCurrentServices().map((service) => (
//               <div key={service.name} className="space-y-3">
//                 <div className="text-center">
                  
//                    <div className={`inline-block p-3 rounded-full ${service.color} text-white mb-2`}>
//   <service.icon className="w-5 h-5" />
// </div>
//                   <h2 className="text-2xl font-bold">{service.name}</h2>
//                   <p className="text-muted-foreground">{service.description}</p>
//                 </div>

//                 <div className="space-y-4">
//                   {service.tiers.map((tier, index) => {
//                     const isPro = service.name === 'Meta & Google Ads' && tier.name === 'Pro';

                    
//                     return (
//                       <Card 
//                         key={tier.name} 
//                         className={`transition-all hover:shadow-lg relative ${
//                           isPro ? 'border-primary shadow-md' : ''
//                         }`}
//                       >
//                         {isPro && (
//                           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                             <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs">
//                               Most Popular
//                             </Badge>
//                           </div>
//                         )}
                        
//                         <CardHeader className="pb-4">
//                           <div className="flex items-center justify-between">
//                             <CardTitle className="text-lg">{tier.name}</CardTitle>
//                           </div>
//                           <div className="flex items-baseline">
//                             <span className="text-3xl font-bold">${tier.price}</span>
//                             <span className="text-muted-foreground ml-1">/month</span>
//                           </div>
//                         </CardHeader>
                        
//                         <CardContent className="space-y-4">
//                           <ul className="space-y-2">
//                             {tier.features.map((feature, featureIndex) => (
//                               <li key={featureIndex} className="flex items-start text-sm">
//                                 <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                                 <span>{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
                          
//                           <Button className="w-full">
//                             Get Started
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Slide Indicators */}
//           <div className="flex justify-center gap-2">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   index === currentSlide ? 'bg-primary' : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
//             <p className="text-gray-600">Everything you need to know about our pricing and plans.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Is there a free trial?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">Yes, we offer a 14-day free trial for all plans. No credit card required to start.</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Choose your plan and start creating high-converting ad campaigns today.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//               Start Free Trial
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
//               Contact Sales
//             </Button>
//           </div>
//         </div>
//       </section>
//   </div>
// );
// };

// export default Pricing; 











import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { SiMeta, SiGoogleads } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';

const services = [
  {
    name: 'Meta Ads',
    description: 'Facebook & Instagram advertising campaigns',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    icon: SiMeta,
    iconColor: 'text-blue-400',
    buttonGradient: 'from-[hsl(207,90%,54%)] to-blue-600 hover:from-blue-600 hover:to-[hsl(207,90%,54%)]',
    tiers: [
      {
        name: 'Basic',
        price: 19,
        features: ['5 Ad campaigns', 'Basic targeting', 'Standard support', 'Campaign analytics']
      },
      {
        name: 'Pro',
        price: 39,
        features: ['15 Ad campaigns', 'Advanced targeting', 'A/B testing', 'Priority support', 'Detailed analytics']
      },
      {
        name: 'Premium',
        price: 79,
        features: ['Unlimited campaigns', 'AI optimization', 'Custom audiences', '24/7 support', 'Advanced reporting']
      }
    ]
  },
  {
    name: 'Google Ads',
    description: 'Search & Display advertising on Google network',
    color: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-500/30',
    icon: SiGoogleads,
    iconColor: 'text-green-400',
    buttonGradient: 'from-[hsl(162,73%,46%)] to-green-600 hover:from-green-600 hover:to-[hsl(162,73%,46%)]',
    tiers: [
      {
        name: 'Pro',
        price: 99,
        features: ['10 Search campaigns', 'Keyword research', 'Quality score optimization', 'Standard support']
      },
      {
        name: 'Premium',
        price: 199,
        features: ['25 Search campaigns', 'Display network', 'Shopping ads', 'Priority support', 'Advanced bidding']
      },
      {
        name: 'Ultra',
        price: 499,
        features: ['Unlimited campaigns', 'AI-powered optimization', 'Custom audiences', '24/7 dedicated support', 'Advanced reporting']
      }
    ]
  },
  {
    name: 'Meta & Google Ads',
    description: 'Combined advertising power across all platforms',
    color: 'from-emerald-500/20 to-emerald-600/20',
    borderColor: 'border-emerald-500/30',
    icon: FaHandshake,
    iconColor: 'text-emerald-400',
    buttonGradient: 'from-[hsl(259,70%,59%)] to-purple-600 hover:from-purple-600 hover:to-[hsl(259,70%,59%)]',
    tiers: [
      {
        name: 'Pro',
        price: 49,
        features: ['1,000 messages/month', 'Basic templates', 'Contact management', 'Standard support']
      },
      {
        name: 'Pro Enhanced',
        price: 99,
        features: ['5,000 messages/month', 'Custom templates', 'Automation flows', 'Priority support', 'Analytics dashboard'],
        isPopular: true
      },
      {
        name: 'Pro Ultimate',
        price: 199,
        features: ['15,000 messages/month', 'AI chatbot integration', 'Advanced automation', '24/7 dedicated support', 'Full analytics suite']
      }
    ]
  }
];

export default function Pricing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getCurrentServices = () => {
    const startIndex = currentSlide * 3;
    return services.slice(startIndex, startIndex + 3);
  };

  const totalSlides = Math.ceil(services.length / 3);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,0%)] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 py-20 hero-gradient overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[hsl(207,90%,54%)]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[hsl(259,70%,59%)]/20 rounded-full blur-xl animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[hsl(162,73%,46%)]/20 rounded-full blur-xl animate-float" style={{animationDelay: '-4s'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 px-4 py-2 bg-[hsl(207,90%,54%)]/20 border border-[hsl(207,90%,54%)]/30 text-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,54%)]/30">
              ⭐ Pricing
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transparent Pricing for
              <span className="block text-shimmer mt-2">
                Every Business
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect advertising plan for your business. All plans include our AI-powered 
              optimization and multi-platform support with premium dark aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {getCurrentServices().map((service, serviceIndex) => (
              <div key={service.name} className="space-y-6 animate-fade-in" style={{animationDelay: `${serviceIndex * 0.2}s`}}>
                <div className="text-center">
                  <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} mb-4 animate-float`} style={{animationDelay: `${-serviceIndex}s`}}>
                    <service.icon className={`text-2xl ${service.iconColor}`} />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                  <p className="text-gray-400">{service.description}</p>
                </div>

                <div className="space-y-6">
                  {service.tiers.map((tier, tierIndex) => (
                    <div key={`${tier.name}-${tierIndex}`} className="relative">
                      {tier.isPopular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-gradient-to-r from-[hsl(259,70%,59%)] to-purple-600 text-white px-4 py-2 popular-glow">
                            👑 Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <Card className={`gradient-border card-glow group cursor-pointer transition-all hover:scale-105 ${tier.isPopular ? 'popular-glow' : ''}`}>
                        <div className="gradient-border-content">
                          <CardHeader className={`pb-4 ${tier.isPopular ? 'pt-8' : ''}`}>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-4xl font-bold text-white">${tier.price}</span>
                              <span className="text-gray-400 ml-2">/month</span>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <ul className="space-y-3">
                              {tier.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                                  <Check className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button className={`w-full bg-gradient-to-r ${service.buttonGradient} py-3 font-medium btn-glow transition-all`}>
                              Get Started
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[hsl(207,90%,54%)]' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-[hsl(207,90%,54%)]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-[hsl(259,70%,59%)]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Everything you need to know about our pricing and plans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-effect rounded-2xl card-glow border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be charged or credited accordingly.</p>
              </CardContent>
            </Card>

            <Card className="glass-effect rounded-2xl card-glow border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">Yes, we offer a 14-day free trial for all plans. No credit card required to start, experience our platform risk-free.</p>
              </CardContent>
            </Card>

            <Card className="glass-effect rounded-2xl card-glow border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.</p>
              </CardContent>
            </Card>

            <Card className="glass-effect rounded-2xl card-glow border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">We offer a 30-day money-back guarantee if you're not satisfied with our service. No questions asked.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden cta-section">
  {/* Animated background */}
  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(207,90%,54%)]/20 via-[hsl(259,70%,59%)]/20 to-[hsl(162,73%,46%)]/20"></div>
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(207,90%,54%)]/10 via-transparent to-[hsl(259,70%,59%)]/10 animate-pulse"></div>
  </div>

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight animate-slide-up">
      Ready to Get Started?
    </h2>
    <p className="text-2xl text-gray-300 mb-12 leading-relaxed animate-slide-up stagger-1">
      Choose your plan and start creating high-converting ad campaigns today with our premium platform.
    </p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up stagger-2">
      <Button className="px-10 py-4 bg-gradient-to-r from-white to-gray-100 text-black font-semibold hover:from-gray-100 hover:to-white transform hover:scale-105 transition-all duration-300 btn-glow">
        🚀 Start Free Trial
      </Button>
      <Button variant="outline" className="px-10 py-4 border-2 border-white/30 text-white font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300 btn-glow">
        📞 Contact Sales
      </Button>
    </div>
  </div>
</section>

    </div>
  );
}
