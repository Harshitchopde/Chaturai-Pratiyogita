import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";

export const createQuestion  = async(req,res)=>{
    try {
        const {quizId,questionDesc,options:_options,
            correctAnswer,points,explanation
        } = req.body;
        let {questionType} = req.body;
        const quiz = await Quiz.findById(quizId);
        const option = JSON.parse(_options);
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:`Could Not Found Quiz ${quizId}` 
            })
        }
        if(!questionType || questionType===undefined){
            questionType = "MCQ"
        }
        // validate
        if(!questionDesc || !option || !correctAnswer){
            return res.status(400).json({
                success:false,
                message:"Some Field are missing!"
            })
        }
        // create Question
        const question = await Question.create({
            quizId,
            options:option,
            points,
            questionType,
            questionDesc,
            correctAnswer,
            explanation
        });

        // add question to quiz 
        const updatedQuiz =  await Quiz.findByIdAndUpdate(quizId,{
            $push:{
                questions:question._id
            }
        },{new:true}).populate("questions").populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"Question Added!",
            updatedQuiz
        })
    } catch (error) {
        console.log("Error in createQuestion ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"createQuestion"
        })
    }
}
export const updateQuestion  = async(req,res)=>{
    try {
        const {questionId,...other} = req.body;
        console.log("Other Details : ",other);
        const question = await Question.findById(questionId);
        if(!question){
            return res.status(400).json({
                success:false,
                message:"Question not found!"
            })
        }
        console.log("Ques ",question);
        for(const key of Object.keys(other)){
            if(other.hasOwnProperty(key)){
                if(key==="options"){
                    question[key] = JSON.parse(other[key]);
                }else{
                    question[key] = other[key];
                }
            }
        }
        // save questions
        await question.save();
        const updatedQuiz =  await Quiz.findById(question.quizId).populate("questions").populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"Update Question Successfully!",
            updatedQuiz
        })

    } catch (error) {
        console.log("Error in updateQuestion ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"updateQuestion"
        })
    }
}

export const deleteQuestion  = async(req,res)=>{
    try {
        const { questionId } = req.body;

        const ques = await Question.findById(questionId);
        if(!ques){
            return res.status(400).json({
                success:false,
                message:"Question Not Found!"
            })
        }
        

        const updatedQuiz = await Quiz.findByIdAndUpdate(ques.quizId,{
            $pull:{
                questions:ques._id
            }
        },{new:true}).populate("questions").populate("instructor").exec();
        await Question.findByIdAndDelete(ques._id);
        return res.status(200).json({
            success:true,
            message:"SuccessFully Delete Question",
            
        })
        
    } catch (error) {
        console.log("Error in deleteQuestion ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"deleteQuestion"
        })
    }
}

export const getQuestionDetails  = async(req,res)=>{
    try {
        const {quizId} = req.body;
        const quiz = await Quiz.findById({_id:quizId});
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not found!"
            })
        }
        return res.status(200).json({
            success:true,
            message:"in process",
        
        })
    } catch (error) {
        console.log("Error in getQuestionDetails ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getQuestionDetails"
        })
    }
}
export const getAllQuestions  = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("Error in getAllQuestions ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getAllQuestions"
        })
    }
}

export const getQuizQuestions  = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("Error in getQuizQuestions ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getQuizQuestions"
        })
    }
}