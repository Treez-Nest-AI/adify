
// import React, { useState } from 'react';
// import { useLocation } from 'wouter';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Building, Phone, Globe, ChartLine, Palette, Users, Rocket } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [, setLocation] = useLocation();
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
//       setLocation('/dashboard');
//     }, 2000);
//   };

//   const handleSocialLogin = (provider: string) => {
//     // Implement social login logic
//     console.log(`Login with ${provider}`);
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {/* Floating geometric shapes */}
//         <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-float"></div>
//         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-float"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full animate-float"></div>
//         <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full animate-float"></div>

//         {/* Grid pattern overlay */}
//         <div
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
//             backgroundSize: '50px 50px'
//           }}
//         ></div>
//       </div>

//       <div className="min-h-screen flex">
//         {/* Left Content Panel - 30% width, compact design */}
//         <div className="hidden lg:block lg:w-[30%] relative animate-slide-in-left">
//           <div className="h-full flex flex-col justify-center px-8 xl:px-10">
//             {/* Logo and Brand */}
//             <div className="mb-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-glow">
//                   <Rocket className="text-white text-lg" />
//                 </div>
//                 <h1 className="text-2xl font-bold gradient-text" data-testid="brand-title">TEadifyz.AI</h1>
//               </div>

//               <h2 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight" data-testid="main-heading">
//                 Transform Your
//                 <span className="gradient-text"> Advertising</span>
//                 <br />with AI Power
//               </h2>

//               <p className="text-lg text-gray-300 mb-8 leading-relaxed" data-testid="main-description">
//                 Join thousands of businesses using cutting-edge AI to create, optimize, and scale their advertising campaigns.
//               </p>
//             </div>

//             {/* Compact Features */}
//             <div className="space-y-4 mb-8">
//               <div className="feature-card glass-morphism rounded-xl p-4" data-testid="feature-optimization">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <ChartLine className="text-white text-sm" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Smart Optimization</h3>
//                     <p className="text-gray-400 text-sm">AI-powered campaign optimization</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="feature-card glass-morphism rounded-xl p-4" data-testid="feature-creative">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Palette className="text-white text-sm" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Creative Generation</h3>
//                     <p className="text-gray-400 text-sm">AI-generated ad creatives and copy</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="feature-card glass-morphism rounded-xl p-4" data-testid="feature-audience">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Users className="text-white text-sm" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Audience Intelligence</h3>
//                     <p className="text-gray-400 text-sm">Precision targeting with AI insights</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Proof */}
//             <div className="flex justify-between text-gray-400" data-testid="social-proof">
//               <div className="text-center">
//                 <div className="text-xl font-bold text-white">10K+</div>
//                 <div className="text-xs">Users</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-xl font-bold text-white">500M+</div>
//                 <div className="text-xs">Impressions</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-xl font-bold text-white">300%</div>
//                 <div className="text-xs">ROI Increase</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Form Panel - 70% width, expanded form area */}
//         <div className="w-full lg:w-[70%] flex items-center justify-center p-6 lg:p-12 animate-slide-in-right">
//           <div className="w-full max-w-2xl">
//             {/* Back Button (Mobile) */}
//             <div className="lg:hidden mb-8">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setLocation('/')}
//                 className="glass-button p-3 rounded-xl hover:scale-105 transition-all duration-300"
//                 data-testid="button-back"
//               >
//                 <ArrowLeft className="text-gray-300" />
//               </Button>
//             </div>

//             {/* Mobile Logo */}
//             <div className="lg:hidden text-center mb-8">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <Rocket className="text-white" />
//                 </div>
//                 <h1 className="text-2xl font-bold gradient-text">TEadifyz.AI</h1>
//               </div>
//               <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
//               <p className="text-gray-400">Join thousands of businesses using AI advertising</p>
//             </div>

//             {/* Signup Form Container */}
//             <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-12 border border-white/10">
//               {/* Header (Desktop) */}
//               <div className="hidden lg:block text-center mb-10">
//                 <h2 className="text-4xl font-bold mb-4" data-testid="form-title">Create Your Account</h2>
//                 <p className="text-gray-400 text-xl">Join thousands of businesses using AI advertising</p>
//               </div>

