import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import Avatar from 'react-avatar';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(username);
        setCopyMessage('Copied');
        setTimeout(() => setCopyMessage(''), 3000);
    };

    const fetchData = () => {
        const token = getToken();
        if(!token) return;

        axios.get('http://localhost:1234/users/me', {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            setUsername('');
            if(response.status === 200) {
              console.log(response.data);
              setUsername(response.data?.username);
              setEmail(response.data?.email);
              setBio(response.data?.bio);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center bg-green-100 h-screen">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="flex items-center mb-6">
                    <div className="rounded-full overflow-hidden mr-4">
                        <Avatar name={username} size="50" round={true} />
                    </div>
                    <h1 className="text-2xl font-semibold">{username}</h1>
                    <button
                        onClick={copyToClipboard}
                        className="ml-2 p-2 bg-green-100 hover:bg-green-200 text-black font-bold rounded-full transition duration-300"
                    >
                        Copy
                    </button>
                    {copyMessage && (
                        <span className="text-black text-sm italic ml-2">{copyMessage}</span>
                    )}
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Email:</span> {email}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">
                        {bio}
                    </p>
                </div>

                <div className="flex space-x-4 items-center mb-4">
                    <button className="flex-1 py-2 bg-green-100 text-black font-bold rounded-full hover:bg-green-200 transition duration-300">
                        <Link to="/new-chat">
                            Create a convo
                        </Link>
                    </button>
                </div>

                <div className="flex space-x-4 items-center">
                    <button className="w-full py-2 bg-yellow-100 text-black font-bold rounded-full hover:bg-yellow-200 transition duration-300">
                        Edit Profile
                    </button>

                    <button className="w-full py-2 bg-red-300 text-black font-bold rounded-full hover:bg-red-400 transition duration-300">
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
