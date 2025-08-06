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
    const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    const payload = jwtDecode<GooglePayload>(credentialResponse.credential);

    // Save to Supabase
    const { error } = await supabase.from('users').upsert([
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
    if (error) {
      alert('Error saving user: ' + error.message);
    } else {
      setUser({
        google_id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      });
      // Navigate to dashboard or home page after successful login
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    googleLogout();
  };

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert('Login Failed')}
          theme="filled_black"
          size="large"
          text="signin_with"
          shape="rectangular"
          width="100%"
          useOneTap={false}
        />
      ) : (
        <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
          <img src={user.picture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}