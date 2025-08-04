// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, Sparkles } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import treez from "../../public/lovable-uploads/treez.jpeg";

// export const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//               {/* <Sparkles className="w-5 h-5 text-white" /> */}
//               <img src={treez} alt="treez" className="w-24 h-14" />
//             </div>
//             <span className="text-xl font-bold text-gray-900">AdNestAI</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
//               Features
//             </Link>
//             <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
//               Pricing
//             </Link>
//             <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
//               About
//             </Link>
//             <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
//               Contact
//             </Link>
//           </div>

//           {/* Desktop CTA */}
//           <div className="hidden md:flex items-center gap-4">
//             <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100" onClick={() => navigate('/sign-in')}>
//               Sign In
//             </Button>
//             <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
//               <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
//                 Watch Demo
//               </a>
//             </Button>
//           </div>

//           {/* Mobile menu button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-gray-600 hover:text-gray-900"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 bg-white">
//             <div className="flex flex-col gap-4">
//               <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2" onClick={() => setIsOpen(false)}>
//                 Features
//               </Link>
//               <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2" onClick={() => setIsOpen(false)}>
//                 Pricing
//               </Link>
//               <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2" onClick={() => setIsOpen(false)}>
//                 About
//               </Link>
//               <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2" onClick={() => setIsOpen(false)}>
//                 Contact
//               </Link>
//               <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 px-4">
//                 <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 justify-start" onClick={() => { setIsOpen(false); navigate('/sign-in'); }}>
//                   Sign In
//                 </Button>
//                 <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 justify-start" asChild>
//                   <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
//                     Watch Demo
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };




import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import {  useLocation } from "wouter";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center logo-glow transform transition-transform duration-300 group-hover:scale-105">
              {/* Using Sparkles icon as placeholder for treez logo */}
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
              AdNestAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/features" 
              className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2"
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105" 
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
            <Button 
              className="btn-gradient px-6 py-2 text-white font-medium rounded-lg border-0 hover:border-0" 
              asChild
            >
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                Watch Demo
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu md:hidden border-t border-gray-800 bg-black bg-opacity-95 ${isOpen ? 'open' : ''}`}>
          <div className="flex flex-col py-4">
            <Link 
              to="/features" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" 
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" 
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" 
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" 
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-800 px-4 mt-2">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2" 
                onClick={() => { 
                  setIsOpen(false); 
                  navigate('/sign-in'); 
                }}
              >
                Sign In
              </Button>
              <Button 
                className="btn-gradient px-4 py-3 text-white font-medium rounded-lg border-0 hover:border-0" 
                asChild
              >
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                  Watch Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
