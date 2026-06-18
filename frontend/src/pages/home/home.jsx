import useLogout from "../../hooks/useLogout"; // 1. Import your new hook

const Home = () => {
    // 2. Extract the logout function and loading state
    const { loading, logout } = useLogout();

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 text-center'>
                <h1 className='text-3xl font-semibold text-gray-300 mb-6'>
                    Welcome to the <span className='text-blue-500'>Home Page!</span>
                </h1>
                
                {/* 3. Attach the hook to a temporary button */}
                <button 
                    onClick={logout} 
                    disabled={loading}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>
            </div>
        </div>
    );
};

export default Home;