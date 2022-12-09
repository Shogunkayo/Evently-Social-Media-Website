import express, { response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Event from '../models/event.js';
import User from '../models/user.js';

const eventRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let imageName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  __dirname + '/event_images/')
    },
    filename: (req, file, cb) => {
        imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const upload = multer({storage:storage})

eventRouter.post('/event', (req, res, next) => {
    let event_request = req.body;
    event_request.create_time = new Date();
    event_request.event_likes = 0;
    event_request.event_interested = [];
    event_request.event_comments = [];

    Event.create(event_request).then((event)=>{
        res.send(event)
    }).catch(next);
})

eventRouter.put('/event/:id', (req, res, next)=> {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        res.send('Event Updated');
    })
});

eventRouter.put('/event/comment/:id', (req,res,next)=> {
    Event.updateOne({_id: req.params.id}, {$push : {event_comments: req.body}}).then(()=>{
        res.send('Commend Added');
    })
})

eventRouter.get('/event/comment/:id', (req,res,next)=>{
    Event.findOne({_id: req.params.id}, {event_comments: 1, _id: 0}).then((comments)=>{
        res.json(comments);
    })
})

eventRouter.get('/event/:sort', (req, res, next) => {
    let sort = req.params.sort;
    let filter = req.query
    Event.find(filter).sort(`-${sort}`).then((events)=>{
        res.send(events);
    })
})

eventRouter.get('/event/interested/:username', (req, res, next) => {
    Event.find({event_interested: req.params.username}).then((events)=>{
        res.send(events);
    })
})

eventRouter.post('/event/delete/:userid/:eventid', (req, res, next) => {
    if(req.id !== req.params.userid){
        res.status(401).json({message: 'Unauthorized'})
    }
    else{
        Event.findOne({_id: req.params.eventid}).then((event)=>{
            let deleteInterested = event.event_interested
            let deletedEvent = event._id
            Event.deleteOne({_id : req.params.eventid}).then(()=>{
                User.findOneAndUpdate({_id: req.params.userid}, {$pull: {user_posts: req.params.eventid}}).then(()=>{
                    res.json({message: 'Event Deleted', deleteInterested: deleteInterested, deletedEvent: deletedEvent})
                })
            })
        })
    }
})

eventRouter.post('/event/comment/:uid/:cid', (req, res, next)=> {
    if(req.params.uid == req.id){
        Event.findByIdAndUpdate(req.body.event_id, {$pull: {event_comments: {comment_id: req.params.cid}}}).then((event)=>{
            res.json({message: 'Comment Deleted', cid: req.params.cid, eid: event})
        })
    }
    else{
        res.status(401).json({message: 'Unauthorized'})
    }
})

export default eventRouter