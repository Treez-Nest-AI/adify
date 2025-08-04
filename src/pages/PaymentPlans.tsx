import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

import { SiMeta} from 'react-icons/si';


import { SiGoogleads } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';


const services = [
  {
    name: 'Meta Ads',
    description: 'Facebook & Instagram advertising campaigns',
    color: 'bg-blue-500',
    icon:  SiMeta,
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
    color: 'bg-green-500',
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
    description: 'Direct messaging campaigns via WhatsApp Business',
    color: 'bg-emerald-500',
    icon: FaHandshake,
    tiers: [
      {
        name: 'Pro',
        price: 49,
        features: ['1,000 messages/month', 'Basic templates', 'Contact management', 'Standard support']
      },
      {
        name: 'Pro',
        price: 99,
        features: ['5,000 messages/month', 'Custom templates', 'Automation flows', 'Priority support', 'Analytics']
      },
      {
        name: 'Pro',
        price: 199,
        features: ['15,000 messages/month', 'AI chatbot', 'Advanced automation', '24/7 support', 'Full analytics']
      }
    ]
  }
];

const PaymentPlans: React.FC = () => {
  const navigate = useNavigate();
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
      const service = services.find(s => s.name.replace(' ', '') === serviceName);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3));
  };

  // Get current 3 services to display
  const getCurrentServices = () => {
    const startIndex = currentSlide * 3;
    return services.slice(startIndex, startIndex + 3);
  };

  const totalSlides = Math.ceil(services.length / 3);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Choose Your Advertising Plans</h1>
          <p className="text-muted-foreground text-sm">Select the services you need to power your marketing campaigns</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
  <Button
    variant="outline"
    size="sm"
    onClick={() => navigate('/')}
    className="flex items-center gap-1"
  >
    <ChevronLeft className="w-4 h-4" />
  </Button>
 
  
</div>

        {/* Services Grid - Show only 3 at a time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {getCurrentServices().map((service) => (
            <div key={service.name} className="space-y-3">
              <div className="text-center">
                {/* <div className={`inline-block p-2 rounded-full ${service.color} text-white mb-2`}>
                  <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">
                    {service.name.charAt(0)}
                  </div>
                </div> */}
                <div className={`inline-block p-3 rounded-full ${service.color} text-white mb-2`}>
  <service.icon className="w-5 h-5" />
</div>

                <h2 className="text-lg font-bold">{service.name}</h2>
                <p className="text-muted-foreground text-xs">{service.description}</p>
              </div>

              <div className="space-y-2">
                {service.tiers.map((tier, index) => {
                  const planId = `${service.name.replace(' ', '')}-${tier.name}`;
                  const isSelected = selectedPlans.includes(planId);
                  const isPro = service.name === 'Meta & Google Ads' && tier.name === 'Pro';
                  
                  return (
                    <Card 
                      key={tier.name} 
                      className={`cursor-pointer transition-all hover:shadow-md relative ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                      } ${isPro ? 'border-primary shadow-sm' : ''}`}
                      onClick={() => handlePlanSelect(service.name.replace(' ', ''), tier.name)}
                    >
                      {isPro && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-2 pt-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{tier.name}</CardTitle>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-xl font-bold">${tier.price}</span>
                          <span className="text-muted-foreground ml-1 text-xs">/month</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-2 pb-3">
                        <ul className="space-y-1">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-xs">
                              <Check className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full text-xs py-1 h-7"
                          variant={isSelected ? 'default' : 'outline'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlanSelect(service.name.replace(' ', ''), tier.name);
                          }}
                        >
                          {isSelected ? 'Selected' : 'Select Plan'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {selectedPlans.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {selectedPlans.length} plan{selectedPlans.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-lg font-bold text-primary">
                  Total: ${getTotalPrice()}/month
                </p>
              </div>
              <Button 
                onClick={handleProceedToPayment}
                size="sm"
                className="px-6"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlans; 