import express from 'express'


const app = express();
import authRouter from './routes/auth.route.js'

app.use("/api/auth", authRouter);

app.listen(3000, () => {
    console.log('server started')
})