const Conversation = ({ conversation }) => {
    return (
        <div className='flex gap-2 items-center hover:bg-blue-500 rounded p-2 cursor-pointer transition-colors border-b border-gray-700 last:border-none'>
            {/* Profile Picture */}
            <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src={conversation.profilePic} alt='user avatar' />
            </div>
            
            {/* User Name */}
            <div className='flex flex-col flex-1'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            </div>
        </div>
    );
};

export default Conversation;