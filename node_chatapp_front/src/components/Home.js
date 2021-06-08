import { joinRoom } from '../database_requests'
import { useState } from 'react'
import { Link } from "react-router-dom";

import "./Home.css";

const Home = ({ userName, setUserName }) => {
    const [roomName, setRoomName] = useState('');

    const handleRoomNameChange = async (event) => {
        setRoomName(event.target.value);
        await joinRoom(event.target.value); //for the case a new room has to be created
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }


    return (
        <div className="home-container">
            <input
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className="text-input-field"
            />
            <br />
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
                className="text-input-field"
            />
            <Link to={`/${roomName}`} className="enter-room-button">
                Join room
      </Link>
        </div>
    );
};

//also want a username and a list of chats

export default Home;
