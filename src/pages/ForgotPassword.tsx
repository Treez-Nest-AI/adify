import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Shield, Zap, Check, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Card, CardContent } from '@/components/ui/card';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { text: 'Enter password', strength: 0, color: 'text-slate-400' };
    
    const requirements = validatePassword(password);
    const metCount = Object.values(requirements).filter(Boolean).length;
    
    if (metCount < 3) {
      return { text: 'Weak', strength: 25, color: 'text-red-500' };
    } else if (metCount < 5) {
      return { text: 'Medium', strength: 60, color: 'text-amber-600' };
    } else {
      return { text: 'Strong', strength: 100, color: 'text-emerald-600' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate back to sign-in page
      console.log('Password reset successful', formData);
      navigate('/sign-in');
    }, 2000);
  };

  const isFormValid = () => {
    const requirements = validatePassword(formData.newPassword);
    const allRequirementsMet = Object.values(requirements).every(Boolean);
    const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0;
    return formData.email && allRequirementsMet && passwordsMatch;
  };

  const requirements = validatePassword(formData.newPassword);
  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden text-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full floating-element"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full floating-element" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-200/40 to-blue-200/40 rounded-full floating-element" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-200/40 to-red-200/40 rounded-full floating-element" style={{ animationDelay: '-1s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, rgba(30, 41, 59, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* Page Toggle Navigation */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <Button
          variant="ghost"
          onClick={() => navigate('/sign-up')}
          className="glass-light px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:scale-105 transition-all duration-300 hover:text-blue-600"
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/sign-in')}
          className="glass-light px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:scale-105 transition-all duration-300 hover:text-blue-600"
        >
          Sign In
        </Button>
      </div>

      {/* Back to Sign In Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="ghost"
          onClick={() => navigate('/sign-in')}
          className="glass-light px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
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

              <h2 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight text-slate-800">
                Reset Your
                <span className="gradient-text"> Password</span>
                <br />Securely & Easily
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Create a new secure password for your AI advertising account with our enhanced security measures.
              </p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-4 mb-8">
              <div className="card-hover glass-light rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">Enhanced Security</h4>
                    <p className="text-xs text-slate-500">Multi-layer protection</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-light rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">Instant Reset</h4>
                    <p className="text-xs text-slate-500">Get back to work quickly</p>
                  </div>
                </div>
              </div>

              <div className="card-hover glass-light rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 icon-gradient-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">Account Recovery</h4>
                    <p className="text-xs text-slate-500">Keep your data safe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="flex justify-between text-slate-500">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-800">256-bit</div>
                <div className="text-xs">Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-800">2FA</div>
                <div className="text-xs">Security</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-800">30sec</div>
                <div className="text-xs">Reset Time</div>
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
              <h2 className="text-2xl font-bold mb-2 text-slate-800">Reset Password</h2>
              <p className="text-slate-600">Create a new secure password</p>
            </div>

            {/* Reset Password Form Container */}
            <Card className="glass-light rounded-3xl shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-slate-800">Reset Password</h3>
                  <p className="text-slate-600 text-lg lg:text-xl">Create a new password for your <span className="gradient-text">TEadifyz.AI</span> account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                    <div className="relative">
                      {/* <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" /> */}
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="glass-input w-full pl-4 pr-4 py-4 rounded-2xl placeholder:text-slate-400 text-slate-800  border border-slate-300 focus:outline-none transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* New Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="glass-input w-full pl-4 pr-12 py-4 rounded-2xl placeholder:text-slate-400 text-slate-800  border border-slate-300 focus:outline-none transition-all duration-200"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-all duration-200"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="glass-input w-full pl-4 pr-12 py-4 rounded-2xl placeholder:text-slate-400 text-slate-800 border border-slate-300 focus:outline-none transition-all duration-200"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-all duration-200"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {formData.confirmPassword && !passwordsMatch && (
                      <div className="text-red-500 text-sm mt-1">
                        Passwords do not match
                      </div>
                    )}
                  </div>

                  {/* Password Requirements Section */}
                  <div className="space-y-3 mt-6">
                    <h4 className="text-sm font-medium text-slate-700">Password Requirements:</h4>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${requirements.length ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="w-4 h-4 flex items-center justify-center">
                          {requirements.length && <Check className="w-3 h-3" />}
                        </span>
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${requirements.uppercase ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="w-4 h-4 flex items-center justify-center">
                          {requirements.uppercase && <Check className="w-3 h-3" />}
                        </span>
                        <span>One uppercase letter (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${requirements.lowercase ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="w-4 h-4 flex items-center justify-center">
                          {requirements.lowercase && <Check className="w-3 h-3" />}
                        </span>
                        <span>One lowercase letter (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${requirements.number ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="w-4 h-4 flex items-center justify-center">
                          {requirements.number && <Check className="w-3 h-3" />}
                        </span>
                        <span>One number (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${requirements.special ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="w-4 h-4 flex items-center justify-center">
                          {requirements.special && <Check className="w-3 h-3" />}
                        </span>
                        <span>One special character (!@#$%^&*)</span>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Analysis */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">Password strength:</span>
                      <span className={`text-sm font-medium ${passwordStrength.color}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 25 ? 'bg-red-500' :
                          passwordStrength.strength === 60 ? 'bg-amber-500' :
                          passwordStrength.strength === 100 ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Reset Password Button */}
                  <Button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg shadow-lg text-white disabled:opacity-60 disabled:cursor-not-allowed mt-8"
                    disabled={!isFormValid() || isLoading}
                  >
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  </Button>

                  {/* Divider */}
                  <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 text-slate-500">Need help?</span>
                    </div>
                  </div>

                  {/* Help Options */}
                  <div className="flex justify-center space-x-6 text-sm">
                    <Button 
                      type="button" 
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
                    >
                      Contact Support
                    </Button>
                    <Button 
                      type="button" 
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
                      onClick={() => navigate('/sign-in')}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
