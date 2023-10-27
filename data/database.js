import mongoose from "mongoose";
export const connectDb=()=>{
    mongoose.connect( process.env.MONGO,{
        dbName:"backendapi",
    })
    .then(()=>console.log("database connected"))
    .catch((e)=>console.log(e))
}