const express = require('express');
const app = express();
const cors = require('cors')
const models = require('./models')
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 3002
const chatRouter = require('./routes/chatRouter')


app.use(cors())
app.use('/', chatRouter)
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Simple chatapp');
});

io.on('connection', (socket) => {
    socket.on("join", async room => {
        socket.join(room);
        io.emit("roomJoined", room);
    });

    socket.on("message", async data => {
        const { chatRoomName, author, message } = data;
        const chatRoom = await models.ChatRoom.findAll({
            where: { name: chatRoomName },
        });
        const chatRoomId = chatRoom[0].id;
        const chatMessage = await models.ChatRoomMessage.create({
            chatRoomId,
            author,
            message: message,
        });
        io.emit("newMessage", chatMessage);
    });
});


models
    .sequelize
    .sync()
    .then(server.listen(port, console.log(`Server is running on port ${port}`)))