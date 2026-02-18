import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { connectDB } from "./src/db/database.js";
import router from "./src/routes/user.routes.js";
import artistRouter from "./src/routes/artist.routes.js"
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";


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

//api route
app.use('/api', router);
app.use('/api', artistRouter);

//Global ErrorHandler Middelware
app.use(errorHandler);



//server listen
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})