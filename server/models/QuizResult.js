import mongoose, { model, Schema } from "mongoose";

const quizResultSchema = new Schema({
    quizId:{
        type:Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    userId:{
        type:String,
        ref:"User",
        required:true,
    },
    totalQuestions:{
        type:Number,
    },
    correctAnswers:{
        type:Number
    },
    wrongAnswers:{
        type:Number
    },
    totalScore:{
        type:Number,
    },
    timeTaken:{
        type:Number
    },
    total:{
        type:Number,
    },
    responses:{
        type:Map,
        of:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default model("QuizResult",quizResultSchema);