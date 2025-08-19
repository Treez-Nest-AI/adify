// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// declare global {
//   interface Window {
//     FB: any;
//     fbAsyncInit: () => void;
//   }
// }

// const FacebookSignIn = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadFacebookSDK();
//   }, []);

//   const loadFacebookSDK = () => {
//     if (document.getElementById('facebook-jssdk') || window.FB) {
//       setSdkLoaded(true);
//       return;
//     }

//     const script = document.createElement('script');
//     script.id = 'facebook-jssdk';
//     script.src = 'https://connect.facebook.net/en_US/sdk.js';
//     script.async = true;
//     script.defer = true;
    
//     script.onload = () => {
//       window.fbAsyncInit = () => {
//         window.FB.init({
//           appId: '2195869457493358',
//           cookie: true,
//           xfbml: true,
//           version: 'v18.0',
//           status: true
//         });
        
//         // Check login status on load
//         window.FB.getLoginStatus((response: any) => {
//           console.log('Facebook login status:', response);
//         });
        
//         setSdkLoaded(true);
//       };
//     };
    
//     script.onerror = () => {
//       setError('Failed to load Facebook SDK');
//     };
    
//     document.body.appendChild(script);
//   };

//   const handleFacebookLogin = () => {
//     if (!sdkLoaded) {
//       setError('Facebook SDK not loaded yet');
//       return;
//     }
    

//     setIsLoading(true);
//     setError(null);
    
//     // First check if user is already logged into Facebook
//     window.FB.getLoginStatus((response: any) => {
//       console.log('Login status response:', response);
      
//       if (response.status === 'connected') {
//         // User is already logged in, get their info
//         getUserInfo(response.authResponse);
//       } else {
//         // User needs to log in
//         window.FB.login((loginResponse: any) => {
//           console.log('Login response:', loginResponse);
          
//           if (loginResponse.authResponse && loginResponse.status === 'connected') {
//             getUserInfo(loginResponse.authResponse);
//           } else if (loginResponse.status === 'not_authorized') {
//             setError('Please authorize the app to continue');
//             setIsLoading(false);
//           } else {
//             setError('Facebook login was cancelled or failed');
//             setIsLoading(false);
//           }
//         }, { 
//           scope: 'public_profile,email',
//           return_scopes: true,
//           auth_type: 'rerequest' // Force permission dialog if user previously declined
//         });
//       }
//     });
//   };

//   const getUserInfo = (authResponse: any) => {
//     console.log('Getting user info with auth response:', authResponse);
    
//     window.FB.api('/me', { 
//       fields: 'id,name,email,picture.type(large),first_name,last_name' 
//     }, (profileResponse: any) => {
//       console.log('Profile response:', profileResponse);
      
//       if (profileResponse && !profileResponse.error) {
//         try {
//           const profile = {
//             google_id: `fb_${profileResponse.id}`,
//             name: profileResponse.name || 'Facebook User',
//             email: profileResponse.email || `fb_user_${profileResponse.id}@facebook.local`,
//             picture: profileResponse.picture?.data?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileResponse.name || 'User')}&background=1877f2&color=fff`,
//             given_name: profileResponse.first_name || '',
//             family_name: profileResponse.last_name || '',
//             last_login: new Date().toISOString(),
//           };

//           // Store user data in localStorage
//           localStorage.setItem('user', JSON.stringify(profile));
//           console.log('Facebook login successful', profile);
          
//           // Show success message
//           alert(`Welcome ${profile.name}! Login successful.`);
          
//           // Navigate to home page
//           navigate('/');
          
//           // Trigger storage event for other components
//           window.dispatchEvent(new StorageEvent('storage', {
//             key: 'user',
//             newValue: JSON.stringify(profile)
//           }));
          
//           // Force page reload to ensure navigation component updates
//           setTimeout(() => {
//             window.location.reload();
//           }, 100);
          
//         } catch (error) {
//           console.error('Error processing Facebook profile:', error);
//           setError('Error processing Facebook profile');
//         }
//       } else {
//         console.error('Profile API error:', profileResponse);
//         setError(`Failed to get user profile: ${profileResponse?.error?.message || 'Unknown error'}`);
//       }
      
//       setIsLoading(false);
//     });
//   };

//   // For development: Show a demo login button
//   const handleDemoLogin = () => {
//     const demoProfile = {
//       google_id: 'fb_demo_12345',
//       name: 'Demo User',
//       email: 'demo@facebook.local',
//       picture: 'https://ui-avatars.com/api/?name=Demo+User&background=1877f2&color=fff',
//       given_name: 'Demo',
//       family_name: 'User',
//       last_login: new Date().toISOString(),
//     };

//     localStorage.setItem('user', JSON.stringify(demoProfile));
//     alert('Demo login successful!');
//     navigate('/');
//     window.dispatchEvent(new StorageEvent('storage', {
//       key: 'user',
//       newValue: JSON.stringify(demoProfile)
//     }));
//   };

//   return (
//     <div className="w-full space-y-2">
//       {/* Main Facebook Login Button */}
//       <button
//         onClick={handleFacebookLogin}
//         disabled={isLoading || !sdkLoaded}
//         className="social-button flex items-center justify-center w-full px-4 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         ) : (
//           <svg className="w-4 h-4 mr-2 text-blue-600" viewBox="0 0 24 24">
//             <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//           </svg>
//         )}
//         {isLoading ? 'Connecting...' : 'Facebook'}
//       </button>

//       {/* Demo Login Button for Testing */}
//       <button
//         onClick={handleDemoLogin}
//         className="w-full px-4 py-2 text-xs text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
//         title="Use this for testing while Facebook app is in development"
//       >
//         Demo Facebook Login (For Testing)
//       </button>
      
//       {/* Error Display */}
//       {error && (
//         <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
//           <div className="text-xs text-red-600 text-center font-medium">
//             Error: {error}
//           </div>
//           <div className="text-xs text-red-500 text-center mt-1">
//             Try the demo login above or contact support
//           </div>
//         </div>
//       )}
      
//       {/* Loading State */}
//       {!sdkLoaded && !error && (
//         <div className="mt-2 text-xs text-gray-500 text-center">
//           Loading Facebook SDK...
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacebookSignIn;

import React, { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

const FacebookLoginButton: React.FC = () => {
  useEffect(() => {
    // Load Facebook SDK dynamically
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1833679560883193", // Replace with your real App ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // ✅ Correct version
      });
    };
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          console.log("Login successful!", response);
          window.FB.api(
            "/me",
            { fields: "id,name,email,picture" },
            (userInfo: any) => {
              console.log("User Info:", userInfo);
            }
          );
        } else {
          console.log("User cancelled login or did not authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button
      onClick={handleFBLogin}
      style={{
        padding: "10px 20px",
        backgroundColor: "#1877F2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;