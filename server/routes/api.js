import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Feedback from '../models/feedback.js';
import User from '../models/user.js';
import {generateAccess, generateRefresh} from './generateJWT.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let imageName;
let profileImageName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  __dirname + '/event_images/')
    },
    filename: (req, file, cb) => {
        imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  __dirname + '/user_profile/')
    },
    filename: (req, file, cb) => {
        profileImageName = Date.now() + path.extname(file.originalname)
        cb(null, profileImageName)
    }
})

const upload = multer({storage:storage})
const uploadProfile = multer({storage: storageProfile})

//----------------------------FEEDBACK ROUTES
router.get('/feedback', (req, res, next) =>{
    Feedback.find({}).sort({"fdback_time" : -1}).limit(3).then((feedbacks) => {
        res.send(feedbacks);
    })
});

router.post('/feedback', (req, res, next) => {
    Feedback.create(req.body).then((feedback)=>{
        res.send(feedback);
    }).catch(next);
});

//----------------------------LOGIN/SIGNUP ROUTES

router.post('/signup', (req, res, next) => {   
    let user_request = req.body;
    user_request.user_followers = [];
    user_request.user_following = [];
    user_request.user_posts = [];
    user_request.user_interested = [];
    user_request.user_message_rooms = [];
    user_request.roles = ['user'];
    user_request.user_bio = " ";
    user_request.user_img = "default.jpg"
    
    bcrypt.hash(user_request.user_password, 10, function(err, hash){
        user_request.user_password = hash;
        User.create(user_request).then((user)=>{
            if(err){
                console.log(err);
                res.setHeader('500', {'Content-Type': 'application/json'});
                res.send({user: 0, message: 'Something went wrong'});
            }
            else{
                res.setHeader('200', {'Content-Type': 'application/json'});
                res.send({user: user.user_name, message: 'User created'});
            }
        }).catch(next);
    });
    
})

router.post('/signup/check', (req, res, next)=> {
    User.findOne({user_name: req.body.user_name}, {user_name: 1, _id: 0}).then((user)=>{
        if(user){
            res.setHeader('403', {'Content-Type': 'application/json'});
            res.send({userExists: 1, message: 'Username already exists'});
        }
        else{
            res.setHeader('200', {'Content-Type': 'application/json'});
            res.send({userExist: 0, message: 'Username does not exist'});
        }
    })
})

router.get('/login', (req, res, next) => {
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(401).json({message: 'Unauthorized'})
    }
})

router.post('/login', (req, res, next)=>{
    let user_request = req.body;
    
    User.find({user_name: user_request.user_name}).then((user)=>{    
        if(user.length){
            bcrypt.compare(user_request.user_password, user[0].user_password, (err, result)=>{
                if(result){
                    
                    res.setHeader('200', {'Content-Type': 'application/json'});
                    
                    const accessToken = generateAccess(user[0])
                    const refreshToken = generateRefresh(user[0])

                    res.cookie('jwt', refreshToken, {
                        httpOnly: false,
                        //secure: true,
                        sameSite: 'None',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.json({accessToken: accessToken, user_id: user[0]._id})                   
                }
                else{
                    res.setHeader('401', {'Content-Type': 'application/json'});
                    res.send({user_name: null, message: "Username or Password is incorrect"});
                } 
            })
        }
        else{
            res.setHeader('401', {'Content-Type': 'application/json'});
            res.send({user_name: null, message: "Username or Password is incorrect"});
        }
    }) 
})

router.get('/signup/check', (req, res, next)=> {
    res.status(404).json('Page Not Found');
})

router.get('/signup', (req, res, next)=>{
    res.status(404).json('Page Not Found');
})


//----------------------------IMAGE ROUTES

router.get('/image/event/:id', (req, res, next)=>{
    res.sendFile('event_images/' + req.params.id, {root: __dirname})
})

router.post('/image/event', upload.single('event_img'), (req, res, next)=>{
    res.send({message: 'Image Uploaded', imgPath: imageName});
})

router.get('/image/user/:id', (req, res, next)=> {
    res.sendFile('user_profile/' + req.params.id, {root: __dirname})
})

router.post('/image/user', uploadProfile.single('user_img'), (req, res, next)=> {
    res.send({message: 'Image Uploaded', imgPath: profileImageName});
})

export default router