import usermodel from "../models/usermodels.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"

// loginuser
export const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await usermodel.findOne({email:email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        // check if password matches
        const ismatch=await bcrypt.compare(password,user.password);
        
        if(!ismatch){
            return res.json({success:false,message:"Invalid password"})
        }
        // if password exist then create a token and send to the user
        const token=createToken(user._id);
        res.json({success:true,token:token,message:"User Logged in"})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:"Error logging in"})
    }
}

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET)
}
// Register user
export const registeruser=async(req,res)=>{
    const {name,email,password}=req.body
    try{
        // check if user already exist
        const exists=await usermodel.findOne({email:email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        else{
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"Invalid email"})
            }
            // hash password
            const hash=await bcrypt.hash(password,10);
            const newuser=new usermodel({
                name:name,
                password:hash,
                email:email
            })
            const user=await newuser.save();
            const token=createToken(user._id);
            res.json({success:true,token:token,message:"User registered"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error in registering user"})
    }
}




export const getprofile = async (req, res) => {
    const userId = req.user.userid; 
    try {
        const user = await usermodel.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }
        // Return the user data, including name, email (fixed) and preferences (editable/fixed)
        res.json({ success: true, user: user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error fetching profile." });
    }
}

export const profileupdate = async(req,res)=>{
    const userId = req.user.userid; 
    
    // Data received from the frontend
    const { 
        username, 
        country, 
        profileImage
    } = req.body; 


    if (!username || !country) {
        return res.json({ success: false, message: "Username and Country are required." });
    }

    try{
        const updatePayload = {
            username: username,
            country: country,
            profileImage: profileImage,
        };

        // 2. Find the user by ID and update the document
        const updatedUser = await usermodel.findByIdAndUpdate(
            userId,
            updatePayload,
            { new: true, runValidators: true } 
        ).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return res.json({ success: false, message: "User not found or update failed." });
        }

        res.json({ 
            success: true, 
            message: "Profile updated successfully!",
            user: updatedUser
        })
    }
    catch(error){
        console.log(error.message);
        res.json({ success: false, message: "An error occurred during profile update." });
    }
}