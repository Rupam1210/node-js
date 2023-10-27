import {User}from "../model/user.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../util/feature.js"

export const login= async(req,res,next)=>{
    try {
        const {email,password} =req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return  next(new Errorhandle("Invalid email or password",404))
     }
    const ismatch= await bcrypt.compare(password,user.password);
    if(!ismatch){
        return  next(new Errorhandle("Invalid Password",404))
     }
    sendCookie(user,res, `welecome back ${user.name}`,200);
   
        
    } catch (error) {
        console.log(error);
    }
    
}
export const register= async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email})
        if(user){
            return  next(new Errorhandle("User already exist",400))
         }
        const hashpas=await bcrypt.hash(password,10);
        
        user=await User.create({name,email,password:hashpas});

        sendCookie(user,res,`Registered Successfull`,201);
    } catch (error) {
        
    }
    
     
}
export const getmyprofile=  (req,res)=>{
    res.status(200).json({
        succes:true,
        user:req.user,
    })
}
export const logout= async(req,res,next)=>{

     res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
     })
     .json({
        succes:true,
        user:req.user,
    })
}