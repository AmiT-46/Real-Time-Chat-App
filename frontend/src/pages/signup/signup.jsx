import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup"; // 1. Import your custom hook!

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    // 2. Extract the loading state and signup function from our hook
    const { loading, signup } = useSignup(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // 3. Pass our state object to the backend hook
        await signup(inputs); 
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up for <span className='text-blue-500'>ChatApp</span>
                </h1>

                {/* 4. Removed onSubmit from the form tag to prevent 'Enter' key submission */}
                <form className="mt-6">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered h-10 p-2 rounded-md bg-gray-800 text-white border-gray-600 focus:outline-none focus:border-blue-500'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div className="mt-4">
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10 p-2 rounded-md bg-gray-800 text-white border-gray-600 focus:outline-none focus:border-blue-500'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div className="mt-4">
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10 p-2 rounded-md bg-gray-800 text-white border-gray-600 focus:outline-none focus:border-blue-500'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-500 mt-4 inline-block text-gray-400'>
                        Already have an account?
                    </Link>

                    <div>
                        {/* 5. Added type="button", onClick={handleSubmit}, and disabled={loading} */}
                        <button 
                            type="button" 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className='w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-400'
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;