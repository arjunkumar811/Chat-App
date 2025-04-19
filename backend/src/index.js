import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const app = express();
app.use(express.json())
app.use(cookieParser())
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import { connectDB } from './lib/db.js';


app.use("/api/auth", authRouter);
app.use('/api/message', messageRouter)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('server started at ', PORT)
    connectDB()
})