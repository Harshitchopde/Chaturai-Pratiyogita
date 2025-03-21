import { Router } from "express";
import { isAdmin, isInstructor, verifyAuth } from "../middlewares/auth.js";
import { createQuiz, deleteQuiz, getAllQuiz, getInstructorQuiz, getQuizDetails, instructorAnalysis, notifyQuiz, updateOnlyQuiz, updateQuiz, verifyTheQuiz } from "../controllers/Quiz.js";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionDetails, updateQuestion } from "../controllers/Question.js";
import multer from "multer";
const upload = multer();
const router = Router();
// ********************************************************************************************************
//                                      Quiz ( Only Instructor)
// ********************************************************************************************************

// createQuiz
router.post("/createQuiz",upload.none(), verifyAuth,isInstructor,createQuiz);
// updateQuiz
router.post("/updateQuiz",upload.none(),verifyAuth,isInstructor,updateQuiz);
// update only
router.post("/updateOnlyQuiz",upload.none(),verifyAuth,isInstructor,updateOnlyQuiz);
// deleteQuiz
router.post("/deleteQuiz",verifyAuth,isInstructor,deleteQuiz);

// ********************************************************************************************************

// getQuizDetails ->Specific quiz
router.post("/getQuizDetails",verifyAuth,getQuizDetails);
// getAllQuiz
router.get("/getAllQuiz",verifyAuth,getAllQuiz);

router.get("/getInstructorQuiz",verifyAuth,isInstructor,getInstructorQuiz);
// get Single Analitics quiz
router.post("/instructorAnalysis",verifyAuth,isInstructor,instructorAnalysis);
// ********************************************************************************************************
//                                      Question (Only Instrutor)
// ********************************************************************************************************

// createQuestion
router.post("/createQuestion",upload.none(),verifyAuth,isInstructor,createQuestion)
// updateQuestion
router.post("/updateQuestion",upload.none(),verifyAuth,isInstructor,updateQuestion)
// deleteQuestion
router.post("/deleteQuestion",verifyAuth,isInstructor,deleteQuestion)
// ********************************************************************************************************

// getQuestionDetails -> Specific Question
router.get("/getQuestionDetails", getQuestionDetails)
// getAllQuestions
router.get("/getAllQuestions",getAllQuestions)
// getQuizQuestions  -> all the questions in the particulte quiz (future )
// router.get()
// notifyQuiz 
router.post("/notifyQuiz",verifyAuth,isInstructor,notifyQuiz)
router.post("/verify",verifyAuth,isAdmin,verifyTheQuiz)
export default router;  