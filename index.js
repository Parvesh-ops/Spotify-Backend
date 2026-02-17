import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { connectDB } from "./src/db/database.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

//middelware
app.use(express.json());  // Parse JSON bodies for req.body in controllers
app.use(cookieParser());  // cookieParser

//test route
app.get('/', (req, res) => {
    res.status(201).json({ message: 'Hello from backend side' })
})


//server listen
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})