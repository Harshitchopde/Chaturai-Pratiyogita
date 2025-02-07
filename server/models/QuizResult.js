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