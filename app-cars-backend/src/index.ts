import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import router from './routes/routes'

const app = express()
const port = 3000


app.use(cors({
    origin:'*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(bodyParser.urlencoded({ extended: true,limit: '10mb' }))
app.use(bodyParser.json({limit: '10mb'}))
app.use(cookieParser())
app.use('/api', router)

const server = http.createServer(app)
const io = new Server(server)


mongoose.connect(process.env.MONGO_URL as string)
    .then(async() => {
        server.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })

