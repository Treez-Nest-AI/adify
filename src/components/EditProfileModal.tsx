import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Upload, User } from "lucide-react";
import { useUpdateProfile, UserProfile } from "@/hooks/useprofile";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile;
}

export function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const [name, setName] = useState(profile?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateProfile } = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !profile) {
      return;
    }

    setIsUpdating(true);
    try {
      // Update profile in database
      await updateProfile({
        google_id: profile.google_id,
        name: name.trim(),
      });
      
      // Update localStorage with new name
      const updatedUser = {
        ...profile,
        name: name.trim(),
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Close modal on success
      onClose();
      
      // Force page reload to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-effect border-gray-700 bg-green-600 z-50 ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Display */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-3 block">Profile Picture</Label>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={profile?.picture || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDNy41ODE3MiAxNCA0IDE3LjU4MTcgNCAyMkgyMEMyMCAxNy41ODE3IDE2LjQxODMgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'} 
                  alt="Profile Preview" 
                  className="w-20 h-20 rounded-full object-cover profile-avatar"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mt-1">Profile picture from Google account</p>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
              Full Name
            </Label>
            <Input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500" 
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field (Read-only) */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
              Email Address
            </Label>
            <Input 
              id="email"
              type="email" 
              value={profile?.email || ''}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed" 
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 btn-gradient px-6 py-3 text-white font-medium rounded-lg"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
