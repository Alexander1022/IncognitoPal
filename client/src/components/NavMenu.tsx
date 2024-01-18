import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../helpers/token";

export default function NavMenu({ isAuth, setIsAuth }: any) {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const logOut = () => {
        if(isAuth) {
            clearToken();
            setName('');
            setIsAuth(false);
            navigate("/signin");
        }
    }

    useEffect(() => {
        console.log("isAuth changed:", isAuth);
    }, [isAuth]);

    return (
        <nav className="bg-green-500 p-4 shadow-xl sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-white text-xl font-bold">IncognitoPal</h1>

                {isAuth ? (
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/new-chat" className="text-white hover:text-gray-300">New Chat</Link>
                    <Link to="/all-chats" className="text-white hover:text-gray-300">All Chats</Link>
                    <button onClick={logOut} className="text-white hover:text-gray-300">Logout</button>
                </div>) : (
                <div className="flex items-center space-x-4">
                    <Link to="/signin" className="text-white hover:text-gray-300">Login</Link>
                    <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>        
                </div>
                )}
            </div>
        </nav>
    );
};
