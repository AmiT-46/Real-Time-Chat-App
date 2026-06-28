import { useState } from "react"; // 1. Import useState
import useGetConversations from "../../hooks/useGetConversations";
import useLogout from "../../hooks/useLogout";
import Conversation from "./Conversation";

const Sidebar = () => {
    const { loading, conversations } = useGetConversations();
    const { logout } = useLogout();

    // 2. Create state to hold the search query
    const [search, setSearch] = useState("");

    // 3. Filter the conversations based on the search query
    // We convert both to lowercase so the search is case-insensitive
    const filteredConversations = conversations.filter((c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='w-80 p-4 flex flex-col h-full theme-sidebar'>
            
            {/* Search Bar */}
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // 4. Bind the input value to our state
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className='divider px-3 my-2 bg-gray-700 h-[1px]'></div>

            {/* User List */}
            <div className='flex-1 overflow-auto no-scrollbar'>
                
                {/* 5. Map over filteredConversations instead of the raw conversations array */}
                {filteredConversations.map((conversation) => (
                    <Conversation 
                        key={conversation._id} 
                        conversation={conversation} 
                    />
                ))}

                {/* Optional UI Polish: Show a message if the search finds nobody */}
                {filteredConversations.length === 0 && search.length > 0 && (
                    <div className="text-center text-gray-400 mt-4 text-sm">
                        No user found matching "{search}"
                    </div>
                )}
                
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