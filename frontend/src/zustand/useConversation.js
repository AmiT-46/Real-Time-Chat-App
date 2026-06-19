import { create } from "zustand";

const useConversation = create((set) => ({
    // Keeps track of the user we clicked on in the sidebar
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    // Keeps track of the chat history for the selected user
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;