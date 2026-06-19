import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti"; 

const MessageContainer = () => {
    // Grab the currently selected user from our global state
    const { selectedConversation } = useConversation();

    return (
        <div className='w-[400px] md:min-w-[500px] flex flex-col h-full bg-gray-900 bg-opacity-40'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header showing who we are messaging */}
                    <div className='bg-slate-700 px-4 py-2 mb-2 flex items-center gap-2'>
                        <span className='label-text text-gray-300'>To:</span>
                        <span className='text-white font-bold'>{selectedConversation.fullName}</span>
                    </div>

                    {/* Messages List (Placeholder for now) */}
                    {/* 2. Swap the old placeholder div with your new <Messages /> component! */}
                    <Messages />

                    {/* The Input Box we just built */}
                    <MessageInput />
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