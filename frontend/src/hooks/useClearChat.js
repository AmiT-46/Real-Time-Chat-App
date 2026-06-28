import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useClearChat = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, setMessages } = useConversation();

    const clearChat = async () => {
        if (!selectedConversation) return;

        setLoading(true);
        try {
            await axios.delete(`/api/messages/clear/${selectedConversation._id}`);
            
            setMessages([]); 
            toast.success("Chat cleared successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to clear chat");
        } finally {
            setLoading(false);
        }
    };

    return { clearChat, loading };
};

export default useClearChat;