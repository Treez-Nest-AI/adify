import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export type UserProfile = {
  google_id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
  last_login?: string;
};

export function useProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage on component mount
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error reading user from localStorage:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
      setIsLoading(false);
    };

    checkUserSession();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            const userData = JSON.parse(e.newValue);
            setUser(userData);
          } catch (error) {
            console.error('Error parsing user data:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const signOut = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return { user, isLoading, signOut };
}

export function useUpdateProfile() {
  const updateProfile = async (updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('google_id', updates.google_id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  return { updateProfile };
}
