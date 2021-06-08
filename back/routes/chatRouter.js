const chatRouter = require('express').Router()
const models = require('../models')
const express = require('express')
const cors = require('cors')

chatRouter.use(express.urlencoded())
chatRouter.use(cors())

/*List all chatrooms*/
chatRouter.get("/chatrooms", async (req, res, next) => {
    const chatRooms = await models.ChatRoom.findAll();
    res.send(chatRooms);
});

/*Either join an existing or create a new chatroom*/
chatRouter.post("/chatroom", async (req, res, next) => {
    const room = req.body.room;
    const chatRooms = await models.ChatRoom.findAll({
        where: { name: room },
    });
    const chatRoom = chatRooms[0];
    if (!chatRoom) {
        await models.ChatRoom.create({ name: room });
        const newRoom = await models.ChatRoom.findAll({
            where: { name: room },
        })
        res.send(newRoom)
    } else {
        res.send(chatRooms);
    }
});

chatRouter.get("/chatroom/messages/:chatRoomName", async (req, res, next) => {
    try {
        const chatRoomName = req.params.chatRoomName;
        const chatRooms = await models.ChatRoom.findAll({
            where: {
                name: chatRoomName,
            },
        });
        const chatRoomId = chatRooms[0].id;
        const messages = await models.ChatMessage.findAll({
            where: {
                chatRoomId,
            },
        });
        res.send(messages);
    } catch (error) {
        res.send([]);
    }
});

//missing: delete route, get info for specific chatroom

module.exports = chatRouter;