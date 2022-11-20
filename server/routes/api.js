import express, { response } from 'express';
import Feedback from '../models/feedback.js';
import Event from '../models/event.js';
import User from '../models/user.js';
import Image from '../models/image.js';

import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage})

router.get('/', (req, res, next)=>{
    res.send("WORKING API TOP GET");
});

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

router.post('/event', (req, res, next) => {
    Event.create(req.body).then((event)=>{
        res.send(event);
    }).catch(next);
})

router.post('/signup', (req, res, next) => {
    User.create(req.body).then((user)=>{
        res.send(user);
    }).catch(next);
})

router.get('/signup', (req, res, next)=>{
    res.send("Not working")
})

router.post('/upload', upload.single('image'), (req, res)=>{
    var obj = {
        event_img: {
            data: fs.readFileSync(path.join(__dirname + '../images/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
})

export default router