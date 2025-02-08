import Quiz from "../models/Quiz.js";
import QuizResult from "../models/QuizResult.js";

export const submitQuiz = async(req,res)=>{
    // console.log("body : ",req.body);
    // console.log("user id : ",req.user.id)
    const { responses,quizId} = req.body;
    const userId = req.user.id; 
    const formatedResp = {...responses};
    console.log("req : ",responses);
    console.log("Formatd  ",formatedResp)
    try {
        
        if(!responses || !quizId){
            return res.status(400).json({
                success:false,
                message:"responses and QuizId required!"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not Exist!"
            })
        }
        if(quiz.maxAttempt <=0){
            return res.status(400).json({
                success:false,
                message:"Max Attempt reach "
            })
        }
        quiz["maxAttempt"]-=1;
        await quiz.save();
        console.log("Updated quiz ",quiz);
        const result  = await QuizResult.create({
            quizId,
            userId,
            responses:formatedResp,
        })
        console.log("REsult store : ",result)
        return res.status(201).json({
            success:true,
            message:"Submited Successfully!b",
            data:result.responses
        })


        // return res.status(00).json()
    } catch (error) {
        console.log("Error in submitQuiz-b ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"submitQuiz"
        })
    }
}
export const getResultQuiz = async(req,res)=>{
    // console.log("body : ",req.body);
    // console.log("user id : ",req.user.id)
    const { quizId} = req.body;
    const userId = req.user.id; 
  
    console.log("req : ",quizId,userId);
    
    try {
        
        if(!quizId){
            return res.status(400).json({
                success:false,
                message:"responses and QuizId required!"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not Exist!"
            })
        }
        
        
        const result = await QuizResult.findOne({
            quizId,
            userId
        })
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Quiz Result Not Found!"
            })
        }
        console.log("REsult store : ",result)
        return res.status(201).json({
            success:true,
            message:"Show Result Successfully!b",
            data:result.responses
        })
    } catch (error) {
        console.log("Error in getResultQuiz-b ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getResultQuiz"
        })
    }
}