import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import User from '../models/user.js';

const userRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let imageName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  __dirname + '/user_profile/')
    },
    filename: (req, file, cb) => {
        imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({storage:storage})

userRouter.put('/user/:id', (req, res, next)=> {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(
        User.findOne({_id: req.params.id}).then((user)=>{
            res.send(user)
        })
    )
})

userRouter.put('/user/posts/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {$push: {user_posts: req.body.event_id}}).then(()=>{
        res.send({message: 'Posts Updated'});
    })
})

userRouter.get('/user/:id', (req, res,next)=>{
    User.findOne({_id: req.params.id}, {user_interested: 1, _id: 0}).then((user)=>{
        res.send(user);
    })
})

userRouter.get('/user/profileImg/:id', (req, res,next)=>{
    User.findOne({_id: req.params.id}, {user_img: 1, _id: 0}).then((user)=>{
        res.send(user);
    })
})


userRouter.delete('/user/:name/:id', (req, res, next)=>{
    User.findOneAndUpdate({user_name: req.params.name}, {$pull: {user_interested: req.params.id}}).then(()=>{
        res.send();
    })
})

userRouter.get('/profile/:id', (req, res, next)=> {
    User.findOne({_id: req.params.id}, {user_followers: 1, user_following: 1, _id: 1, user_name: 1}).then((user)=>{
        res.send(user);
    })
})

userRouter.put('/profile/:id', (req, res, next)=> {
    if(req.params.id === req.id){
        User.findByIdAndUpdate(req.params.id, {user_img: req.body.user_img, user_bio: req.body.user_bio}).then(()=>{
            res.json({message: 'Profile Updated'})
        })
    }
    else{
        res.status(401).json({message: 'Unauthorized'})
    }
})

userRouter.put('/profile/follow/:uid/:fid', (req, res, next) => {
    if(req.params.uid == req.id){
        if(req.body.operation == 0){
            User.findByIdAndUpdate(req.params.uid, {$pull: {user_following: req.params.fid}}).then(()=>{
                User.findByIdAndUpdate(req.params.fid, {$pull: {user_followers: req.params.uid}}).then(()=>{
                    res.json({message: 'Unfollowed Successfully'})
                })
            })
        }
        else if(req.body.operation == 1) {
            User.findByIdAndUpdate(req.params.uid, {$push: {user_following: req.params.fid}}).then(()=>{
                User.findByIdAndUpdate(req.params.fid, {$push: {user_followers: req.params.uid}}).then(()=>{
                    res.json({message: 'Followed Successfully'})
                })
            })
        }
        else{
            res.status(400).json({message: 'Invalid Operation'})
        }
    }
    else{
        res.status(401).json({message: 'Unauthorized'})
    }
})

userRouter.post('/profile/:id', (req, res, next)=>{
    if(req.params.id === req.id){
        User.findOne({_id: req.params.id}).select('-user_message_rooms').then((user)=>{
            res.json({user: user, isSame: true})
        })
    }
    else{
        User.findOne({_id: req.params.id}).select('-user_interested -user_message_rooms -user_email -user_password -roles').then((user)=>{
            res.json({user: user, isSame: false})
        })
    }
})

/*
userRouter.delete('/profile/:id', (req, res, next)=>{
    // verify same user
    // delete all events created by user
    // remove event from user_interested from other users
})

userRouter.put('/profile/:id', (req, res, next)=> {
    const {_id, user_name, roles, active, password } = req.body

    if(!_id  || !user_name || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'Incomplete fields'})
    }

    // Check for duplicates while updating username

    // Check if user is updating password
})
*/

export default userRouter