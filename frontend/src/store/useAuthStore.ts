import { axiosInstance } from './../lib/axios';
import { create } from "zustand";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

   
    checkAuth: async () => {      
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data.user, isCheckingAuth: false });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({ authUser: null, isCheckingAuth: false });
        }
    },
}));