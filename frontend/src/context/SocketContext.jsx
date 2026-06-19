import { createContext, useState, useEffect, useContext } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { authUser } = useAuthStore();

    useEffect(() => {
        // Only connect to Socket.IO if a user is logged in
        if (authUser) {
            const newSocket = io("http://localhost:3000", {
                query: {
                    userId: authUser._id, // Pass the logged-in user's ID to the backend
                },
            });

            setSocket(newSocket);

            // Cleanup function: Close the socket connection when the component unmounts or user logs out
            return () => newSocket.close();
        } else {
            // If there is no logged-in user, ensure the socket is closed
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};