import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages"; // 1. Import the hook
import { useEffect, useRef } from "react"; // 2.1. Import the new hooks

const Messages = () => {
    const { messages, loading } = useGetMessages();

    // 2. Call the hook right here so it listens actively while the chat is open!
    useListenMessages();

    // 2.2. Create the reference for our invisible anchor
    const bottomRef = useRef();

    // 2.3 Scroll to the anchor whenever the messages array changes
    useEffect(() => {
        // We still use a small timeout to ensure the DOM is fully painted first
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    // SAFEGUARD: Ensure messages is an array before we try to use .length or .map()
    const validMessages = Array.isArray(messages) ? messages : [];

    return (
        <div className='px-4 flex-1 overflow-auto no-scrollbar'>
            {/* Use validMessages instead of messages here */}
            {!loading && validMessages.length > 0 && validMessages.map((message) => (
                <Message key={message._id} message={message} />
            ))}

            {!loading && validMessages.length === 0 && (
                <p className='text-center text-gray-400 mt-20'>Send a message to start the conversation!</p>
            )}

            {loading && (
                <p className='text-center text-gray-400 mt-20'>Loading messages...</p>
            )}

            {/* 4. THE FIX: Add an invisible empty div at the very bottom and attach the ref here! */}
            <div ref={bottomRef} />
        </div>
    );
};

export default Messages;