const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

const { getReceiverSocketId, io } = require('../socket/socket');

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // This comes from our protectRoute middleware!

        // 1. Find if a conversation already exists between these two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // 2. If it's their very first message, create a new conversation
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // 3. Create the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // 4. Add the message to the conversation array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // 5. Save both to the database simultaneously (Promise.all is faster than awaiting them one by one)
        await Promise.all([conversation.save(), newMessage.save()]);

        // TODO: SOCKET.IO FUNCTIONALITY WILL GO HERE LATER -> Done
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() is used to send events to a SPECIFIC client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation and automatically replace the message IDs with the actual message objects
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); // <-- Mongoose magic happening here!

        if (!conversation) {
            return res.status(200).json([]); // Return empty array if they haven't chatted yet
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const clearMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        });

        if (!conversation) {
            return res.status(200).json({ message: "Chat is already empty" });
        }

        // Delete all actual message documents that belong to this conversation
        await Message.deleteMany({ _id: { $in: conversation.messages } });

        // Empty the messages array in the conversation document
        conversation.messages = [];
        await conversation.save();

        res.status(200).json({ message: "Chat cleared successfully" });
    } catch (error) {
        console.log("Error in clearMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// --- Delete Individual Message ---
const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const senderId = req.user._id;

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: "Message not found" });

        // Security: Only the person who sent the message can delete it
        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete this message" });
        }

        // "Soft Delete": Change the text just like WhatsApp
        message.message = "🚫 This message was deleted";
        await message.save();

        // Socket.IO: Tell the receiver the message was deleted instantly
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageUpdated", message);
        }

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in deleteMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// --- Edit Individual Message ---
const editMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const senderId = req.user._id;
        const { newText } = req.body; // The updated text sent from React

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: "Message not found" });

        // Security: Only the person who sent the message can edit it
        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(401).json({ error: "Unauthorized to edit this message" });
        }

        message.message = newText;
        await message.save();

        // Socket.IO: Tell the receiver the message was edited instantly
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageUpdated", message);
        }

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in editMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessages, clearMessages, deleteMessage, editMessage };