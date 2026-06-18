import useGetConversations from "../../hooks/useGetConversations";
import useLogout from "../../hooks/useLogout";
import Conversation from "./Conversation";

const Sidebar = () => {
    // Bring in our hooks
    const { loading, conversations } = useGetConversations();
    const { logout } = useLogout();

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col w-64 md:w-80 h-full'>
            
            {/* Temporary Search Bar */}
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full p-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
            
            <div className='divider px-3 mb-4 border-b border-gray-600'></div>

            {/* User List */}
            <div className='flex-1 overflow-auto'>
                {conversations.map((conversation) => (
                    <Conversation 
                        key={conversation._id} 
                        conversation={conversation} 
                    />
                ))}
                
                {/* Show a loading spinner text if fetching takes a second */}
                {loading ? <span className='text-gray-400 mx-auto mt-4 block text-center'>Loading users...</span> : null}
            </div>

            {/* Logout Button */}
            <div className='mt-auto pt-4'>
                <button 
                    onClick={logout} 
                    className="text-red-500 hover:text-red-700 font-bold transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;