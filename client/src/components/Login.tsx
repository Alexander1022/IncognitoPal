import { useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const cookies = new Cookies();

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
              cookies.set("TOKEN", response.data.token, {
                path: "/",
              });
            }
        })
  
        .catch((error) => {
            console.log(error.response.data.message);
            setMessage(error.response.data.message);
        })
    }

    return (
        <div className="bg-green-100">
                <div className="min-h-screen flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-8 pb-4 rounded-xl shadow-2xl">
                        <h1 className="text-xl font-semibold mb-4 text-center">🔏</h1>
                        <p className="text-gray-600 mb-6">Please sign in.</p>
                        
                        <div className="mb-4">
                            <input onChange={handleChangeUsername} type="text" placeholder="Username" className="name-input w-full px-4 py-2 border rounded-xl text-gray-700 shadow-lg ocus:outline-none outline-0" />    
                            <input onChange={handleChangePassword} type="password" placeholder="Password" className="password-input w-full mt-4 px-4 py-2 border rounded-xl text-gray-700 shadow-lg ocus:outline-none outline-0" />
                            {message && (
                              <div className="flex justify-start">
                                <p className="text-red-500 text-sm mt-3">{message}</p>
                              </div>
                            )}
                        </div>

                        <button className="w-full bg-white text-black px-4 py-2 rounded-xl hover:bg-green-100 focus:outline-none shadow-lg">Sign In</button>
                        <div className="text-center items-center mt-5 mb">
                            <Link className="text-gray-500 hover:text-black text-sm" to="/signup">Wanna join?</Link>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
    );
}