import mongoose from "mongoose";
export const connectDb=()=>{
    mongoose.connect( process.env.MONGO,{
        dbName:"backendapi",
    })
    .then((c)=>console.log(`database connected with ${c.connection.host}`))
    .catch((e)=>console.log(e))
}