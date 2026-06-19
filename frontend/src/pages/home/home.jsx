import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
    return (
        // The main chat container background
        <div className='flex h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-600 shadow-xl'>
            
            {/* The Sidebar we just built */}
            <Sidebar />

           {/* 2. Swap out the old div with your new component */}
            <MessageContainer />

        </div>
    );
};

export default Home;