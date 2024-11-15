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



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/', router)

const server = http.createServer(app)
const io = new Server(server)


mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log('Connected to MongoDB')
        server.listen(port)
        console.log(`Example app listening on port ${port}`)
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })

