// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";
// import type { Profile, UpdateProfile } from "@shared/schema";

// export function useProfile() {
//   return useQuery<Profile>({
//     queryKey: ["/api/profile"],
//   });
// }

// export function useUpdateProfile() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (data: UpdateProfile) => {
//       const res = await apiRequest("PATCH", "/api/profile", data);
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
//     },
//   });
// }

// export function useUploadAvatar() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (file: File) => {
//       const formData = new FormData();
//       formData.append('avatar', file);
      
//       const res = await fetch("/api/profile/avatar", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
      
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`${res.status}: ${text}`);
//       }
      
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
//     },
//   });
// }
