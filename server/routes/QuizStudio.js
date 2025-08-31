import { Router } from "express";
import { createQuizWithQuestions } from "../controllers/QuizStudio.js";


const router = Router();

router.post("/createQuizWithQuestions",createQuizWithQuestions)
export default router;