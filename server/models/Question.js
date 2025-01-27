import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    questionDesc:{
        type:String,
        required:true,
    },
    options:{
        type:[String],
    },
    correctAnswer:{
        type:String,
        required:true,
    },
    questionType:{
        type:String,
        enum:["MCQ","truefalse","multiMCQ"],
        default:"MCQ"
    },
    answerDesc: {
        type:String,
    }
})

export default model("Question",questionSchema);