import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        // If there's no active socket connection, do nothing
        if (!socket) return;

        // Listen for the "newMessage" event sent by the backend
        socket.on("newMessage", (newMessage) => {
            // Append the brand new message to the existing messages array
            setMessages([...messages, newMessage]);
        });

        // Cleanup function: Stop listening when the component unmounts to prevent multiple listeners
        return () => socket.off("newMessage");
    }, [socket, setMessages, messages]);
};

export default useListenMessages;