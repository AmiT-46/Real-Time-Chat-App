import { create } from "zustand";

export const useAuthStore = create((set) => ({
    // 1. Initialize the state by checking if a user is already saved in local storage
    authUser: JSON.parse(localStorage.getItem("chat-user")) || null,

    // 2. Create a function to update this state
    setAuthUser: (user) => set({ authUser: user }),
}));