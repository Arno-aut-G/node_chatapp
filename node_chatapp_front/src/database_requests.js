import axios from 'axios'


const APIURL = "http://localhost:3002";

export const getChatRooms = () => {
    return axios
        .get(`${APIURL}/chatrooms`)
        .catch(err => {
            console.log(err)
        })
}

//handle errors!!! for all three; change routes (not chatroom/chatroom)

export const getChatRoomMessages = chatRoomName => {
    return axios
        .get(`${APIURL}/chatroom/messages/${chatRoomName}`)
        .catch(err => {
            console.log(err)
        })
}


export const joinRoom = room => {
    return axios
        .post(`${APIURL}/chatroom`, { room })
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}


