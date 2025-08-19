import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
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
      <DialogContent className="sm:max-w-md bg-white border border-gray-200 rounded-xl shadow-2xl glass-effect z-50">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">Edit Profile</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full"
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-edit-profile">
            {/* Profile Image Display */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Profile Picture</Label>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img 
                    src={profile?.picture || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDNy41ODE3MiAxNCA0IDE3LjU4MTcgNCAyMkgyMEMyMCAxNy41ODE3IDE2LjQxODMgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'} 
                    alt="Profile Preview" 
                    className="w-20 h-20 rounded-full object-cover profile-avatar"
                    data-testid="img-profile-picture"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mt-1">Profile picture from Google account</p>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name
              </Label>
              <Input 
                id="name"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all duration-200" 
                placeholder="Enter your full name"
                required
                data-testid="input-name"
              />
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </Label>
              <Input 
                id="email"
                type="email" 
                value={profile?.email || ''}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" 
                readOnly
                data-testid="input-email"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline"
                className="flex-1 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg font-medium transition-all duration-200"
                onClick={onClose}
                disabled={isUpdating}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 btn-gradient px-6 py-3 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating}
                data-testid="button-submit"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
