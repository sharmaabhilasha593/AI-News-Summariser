import express from "express"
import { registeruser,loginuser } from "../controllers/usercontroller.js"
import authmiddleware from "../middlewares/auth.js"
import { getprofile } from "../controllers/usercontroller.js"
import { profileupdate } from "../controllers/usercontroller.js"
const userRouter=express.Router() 
userRouter.post("/register",registeruser)
userRouter.post("/login",loginuser)

userRouter.get("/profile", authmiddleware, getprofile) 

userRouter.post("/profile/update", authmiddleware, profileupdate)

export default userRouter