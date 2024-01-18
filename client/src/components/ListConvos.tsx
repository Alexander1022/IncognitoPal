import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import Avatar from "react-avatar";
import { formatDistanceToNow } from 'date-fns';


class Convo {
    id: number;
    otherUser: number;
    otherUsername: string;
    createdAt: string;

    constructor(id: number, otherUser: number, otherUsername: string, createdAt: string) {
        this.id = id;
        this.otherUser = otherUser;
        this.otherUsername = otherUsername;
        this.createdAt = createdAt;
    }
}

export default function ListConvos() {
    const [convos, setConvos] = useState<Convo[]>([]);

    const fetchAllConvos = () => {
        const token = getToken();
        axios.get('http://localhost:1234/conversations/getAll', {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                setConvos(response.data);
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        })
    };

    const convertDate = (date: string) => {
        // format: HH:MM:SS DD/MM/YYYY
        const dateObj = new Date(date);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    }

    useEffect(() => {
        fetchAllConvos();
    }, []);

    return (
        <div className="flex items-center justify-center bg-green-100 h-screen">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="p-4">
                    <h1 className="text-2xl font-semibold mb-4">List of Conversations</h1>

                    {convos.map((convo) => (
                        <div key={convo.id} className="mb-4 border rounded-md overflow-hidden shadow-md">
                            <div className="flex items-center p-4">
                                {/* Avatar */}
                                <Avatar name={convo.otherUsername} size="50" round={true} className="mr-4" />

                                {/* Conversation details */}
                                <div>
                                    <h2 className="text-lg font-semibold">{convo.otherUsername}</h2>
                                    <p className="text-gray-600">
                                        Created {formatDistanceToNow(new Date(convo.createdAt))} ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {convos.length === 0 && (
                        <p>No conversations available :(</p>
                    )}
                </div>
            </div>
        </div>
    );
};
