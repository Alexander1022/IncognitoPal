import axios from "axios";
import { useState } from "react";
import { getToken } from "../helpers/token";

export default function CreateConvo() {
    const [username, setUsername] = useState('');

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
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        })
    }

    return (
        <div className="flex items-center justify-center bg-green-100 h-screen">
            <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
                <div className="m-2">
                    <h1 className="text-2xl font-semibold">Say hi 👋🏻</h1>

                    <input
                        required
                        value={username}
                        onChange={handleChangeUsername}
                        type="text"
                        placeholder="Enter your buddy's username..."
                        className="w-full p-2 mt-2 mb-2 border rounded-md"
                    />

                    <button onClick={handleSubmit} className="w-full py-2 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-300">
                        Create
                    </button>

                </div>
            </div>
        </div>
    );
}
