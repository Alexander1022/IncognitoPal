import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../helpers/token";
import axios from "axios";
import io, { Socket } from 'socket.io-client';
import { get } from "http";

// silly way to make it like this 
// TODO: create a class for all the structures in IncognitoPal
class Message {
    id: number;
    conversationID: number;
    senderID: number;
    content: string;
    created_at: string;
    otherUsername: string;

    constructor(id: number, conversationID: number, senderID: number, content: string, created_at: string, otherUsername: string) {
        this.id = id;
        this.conversationID = conversationID;
        this.senderID = senderID;
        this.content = content;
        this.created_at = created_at;
        this.otherUsername = otherUsername
    }
}

export default function Convo() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [otherUsername, setOtherUsername] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [myId, setMyId] = useState(0);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const token = getToken();
    const { convoId, userId } = useParams();

    const getMyId = () => { 
        axios.get('http://localhost:1234/users/myId', { headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                setMyId(response.data);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        });
    }

    useEffect(() => {
        const newSocket = io('ws://localhost:1234');
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('WebSocket connected');
          });
      
        newSocket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    
        return () => {
          newSocket.disconnect();
          console.log('WebSocket disconnected on component unmount');
        };
      }, []);

    useEffect(() => {
        getConvoInfo();
        getMessages();
        getMyId();
    }, [convoId, otherUsername]);

    useEffect(() => {
        if (isScrolledToBottom) {
            messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isScrolledToBottom]);

    useEffect(() => {
        socket?.on('chat message', (msg) => {
            console.log('Received message:', msg);
            getMessages();
        });

        return () => {
            socket?.off('chat message');
        };
    }, [convoId, socket]);

    const getConvoInfo = async() => {
        axios.get('http://localhost:1234/conversations/getOne', { 
            headers: {Authorization: `Bearer ${token}`}, 
            params: {otherUser: userId}
        })
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                setOtherUsername(response.data.otherUsername);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        });
    };

    const sendMessage = async() => {
        const messageData = {
            conversationId: (convoId as unknown)as number,
            content: message
        };

        axios.post('http://localhost:1234/messages/', 
        messageData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            if(response.status === 200) {
                setMessages((prevMessages) => [...prevMessages, response.data]);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        });
    }

    const getMessages = async() => {
        axios.get('http://localhost:1234/messages/', {
            headers: {Authorization: `Bearer ${token}`}, 
            params: {conversationId: convoId}
        })
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                setMessages(response.data);
            }
        })
        .catch((error) => {
            console.log(`I caught this : ${error.response.data.message}`);
        });
    }

    const handleSendingMessage = async() => {
        if(message.trim() !== '' && socket !== null) {
            socket.emit('chat message', message);
            sendMessage();
            setMessage('');
        }
    }

    const handleScroll = () => {
        if(messagesContainerRef.current === null) return;
        
        const isAtBottom =
            messagesContainerRef.current?.scrollTop + messagesContainerRef.current?.clientHeight ===
            messagesContainerRef.current?.scrollHeight;

        setIsScrolledToBottom(isAtBottom);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-green-100 h-screen">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="p-4">
                <h1 className="flex text-2xl font-semibold">{otherUsername}</h1>
                <p className="text-sm text-gray-400 mb-4">End-to-end encryption chat</p>

                <div className="flex flex-col h-60 overflow-y-auto mb-4 max-h-60">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                        msg.senderID === myId ? 'justify-end' : 'justify-start'
                        } mb-2`}
                    >
                        <div
                        className={`p-2 rounded-md ${
                            msg.senderID === myId
                            ? 'bg-blue-200 text-blue-800 self-end'
                            : 'bg-gray-200 text-gray-800 self-start'
                        }`}
                        >
                        <p className="mb-1">{msg.content}</p>
                        <small className="text-gray-500">{msg.created_at}</small>
                        </div>
                    </div>
                    ))}

                </div>

                <div className="flex items-center">
                    <input
                    type="text"
                    className="flex-grow border rounded-md p-2 mr-2"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSendingMessage}
                    >
                    Send
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
