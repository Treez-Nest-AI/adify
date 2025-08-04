// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Building, Phone, Globe } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     companyName: '',
//     phone: '',
//     website: '',
//     industry: '',
//     companySize: '',
//     agreeToTerms: false,
//     marketingEmails: false
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       // Navigate to dashboard or payment plans
//       navigate('/payment-plans');
//     }, 2000);
//   };

//   const isFormValid = () => {
//     return (
//       formData.firstName &&
//       formData.lastName &&
//       formData.email &&
//       formData.password &&
//       formData.confirmPassword &&
//       formData.password === formData.confirmPassword &&
//       formData.agreeToTerms
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center gap-3">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => navigate('/')}
//               className="p-2"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </Button>
//             <h1 className="text-xl font-semibold">TEadifyz.AI</h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column - Form */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
//               <p className="text-gray-600">Join thousands of businesses using AI to transform their advertising</p>
//             </div>

//             <Card className="border-0 shadow-lg">
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Personal Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <User className="w-5 h-5" />
//                       Personal Information
//                     </h3>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="firstName">First Name</Label>
//                         <Input
//                           id="firstName"
//                           placeholder="John"
//                           value={formData.firstName}
//                           onChange={(e) => handleInputChange('firstName', e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="lastName">Last Name</Label>
//                         <Input
//                           id="lastName"
//                           placeholder="Doe"
//                           value={formData.lastName}
//                           onChange={(e) => handleInputChange('lastName', e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="john@company.com"
//                           value={formData.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="phone"
//                           type="tel"
//                           placeholder="+1 (555) 123-4567"
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           className="pl-10"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <Lock className="w-5 h-5" />
//                       Security
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="password">Password</Label>
//                       <div className="relative">
//                         <Input
//                           id="password"
//                           type={showPassword ? 'text' : 'password'}
//                           placeholder="Create a strong password"
//                           value={formData.password}
//                           onChange={(e) => handleInputChange('password', e.target.value)}
//                           required
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="confirmPassword">Confirm Password</Label>
//                       <div className="relative">
//                         <Input
//                           id="confirmPassword"
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           placeholder="Confirm your password"
//                           value={formData.confirmPassword}
//                           onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                           required
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Company Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <Building className="w-5 h-5" />
//                       Company Information
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="companyName">Company Name</Label>
//                       <Input
//                         id="companyName"
//                         placeholder="Your Company Inc."
//                         value={formData.companyName}
//                         onChange={(e) => handleInputChange('companyName', e.target.value)}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="website">Website</Label>
//                       <div className="relative">
//                         <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="website"
//                           placeholder="https://yourcompany.com"
//                           value={formData.website}
//                           onChange={(e) => handleInputChange('website', e.target.value)}
//                           className="pl-10"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label>Industry</Label>
//                         <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select industry" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="ecommerce">E-commerce</SelectItem>
//                             <SelectItem value="saas">SaaS</SelectItem>
//                             <SelectItem value="healthcare">Healthcare</SelectItem>
//                             <SelectItem value="finance">Finance</SelectItem>
//                             <SelectItem value="education">Education</SelectItem>
//                             <SelectItem value="real-estate">Real Estate</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-2">
//                         <Label>Company Size</Label>
//                         <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select size" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="1-10">1-10 employees</SelectItem>
//                             <SelectItem value="11-50">11-50 employees</SelectItem>
//                             <SelectItem value="51-200">51-200 employees</SelectItem>
//                             <SelectItem value="201-500">201-500 employees</SelectItem>
//                             <SelectItem value="500+">500+ employees</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Terms and Conditions */}
//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-2">
//                       <Checkbox
//                         id="agreeToTerms"
//                         checked={formData.agreeToTerms}
//                         onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
//                         required
//                       />
//                       <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
//                         I agree to the <Button variant="link" className="p-0 h-auto text-sm">Terms of Service</Button> and{' '}
//                         <Button variant="link" className="p-0 h-auto text-sm">Privacy Policy</Button>
//                       </Label>
//                     </div>

//                     <div className="flex items-start space-x-2">
//                       <Checkbox
//                         id="marketingEmails"
//                         checked={formData.marketingEmails}
//                         onCheckedChange={(checked) => handleInputChange('marketingEmails', checked as boolean)}
//                       />
//                       <Label htmlFor="marketingEmails" className="text-sm leading-relaxed">
//                         I want to receive marketing emails about new features and updates
//                       </Label>
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
//                     disabled={!isFormValid() || isLoading}
//                   >
//                     {isLoading ? 'Creating Account...' : 'Create Account'}
//                   </Button>
//                 </form>

//                 <div className="mt-6 text-center">
//                   <p className="text-sm text-gray-600">
//                     Already have an account?{' '}
//                     <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/signin')}>
//                       Sign In
//                     </Button>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Benefits */}
//           <div className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold">Why Choose TEadifyz.AI?</h3>
//               <p className="text-gray-600">Join the future of AI-powered advertising</p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-blue-600 font-semibold">1</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">AI-Powered Analysis</h4>
//                   <p className="text-sm text-gray-600">Our AI analyzes your business and creates targeted ad campaigns automatically</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-purple-600 font-semibold">2</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">Multi-Platform Support</h4>
//                   <p className="text-sm text-gray-600">Create ads for Meta, Google, YouTube, Amazon, and more platforms</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-green-600 font-semibold">3</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">Performance Optimization</h4>
//                   <p className="text-sm text-gray-600">Continuous optimization and A/B testing for maximum ROI</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-orange-600 font-semibold">4</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">24/7 Support</h4>
//                   <p className="text-sm text-gray-600">Dedicated support team to help you succeed</p>
//                 </div>
//               </div>
//             </div>

