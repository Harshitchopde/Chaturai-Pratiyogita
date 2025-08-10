import { Router } from "express";
import { login, oAuth, otpVerify, report, sendOtp, signUp } from "../controllers/Auth.js";
import { isInstructor, verifyAuth } from "../middlewares/auth.js";


const router = Router();

router.post("/login",login);
router.post("/signUp",signUp);
router.post("/sendOtp",sendOtp);
router.post("/oauth",oAuth)
router.post("/report",verifyAuth, report)
router.post("/otpVerify",otpVerify);
export default router;