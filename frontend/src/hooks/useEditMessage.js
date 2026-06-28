import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useEditMessage = () => {
    const [loading, setLoading] = useState(false);
    const { updateMessage } = useConversation();

    const editMessage = async (messageId, newText) => {
        setLoading(true);
        try {
            const res = await axios.put(`/api/messages/${messageId}`, { newText });
            
            updateMessage(res.data);
            toast.success("Message updated");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to edit message");
        } finally {
            setLoading(false);
        }
    };

    return { editMessage, loading };
};

export default useEditMessage;