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
    }, [isAuth]);

    return (
        <nav className="bg-white p-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="w-48 h-10 text-center">
                    <span className="text-[#027000] text-3xl font-normal font-['Barlow'] tracking-wide">
                        Incognito
                    </span>
                    
                    <span className="text-[#00858D] text-3xl font-normal font-['Barlow'] tracking-wide">
                        Pal
                    </span>
                </div>

                {isAuth ? (
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/new-chat" className="text-black hover:text-gray-300">New Chat</Link>
                    <Link to="/all-chats" className="text-black hover:text-gray-300">All Chats</Link>
                    <button onClick={logOut} className="text-black hover:text-gray-300">Logout</button>
                </div>) : (
                <div className="flex items-center space-x-4">
                    <Link to="/signin" className="text-black hover:text-gray-500">Login</Link>
                    <Link to="/signup" className="text-black hover:text-gray-500">Sign Up</Link>        
                </div>
                )}
            </div>
        </nav>
    );
};
