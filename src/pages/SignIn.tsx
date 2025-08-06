
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Shield, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
// import {ForgotPassword} from '@/pages/ForgotPassword'
import { Checkbox } from '@/components/ui/checkbox';
import GoogleSignIn from '@/components/GoogleSignin';

const SignIn = () => {
  const [, setLocation] = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
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
      // Navigate to dashboard or next page
      navigate('/')
      console.log('Sign in successful', formData);
    }, 2000);
  };

  const isFormValid = () => {
    return formData.email && formData.password;
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
      <div className='mt-6 ml-8'>
      <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className=" bg-btn-gradient px-4 py-2 text-white font-medium rounded-xl border-0 hover:border-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
      </div>
      <div className="fixed top-6 right-6 z-50 flex gap-2">
      
        <Button
          variant="ghost"
          onClick={() => navigate('/signup')}
          className="glass-dark px-4 py-2 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          className="glass-dark px-4 py-2 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
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
                Welcome Back to
                <span className="gradient-text"> Your AI</span>
                <br />Advertising Hub
              </h2>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Continue your AI-powered advertising journey and unlock the full potential of your campaigns.
              </p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-4 mb-8">
              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-100">Secure Access</h4>
                    <p className="text-xs text-gray-400">Enterprise-grade security</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-100">Quick Setup</h4>
                    <p className="text-xs text-gray-400">Get back to creating ads</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-100">Performance Tracking</h4>
                    <p className="text-xs text-gray-400">Real-time analytics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="flex justify-between text-gray-400">
              <div className="text-center">
                <div className="text-xl font-bold text-white">98%</div>
                <div className="text-xs">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">24/7</div>
                <div className="text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">5min</div>
                <div className="text-xs">Setup Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel - 70% width */}
        <div className="w-full lg:w-[70%] flex items-center justify-center p-6 lg:p-12 animate-slide-in-right">
          <div className="w-full max-w-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">TEadifyz.AI</h1>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400">Continue your AI advertising journey</p>
            </div>

            {/* Sign In Form Container */}
            <Card className="glass-dark rounded-3xl shadow-2xl  bg-white/10 ">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">Welcome Back</h3>
                  <p className="text-gray-400 text-lg lg:text-xl">Access your <span className="gradient-text">TEadifyz.AI</span> account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl placeholder:text-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="glass-input w-full pl-4 pr-12 py-4 rounded-2xl placeholder:text-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-modern"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                        className="custom-checkbox"
                      />
                      <Label htmlFor="rememberMe" className="text-sm text-gray-300 cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 font-medium transition-modern"
                    onClick={() => navigate('/forgot-password')}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid() || isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  {/* Social Sign In Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-slate-900/80 px-4 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center">
                      <GoogleSignIn />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="social-button glass-dark py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 font-medium text-gray-300 border border-gray-600/30 hover:border-gray-500/50 transition-all"
                    >
                      <svg className="w-4 h-4 mr-2 text-blue-400" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 font-semibold ml-1 transition-modern" 
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
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

export default SignIn;

