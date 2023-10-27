import express from "express";
import { deletetask, getmytask, newtask, updateTask } from "../controller/task.js";
import { isAuthenticated } from "../middleware/auth.js";
const router=express.Router();

router.post("/new",isAuthenticated,newtask)
router.get("/my",isAuthenticated,getmytask)

router
 .route("/:id")
 .put(isAuthenticated,updateTask)
 .delete(isAuthenticated,deletetask)

export default router;