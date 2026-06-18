import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    
    // Grab the function to clear our global state
    const { setAuthUser } = useAuthStore();

    const logout = async () => {
        setLoading(true);
        try {
            // 1. Tell the backend to clear the HTTP-only cookie
            await axios.post("/api/auth/logout");

            // 2. Remove the user from local storage
            localStorage.removeItem("chat-user");
            
            // 3. Clear the global Zustand state (this triggers the redirect!)
            setAuthUser(null);

            toast.success("Logged out successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;