//               {/* Social Login Buttons */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                 <Button
//                   type="button"
//                   onClick={() => handleSocialLogin('google')}
//                   className="social-button w-full flex items-center justify-center gap-3 glass-button py-4 px-6 rounded-2xl text-white font-medium hover:bg-white/15"
//                   data-testid="button-google-signup"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                     <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                     <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                     <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                   </svg>
//                   Continue with Google
//                 </Button>

//                 <Button
//                   type="button"
//                   onClick={() => handleSocialLogin('facebook')}
//                   className="social-button w-full flex items-center justify-center gap-3 glass-button py-4 px-6 rounded-2xl text-white font-medium hover:bg-white/15"
//                   data-testid="button-facebook-signup"
//                 >
//                   <svg className="w-5 h-5" fill="#1877f2" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                   </svg>
//                   Continue with Facebook
//                 </Button>
//               </div>

//               {/* Divider */}
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
//                 <span className="text-gray-400 text-sm font-medium">or sign up with email</span>
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Personal Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold flex items-center gap-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                       <User className="text-white text-sm" />
//                     </div>
//                     Personal Information
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {/* First Name */}
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
//                         First Name
//                       </Label>
//                       <div className="relative">
//                         <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                         <Input
//                           id="firstName"
//                           placeholder="Enter your first name"
//                           value={formData.firstName}
//                           onChange={(e) => handleInputChange('firstName', e.target.value)}
//                           className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"
//                           data-testid="input-first-name"
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Last Name */}
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
//                         Last Name
//                       </Label>
//                       <div className="relative">
//                         <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                         <Input
//                           id="lastName"
//                           placeholder="Enter your last name"
//                           value={formData.lastName}
//                           onChange={(e) => handleInputChange('lastName', e.target.value)}
//                           className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"
//                           data-testid="input-last-name"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>


//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="Enter your email address"
//                         value={formData.email}
//                         onChange={(e) => handleInputChange('email', e.target.value)}
                     
//                         className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"   // className="glass-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border-0"
//                         data-testid="input-email"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="password"
//                           type={showPassword ? 'text' : 'password'}
//                           placeholder="Create a strong password"
//                           value={formData.password}
//                           onChange={(e) => handleInputChange('password', e.target.value)}
                          
//                           className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"// className="glass-input w-full pl-12 pr-12 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border-0"
//                           data-testid="input-password"
//                           required
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1"
//                           onClick={() => setShowPassword(!showPassword)}
//                           data-testid="button-toggle-password"
//                         >
//                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="confirmPassword"
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           placeholder="Confirm your password"
//                           value={formData.confirmPassword}
//                           onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          
//                           className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"// className="glass-input w-full pl-12 pr-12 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border-0"
//                           data-testid="input-confirm-password"
//                           required
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           data-testid="button-toggle-confirm-password"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Company Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold flex items-center gap-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                       <Building className="text-white text-sm" />
//                     </div>
//                     Company Information
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="companyName" className="text-sm font-medium text-gray-300">Company Name</Label>
//                       <div className="relative">
//                         <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="companyName"
//                           placeholder="Enter your company name"
//                           value={formData.companyName}
//                           onChange={(e) => handleInputChange('companyName', e.target.value)}
//                            className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"
                         
//                           data-testid="input-company-name"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</Label>
//                       <div className="relative">
//                         <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <Input
//                           id="phone"
//                           type="tel"
//                           placeholder="Enter your phone number"
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
                         
//                           className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10" // className="glass-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 border-0"
//                           data-testid="input-phone"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="website" className="text-sm font-medium text-gray-300">Website (Optional)</Label>
//                     <div className="relative">
//                       <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <Input
//                         id="website"
//                         type="url"
//                         placeholder="https://yourwebsite.com"
//                         value={formData.website}
//                         onChange={(e) => handleInputChange('website', e.target.value)}
                       
