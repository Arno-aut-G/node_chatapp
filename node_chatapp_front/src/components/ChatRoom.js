
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./ChatRoom.css";
import { getChatRoomMessages, getChatRooms } from "../database_requests";
const SOCKET_IO_URL = "http://localhost:3002";
const socket = io(SOCKET_IO_URL);


const ChatRoom = (props) => {
    const { userName } = props.userName
    const { chatRoomName } = props.match.params
    const [messages, setMessages] = useState([]); //for existing messages and updating these with a new message
    const [newMessage, setNewMessage] = useState('')
    const [rooms, setRooms] = useState([]);

    const handleSendMessage = (event) => {
        const data = new Object()
        data.chatRoomName = chatRoomName;
        data.author = userName;//get from App state via props
        data.message = newMessage; //dunno yet how to get this one
        socket.emit("message", data);
    }

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const connectToRoom = () => {
        socket.on("connect", data => {
            socket.emit("join", chatRoomName);
        });
        socket.on("newMessage", data => {
            getMessages();
        });
    };

    const disconnect = () => {
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    }


    const getMessages = async () => {
        const response = await getChatRoomMessages(chatRoomName);
        setMessages(response.data);
    };

    const getRooms = async () => {
        const response = await getChatRooms();
        setRooms(response.data);
    }; //not sure yet what this is needed for?


    useEffect(() => {
        getMessages();
        connectToRoom();
        getRooms();
        return disconnect()
    }, []);


    return (
        <div className="chat-room-container">
            <h1 className="room-name">
                Chat Room: {chatRoomName} User: {userName}
            </h1>
            <div className="messages-container">
                <ol className="messages-list">
                    {messages.map((message, i) =>
                    (
                        <li
                            key={i}
                            className={`message-item`} //this needs to be set somehow
                        >
                            {message.author}
                            {message.message}
                            {message.createdAt}
                        </li>
                    ))}
                </ol>

                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className="new-message-input-field"
                />
                <button onClick={handleSendMessage} className="send-message-button">
                    Send
                </button>

            </div>
        </div>
    );
}

export default ChatRoom;