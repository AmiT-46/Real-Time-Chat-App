import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // 1. Import Axios
import { useAuthStore } from "../zustand/useAuthStore"; // 2. Import your Zustand store

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    
    // 3. Grab the setAuthUser function from your global store
    const { setAuthUser } = useAuthStore(); 

    const signup = async ({ fullName, username, password, confirmPassword }) => {
        // Validation remains the same
        if (!fullName || !username || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        setLoading(true);
        try {
            // 4. The much cleaner Axios request!
            const res = await axios.post("/api/auth/signup", {
                fullName,
                username,
                password,
                confirmPassword,
            });

            // 5. Axios automatically parses JSON into res.data
            const data = res.data;

            // 6. Save the user to local storage so they stay logged in on refresh
            localStorage.setItem("chat-user", JSON.stringify(data));
            
            // 7. Update the global Zustand state
            setAuthUser(data);

            toast.success("Account created successfully!");
            return true;

        } catch (error) {
            // 8. Axios automatically catches 400/500 errors. 
            // We safely extract the error message your backend sent.
            const errorMessage = error.response?.data?.error || error.message;
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;