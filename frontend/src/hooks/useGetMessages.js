import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                // Fetch messages for the currently selected user
                const res = await axios.get(`/api/messages/${selectedConversation._id}`);
                setMessages(res.data);
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message;
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        // Only run the fetch if a conversation is actually selected
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]); // This array tells React to re-run this effect when the ID changes

    return { messages, loading };
};

export default useGetMessages;