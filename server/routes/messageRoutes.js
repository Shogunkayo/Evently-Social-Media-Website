import express from 'express'

import User from '../models/user.js'
import MessageRoom from '../models/messageRoom.js'

const messageRouter = express.Router()

messageRouter.post('/:sid/:rid', (req, res, next) => {
    if(req.params.sid === req.id) {
        MessageRoom.findOne({_id_sender: req.params.sid, _id_reciever: req.params.rid}).then((room) => {
            if(room) {
                res.json({message: "Room found"})
            }
            else {
                MessageRoom.findOne({_id_sender: req.params.rid, _id_reciever: req.params.sid}).then((room) => {
                    if(room) {
                        res.json({message: "Room found"})
                    }
                    else {
                        MessageRoom.create({_id_sender: req.params.sid, _id_reciever: req.params.rid, user_name_sender: req.body.sname, user_name_reciever: req.body.rname, message: []}).then((room) => {
                            User.findByIdAndUpdate(req.params.rid, {$push: {user_message_rooms: room._id}}).then(() => {
                                User.findByIdAndUpdate(req.params.sid, {$push: {user_message_rooms: room._id}}).then(() => {
                                    res.json({message: "Room Created"})
                                })
                            })
                        })
                    }
                })
            }
        })
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
})

messageRouter.get('/:sid', (req, res, next) => {
    if(req.params.sid === req.id) {
        User.findById(req.params.sid).then((user) => {
            MessageRoom.find({_id : {$in : user.user_message_rooms}}).then((rooms) => {
                res.json(rooms)
            })
        })
    }
    
    else {
        res.status(401).json({message: 'Unauthorized'})
    }   
})

messageRouter.get('/room/:sid/:roomid', (req, res, next) => {
    if(req.params.sid === req.id) {
        MessageRoom.findById(req.params.roomid).then((room) => {
            res.json(room)
        })
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
})

messageRouter.post('/room/:sid/:roomid', (req, res, next) => {
    if(req.params.sid === req.id) {
        MessageRoom.findByIdAndUpdate(req.params.roomid, {$push: {messages: req.body}}).then(() => {
            res.json({message: 'Message sent'})
        })
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
})

export default messageRouter
