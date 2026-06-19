import { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    
    // 1. Create a reference to the textarea so we can dynamically adjust its height
    const textareaRef = useRef(null);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); 
        
        // Don't send empty messages or just pure newlines
        if (!message.trim()) return;

        await sendMessage(message);
        setMessage("");

        // 2. Reset the textarea height back to a single line after sending
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    // 3. Auto-Expand Logic
    const handleChange = (e) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            // Reset height briefly to recalculate, then set to the actual scroll height
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // 4. Handle "Enter" vs "Shift + Enter"
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents the textarea from adding a newline
            handleSubmit();     // Sends the message instead
        }
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative flex items-end'>
                
                {/* We swapped <input> for <textarea> */}
                <textarea
                    ref={textareaRef}
                    className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto max-h-32 no-scrollbar'
                    placeholder='Send a message...'
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={1} // Start at 1 line tall
                />
                
                {/* Adjusted the button positioning to stick to the bottom right */}
                <button 
                    type='submit' 
                    disabled={loading}
                    className='absolute bottom-0 right-0 flex items-center pr-3 pb-3 text-gray-300 hover:text-white transition-colors disabled:opacity-50'
                >
                    {loading ? <span className="text-sm">...</span> : <BsSend />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;