// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { X, Upload, User } from "lucide-react";
// import { useUpdateProfile, useUploadAvatar } from "@/hooks/use-profile";
// import { useToast } from "@/hooks/use-toast";
// import type { Profile } from "@shared/schema";

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   profile?: Profile;
// }

// export function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
//   const [name, setName] = useState(profile?.name || '');
//   const [dragOver, setDragOver] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(profile?.avatar || '');
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const updateProfileMutation = useUpdateProfile();
//   const uploadAvatarMutation = useUploadAvatar();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!name.trim()) {
//       toast({
//         title: "Error",
//         description: "Name is required",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await updateProfileMutation.mutateAsync({
//         name: name.trim(),
//         avatar: previewUrl,
//       });
      
//       toast({
//         title: "Success",
//         description: "Profile updated successfully!",
//       });
      
//       onClose();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update profile",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleFileSelect = (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       toast({
//         title: "Error",
//         description: "Please select an image file",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast({
//         title: "Error",
//         description: "File size must be less than 2MB",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Create preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewUrl(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);

//     // Upload file
//     uploadAvatarMutation.mutate(file, {
//       onSuccess: (data) => {
//         setPreviewUrl(data.avatarUrl);
//         toast({
//           title: "Success",
//           description: "Avatar uploaded successfully!",
//         });
//       },
//       onError: () => {
//         toast({
//           title: "Error",
//           description: "Failed to upload avatar",
//           variant: "destructive",
//         });
//       }
//     });
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragOver(false);
    
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setDragOver(false);
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md glass-effect border-gray-700">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-white">Edit Profile</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Profile Image Upload */}
//           <div>
//             <Label className="text-sm font-medium text-gray-300 mb-3 block">Profile Picture</Label>
//             <div className="flex items-center gap-4 mb-4">
//               <div className="relative">
//                 <img 
//                   src={previewUrl || '/default-avatar.jpg'} 
//                   alt="Profile Preview" 
//                   className="w-20 h-20 rounded-full object-cover profile-avatar"
//                 />
//                 {uploadAvatarMutation.isPending && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//                     <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <Button 
//                   type="button"
//                   className="btn-gradient px-4 py-2 text-sm text-white font-medium rounded-lg"
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={uploadAvatarMutation.isPending}
//                 >
//                   Change Photo
//                 </Button>
//                 <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB</p>
//               </div>
//             </div>
            
//             {/* File upload area */}
//             <div 
//               className={`file-upload-area rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
//                 dragOver ? 'drag-over' : ''
//               }`}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
//               <p className="text-gray-300 font-medium">
//                 Drop your image here, or <span className="text-purple-400 cursor-pointer">browse</span>
//               </p>
//               <p className="text-gray-500 text-sm">Support JPG, PNG, GIF</p>
//             </div>
            
//             <input 
//               ref={fileInputRef}
//               type="file" 
//               accept="image/*" 
//               className="hidden" 
//               onChange={handleFileInputChange}
//             />
//           </div>

//           {/* Name Field */}
//           <div>
//             <Label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
//               Full Name
//             </Label>
//             <Input 
//               id="name"
//               type="text" 
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500" 
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           {/* Email Field (Read-only) */}
//           <div>
//             <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
//               Email Address
//             </Label>
//             <Input 
//               id="email"
//               type="email" 
//               value={profile?.email || ''}
//               className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed" 
//               readOnly
//             />
//             <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4">
//             <Button 
//               type="button" 
//               variant="outline"
//               className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
//               onClick={onClose}
//               disabled={updateProfileMutation.isPending}
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="submit" 
//               className="flex-1 btn-gradient px-6 py-3 text-white font-medium rounded-lg"
//               disabled={updateProfileMutation.isPending}
//             >
//               {updateProfileMutation.isPending ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 'Save Changes'
//               )}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
