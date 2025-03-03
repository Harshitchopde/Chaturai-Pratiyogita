import Quiz from "../models/Quiz.js";
import QuizResult from "../models/QuizResult.js";
import User from "../models/User.js";

export const submitQuiz = async(req,res)=>{
    const { responses,quizId,timeTaken} = req.body;
    const userId = req.user.id; 
    const formatedResp = {...responses};
    try {
        
        if(!responses || !quizId){
            return res.status(400).json({
                success:false,
                message:"responses and QuizId required!"
            })
        }
        const quiz = await Quiz.findById(quizId).populate("questions");
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not Exist!"
            })
        }
        const resu = await QuizResult.findOne({quizId,userId});
        if(resu){
            return res.status(400).json({
                success:false,
                message:"Already Attempted!"
            })
        }
        const totalQuestions = quiz.questions.length;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let total = 0;
        let totalScore = 0;
        // console.log("Question : ",quiz)
        for(let question of quiz.questions){
            const userAnswer = responses[question._id];
            total+=question.points;
            if(!userAnswer){
                // skip the unanswer question
                continue;

            }
            if(question.correctAnswer.toString()===userAnswer){
                // right answer
                correctAnswers++;
                totalScore+=question.points;
            }else{
                wrongAnswers++;
            }
        }
        const result  = await QuizResult.create({
            quizId,
            userId,
            total,
            totalScore,
            timeTaken,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            responses:formatedResp,
        })
        // console.log("REsult store : ",result)
        return res.status(201).json({
            success:true,
            message:"Submited Successfully!b",
            data:result
        })
    } catch (error) {
        console.log("Error in submitQuiz-b ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"submitQuiz"
        })
    }
}
export const registerQuiz = async(req,res)=>{
    try {
        const {quizId} = req.body;
        const userId = req.user.id; 
        if(!quizId || !userId){
            return res.status(400).json({
                success:false,
                message:"Missing quizId or userId"
            })
        }

        const quiz = await Quiz.findOne({_id:quizId});
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not Exist!"
            })
        }
        if (!quiz.studentEnrolled) {
            quiz.studentEnrolled = []; // Initialize if undefined
        }
        const user = await User.findById(userId);
       
        console.log(quiz.studentEnrolled?.includes(userId))
        if(quiz.studentEnrolled?.includes(userId)){
            return res.status(200).json({
                        success:true,
                        message:"User Already Paid!"
            })
        }
       
        if(user.coins<quiz?.coins){
            return res.status(400).json({
                success:false,
                message:"You don't have Sufficient balance"
            })
        }
        if(quiz.coins){
            user.coins-=quiz.coins;
            await user.save();
        }
        quiz.studentEnrolled.push(userId);
        await quiz.save();
        return res.status(201).json({
            success:true,
            message:"Registered succesfully"
        })
        

    } catch (error) {
        console.log("Error in register-b ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"register quiz"
        })
    }
}
export const getResultQuiz = async(req,res)=>{
    const { quizId} = req.body;
    const userId = req.user.id; 
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
        return res.status(201).json({
            success:true,
            message:"Show Result Successfully!b",
            data:result
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