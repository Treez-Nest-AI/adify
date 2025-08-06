// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

// import { SiMeta} from 'react-icons/si';


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

// const PaymentPlans: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handlePlanSelect = (serviceId: string, tierName: string) => {
//     const planId = `${serviceId}-${tierName}`;
//     setSelectedPlans(prev => 
//       prev.includes(planId) 
//         ? prev.filter(id => id !== planId)
//         : [...prev, planId]
//     );
//   };

//   const getTotalPrice = () => {
//     return selectedPlans.reduce((total, planId) => {
//       const [serviceName, tierName] = planId.split('-');
//       const service = services.find(s => s.name.replace(' ', '') === serviceName);
//       const tier = service?.tiers.find(t => t.name === tierName);
//       return total + (tier?.price || 0);
//     }, 0);
//   };

//   const handleProceedToPayment = () => {
//     if (selectedPlans.length === 0) return;
//     localStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
//     localStorage.setItem('totalPrice', getTotalPrice().toString());
//     navigate('/payment-details');
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3));
//   };

//   // Get current 3 services to display
//   const getCurrentServices = () => {
//     const startIndex = currentSlide * 3;
//     return services.slice(startIndex, startIndex + 3);
//   };

//   const totalSlides = Math.ceil(services.length / 3);

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold mb-2">Choose Your Advertising Plans</h1>
//           <p className="text-muted-foreground text-sm">Select the services you need to power your marketing campaigns</p>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between items-center mb-4">
//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => navigate('/')}
//     className="flex items-center gap-1"
//   >
//     <ChevronLeft className="w-4 h-4" />
//   </Button>
 
  
// </div>

//         {/* Services Grid - Show only 3 at a time */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           {getCurrentServices().map((service) => (
//             <div key={service.name} className="space-y-3">
//               <div className="text-center">
//                 {/* <div className={`inline-block p-2 rounded-full ${service.color} text-white mb-2`}>
//                   <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">
//                     {service.name.charAt(0)}
//                   </div>
//                 </div> */}
//                 <div className={`inline-block p-3 rounded-full ${service.color} text-white mb-2`}>
//   <service.icon className="w-5 h-5" />
// </div>

//                 <h2 className="text-lg font-bold">{service.name}</h2>
//                 <p className="text-muted-foreground text-xs">{service.description}</p>
//               </div>

//               <div className="space-y-2">
//                 {service.tiers.map((tier, index) => {
//                   const planId = `${service.name.replace(' ', '')}-${tier.name}`;
//                   const isSelected = selectedPlans.includes(planId);
//                   const isPro = service.name === 'Meta & Google Ads' && tier.name === 'Pro';
                  
//                   return (
//                     <Card 
//                       key={tier.name} 
//                       className={`cursor-pointer transition-all hover:shadow-md relative ${
//                         isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
//                       } ${isPro ? 'border-primary shadow-sm' : ''}`}
//                       onClick={() => handlePlanSelect(service.name.replace(' ', ''), tier.name)}
//                     >
//                       {isPro && (
//                         <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
//                           <Badge className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
//                             Most Popular
//                           </Badge>
//                         </div>
//                       )}
                      
//                       <CardHeader className="pb-2 pt-3">
//                         <div className="flex items-center justify-between">
//                           <CardTitle className="text-sm">{tier.name}</CardTitle>
//                           {isSelected && (
//                             <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
//                               <Check className="w-2.5 h-2.5 text-primary-foreground" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex items-baseline">
//                           <span className="text-xl font-bold">${tier.price}</span>
//                           <span className="text-muted-foreground ml-1 text-xs">/month</span>
//                         </div>
//                       </CardHeader>
                      
//                       <CardContent className="space-y-2 pb-3">
//                         <ul className="space-y-1">
//                           {tier.features.map((feature, featureIndex) => (
//                             <li key={featureIndex} className="flex items-start text-xs">
//                               <Check className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
//                               <span>{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
                        
//                         <Button 
//                           className="w-full text-xs py-1 h-7"
//                           variant={isSelected ? 'default' : 'outline'}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handlePlanSelect(service.name.replace(' ', ''), tier.name);
//                           }}
//                         >
//                           {isSelected ? 'Selected' : 'Select Plan'}
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide Indicators */}
//         <div className="flex justify-center gap-2 mb-6">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-2 h-2 rounded-full transition-colors ${
//                 index === currentSlide ? 'bg-primary' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>

//         {selectedPlans.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
//             <div className="max-w-7xl mx-auto flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-semibold">
//                   {selectedPlans.length} plan{selectedPlans.length > 1 ? 's' : ''} selected
//                 </p>
//                 <p className="text-lg font-bold text-primary">
//                   Total: ${getTotalPrice()}/month
//                 </p>
//               </div>
//               <Button 
//                 onClick={handleProceedToPayment}
//                 size="sm"
//                 className="px-6"
//               >
//                 Proceed to Payment
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPlans; 


import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft } from 'lucide-react';
import { SiMeta, SiGoogleads } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';

const services = [
  {
    name: 'Meta Ads',
    description: 'Facebook & Instagram advertising campaigns',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: SiMeta,
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
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    icon: SiGoogleads,
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
    color: 'popular-gradient',
    icon: FaHandshake,
    tiers: [
      {
        name: 'Starter',
        price: 49,
        features: ['Basic Meta + Google setup', 'Entry-level targeting', 'Email support', 'Monthly reports']
      },
      {
        name: 'Pro',
        price: 99,
        features: ['Advanced campaigns', 'Cross-platform optimization', 'Priority support', 'Detailed analytics', 'A/B testing']
      },
      {
        name: 'Enterprise',
        price: 199,
        features: ['Full-service management', 'AI-powered optimization', 'Dedicated account manager', '24/7 support', 'Custom reporting']
      }
    ]
  }
];