//             <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
//               <CardContent className="p-6">
//                 <h4 className="font-semibold mb-2">Start Your Free Trial</h4>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Get started with a 14-day free trial. No credit card required.
//                 </p>
//                 <div className="text-2xl font-bold text-blue-600">$0</div>
//                 <p className="text-sm text-gray-600">for the first 14 days</p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp; 












import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'wouter';
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Building, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    website: '',
    industry: '',
    companySize: '',
    agreeToTerms: false,
    marketingEmails: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard or payment plans
      setLocation('/payment-plans');
    }, 2000);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.agreeToTerms
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 animated-bg opacity-5 -z-10"></div>
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 floating-element"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 floating-element" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 floating-element" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <div className="glass-effect sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/')}
                className="glass-button p-2 rounded-xl hover:scale-105 transition-modern"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </Button>
              <h1 className="text-xl brand-font">TEadifyz.AI</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-3 gradient-text">Create Your Account</h2>
                <p className="text-slate-600 text-lg">Join thousands of businesses using AI to transform their advertising</p>
              </div>

              <Card className="glass-card rounded-3xl shadow-2xl border-0 transition-modern">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-3 text-slate-800">
                        <div className="w-6 h-6 icon-gradient-blue rounded-lg flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="glass-input input-focus-modern px-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="glass-input input-focus-modern px-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="glass-input input-focus-modern w-full pl-12 pr-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="glass-input input-focus-modern w-full pl-12 pr-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-3 text-slate-800">
                        <div className="w-6 h-6 icon-gradient-red rounded-lg flex items-center justify-center">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                        Security
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="glass-input input-focus-modern w-full pl-4 pr-12 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-modern"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="glass-input input-focus-modern w-full pl-4 pr-12 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-modern"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    {/* <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-3 text-slate-800">
                        <div className="w-6 h-6 icon-gradient-green rounded-lg flex items-center justify-center">
                          <Building className="w-3 h-3 text-white" />
                        </div>
                        Company Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Your Company Inc."
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="glass-input input-focus-modern px-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-medium text-slate-700">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="website"
                            placeholder="https://yourcompany.com"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="glass-input input-focus-modern w-full pl-12 pr-4 py-4 rounded-2xl text-slate-700 placeholder-slate-400 border-0 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">Industry</Label>
                          <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                            <SelectTrigger className="glass-input px-4 py-4 rounded-2xl text-slate-700 border-0 focus:outline-none">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ecommerce">E-commerce</SelectItem>
                              <SelectItem value="saas">SaaS</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="real-estate">Real Estate</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">Company Size</Label>
                          <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                            <SelectTrigger className="glass-input px-4 py-4 rounded-2xl text-slate-700 border-0 focus:outline-none">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="500+">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div> */}

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                          className="w-5 h-5 text-blue-600 bg-transparent border-slate-300 rounded mt-0.5 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          I agree to the <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 font-medium transition-modern">Terms of Service</Button> and{' '}
                          <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 font-medium transition-modern">Privacy Policy</Button>
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <Checkbox
                          id="marketingEmails"
                          checked={formData.marketingEmails}
                          onCheckedChange={(checked) => handleInputChange('marketingEmails', checked as boolean)}
                          className="w-5 h-5 text-blue-600 bg-transparent border-slate-300 rounded mt-0.5 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          I would like to receive marketing emails about new features and updates
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-modern py-4 rounded-2xl font-semibold text-lg shadow-lg"
                      disabled={!isFormValid() || isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    {/* Social Sign Up */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-slate-50 px-4 text-slate-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="glass-button py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 font-medium text-slate-600 border-0">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="glass-button py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 font-medium text-slate-600 border-0">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-slate-600">
                      Already have an account?{' '}
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 font-semibold ml-1 transition-modern"  onClick={() => navigate('/sign-in')}>
                        Sign In
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold gradient-text">Join <span className="brand-font">TEadifyz.AI</span></h3>
                <p className="text-slate-600 text-lg">Transform your advertising with AI-powered creativity</p>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6 card-hover transition-modern">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-600 font-semibold text-white">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800">AI-Powered Analysis</h4>
                      <p className="text-sm text-slate-600">Our AI analyzes your business and creates targeted ad campaigns automatically</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 card-hover transition-modern">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-white">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800">Multi-Platform Support</h4>
                      <p className="text-sm text-slate-600">Create ads for Meta, Google, YouTube, Amazon, and more platforms</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 card-hover transition-modern">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-semibold text-white">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800">Performance Optimization</h4>
                      <p className="text-sm text-slate-600">Continuous optimization and A/B testing for maximum ROI</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 card-hover transition-modern">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-semibold text-white">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800">24/7 Support</h4>
                      <p className="text-sm text-slate-600">Dedicated support team to help you succeed</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-card rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 transition-modern">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2 text-slate-800">Start Your Free Trial</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Get 14 days free access to all premium features
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full pulse-modern"></div>
                    <span className="text-sm text-slate-600">No credit card required</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
