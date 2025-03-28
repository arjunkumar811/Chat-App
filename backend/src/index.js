import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser())
import authRouter from './routes/auth.route.js'
import { connectDB } from './lib/db.js';



app.use("/api/auth", authRouter);
app.use('/api/message', messageRouter)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('server started at ', PORT)
    connectDB()
})