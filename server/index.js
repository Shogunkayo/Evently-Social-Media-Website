import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/api.js';
import multer from 'multer';

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/evently')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(bodyParser.json());
app.use('/api',router);
app.use((err, req, res, next)=>{
    res.status(422).send({err: err.message});
});

app.listen(process.env.port || 4000, ()=>{
    console.log("Now listening for requests");
});