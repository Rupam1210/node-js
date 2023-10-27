import Errorhandle from "../middleware/error.js";
import { Task } from "../model/task.js";


export const newtask=async(req,res,next)=>{
    try {
        const {title,description}=req.body;
        await Task.create({
            title,
            description,
            user:req.user
        });
        res.status(201).json({
            success:true,
            message:"Task added"
        })
    } catch (error) {
        next(error)
    }
}
export const getmytask=async(req,res,next)=>{
    try {
         const userid=req.user._id;
         const tasks=await Task.find({user:userid});
         res.status(200).json({
            success:true,
            tasks,
         })
    } catch (error) {
        next(error)
    }
}
export const updateTask=async(req,res,next)=>{
    try {
        
         const task=await Task.findById(req.params.id);
         task.isCompleted=!task.isCompleted;
         if(!task){
            return  next(new Errorhandle("Task not found",404))
         }
         await task.save(); 
         res.status(200).json({
            success:true,
            message:"updated",
         })
    } catch (error) {
        next(error)
    }
}
export const deletetask=async(req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);
         task.isCompleted=!task.isCompleted;
         if(!task){
            return  next(new Errorhandle("Task not found",404))
         }
         await task.deleteOne(); 
        
         res.status(200).json({
            success:true,
            message:"deleted",
         })
    } catch (error) {
        next(error)
    }
}