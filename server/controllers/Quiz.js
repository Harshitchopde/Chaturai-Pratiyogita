import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
import Question from "../models/Question.js";
import QuizResult from "../models/QuizResult.js";


export const createQuiz = async(req,res)=>{
    try {
        // get data of quiz
        const {quizName,
            quizDesc,
            numberOfQuestions,
            timeDuration,
            tags:_tag,
            topic,
            difficulty
        } = req.body;
        let { status} = req.body;
        
        const tag = JSON.parse(_tag);

        // validate
        if(!quizName || !quizDesc || !timeDuration){
            return res.status(400).json({
                success:false,
                message:"Some Field missing!"
            })
        }
        // check for instructor
        const userId = req.user.id;
        const instructor = await User.findOne({
            _id:userId,
            accountType:"Instructor"
        })
        instructor.coins+=10;
        await instructor.save();
        if(!instructor){
            return res.status(400).json({
                success:false,
                message:"Instructor not Found!"
            })
        }
        // status draft default 
        if(!status || status==undefined){
            status = "Draft"
        }
        // create quiz
        const quiz = await Quiz.create({
            quizName,
            quizDesc,
            difficulty,
            status,
            timeDuration,
            instructor:instructor._id,
            numberOfQuestions,
            tags:tag,
            topic
        })
        // add Quiz to Instructor
        await User.findByIdAndUpdate({_id:instructor._id},{
            $push :{
                quizzes:quiz._id
            }
        })

        // console.log("Data : ",quiz);
        return res.status(200).json({
            success:true,
            message:"SuccessFull Creation",
            data:quiz
        })
    } catch (error) {
        console.log("Error in createQuiz ",error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
export const updateQuiz = async(req,res)=>{
    // console.log("UPDATE QUIZ")
    try {
        // get updated data
        const { quizId} = req.body;
        const updated = req.body;
        const quiz = await Quiz.findById({_id:quizId});
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not found!"
            })
        }

        // console.log("Update",updated)
        for(const key in updated){
            // not make sense below line
            if(updated[key]){
                if(key==="tags"){
                    quiz[key] = JSON.parse(updated[key]);
                }else{
                    quiz[key] = updated[key];
                }
            }
        }
        // quiz detail
        // save
        await quiz.save();
        const updatedQuiz = await Quiz.findById(quiz._id)
                .populate({
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                })
                .populate("questions")
                .exec();
        return res.status(200).json({
            success:true,
            message:"Updated SuccessFully!",
            data:updatedQuiz
        })

    } catch (error) {
        console.log("Error in updateQuiz ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"updateQuiz"
        })
    }
}
export const updateOnlyQuiz = async(req,res)=>{
    // console.log("UPDATE updateOnlyQuiz")
    try {
        // get updated data
        const { quizId} = req.body;
        const updated = req.body;
        const quiz = await Quiz.findById({_id:quizId});
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not found!"
            })
        }

        // console.log("Update",updated)
        for(const key in updated){
            // not make sense below line
            if(updated[key]){
                if(key==="tags"){
                    quiz[key] = JSON.parse(updated[key]);
                }else{
                    quiz[key] = updated[key];
                }
            }
        }
        // quiz detail
        // save
        await quiz.save();
    
        return res.status(200).json({
            success:true,
            message:"Updated SuccessFully!",
        })

    } catch (error) {
        console.log("Error in updateOnlyQuiz ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"updateOnlyQuiz"
        })
    }
}
export const deleteQuiz = async(req,res)=>{
    try {
        const { quizId} = req.body;
        const userId = req.user.id;
        const quiz = await Quiz.findById({_id:quizId});
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:`Quiz Not found with id ${quizId}` 
            })
        }

        // unenrolled student form quiz
        let enrolledStudent = quiz.studentEnrolled;
        for(const studentId of enrolledStudent){
            await User.findByIdAndUpdate(studentId,{
                $pull:{
                    quizzes:quizId
                }
            })
        }
        let ques = quiz.questions;
        for(const quesId of ques){
            await Question.findByIdAndDelete(quesId);
        }

        await Quiz.findByIdAndDelete(quizId);
        return res.status(200).json({
            success:true,
            message:"Delete SuccessFully"
        })
    } catch (error) {
        console.log("Error in deleteQuiz ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"deleteQuiz"
        })
    }
}
export const getQuizDetails = async(req,res)=>{
    try {
        // only one Quiz by id
        const {quizId} = req.body;
        const userId = req.user.id
    
        const quizDetails  = await Quiz.findById(quizId)
                    .populate("questions")
                    .populate({
                        path:"instructor",
                        populate:{
                            path:"additionalDetails"
                        }
                    })
                    .exec();
        if(!quizDetails){
            return res.status(400).json({
                success:false,
                message:"Quiz Details Not Found!"
            })
        }
        let register = quizDetails.studentEnrolled.map((id)=>id.toString()).includes(userId);
        const results  = await QuizResult.findOne({quizId,userId});
        let attempted = 1
        if(results){
            attempted = 3
        }else if(register){
            attempted = 2
        }
        const updatedQuiz = {...quizDetails.toObject(),attempted};
        return res.status(200).json({
            success:true,
            message:`Quiz Details of ${quizId}`,
            data:{
                quiz:updatedQuiz
            }
        })
    } catch (error) {
        console.log("Error in getQuizDetails ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getQuizDetails"
        })
    }
}
export const getAllQuiz = async(req,res)=>{
    try {
        const userId= req.user.id;
        const quizzesAll = await Quiz.find({
            status:"Published"
        }).populate("instructor")
        .populate("studentEnrolled")
        .exec();
        const updatedQuiz = await Promise.all(
            quizzesAll.map(async(quiz)=>{
                const isRegister = quiz.studentEnrolled.some(
                    (user)=> user._id.toString()=== userId
                );
                const result = await QuizResult.findOne({quizId:quiz._id,userId});
                // console.log("quiz : ",isRegister)
                let attempted = 1;
                if(result){
                    attempted = 3;
                }else if(isRegister){
                    attempted = 2;
                }
                return {...quiz.toObject(),attempted}
            })
        )
        // console.log("UpdatedQuiz : ",updatedQuiz)
        return res.status(200).json({
            success:true,
            message:"Get All Quizzes",
            data:updatedQuiz
        })
    } catch (error) {
        console.log("Error in getAllQuiz ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"getAllQuiz"
        })
    }
}
export const getInstructorQuiz = async(req,res)=>{
    try {
        const userId = req.user.id;
        const instructorQuiz = await Quiz.find({
            instructor:userId
        });
        // console.log("Instructor Quiz : ",instructorQuiz);

        return res.status(200).json({
            success:true,
            message:"SuccessFully Get InstructorQuiz",
            data:instructorQuiz
        })
    } catch (error) {
        console.error("Error occure in getInstructorQuiz : ",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const instructorAnalysis = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {quizId} = req.body;
        const instructorQuiz = await Quiz.findOne({
            instructor:userId,
            _id:quizId
        }).populate("instructor")
        .populate("studentEnrolled")
        .populate("questions");
        // console.log("Instructor Quiz : ",instructorQuiz);
        if(!instructorQuiz){
            return res.status(400).json({
                success:false,
                message:"Quiz not Present"
            })
        }
        return res.status(200).json({
            success:true,
            message:"SuccessFully instructorAnalysis",
            data:instructorQuiz
        })
    } catch (error) {
        console.error("Error occure in instructorAnalysis : ",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const verifyTheQuiz = async(req,res)=>{
    try {
        const { quizId} = req.body;
        if(!quizId){
            return res.status(400).json({
                success:false,
                message:"Quiz Id Not Found!"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(400).json({
                success:false,
                message:"Quiz Not Found!"
            })
        }
        quiz.verifyed = true;
        await quiz.save();
        return res.status(200).json({
            success:true,
            message:`Verify the Quiz: ${quiz._id}`
        })
    } catch (error) {
        console.log("Error in verifyTheQuiz ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
            errorIn:"verifyTheQuiz"
        })
    }
}