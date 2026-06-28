import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../zustand/useAuthStore";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const updateProfile = async (fullName, username) => {
        setLoading(true);
        try {
            const res = await axios.put("/api/users/profile", { fullName, username });
            setAuthUser(res.data); // Update the global state with the new name
            
            // Update local storage so it persists on refresh
            localStorage.setItem("chat-user", JSON.stringify(res.data)); 
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading };
};
export default useUpdateProfile;