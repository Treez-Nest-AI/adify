// import React, { useState } from 'react';
// import { Navigation } from '@/components/Navigation';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Clock, 
//   MessageSquare,
//   Send,
//   Building,
//   Globe,
//   Users
// } from 'lucide-react';

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     company: '',
//     subject: '',
//     message: ''
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Contact form submitted:', formData);
//   };

//   const contactInfo = [
//     {
//       icon: Mail,
//       title: "Email Us",
//       description: "Get in touch via email",
//       primary: "hello@treezenterprise.com",
//       secondary: "support@treezenterprise.com",
//       color: "bg-blue-500"
//     },
//     {
//       icon: Phone,
//       title: "Call Us",
//       description: "Speak with our team",
//       primary: "+1 (555) 123-4567",
//       secondary: "+1 (555) 987-6543",
//       color: "bg-green-500"
//     },
//     {
//       icon: MapPin,
//       title: "Visit Us",
//       description: "Our headquarters",
//       primary: "123 Innovation Drive",
//       secondary: "San Francisco, CA 94105",
//       color: "bg-purple-500"
//     },
//     {
//       icon: Clock,
//       title: "Business Hours",
//       description: "When we're available",
//       primary: "Mon - Fri: 9:00 AM - 6:00 PM",
//       secondary: "Sat: 10:00 AM - 2:00 PM",
//       color: "bg-orange-500"
//     }
//   ];

//   const departments = [
//     {
//       icon: Users,
//       title: "Sales Team",
//       email: "sales@treezenterprise.com",
//       description: "For pricing and partnership inquiries"
//     },
//     {
//       icon: MessageSquare,
//       title: "Support Team",
//       email: "support@treezenterprise.com",
//       description: "For technical support and account issues"
//     },
//     {
//       icon: Building,
//       title: "Enterprise Team",
//       email: "enterprise@treezenterprise.com",
//       description: "For large enterprise partnerships"
//     },
//     {
//       icon: Globe,
//       title: "International",
//       email: "international@treezenterprise.com",
//       description: "For global expansion and partnerships"
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
//               Contact
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Get in
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Touch
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               We'd love to hear from you. Reach out to our team for any questions, 
//               support, or partnership opportunities.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {contactInfo.map((info, index) => (
//               <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardContent className="p-6">
//                   <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
//                     <info.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="font-semibold mb-2">{info.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4">{info.description}</p>
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium">{info.primary}</p>
//                     <p className="text-xs text-gray-500">{info.secondary}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Departments */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             <div>
//               <div className="mb-8">
//                 <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
//                 <p className="text-gray-600">
//                   Fill out the form below and we'll get back to you within 24 hours.
//                 </p>
//               </div>

//               <Card className="border-0 shadow-lg">
//                 <CardContent className="p-8">
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Full Name</Label>
//                         <Input
//                           id="name"
//                           placeholder="John Doe"
//                           value={formData.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email Address</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="john@company.com"
//                           value={formData.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="company">Company</Label>
//                       <Input
//                         id="company"
//                         placeholder="Your Company Inc."
//                         value={formData.company}
//                         onChange={(e) => handleInputChange('company', e.target.value)}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="subject">Subject</Label>
//                       <Input
//                         id="subject"
//                         placeholder="How can we help you?"
//                         value={formData.subject}
//                         onChange={(e) => handleInputChange('subject', e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="message">Message</Label>
//                       <Textarea
//                         id="message"
//                         placeholder="Tell us more about your inquiry..."
//                         value={formData.message}
//                         onChange={(e) => handleInputChange('message', e.target.value)}
//                         rows={5}
//                         required
//                       />
//                     </div>