const PaymentPlans: React.FC = () => {
  const navigate = useNavigate();
  const [, ] = useLocation();
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePlanSelect = (serviceId: string, tierName: string) => {
    const planId = `${serviceId}-${tierName}`;
    setSelectedPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  const getTotalPrice = () => {
    return selectedPlans.reduce((total, planId) => {
      const [serviceName, tierName] = planId.split('-');
      const service = services.find(s => s.name.replace(/\s+/g, '') === serviceName);
      const tier = service?.tiers.find(t => t.name === tierName);
      return total + (tier?.price || 0);
    }, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedPlans.length === 0) return;
    localStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
    localStorage.setItem('totalPrice', getTotalPrice().toString());
    navigate('/payment-details');
  };

  const getCurrentServices = () => {
    const startIndex = currentSlide * 3;
    return services.slice(startIndex, startIndex + 3);
  };

  const totalSlides = Math.ceil(services.length / 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden p-4 text-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
            Choose Your Advertising Plans
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Select the services you need to power your marketing campaigns and grow your business
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/product-insights')}
            className="flex items-center gap-2 bg-card hover:bg-muted border-border text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          {/* Slide indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-primary shadow-lg shadow-blue-500/25' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {getCurrentServices().map((service, serviceIndex) => (
            <div 
              key={service.name} 
              className="space-y-6 animate-slide-up" 
              style={{animationDelay: `${serviceIndex * 0.1}s`}}
            >
              <div className="text-center">
                <div className={`inline-block p-4 rounded-2xl ${service.color} text-white mb-4 shadow-lg ${
                  service.name === 'Meta Ads' ? 'shadow-blue-500/25' : 
                  service.name === 'Google Ads' ? 'shadow-emerald-500/25' : 
                  'shadow-violet-500/25'
                }`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-50 mb-2">{service.name}</h2>
                <p className="text-slate-300">{service.description}</p>
              </div>

              <div className="space-y-4">
                {service.tiers.map((tier, tierIndex) => {
                  const planId = `${service.name.replace(/\s+/g, '')}-${tier.name}`;
                  const isSelected = selectedPlans.includes(planId);
                  const isPopular = service.name === 'Meta & Google Ads' && tier.name === 'Pro';
                  
                  return (
                    <div key={tier.name} className="relative ">
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="popular-gradient text-white px-4 py-1 text-sm font-semibold shadow-lg">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <Card 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group bg-white/10${
                          isSelected 
                            ? 'ring-2 ring-primary bg-primary/5 shadow-xl shadow-blue-500/10' 
                            : 'card-gradient hover:shadow-slate-900/20'
                        } ${
                          isPopular 
                            ? 'border-2 border-accent-violet shadow-xl shadow-violet-500/20' 
                            : 'border border-border'
                        }`}
                        onClick={() => handlePlanSelect(service.name.replace(/\s+/g, ''), tier.name)}
                      >
                        <CardHeader className={`pb-4 ${isPopular ? 'pt-8' : 'pt-6'}`}>
                          <div className="flex items-center justify-between mb-4">
                            <CardTitle className="text-lg font-semibold text-slate-50">{tier.name}</CardTitle>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all   ${
                              isSelected 
                                ? 'bg-primary text-primary-foreground bg-gradient-to-br from-green-400 via-green-500 to-green-600' 
                                : isPopular
                                  ? 'bg-accent-violet text-white'
                                  : 'border-2 border-slate-400 group-hover:border-primary'
                            }`}>
                              {(isSelected || isPopular) && (
                                <Check className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-slate-50">${tier.price}</span>
                            <span className="text-slate-400 ml-2">/month</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4 pb-6">
                          <ul className="space-y-3">
                            {tier.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start text-slate-300">
                                <Check className="w-4 h-4 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className={`w-full py-3 font-medium transition-all duration-200 ${
                              isSelected 
                                ? 'popular-gradient hover:opacity-90 text-white shadow-lg bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-xl p-6 shadow-lg' 
                                : isPopular
                                  ? 'popular-gradient hover:opacity-90 text-white shadow-lg'
                                  // : 'bg-muted hover:bg-primary border border-border hover:border-primary text-muted-foreground hover:text-primary-foreground'
                                  :'btn-glow transition-all g-gradient-to-r text- black '
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlanSelect(service.name.replace(/\s+/g, ''), tier.name);
                            }}
                          >
                            {isSelected ? 'Selected' : isPopular ? 'Select Popular' : 'Select Plan'}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Payment Summary */}
      {selectedPlans.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl animate-slide-up bg-white/1">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">
                    {selectedPlans.length} plan{selectedPlans.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    Total: <span className="text-primary">${getTotalPrice()}</span>/month
                  </p>
                </div>
                
                {/* Selected plans preview */}
                <div className="hidden md:flex items-center gap-2 ">
                  {selectedPlans.slice(0, 2).map((planId) => {
                    const [serviceName, tierName] = planId.split('-');
                    return (
                      <div key={planId} className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm ">
                        {serviceName.replace(/([A-Z])/g, ' $1').trim()} - {tierName}
                      </div>
                    );
                  })}
                  {selectedPlans.length > 2 && (
                    <div className="px-3 py-1 bg-muted border border-border rounded-full text-muted-foreground text-sm">
                      +{selectedPlans.length - 2} more
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedPlans([])}
                  className="px-6 py-2btn-glow transition-all g-gradient-to-r text- black border-border text-foreground"
                >
                  Clear All
                </Button>
                <Button 
                  onClick={handleProceedToPayment}
              
                  className="px-8 py-3 bg-gradient-to-br from-green-400 via-green-500 to-green-600"
                >
                  Proceed to Payment
                  <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPlans;

