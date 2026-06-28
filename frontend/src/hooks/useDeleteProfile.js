import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../zustand/useAuthStore";

const useDeleteProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const deleteProfile = async () => {
        setLoading(true);
        try {
            await axios.delete("/api/users/profile");
            
            // Wipe everything from the frontend
            localStorage.removeItem("chat-user");
            setAuthUser(null); 
            toast.success("Account deleted forever");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to delete account");
        } finally {
            setLoading(false);
        }
    };

    return { deleteProfile, loading };
};
export default useDeleteProfile;