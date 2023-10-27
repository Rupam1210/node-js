import express  from "express"
import { getmyprofile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router =express.Router();

router.post("/new",register);
router.post("/login",login);

router.get("/logout",logout);
router.get("/me",isAuthenticated,getmyprofile);

export default router;

export const task=express.Router();


 