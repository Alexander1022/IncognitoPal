import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavMenu() {
    const [name, setName] = useState('');

    return (
        <nav className="bg-green-500 p-4 shadow-xl">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-white text-xl font-bold">IncognitoPal</h1>

                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/new-chat" className="text-white hover:text-gray-300">New Chat</Link>
                    <Link to="/logout" className="text-white hover:text-gray-300">Logout</Link>
                </div>
            </div>
        </nav>
    );
};
