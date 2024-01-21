import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import Avatar from "react-avatar";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";

// silly way to make it like this 
// TODO: create a class for all the structures in IncognitoPal
class Convo {
    id: number;
    otherUserId: number;
    otherUsername: string;
    createdAt: string;

    constructor(id: number, otherUser: number, otherUsername: string, createdAt: string) {
        this.id = id;
        this.otherUserId = otherUser;
        this.otherUsername = otherUsername;
        this.createdAt = createdAt;
    }
}

export default function ListConvos() {
    const [convos, setConvos] = useState<Convo[]>([]);
    const navigate = useNavigate();

    const fetchAllConvos = () => {
        const token = getToken();
        axios.get('http://localhost:1234/conversations/getAll', {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                setConvos(response.data);
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

    const perfectDate = (data: string) => {
        const utcDate = new Date(data);
        // this is a specific timezone for Bulgaria, Sofia
        const timezoneOffset = 120;
        const targetDate = new Date(utcDate.getTime() + timezoneOffset * 60000);
        const formattedDistance = formatDistanceToNow(targetDate);
        return formattedDistance;
    }

    const handleOpeningConvo = (convoId: number, otherUserId: number) => {
        navigate(`/conversations/${convoId}/${otherUserId}`);
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
                        <div key={convo.id} onClick={() => handleOpeningConvo(convo.id, convo.otherUserId)} className="mb-4 border rounded-md overflow-hidden shadow-md hover:bg-gray-300 hover:cursor-pointer">
                            <div className="flex items-center p-4">
                                {/* Avatar */}
                                <Avatar name={convo.otherUsername} size="50" round={true} className="mr-4" />

                                {/* Conversation details */}
                                <div>
                                    <h2 className="text-lg font-semibold">{convo.otherUsername}</h2>
                                    <p className="text-gray-600">
                                        Created {perfectDate(convo.createdAt)} ago
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
