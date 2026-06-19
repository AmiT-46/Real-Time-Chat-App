import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }) => {
    // 1. Grab the state and the setter function from our new store
    const { selectedConversation, setSelectedConversation } = useConversation();

    // 2. Check if this specific component is the currently selected user
    const isSelected = selectedConversation?._id === conversation._id;

    const initial = conversation.fullName ? conversation.fullName.charAt(0).toUpperCase() : "?";

    return (
        <div 
            // 3. Add an onClick handler, and dynamically apply the "bg-blue-500" class if selected!
            onClick={() => setSelectedConversation(conversation)}
            className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 cursor-pointer transition-colors border-b border-gray-700 last:border-none ${isSelected ? "bg-blue-500" : ""}`}
        >
            {/* Profile Picture
            <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src={conversation.profilePic} alt='user avatar' />
            </div> */}

            {/* New Initials Avatar */}
            <div className='w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-sm'>
                {initial}
            </div>
            
            {/* User Name */}
            <div className='flex flex-col flex-1'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            </div>
        </div>
    );
};

export default Conversation;