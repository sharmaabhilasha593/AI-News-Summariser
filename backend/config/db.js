import mongoose, { mongo } from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Database connected")
    }).catch((error)=>{
        console.log("Error connecting DB",error.message)
    })
}