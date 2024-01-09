import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import NavMenu from "./NavMenu";
import axios from "axios";

export default function Home() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

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
        <div className="bg-green-100 min-h-screen">
            <NavMenu />

            <div className="container mx-auto my-8 p-8 bg-white rounded-xl shadow-2xl">
                <h1 className="text-3xl font-semibold mb-6 text-center">User Profile</h1>

                <div className="mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Username:</span> {username}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Email:</span> {email}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Bio:</span> {bio}
                    </p>
                </div>

                <div className="flex flex-row space-x-4 tems-center m-5">
                    <button className="w-full p-5 m-3 bg-blue-100 text-black text-bold rounded-xl">Create a new chat</button>
                    <button className="w-full p-5 m-3 bg-green-100 text-black text-bold rounded-xl">Add Friend</button>
                    <button className="w-full p-5 m-3 bg-yellow-100 text-black text-bold rounded-xl">Edit Profile</button>
                    <button className="w-full p-5 m-3 bg-red-300 text-black text-bold rounded-xl">Delete Profile</button>
                </div>

            </div>
        </div>
    );
}
