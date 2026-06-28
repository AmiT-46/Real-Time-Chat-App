import { useAuthStore } from "../../zustand/useAuthStore";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    // Bring in the logged-in user and the selected user
    const { authUser } = useAuthStore();
    const { selectedConversation } = useConversation();

    // Check if the logged-in user sent this message
    const fromMe = message.senderId === authUser._id;
    
    // Dynamic Tailwind classes based on who sent it
    const alignmentClass = fromMe ? 'flex justify-end' : 'flex justify-start';
    const bubbleBgColor = fromMe ? 'bubble-sent' : 'bubble-received';
    // const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    
    // Extract the correct initial based on who sent the message
    const nameToUse = fromMe ? authUser.fullName : selectedConversation?.fullName;
    const initial = nameToUse ? nameToUse.charAt(0).toUpperCase() : "?";

    return (
        <div className={`flex ${alignmentClass} mb-4`}>
            {/* Left Profile Picture (Only show if someone else sent it) */}
            {/* {!fromMe && (
                <div className='w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0'>
                    <img src={profilePic} alt='user avatar' />
                </div>
            )} */}

            {/* Left Avatar (Only show if someone else sent it) */}
            {!fromMe && (
                <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold flex-shrink-0 mr-2 shadow-sm'>
                    {initial}
                </div>
            )}

            
            {/* The Chat Bubble */}
            <div className={`text-white px-4 py-2 rounded-lg max-w-[70%] break-words ${bubbleBgColor}`}>
                {message.message}
            </div>

            {/* Right Profile Picture (Only show if YOU sent it) */}
            {/* {fromMe && (
                <div className='w-10 h-10 rounded-full overflow-hidden ml-2 flex-shrink-0'>
                    <img src={profilePic} alt='user avatar' />
                </div>
            )} */}

            {/* Right Avatar (Only show if YOU sent it) */}
            {fromMe && (
                <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0 ml-2 shadow-sm'>
                    {initial}
                </div>
            )}

        </div>
    );
};

export default Message;