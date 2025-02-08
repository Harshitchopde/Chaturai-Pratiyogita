import { Router } from "express";
import { getResultQuiz, submitQuiz } from "../controllers/Result.js";
import multer from "multer";
import { verifyAuth } from "../middlewares/auth.js";
const upload = multer();
const router = Router();

router.post("/submitQuiz",upload.none(),verifyAuth,submitQuiz)
router.post("/getResultQuiz",verifyAuth,getResultQuiz)
export default router;