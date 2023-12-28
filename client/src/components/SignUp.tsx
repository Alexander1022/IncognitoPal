import Footer from "./Footer";
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');

    const [message, setMessage] = useState('');

    const handleChangeUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const handleChangeConfirm = (event: any) => {
        setConfirm(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = 
        {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }

        axios.post('http://localhost:1234/users/signup', data)
            .then((response) => {
                if(response.status === 200) {
                    console.log(`Account is created!`);
                    navigate('/signin');
                }
            })

            .catch((error) => {
                if(error.response.data && error.response.status === 409) {
                    setMessage(error.response.data.message);
                    console.log(error.response.data.message);
                } else {
                    console.log(error.response.data);
                }
            })
    }

    return (
           <div className="bg-green-100">
                <div className="min-h-screen flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-8 pb-4 rounded-xl shadow-2xl max-w-md w-full">
                        <h1 className="text-xl font-semibold mb-4 text-center">🔐</h1>
                        <p className="text-gray-600 mb-6 text-center">Sign up now to experience end-to-end secure and private messaging.</p>
                        
                        <div className="mb-4">
                            <input required value={username} onChange={handleChangeUsername} type="text" placeholder="Username" className="name-input w-full px-4 py-2 rounded-xl text-gray-700 shadow-lg" />    
                            <input required value={email} onChange={handleChangeEmail} type="email" placeholder="you@incognitopal.com" className="email-input w-full mt-4 px-4 py-2 rounded-xl text-gray-700 shadow-lg" />
                            <input required value={password} onChange={handleChangePassword} type="password" placeholder="Password" className="password-input w-full mt-4 px-4 py-2 rounded-xl text-gray-700 shadow-lg" />
                            <input required type="password" onChange={handleChangeConfirm} placeholder="Confirm password" className="password-input w-full mt-4 px-4 py-2 rounded-xl text-gray-700 shadow-lg" />
                        </div>

                        <button className="w-full bg-white text-black px-4 py-2 rounded-xl hover:bg-green-100 focus:outline-none shadow-lg">Sign Up</button>
                        <div className="text-center items-center mt-5 mb">
                            <Link className="text-gray-500 hover:text-black text-sm" to="/signin">You already have an account? 🤔</Link>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
            
    );
}