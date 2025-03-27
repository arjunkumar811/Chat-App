import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json())
import authRouter from './routes/auth.route.js'
import { connectDB } from './lib/db.js';


app.use("/api/auth", authRouter);


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('server started at ', PORT)
    connectDB()
})