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
import productRoutes from "./routes/productRoute.js"

//static files
app.use("/uploads", express.static("uploads"))

//Using routes
app.use("/api/v1/", userRoutes)
app.use("/api/v1/", productRoutes)


app.listen(port,() => {
    console.log(`Server is running in port ${port}`);;
    connectDB()
    
})