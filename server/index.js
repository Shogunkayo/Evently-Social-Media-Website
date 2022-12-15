import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import corsOptions from './config/corsOptions.js'
import router from './routes/api.js'
import eventRouter from './routes/eventRoutes.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import logger from './middleware/logger.js'
import verifyJWT from './middleware/verifyJWT.js'

dotenv.config({ path: './.env' })
const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/evently')

//app.use(logger)

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use('/api',router)
app.use('/dash', verifyJWT, eventRouter)
app.use('/dash', verifyJWT, userRouter)
app.use('/dash', verifyJWT, messageRouter)
app.use((err, req, res, next)=>{
    res.status(422).send({err: err.message})
})

app.listen(process.env.port || 4000, ()=>{
    console.log("Now listening for requests")
})