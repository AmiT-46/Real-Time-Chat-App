import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    
    // Grab the currently selected user and the messages array from our global store
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        // Prevent sending empty messages
        if (!message.trim()) return;

        setLoading(true);
        try {
            // Make the POST request to the backend route we built earlier
            // We dynamically insert the receiver's ID into the URL
            const res = await axios.post(`/api/messages/send/${selectedConversation._id}`, {
                message,
            });

            // Add the brand new message to the end of our existing messages array
            setMessages([...messages, res.data]);
            
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;