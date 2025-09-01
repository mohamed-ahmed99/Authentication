import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.routes.js";

// app.use
const app = express()
app.use(express.json())
app.use(cookieParser())



// .env
dotenv.config() // load .env file
const PORT = process.env.PORT // Port
const DB_URI = process.env.DB_URI // DB URI



//////// cors
const allowedOrigins = process.env.DOMAINS?.split(',') || []
app.use(cors({
    origin: (origin, callback) => {
        console.log(origin)
        if(!origin || allowedOrigins.includes(origin)) return callback(null, true); // postMan or allowed origin
        else return callback(new Error("Not allowed by CORS")); // origin has no access to this back-end 
    },
    methods:["GET", "POST", "PUT", "DELETE", 'PATCH'],
    credentials:true
}))



/////// routes
app.use('/api', usersRouter)




// Connect With DataBase
const ConnectDB = async () => {
    try{
        mongoose.set("strictQuery", false)
        await mongoose.connect(DB_URI)
        console.log('done')
    }
    catch(error){
        console.log(String(error))
        process.exit(1)
    }

}
ConnectDB()


app.get("/", (req, res) => {
  res.send("API is running...");
});
// app.listen(PORT, () => console.log(`server is running`))
export default app