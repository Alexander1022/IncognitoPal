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
        <div className="bg-white min-h-view flex items-center justify-center">
            <div className="max-w-screen-xl mt-10 justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-8 pb-4 mx-auto rounded-xl">
                <div className="w-96 mb-5 text-center text-[#027000] text-6xl font-normal font-['Barlow'] tracking-widest">
                    Sign up
                </div>    

                <div className="animate-in fade-in zoom-in duration-300 delay-150 w-96 h-10 text-center text-black text-xl font-normal font-['Barlow'] tracking-wide">
                    Create your account fast and free
                </div>                    
                
                <div className="mb-4">
                    <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
                        Username:
                    </div>
                
                    <input 
                        onChange={handleChangeUsername} 
                        required 
                        value={username} 
                        type="text" 
                        placeholder="How people can find you" 
                        className="name-input w-96 bg-neutral-100 rounded-3xl"
                    /> 
                    <p className="mb-3">You can change it later in your profile page</p>   

                    <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
                        Email:
                    </div>
                
                    <input 
                        onChange={handleChangeEmail} 
                        required 
                        value={email} 
                        type="email" 
                        placeholder="You can use it as a backup for your account" 
                        className="name-input w-96 bg-neutral-100 rounded-3xl mb-3"
                    />
                
                    <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
                        Password:
                    </div>

                    <input 
                        required 
                        value={password} 
                        onChange={handleChangePassword} 
                        type="password" 
                        placeholder="Choose a better password than usual" 
                        className="password-input w-96 bg-neutral-100 rounded-3xl mb-3"
                    />

                    <div className="w-96 text-black text-xl font-normal font-['Open Sans'] tracking-wide">
                        Confirm password:
                    </div>
                
                    <input 
                        required 
                        onChange={handleChangeConfirm} 
                        type="password" 
                        placeholder="Confirm the better password" 
                        className="password-input w-96 bg-neutral-100 rounded-3xl mb-3"
                    />
                </div>

                <button 
                    className="w-full bg-[#3FB73C] text-black px-4 py-2 rounded-xl focus:outline-none">
                    Sign Up
                </button>
                </form>

                <div className="absolute bottom-0 left-0 mb-4 ml-4 text-gray-500 text-sm">
                    <div className="mb-2">
                    <span className="block">Already have an account?</span>
                    <Link to="/signin" className="text-black underline">Log in</Link>
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