import express from "express";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';
import { connectDb } from "./config/db.config.js";

//router imports
import authRouter from './routers/auth.route.js'

const app = express();

app.use(cookieParser());
app.use(helmet());;
app.use(cors({
    origin: 'http://localhost:3000', // don't use '*'
    credentials: true               // allow credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.use('/api/auth', authRouter)

app.get('/', (req, res) => (res.json({ message: "server is running" })))


app.listen(process.env.port, () => {
    console.log(`server is running on port ${process.env.port}`)
    connectDb()
})