//                         className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"
//                         data-testid="input-website"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-gray-300">Industry</Label>
//                       <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
//                         <SelectTrigger className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10"data-testid="select-industry">
//                           <SelectValue placeholder="Select your industry" />
//                         </SelectTrigger>
//                         <SelectContent className="bg-slate-800 border border-white/20">
//                           <SelectItem value="technology">Technology</SelectItem>
//                           <SelectItem value="healthcare">Healthcare</SelectItem>
//                           <SelectItem value="finance">Finance</SelectItem>
//                           <SelectItem value="retail">Retail</SelectItem>
//                           <SelectItem value="education">Education</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-gray-300">Company Size</Label>
//                       <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
//                         <SelectTrigger  className="appearance-none bg-white/10 focus:bg-white/20 text-white placeholder-gray-300 w-full pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 border border-white/10" data-testid="select-company-size">
//                           <SelectValue placeholder="Select company size" />
//                         </SelectTrigger>
//                         <SelectContent className="bg-slate-800 border border-white/20">
//                           <SelectItem value="1-10">1-10 employees</SelectItem>
//                           <SelectItem value="11-50">11-50 employees</SelectItem>
//                           <SelectItem value="51-200">51-200 employees</SelectItem>
//                           <SelectItem value="201-500">201-500 employees</SelectItem>
//                           <SelectItem value="500+">500+ employees</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Terms and Marketing */}
//                 <div className="space-y-6">
//                   <div className="flex items-start gap-4">
//                     <Checkbox
//                       id="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
//                       className="w-5 h-5 text-blue-600 bg-transparent border-white/30 rounded mt-1 focus:ring-blue-500"
//                       data-testid="checkbox-terms"
//                       required
//                     />
//                     <Label htmlFor="agreeToTerms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
//                       I agree to the <Button variant="link" className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 underline font-medium">Terms of Service</Button> and <Button variant="link" className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 underline font-medium">Privacy Policy</Button>
//                     </Label>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <Checkbox
//                       id="marketingEmails"
//                       checked={formData.marketingEmails}
//                       onCheckedChange={(checked) => handleInputChange('marketingEmails', checked as boolean)}
//                       className="w-5 h-5 text-blue-600 bg-transparent border-white/30 rounded mt-1 focus:ring-blue-500"
//                       data-testid="checkbox-marketing"
//                     />
//                     <Label htmlFor="marketingEmails" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
//                       I would like to receive marketing emails about new features and special offers
//                     </Label>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <Button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//                   disabled={!isFormValid() || isLoading}
//                   data-testid="button-create-account"
//                 >
//                   <span className="flex items-center justify-center gap-3">
//                     <Rocket className="w-4 h-4" />
//                     {isLoading ? 'Creating Account...' : 'Create Account'}
//                   </span>
//                 </Button>

//                 {/* Login Link */}
//                 <div className="text-center pt-6">
//                   <p className="text-gray-400">
//                     Already have an account?
//                     <Button
//                       variant="link"
//                       className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 ml-1"
//                       onClick={() => navigate('/sign-in')}
//                       data-testid="link-signin"
//                     >
//                       Sign in here
//                     </Button>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;






