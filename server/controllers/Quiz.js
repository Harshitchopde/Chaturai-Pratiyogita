import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
import Question from "../models/Question.js";

export const createQuiz = async(req,res)=>{
    console.log("CREATE QUIZ")
    try {
       
        console.log("Data ",req.body)
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
    
        console.log("tags ",tag)
        // validate
        if(!quizName || !quizDesc || !timeDuration){
            return res.status(400).json({
                success:false,
                message:"Some Field missing!"
            })
        }
        // check for instructor
        const userId = req.user.id;
        const instructor = await User.findById(userId,{
            accountType:"Instructor"
        })
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

        console.log("Data : ",quiz);
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
    console.log("UPDATE QUIZ")
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

        console.log("Update",updated)
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
        let attempted = quizDetails.studentEnrolled.map((id)=>id.toString()).includes(userId);
        // console.log("Studen enrlod ",quizDetails.studentEnrolled);
        
        const updatedQuiz = {...quizDetails.toObject(),attempted};
        console.log("user ",updatedQuiz)
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
        // console.log("user : ",req.user)
        const userId= req.user.id;
        const quizzesAll = await Quiz.find({
            status:"Published"
        }).populate("instructor")
        .populate("studentEnrolled")
        .exec();
        const updatedQuiz = quizzesAll.map((quiz)=>({
            ...quiz.toObject(),
            attempted: quiz.studentEnrolled.some((user)=>{
            //    console.log("QQ ",user)
             console.log("QMT : ",user._id,userId)
               if(user._id.toString()===userId){
                console.log("user string ")
                  return true;
               }
               return false;

            })
        }))
        console.log("UpdatedQuiz : ",updatedQuiz)
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
