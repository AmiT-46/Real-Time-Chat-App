import { Navigate, Route, Routes } from "react-router-dom"; // 1. Import Navigate
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthStore } from "./zustand/useAuthStore"; // 2. Import your global state

function App() {
  // 3. Grab the current user from our global Zustand store
  const { authUser } = useAuthStore();

  return (
    <div className='h-screen w-screen flex text-gray-200'>
      <Routes>
        {/* If there is an authUser, show Home. If NOT, bounce them to /login */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        
        {/* If there is an authUser, bounce them to Home. If NOT, show Login */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        
        {/* If there is an authUser, bounce them to Home. If NOT, show SignUp */}
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      
      <Toaster /> 
    </div>
  );
}

export default App;