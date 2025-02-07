import { Router } from "express";
import { submitQuiz } from "../controllers/Result.js";
import multer from "multer";
import { verifyAuth } from "../middlewares/auth.js";
const upload = multer();
const router = Router();

router.post("/submitQuiz",upload.none(),verifyAuth,submitQuiz)


export default router;