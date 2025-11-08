import jwt from "jsonwebtoken"

const authmiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        // while creating the token in usercontroller.js we passed id in the token so on decoding we will get id in token decode
        req.user={userid:token_decode._id}
        next(); 
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:"Error"})
    }
}

export default authmiddleware