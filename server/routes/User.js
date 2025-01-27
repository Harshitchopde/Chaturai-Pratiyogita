import { Router } from "express";
import { login, sendOtp, signUp } from "../controllers/Auth.js";


const router = Router();

router.post("/login",login);
router.post("/signUp",signUp);
router.post("/sendOtp",sendOtp);

export default router;