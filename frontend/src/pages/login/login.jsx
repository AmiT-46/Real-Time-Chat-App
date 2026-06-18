import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin"; // 1. Import the hook

const Login = () => {
    // 2. Add state for our two inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // 3. Extract the loading state and login function from our hook
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login to <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form className="mt-6">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10 p-2 rounded-md bg-gray-800 text-white border-gray-600 focus:outline-none focus:border-blue-500'
                            // 4. Bind the username to state
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10 p-2 rounded-md bg-gray-800 text-white border-gray-600 focus:outline-none focus:border-blue-500'
                            // 5. Bind the password to state
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to='/signup' className='text-sm hover:underline hover:text-blue-500 mt-4 inline-block text-gray-400'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        {/* 6. Update the button to use our handleSubmit function and show loading state */}
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className='w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-400'
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;