import { useState } from 'react';
import { useLocation } from 'wouter';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, User, Zap, TrendingUp, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const SignUp = () => {
  const navigate = useNavigate();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      // Navigate to dashboard or next step
      navigate('/dashboard');
    }, 2000);
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.password && 
           formData.confirmPassword && 
           formData.password === formData.confirmPassword &&
           formData.agreeToTerms;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full floating-element"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full floating-element" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full floating-element" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full floating-element" style={{ animationDelay: '-1s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* Page Toggle Navigation */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <Button
          variant="ghost"
          className="glass-dark px-4 py-2 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/sign-in')}
          className="glass-dark px-4 py-2 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300"
        >
          Sign In
        </Button>
      </div>

      <div className="min-h-screen flex page-transition">
        {/* Left Content Panel - 30% width */}
        <div className="hidden lg:block lg:w-[30%] relative animate-slide-in-left">
          <div className="h-full flex flex-col justify-center px-8 xl:px-10">
            {/* Logo and Brand */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">TEadifyz.AI</h1>
              </div>

              <h2 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">
                Transform Your
                <span className="gradient-text"> Advertising</span>
                <br />with AI Power
              </h2>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Join thousands of businesses using cutting-edge AI to create, optimize, and scale their advertising campaigns.
              </p>
            </div>

            {/* Compact Features */}
            <div className="space-y-4 mb-8">
              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart Optimization</h3>
                    <p className="text-gray-400 text-sm">AI-powered campaign optimization</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Creative Generation</h3>
                    <p className="text-gray-400 text-sm">AI-generated ad creatives and copy</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Audience Intelligence</h3>
                    <p className="text-gray-400 text-sm">Precision targeting with AI insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex justify-between text-gray-400">
              <div className="text-center">
                <div className="text-xl font-bold text-white">10K+</div>
                <div className="text-xs">Users</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">500M+</div>
                <div className="text-xs">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">300%</div>
                <div className="text-xs">ROI Increase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel - 70% width */}
        <div className="w-full lg:w-[70%] flex items-center justify-center p-6 lg:p-12 animate-slide-in-right ">
          <div className="w-full max-w-2xl ">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">TEadifyz.AI</h1>
              </div>
              <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
              <p className="text-gray-400">Join thousands of businesses using AI advertising</p>
            </div>

            {/* Signup Form Container */}
            <Card className="glass-dark rounded-3xl border border-white/10 bg-white/10">
              <CardContent className="p-8 lg:p-12">
                {/* Header (Desktop) */}
                <div className="hidden lg:block text-center mb-10">
                  <h2 className="text-4xl  text-white font-bold mb-4">Create Your Account</h2>
                  <p className="text-gray-400 text-xl">Join thousands of businesses using AI advertising</p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="social-button w-full flex items-center justify-center gap-3 glass-dark py-4 px-6 rounded-2xl text-white font-medium bg-blue-500/20 border border-blue-600 hover:bg-blue-500/30 hover:border-blue-400 transition-colors duration-200 backdrop-blur-md"


                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    
                    className="social-button w-full flex items-center justify-center gap-3 glass-dark py-4 px-6 rounded-2xl text-white font-medium bg-blue-500/20 border border-blue-600 hover:bg-blue-500/30 hover:border-blue-400 transition-colors duration-200 backdrop-blur-md"
>
                    <svg className="w-5 h-5" fill="#1877f2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  <span className="text-gray-400 text-sm font-medium">or sign up with email</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-3 text-white">
                      <div className="w-8 h-8 icon-gradient-blue rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-white">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="glass-input bg-gray-800/50 text-white w-full px-4 py-4 rounded-2xl  placeholder-gray-500 border-0 focus:outline-none"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-white">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="glass-input  bg-gray-800/50 text-white  w-full px-4 py-4 rounded-2xl placeholder-gray-500 border-0 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-white">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="glass-input   bg-gray-800/50 text-white  w-full pl-12 pr-4 py-4 rounded-2xl  placeholder-gray-500 border-0 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-white">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="glass-input   bg-gray-800/50 text-white  w-full pl-4 pr-12 py-4 rounded-2xl placeholder-gray-500 border-0 focus:outline-none"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-white">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="glass-input w-full  bg-gray-800/50 text-white  pl-4 pr-12 py-4 rounded-2xl  placeholder-gray-500 border-0 focus:outline-none"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Marketing */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        className="w-4 h-4 mt-1 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm text-white cursor-pointer">
                        I agree to the <Button variant="link" className="p-0 h-auto text-blue-400 hover:text-blue-300">Terms of Service</Button> and <Button variant="link" className="p-0 h-auto text-blue-400 hover:text-blue-300">Privacy Policy</Button>
                      </Label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="marketingEmails"
                        checked={formData.marketingEmails}
                        onCheckedChange={(checked) => handleInputChange('marketingEmails', checked as boolean)}
                        className="w-4 h-4 mt-1 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <Label htmlFor="marketingEmails" className="text-sm text-white cursor-pointer">
                        Send me marketing emails about new features and updates
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid() || isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                {/* Sign In Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 font-medium ml-1 transition-modern" 
                      onClick={() => navigate('/sign-in')}
                    >
                      Sign in
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