//                     <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                       <Send className="w-4 h-4 mr-2" />
//                       Send Message
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Departments */}
//             <div>
//               <div className="mb-8">
//                 <h2 className="text-3xl font-bold mb-4">Contact by Department</h2>
//                 <p className="text-gray-600">
//                   Reach out to the right team for faster assistance.
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 {departments.map((dept, index) => (
//                   <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                           <dept.icon className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold mb-1">{dept.title}</h3>
//                           <p className="text-blue-600 text-sm mb-2">{dept.email}</p>
//                           <p className="text-gray-600 text-sm">{dept.description}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Office Location */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Located in the heart of San Francisco's tech district, our office is easily accessible 
//               and designed for collaboration and innovation.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <Card className="border-0 shadow-lg">
//                 <CardContent className="p-8">
//                   <h3 className="text-xl font-semibold mb-4">Treez Enterprise Headquarters</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
//                       <div>
//                         <p className="font-medium">123 Innovation Drive</p>
//                         <p className="text-gray-600">San Francisco, CA 94105</p>
//                         <p className="text-gray-600">United States</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
//                       <div>
//                         <p className="font-medium">+1 (555) 123-4567</p>
//                         <p className="text-gray-600">Main office line</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
//                       <div>
//                         <p className="font-medium">Monday - Friday</p>
//                         <p className="text-gray-600">9:00 AM - 6:00 PM PST</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
//               <div className="text-center">
//                 <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">Interactive Map</p>
//                 <p className="text-sm text-gray-500">Google Maps integration</p>
//               </div>
//             </div>
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
//             Contact us today to learn how Treez Enterprise can transform your advertising strategy.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//               Schedule a Demo
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
//               Download Brochure
//             </Button>
//           </div>
//         </div>
//       </section>
//   </div>
// );
// };

// export default Contact; 




import { useEffect, useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  Building,
  Globe,
  Users
} from 'lucide-react';

export default function Contact() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      primary: "hello@treezenterprise.com",
      secondary: "support@treezenterprise.com",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 987-6543",
      color: "green"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      primary: "123 Innovation Drive",
      secondary: "San Francisco, CA 94105",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When we're available",
      primary: "Mon - Fri: 9:00 AM - 6:00 PM",
      secondary: "Sat: 10:00 AM - 2:00 PM",
      color: "orange"
    }
  ];

  const departments = [
    {
      icon: Users,
      title: "Sales Team",
      email: "sales@treezenterprise.com",
      description: "For pricing and partnership inquiries"
    },
    {
      icon: MessageSquare,
      title: "Support Team",
      email: "support@treezenterprise.com",
      description: "For technical support and account issues"
    },
    {
      icon: Building,
      title: "Enterprise Team",
      email: "enterprise@treezenterprise.com",
      description: "For large enterprise partnerships"
    },
    {
      icon: Globe,
      title: "International",
      email: "international@treezenterprise.com",
      description: "For global expansion and partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 glass-effect rounded-full">
              <Badge className="bg-transparent border-0 text-blue-400 font-medium">
                Contact
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up stagger-1">
              Get in
              <span className="block text-shimmer animate-float">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up stagger-2">
              We'd love to hear from you. Reach out to our team for any questions, 
              support, or partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="feature-card card-glow text-center border-0 shadow-none animate-slide-up">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${info.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float`}
                       style={{animationDelay: `${index}s`}}>
                    <info.icon className={`w-6 h-6 text-${info.color}-400`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{info.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{info.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">{info.primary}</p>
                    <p className="text-xs text-gray-500">{info.secondary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Departments */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-shimmer">Send us a Message</h2>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <Card className="feature-card card-glow border-0 shadow-none">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your Company Inc."
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Departments */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-shimmer">Contact by Department</h2>
                <p className="text-gray-400">
                  Reach out to the right team for faster assistance.
                </p>
              </div>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card key={index} className="feature-card card-glow border-0 shadow-none animate-slide-up"
                        style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 animate-float"
                             style={{animationDelay: `${index}s`}}>
                          <dept.icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 text-white">{dept.title}</h3>
                          <p className="text-blue-400 text-sm mb-2">{dept.email}</p>
                          <p className="text-gray-400 text-sm">{dept.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-shimmer">Visit Our Office</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Located in the heart of San Francisco's tech district, our office is easily accessible 
              and designed for collaboration and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="feature-card card-glow border-0 shadow-none">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Treez Enterprise Headquarters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-400 mt-0.5 icon-hover" />
                      <div>
                        <p className="font-medium text-gray-300">123 Innovation Drive</p>
                        <p className="text-gray-400">San Francisco, CA 94105</p>
                        <p className="text-gray-400">United States</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-400 mt-0.5 icon-hover" />
                      <div>
                        <p className="font-medium text-gray-300">+1 (555) 123-4567</p>
                        <p className="text-gray-400">Main office line</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-400 mt-0.5 icon-hover" />
                      <div>
                        <p className="font-medium text-gray-300">Monday - Friday</p>
                        <p className="text-gray-400">9:00 AM - 6:00 PM PST</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="feature-card card-glow rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-float" />
                <p className="text-gray-400">Interactive Map</p>
                <p className="text-sm text-gray-500">Google Maps integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-section">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-slide-up stagger-1">
            Contact us today to learn how Treez Enterprise can transform your advertising strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
            <Button className="btn-glow bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105">
              Schedule a Demo
            </Button>
            <Button variant="outline" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-white/25">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}