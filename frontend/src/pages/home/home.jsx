import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
    return (
        // The main chat container background
        <div className='flex h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-600 shadow-xl'>
            
            {/* The Sidebar we just built */}
            <Sidebar />

            {/* Temporary placeholder for the Message box we will build next */}
            <div className="flex flex-col items-center justify-center w-[400px] md:w-[500px] h-full text-gray-300 bg-gray-900 bg-opacity-40">
                <p className="text-xl font-bold">Select a chat to start messaging</p>
            </div>

        </div>
    );
};

export default Home;