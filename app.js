import express from "express";
import cors from "cors";
import{config} from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.js' 
import taskRouter from './routes/task.js' 
import { errormiddleware } from "./middleware/error.js";
 



 


export const app =express();



config({
    path:"./data/confirg.env",
});

//using middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)
 
// app.use("/api/v1/task")
 


app.get("/",(req,res)=>{
    res.send("nice working")
})

app.use(errormiddleware);