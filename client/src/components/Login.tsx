import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../helpers/token";

export default function Login({isAuth, setIsAuth}: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChangeUsername = (event: any) => {
      setUsername(event.target.value);
    }
  
    const handleChangePassword = (event: any) => {
      setPassword(event.target.value);
    }
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
  
      const data = 
      {
        username: username,
        password: password
      }
  
      axios.post('http://localhost:1234/users/signin', data)
        .then((response) => {
            setMessage('');
            if(response.status === 200) {
              setToken(response.data.token);
              setIsAuth(true);
              navigate("/");
            }
        })
  
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
            setMessage(error.response.data.message);
        })
    }

    useEffect(() => {}, [isAuth]);

    return (
    <div className="bg-white min-h-view flex items-center justify-center">
      <div className="max-w-screen-xl mt-20 justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 pb-4 mx-auto rounded-xl">
          <div className="w-96 mb-5 text-center text-[#027000] text-6xl font-normal font-['Barlow'] tracking-widest">
            Login
          </div>

          <div className="animate-in fade-in zoom-in duration-300 delay-150 w-96 h-10 text-center text-black text-xl font-normal font-['Barlow'] tracking-wide">
            Welcome back, Pal!
          </div>

          <div className="mb-4">
            <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
              Username:
            </div>

            <input
              onChange={handleChangeUsername}
              type="text"
              placeholder="Username"
              className="name-input w-96 bg-neutral-100 rounded-3xl mb-3"
            />

            <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
              Password:
            </div>
            <input
              onChange={handleChangePassword}
              type="password"
              placeholder="Password"
              className="password-input w-96 bg-neutral-100 rounded-3xl"
            />

            <div className="w-96 mt-2 text-teal-600 text-md font-semibold font-['Open Sans'] underline tracking-wide">
              Forgot password?
            </div>

            {message && (
              <div className="flex justify-start">
                <p className="text-red-500 text-sm mt-3">{message}</p>
              </div>
            )}
          </div>

          <button 
          className="w-full bg-[#3FB73C] text-black px-4 py-2 rounded-xl focus:outline-none">
            Login
          </button>
        </form>

        <div className="absolute bottom-0 left-0 mb-4 ml-4 text-gray-500 text-sm">
          <div className="mb-2">
            <span className="block">Don’t have an account?</span>
            <Link to="/signup" className="text-black underline">Sign up</Link>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 mb-4 mr-4 text-gray-500 text-sm">
          <div className="mb-2">
            <span className="block">Need help?</span>
            <a href="https://www.youtube.com/watch?v=q6EoRBvdVPQ" className="text-black underline">Contact us</a>
          </div>
        </div>
      </div>
    </div>
    );
}