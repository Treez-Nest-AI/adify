import { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

type GooglePayload = {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
};

type UserProfile = {
  google_id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
};

export default function GoogleSignIn() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    
    setIsLoading(true);
    try {
      const payload = jwtDecode<GooglePayload>(credentialResponse.credential);

      // Save user profile to our users table directly
      const { error: profileError } = await supabase.from('users').upsert([
        {
          google_id: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          given_name: payload.given_name,
          family_name: payload.family_name,
          last_login: new Date().toISOString(),
        },
      ], { onConflict: 'google_id' });

      if (profileError) {
        console.error('Profile save error:', profileError);
        alert('Failed to save user profile. Please try again.');
        return;
      }

      // Set user state locally
      setUser({
        google_id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      });

      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify({
        google_id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      }));

      // Navigate to dashboard or home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('user');
      setUser(null);
      googleLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <div className="w-full max-w-md">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              alert('Login Failed');
              setIsLoading(false);
            }}
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="100%"
            useOneTap={false}
          />
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Signing you in...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
          <img src={user.picture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}