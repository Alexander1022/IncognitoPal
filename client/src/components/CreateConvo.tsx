import axios from "axios";
import { useState } from "react";
import { getToken } from "../helpers/token";
import { useNavigate } from "react-router-dom";

export default function CreateConvo() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChangeUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = 
        {
            username: username,
        }
        const token = getToken();
        
        axios.post('http://localhost:1234/conversations/create', data, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                navigate('/all-chats');
            }
        })
        .catch((error) => {
            setError(`We kinda couldn't find your friend...`);
            console.log(`I caught this : ${error.response.data.message}`);
        })
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-0 m-0">
            <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md mx-auto my-auto">
                <div className="m-2">
                    <h1 className="h-auto text-3xl font-extrabold">Say hi 👋🏻</h1>
                    <p className="text-md font-light text-gray-700">Add a new friend for a chat...</p>

                    <input
                        required
                        value={username}
                        onChange={handleChangeUsername}
                        type="text"
                        placeholder="Enter your buddy's username..."
                        className="w-full p-2 mt-2 mb-2 border rounded-md"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                    >
                        Create
                    </button>

                    {error && (
                            <div className="mt-2 text-red-500">
                                {error}
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
}
