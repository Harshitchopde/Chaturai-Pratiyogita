import { Router } from "express";
import { questionsCreate } from "../controllers/QuizStudio.js";
import { isInstructor, verifyAuth } from "../middlewares/auth.js";


const router = Router();

// router.post("/createQuestions",createQuestions)
router.post("/questionsCreate",verifyAuth,isInstructor,questionsCreate)
export default router;