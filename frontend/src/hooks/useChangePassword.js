import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const changePassword = async (currentPassword, newPassword, confirmNewPassword) => {
        // Frontend Validation
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error("Please fill in all password fields");
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match");
            return false;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        setLoading(true);
        try {
            await axios.put("/api/users/change-password", { currentPassword, newPassword });
            toast.success("Password changed successfully!");
            return true; // Return true so we can clear the input boxes
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to change password");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading };
};

export default useChangePassword;