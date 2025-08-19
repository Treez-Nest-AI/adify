


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, User, Settings, HelpCircle, LogOut, Edit } from "lucide-react";
import { useLocation } from "wouter";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logoo.png"
import { useProfile } from "@/hooks/useprofile";
import { EditProfileModal } from "./EditProfileModal";

export const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isLoading, signOut } = useProfile();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleWatchDemo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeDropdown();
    navigate('/');
  };

  if (user) {
    console.log('Profile image URL:', user.picture);
  }

  // Helper to get initial
  const getInitial = (name: string | undefined) => {
    if (!name || name.length === 0) return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-26 h-24 flex items-center justify-center">
                <img
                  src={logo}
                  alt="TEadifyz.AI Logo"
                  className="w-26 h-20 object-contain"
                />
              </div>
              <span className="text-xl text-black brand-font group-hover:scale-105 transition-all duration-300">
                TEadifyz.AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
            <Link
                to="/"
                className="nav-link text-black hover:text-blue-900 transition-colors duration-300 py-2"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="nav-link text-black hover:text-blue-900 transition-colors duration-300 py-2"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="nav-link text-black hover:text-blue-900 transition-colors duration-300 py-2"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="nav-link text-black hover:text-blue-900 transition-colors duration-300 py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="nav-link text-black hover:text-blue-900 transition-colors duration-300 py-2"
              >
                Contact
              </Link>
            </div>

            {/* Desktop CTA and Profile */}
            <div className="hidden md:flex items-center gap-4">
              {!isLoading && !user ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-black hover:text-blue-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="btn-gradient px-6 py-2 text-white font-medium rounded-lg border-0 hover:border-0"
                    onClick={handleWatchDemo}
                  >
                    Watch Demo
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="btn-gradient px-6 py-2 text-white font-medium rounded-lg border-0 hover:border-0"
                    onClick={handleWatchDemo}
                  >
                    Watch Demo
                  </Button>

                  {/* User Profile Dropdown */}
                  {user && (
                    <div className="relative ml-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {/* Profile Image */}
                        <div className="relative">
                          <img
                            src={user.picture?.trim()}
                            alt="User Profile"
                            onError={e => {
                              // Replace image with initial if it fails to load
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div style='width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#6B7280;color:white;font-weight:bold;font-size:1.5rem;border-radius:9999px;'>${getInitial(user.name)}</div>`;
                              }
                            }}
                            className="w-10 h-10 rounded-full object-cover profile-avatar transition-all duration-300 border-2 border-transparent group-hover:border-purple-400"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>

                        {/* User Info */}
                        <div className="hidden lg:flex flex-col">
                          <span className="text-sm font-medium text-black">{user.name}</span>
                          <span className="text-xs text-gray-600">{user.email}</span>
                        </div>

                        {/* Dropdown Arrow */}
                        <svg
                          className={`w-4 h-4 text-gray-600 group-hover:text-black transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 animate-slide-down z-50">
                          {/* User Info Header */}
                          <div className="px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.picture?.trim()}
                                alt="User Profile"
                                onError={e => {
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `<div style='width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#6B7280;color:white;font-weight:bold;font-size:2rem;border-radius:9999px;'>${getInitial(user.name)}</div>`;
                                  }
                                }}
                                className="w-12 h-12 rounded-full object-cover profile-avatar"
                              />
                              <div>
                                <p className="font-medium text-black">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-xs text-green-500">• Online</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            <button
                              className="dropdown-item w-full text-left px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => {
                                setIsEditModalOpen(true);
                                closeDropdown();
                              }}
                            >
                              <Edit className="w-5 h-5" />
                              Edit Profile
                            </button>

                            <button className="dropdown-item w-full text-left px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3">
                              <Settings className="w-5 h-5" />
                              Settings
                            </button>

                            <button className="dropdown-item w-full text-left px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3">
                              <HelpCircle className="w-5 h-5" />
                              Help & Support
                            </button>

                            <div className="border-t border-gray-200 mt-2 pt-2">
                              <button
                                className="dropdown-item w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-3"
                                onClick={handleSignOut}
                              >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-700 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-menu md:hidden border-t border-gray-200 bg-white ${isOpen ? 'open' : ''}`}>
            <div className="flex flex-col py-4">
              {/* Mobile User Profile */}
              {user && (
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 mb-2">
                  <img
                    src={user.picture?.trim()}
                    alt="User Profile"
                    onError={e => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div style='width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#6B7280;color:white;font-weight:bold;font-size:2rem;border-radius:9999px;'>${getInitial(user.name)}</div>`;
                      }
                    }}
                    className="w-12 h-12 rounded-full object-cover profile-avatar"
                  />
                  <div>
                    <p className="font-medium text-black">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              )}

              <Link
                to="/features"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg mx-2 my-1 transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 px-4 mt-2">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-lg text-left justify-start transform hover:translate-x-2"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignIn();
                    }}
                  >
                    Sign In
                  </Button>
                )}
                <Button
                  className="btn-gradient px-4 py-3 text-white font-medium rounded-lg border-0 hover:border-0"
                  onClick={handleWatchDemo}
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        />
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={user}
      />
    </>
  );
};
