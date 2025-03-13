import express from 'express';
import dotenv from 'dotenv';
import  connectDB  from './database/db.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 5500;

//Middle ware
app.use(express.json())

//imports routes
import userRoutes from "./routes/userRoute.js"

//Using routes
app.use("/api/v1/", userRoutes)


app.listen(port,() => {
    console.log(`Server is running in port ${port}`);;
    connectDB()
    
})