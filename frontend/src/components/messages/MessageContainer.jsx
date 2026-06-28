import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti"; 
import { MdDeleteOutline } from "react-icons/md";
import useClearChat from "../../hooks/useClearChat";
import { useState } from "react";

const MessageContainer = () => {

    const { selectedConversation, messages } = useConversation();
    const { clearChat, loading } = useClearChat();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isChatEmpty = !messages || messages.length === 0;

    const handleConfirmDelete = async () => {
        await clearChat();
        setIsModalOpen(false);
    };

    return (
        // Replaced hardcoded widths with `flex-1`
        <div className='flex-1 flex flex-col h-full theme-chat-area'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='px-6 py-4 mb-2 flex justify-between items-center theme-header'>
                        <div>
                            <span className='label-text text-gray-400'>To:</span>
                            <span className='text-white font-bold text-lg ml-2'>{selectedConversation.fullName}</span>
                        </div>
                        
                        {/* Clear Chat Button */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            disabled={isChatEmpty || loading} // Disable if empty or loading
                            className={`p-2 rounded-full transition-colors duration-200 
                                ${isChatEmpty 
                                    ? "text-gray-600 cursor-not-allowed" 
                                    : "text-gray-400 hover:text-red-500 hover:bg-gray-700"
                                }`}
                            title={isChatEmpty ? "Chat is already empty" : "Clear Chat"}
                        >
                            <MdDeleteOutline size={24} />
                        </button>
                    </div>

                    <Messages />
                    <MessageInput />

                    {/* 5. Our Custom Tailwind Modal Overlay */}
                    {isModalOpen && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                            {/* Modal Box */}
                            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 border border-gray-700 transform transition-all">
                                <h3 className="text-xl font-bold text-white mb-2">Clear Chat?</h3>
                                <p className="text-gray-300 mb-6 text-sm">
                                    Are you sure you want to delete your conversation with <span className="font-semibold text-white">{selectedConversation.fullName}</span>? This cannot be undone.
                                </p>
                                
                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={loading}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        disabled={loading}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center disabled:opacity-50"
                                    >
                                        {loading ? "Deleting..." : "Yes, Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// A simple sub-component to show when no user is clicked
const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋</p>
                <p>Select a chat from the sidebar to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center text-blue-500 mt-4' />
            </div>
        </div>
    );
};

export default MessageContainer;