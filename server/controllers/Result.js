import { useId } from "react";
import Quiz from "../models/Quiz.js";
import QuizResult from "../models/QuizResult.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const submitQuiz = async(req,res)=>{
    // console.log("body : ",req.body);
    // console.log("user id : ",req.user.id)
    const { responses,quizId} = req.body;
    const userId = req.user.id; 
    const formatedResp = {...responses};
    // console.log("req : ",responses);
    // console.log("Formatd  ",formatedResp)
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
        const resu = await QuizResult.findOne({quizId,userId});
        if(resu){
            return res.status(400).json({
                success:false,
                message:"Already Attempted!"
            })
        }
        const result  = await QuizResult.create({
            quizId,
            userId,
            responses:formatedResp,
        })
        // console.log("REsult store : ",result)
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
        console.log("quis : ",quiz.studentEnrolled)
        quiz.studentEnrolled.push(userId);
        console.log("co ",quiz.studentEnrolled)
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
    // console.log("body : ",req.body);
    // console.log("user id : ",req.user.id)
    const { quizId} = req.body;
    const userId = req.user.id; 
  
    // console.log("req : ",quizId,userId);
    
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
        // console.log("REsult store : ",result)
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