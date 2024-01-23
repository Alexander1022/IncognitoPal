import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../helpers/token";
import Avatar from "react-avatar";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { perfectDate } from "../helpers/date";

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

    const handleOpeningConvo = (convoId: number, otherUserId: number) => {
        navigate(`/conversations/${convoId}/${otherUserId}`);
    }

    useEffect(() => {
        fetchAllConvos();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="max-w-2xl w-full max-h-full p-6 rounded shadow-md">
                <h1 className="animate-in fade-in duration-300 text-3xl font-bold mb-6 text-gray-800">Convos List</h1>
                <div className="overflow-y-auto max-h-80">
                    {convos.map((convo) => (
                        <div 
                            key={convo.id} 
                            onClick={() => handleOpeningConvo(convo.id, convo.otherUserId)} 
                            className="animate ease-in-out duration-300 mb-4 border rounded-md overflow-hidden shadow-md hover:bg-gray-300 hover:cursor-pointer"
                        >
                            <div className="flex items-center p-4">
                                <Avatar name={convo.otherUsername} size="50" round={true} className="mr-4" />
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
