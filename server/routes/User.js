import { Router } from "express";
import { login, report, sendOtp, signUp } from "../controllers/Auth.js";
import { isInstructor, verifyAuth } from "../middlewares/auth.js";


const router = Router();

router.post("/login",login);
router.post("/signUp",signUp);
router.post("/sendOtp",sendOtp);
router.post("/report",verifyAuth, report)
export default router;