import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/users");
                setConversations(res.data);
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message;
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []); // The empty array [] means this runs exactly ONCE when the component loads

    return { loading, conversations };
};

export default useGetConversations;