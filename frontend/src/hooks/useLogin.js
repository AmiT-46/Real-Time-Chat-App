import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../zustand/useAuthStore";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    
    // Grab the function to update our global state
    const { setAuthUser } = useAuthStore();

    const login = async (username, password) => {
        // 1. Basic validation
        if (!username || !password) {
            toast.error("Please fill in all fields");
            return false;
        }

        setLoading(true);
        try {
            // 2. Make the request to your backend login route
            const res = await axios.post("/api/auth/login", {
                username,
                password,
            });

            const data = res.data;

            // 3. Save to local storage so they stay logged in on refresh
            localStorage.setItem("chat-user", JSON.stringify(data));
            
            // 4. Update the global Zustand state
            setAuthUser(data);

            toast.success("Logged in successfully!");
            return true;

        } catch (error) {
            // Axios automatically catches 400/500 errors (like "Invalid username or password")
            const errorMessage = error.response?.data?.error || error.message;
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;