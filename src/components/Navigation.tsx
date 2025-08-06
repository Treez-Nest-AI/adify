


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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center logo-glow transform transition-transform duration-300 group-hover:scale-105">
              {/* Using Sparkles icon as placeholder for treez logo */}
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl  text-white  brand-font group-hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/')}>
              TEadifyz.AI
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



















// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, Sparkles, User, Settings, HelpCircle, LogOut, Edit } from "lucide-react";
// import { useLocation } from "wouter";
// import {useProfile} from "@/hooks/useprofile"
// // import { EditProfileModal } from "./EditProfileModal";

// export const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [, setLocation] = useLocation();
//   const { data: profile, isLoading } = useProfile();

//   const handleSignIn = () => {
//     setLocation('/sign-in');
//   };

//   const handleWatchDemo = () => {
//     window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
//   };

//   const closeDropdown = () => setIsDropdownOpen(false);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setLocation('/')}>
//               <div className="w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center logo-glow transform transition-transform duration-300 group-hover:scale-105">
//                 <Sparkles className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl brand-font group-hover:scale-105 transition-all duration-300">
//                 TEadifyz.AI
//               </span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-8">
//               <a href="#features" className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2">
//                 Features
//               </a>
//               <a href="#pricing" className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2">
//                 Pricing
//               </a>
//               <a href="#about" className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2">
//                 About
//               </a>
//               <a href="#contact" className="nav-link text-gray-300 hover:text-white transition-colors duration-300 py-2">
//                 Contact
//               </a>
//             </div>

//             {/* Desktop CTA and Profile */}
//             <div className="hidden md:flex items-center gap-4">
//               <Button 
//                 variant="ghost" 
//                 className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105" 
//                 onClick={handleSignIn}
//               >
//                 Sign In
//               </Button>
//               <Button 
//                 className="btn-gradient px-6 py-2 text-white font-medium rounded-lg border-0 hover:border-0"
//                 onClick={handleWatchDemo}
//               >
//                 Watch Demo
//               </Button>

//               {/* User Profile Dropdown */}
//               {profile && (
//                 <div className="relative ml-4">
//                   <div 
//                     className="flex items-center gap-3 cursor-pointer group" 
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   >
//                     {/* Profile Image */}
//                     <div className="relative">
//                       <img 
//                         src={profile.avatar || '/default-avatar.jpg'} 
//                         alt="User Profile" 
//                         className="w-10 h-10 rounded-full object-cover profile-avatar transition-all duration-300 border-2 border-transparent group-hover:border-purple-400"
//                       />
//                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
//                     </div>
                    
//                     {/* User Info */}
//                     <div className="hidden lg:flex flex-col">
//                       <span className="text-sm font-medium text-white">{profile.name}</span>
//                       <span className="text-xs text-gray-400">{profile.email}</span>
//                     </div>
                    
//                     {/* Dropdown Arrow */}
//                     <svg 
//                       className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>

//                   {/* Dropdown Menu */}
//                   {isDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-72 glass-effect border border-gray-700 rounded-xl shadow-2xl py-2 animate-slide-down">
//                       {/* User Info Header */}
//                       <div className="px-4 py-3 border-b border-gray-700">
//                         <div className="flex items-center gap-3">
//                           <img 
//                             src={profile.avatar || '/default-avatar.jpg'} 
//                             alt="User Profile" 
//                             className="w-12 h-12 rounded-full object-cover profile-avatar"
//                           />
//                           <div>
//                             <p className="font-medium text-white">{profile.name}</p>
//                             <p className="text-sm text-gray-400">{profile.email}</p>
//                             <p className="text-xs text-green-400">• Online</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Menu Items */}
//                       <div className="py-2">
//                         <button 
//                           className="dropdown-item w-full text-left px-4 py-2 text-gray-300 hover:text-white flex items-center gap-3"
//                           onClick={() => {
//                             setIsEditModalOpen(true);
//                             closeDropdown();
//                           }}
//                         >
//                           <Edit className="w-5 h-5" />
//                           Edit Profile
//                         </button>
                        
//                         <button className="dropdown-item w-full text-left px-4 py-2 text-gray-300 hover:text-white flex items-center gap-3">
//                           <Settings className="w-5 h-5" />
//                           Settings
//                         </button>

//                         <button className="dropdown-item w-full text-left px-4 py-2 text-gray-300 hover:text-white flex items-center gap-3">
//                           <HelpCircle className="w-5 h-5" />
//                           Help & Support
//                         </button>

//                         <div className="border-t border-gray-700 mt-2 pt-2">
//                           <button className="dropdown-item w-full text-left px-4 py-2 text-red-400 hover:text-red-300 flex items-center gap-3">
//                             <LogOut className="w-5 h-5" />
//                             Sign Out
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
//           </div>

//           {/* Mobile Navigation */}
//           <div className={`mobile-menu md:hidden border-t border-gray-800 bg-black bg-opacity-95 ${isOpen ? 'open' : ''}`}>
//             <div className="flex flex-col py-4">
//               {/* Mobile User Profile */}
//               {profile && (
//                 <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 mb-2">
//                   <img 
//                     src={profile.avatar || '/default-avatar.jpg'} 
//                     alt="User Profile" 
//                     className="w-12 h-12 rounded-full object-cover profile-avatar"
//                   />
//                   <div>
//                     <p className="font-medium text-white">{profile.name}</p>
//                     <p className="text-sm text-gray-400">{profile.email}</p>
//                   </div>
//                 </div>
//               )}

//               <a href="#features" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" onClick={() => setIsOpen(false)}>
//                 Features
//               </a>
//               <a href="#pricing" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" onClick={() => setIsOpen(false)}>
//                 Pricing
//               </a>
//               <a href="#about" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" onClick={() => setIsOpen(false)}>
//                 About
//               </a>
//               <a href="#contact" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2" onClick={() => setIsOpen(false)}>
//                 Contact
//               </a>
              
//               <div className="flex flex-col gap-3 pt-4 border-t border-gray-800 px-4 mt-2">
//                 <Button 
//                   variant="ghost" 
//                   className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2" 
//                   onClick={() => {
//                     setIsEditModalOpen(true);
//                     setIsOpen(false);
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//                 <Button 
//                   variant="ghost" 
//                   className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2" 
//                   onClick={() => { 
//                     setIsOpen(false); 
//                     handleSignIn(); 
//                   }}
//                 >
//                   Sign In
//                 </Button>
//                 <Button 
//                   className="btn-gradient px-4 py-3 text-white font-medium rounded-lg border-0 hover:border-0"
//                   onClick={handleWatchDemo}
//                 >
//                   Watch Demo
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Click outside to close dropdown */}
//       {isDropdownOpen && (
//         <div 
//           className="fixed inset-0 z-40" 
//           onClick={closeDropdown}
//         />
//       )}

//       {/* Edit Profile Modal */}
//       <EditProfileModal 
//         isOpen={isEditModalOpen} 
//         onClose={() => setIsEditModalOpen(false)}
//         profile={profile}
//       />
//     </>
//   );
// };
