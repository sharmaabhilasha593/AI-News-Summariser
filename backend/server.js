import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port=3000;

// middlewares
app.use(cors())
// DB connection
connectDB();

// api endpoints
app.use("/images",express.static("uploads"))

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`

    )
})