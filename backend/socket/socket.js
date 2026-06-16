const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

// We need to create an HTTP server manually so that both Express and Socket.IO can share it
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // This is the default port for React/Vite frontend
        methods: ["GET", "POST"]
    }
});

// We use this object to keep track of which user is using which socket
// Format: { userId: socketId }
const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // When the frontend connects, it will send the logged-in user's ID
    const userId = socket.handshake.query.userId;
    
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() sends a message to ALL connected clients
    // We send the array of online user IDs so the frontend can show green "online" dots
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for when a user closes the app/tab
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update the online list
    });
});

module.exports = { app, io, server, getReceiverSocketId };