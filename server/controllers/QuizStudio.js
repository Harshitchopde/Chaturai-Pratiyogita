import Quiz from "../models/Quiz.js";
import { createQuestion, deleteQuestion, updateQuestion } from "../services/questionService.js";

export const questionsCreate = async (req, res) => {
  try {
    // console.log("Qustcreate: ",req.body)
    const {quizId, inserts = [], deletes = [], updates = [] } = req.body;
    // console.log("QuizId: ",quizId)
    let createResults = [];
    let updateResults = [];
    let deleteResults = [];
    
    if(!quizId){
        return res.status(400).json({
            success:false,
            message:"Quiz Id required!"
        })
    }
    const quiz = Quiz.findById(quizId);
    if(!quiz){
         return res.status(400).json({
            success:false,
            message:"Quiz not found!"
        })
    }
   // CREATE
    createResults = inserts.length
      ? await Promise.all(
          inserts.map(async (insert) => {
            try {
                const data = {...insert,quizId} ;
              const result = await createQuestion({ body: data});
              return { success: result };
            } catch (error) {
              return { success: false, error: error.message || error.toString() };
            }
          })
        )
      : [];
    // UPDATE
    updateResults = updates.length
      ? await Promise.all(
          updates.map(async (update) => {
            try {
              const result = await updateQuestion({ body: {...update,quizId} });
              return { success: result };
            } catch (error) {
              return { success: false, error: error.message || error.toString() };
            }
          })
        )
      : [];

   
    // DELETE
    deleteResults = deletes.length
      ? await Promise.all(
          deletes.map(async (delId) => {
            try {
              const result = await deleteQuestion({ body: { questionId: delId } });
              return { success:  result };
            } catch (error) {
              return { success: false, error: error.message || error.toString() };
            }
          })
        )
      : [];


    // console.log("Success: ",{
    //   success: true,
    //   message: "Processed question operations",
    //   createResults,
    //   updateResults,
    //   deleteResults,
    // })

    const updatedQuiz = await Quiz.findById(quizId)
    .populate("questions")
    .populate("instructor")
    .exec();


        //   .populate("questions")
    //   .populate("instructor")
    //   .exec();
    console.log("Updated quiz: ",updatedQuiz)
    return res.status(200).json({
      success: true,
      message: "Processed question operations",
      createResults,
      updateResults,
      deleteResults,
      updatedQuiz,
    });
  } catch (error) {
    console.log("Error in questionsCreate", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
