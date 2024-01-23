import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import Avatar from 'react-avatar';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(username);
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
        <div className="bg-white w-full min-h-view flex items-center justify-center">
             <div className="max-w-screen-xl container mx-auto mt-40">
                <div className="bg-white relative shadow-md rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="flex justify-center">
                    <Avatar name={username} className="rounded-full mx-auto absolute-top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                </div>
                
                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{username}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{email}</p>
                    <div className="my-5 px-6 items-center justify-center">
                        <a 
                            onClick={copyToClipboard}
                            className="text-gray-200 block rounded-lg text-center cursor-pointer font-medium leading-6 px-3 py-3 bg-gray-900 hover:bg-black hover:text-white animate ease-in-out duration-300 hover:scale-105">
                            Copy
                            <span className="ml-1 font-bold">
                                @{username}
                            </span>
                        </a>
                    </div>
                    <div className="flex justify-between space-x-3 items-center h-20 my-5 px-6">
                        <Link to="/new-chat" className="text-black bg-green-200 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                            Create a convo
                        </Link>

                        <Link to="/" className="text-black bg-yellow-200 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                            Edit Profile
                        </Link>

                        <Link to="/" className="text-black bg-red-200 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                            Delete Profile
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
