import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
    return (
        // Changed to h-full w-full, removed rounded corners and hardcoded heights
        <div className='flex h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;