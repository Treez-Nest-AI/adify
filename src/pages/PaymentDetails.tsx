import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const PaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '4al20is044@gmail.com',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: '',
    country: 'India',
    address: ''
  });

  const selectedPlans = JSON.parse(localStorage.getItem('selectedPlans') || '[]');
  const totalPrice = localStorage.getItem('totalPrice') || '0';

  // Calculate pricing based on selected plans
  const calculatePricing = () => {
    const basePrice = parseInt(totalPrice);
    const trialDiscount = Math.round(basePrice * 0.78); // 78% discount for trial
    const finalPrice = basePrice - trialDiscount;
    
    return {
      basePrice,
      trialDiscount,
      finalPrice
    };
  };

  const pricing = calculatePricing();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission here
    console.log('Payment submitted:', formData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/payment-plans')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl brand-font">TEadifyz.AI</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Subscription Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Subscribe to Multimodal Ad Genius</h2>
              <p className="text-gray-600">AI-powered advertising campaigns across multiple platforms</p>
            </div>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">US${pricing.finalPrice}</span>
                      <span className="text-gray-500 line-through">US${pricing.basePrice}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Then US${pricing.basePrice} per month after trial expires
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Multimodal Ad Genius</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Credit & Debit Cards Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Billed monthly</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>US${pricing.basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Trial Discount
                        </Button>
                        <span className="text-green-600">-US${pricing.trialDiscount}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      US${pricing.trialDiscount} off for the first month
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total due today</span>
                        <span>US${pricing.finalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pay with card</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Card information</Label>
                <div className="relative">
                  <Input
                    placeholder="1234 1234 1234 1234"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">V</div>
                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">M</div>
                    <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">A</div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">D</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder name</Label>
                <Input
                  id="cardholderName"
                  placeholder="Full name on card"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Billing address</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
                <Button variant="link" className="p-0 h-auto text-sm text-blue-600">
                  Enter address manually
                </Button>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                Subscribe
              </Button>

              <p className="text-xs text-gray-600 text-center">
                By subscribing, you authorize <span className="brand-font-alt">TEadifyz.AI</span> to charge you according to the terms until you cancel.
              </p>
            </form>

            <div className="flex justify-center gap-4 text-xs text-gray-500">
              <Button variant="link" className="p-0 h-auto">stripe</Button>
              <Button variant="link" className="p-0 h-auto">Legal</Button>
              <Button variant="link" className="p-0 h-auto">Contact</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails; 