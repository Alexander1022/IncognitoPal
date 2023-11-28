import Footer from "./Footer";
import axios from 'axios';
import { useState } from 'react';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');


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

        axios.post('http://localhost:1234/users', data)
            .then((response) => {
                if(response.status === 200) {
                    console.log("User created successfully. Nice!");
                }
            })

            .catch((error) => {
                console.log(error);
            })
    }

    return (
           <div className="bg-green-100">
                <div className="min-h-screen flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                        <h1 className="text-xl font-semibold mb-4 text-center">🔐</h1>
                        <p className="text-gray-600 mb-6">Sign up now to experience end-to-end secure and private messaging.</p>
                        
                        <div className="mb-4">
                            <input value={username} onChange={handleChangeUsername} type="text" placeholder="Username" className="name-input w-full px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />    
                            <input value={email} onChange={handleChangeEmail} type="email" placeholder="you@incognitopal.com" className="email-input w-full mt-4 px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />
                            <input value={password} onChange={handleChangePassword} type="password" placeholder="Password" className="password-input w-full mt-4 px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />
                            <input type="password" onChange={handleChangeConfirm} placeholder="Confirm password" className="password-input w-full mt-4 px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />
                        </div>

                        <button className="w-full bg-white text-black px-4 py-2 rounded-xl hover:bg-green-100 focus:outline-none shadow-sm">Sign Up</button>
                    </form>
                </div>
                <Footer />
            </div>
    );
}