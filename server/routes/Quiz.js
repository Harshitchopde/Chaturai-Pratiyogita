import { Router } from "express";
import { isInstructor, verifyAuth } from "../middlewares/auth.js";
import { createQuiz, deleteQuiz, getAllQuiz, getQuizDetails, updateQuiz } from "../controllers/Quiz.js";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionDetails, updateQuestion } from "../controllers/Question.js";


const router = Router();
// ********************************************************************************************************
//                                      Quiz ( Only Instructor)
// ********************************************************************************************************

// createQuiz
router.post("/createQuiz",verifyAuth,isInstructor,createQuiz);
// updateQuiz
router.post("/updateQuiz",verifyAuth,isInstructor,updateQuiz);
// deleteQuiz
router.post("/deleteQuiz",verifyAuth,isInstructor,deleteQuiz);

// ********************************************************************************************************

// getQuizDetails ->Specific quiz
router.get("/getQuizDetails",getQuizDetails);
// getAllQuiz
router.get("/getAllQuiz",getAllQuiz);

// ********************************************************************************************************
//                                      Question (Only Instrutor)
// ********************************************************************************************************

// createQuestion
router.post("/createQuestion",verifyAuth,isInstructor,createQuestion)
// updateQuestion
router.post("/updateQuestion",verifyAuth,isInstructor,updateQuestion)
// deleteQuestion
router.post("/deleteQuestion",verifyAuth,isInstructor,deleteQuestion)
// ********************************************************************************************************

// getQuestionDetails -> Specific Question
router.get("/getQuestionDetails",getQuestionDetails)
// getAllQuestions
router.get("/getAllQuestions",getAllQuestions)
// getQuizQuestions  -> all the questions in the particulte quiz (future )
// router.get()
export default router;