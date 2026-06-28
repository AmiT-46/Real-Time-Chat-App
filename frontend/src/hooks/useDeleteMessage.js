import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);
    const { updateMessage } = useConversation();

    const deleteMessage = async (messageId) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/api/messages/${messageId}`);
            
            // Instantly update the UI using the Zustand function we created in Step 2
            updateMessage(res.data); 
            toast.success("Message deleted");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to delete message");
        } finally {
            setLoading(false);
        }
    };

    return { deleteMessage, loading };
};

export default useDeleteMessage;