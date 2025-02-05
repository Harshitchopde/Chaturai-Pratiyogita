import { Schema, model } from "mongoose";
const optionSchema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true, default: false },
});
const questionSchema = new Schema({
    questionDesc:{
        type:String,
        required:true,
    },
    options:[
        optionSchema
    ],
    quizId:{
        type:Schema.Types.ObjectId,
        ref:"Quiz"
    },
    correctAnswer:{
        type:Schema.Types.ObjectId,
        ref:"Option",
        required:true,
    },

    points:{
        type:Number,
        default:1
    },
    questionType:{
        type:String,
        enum:["MCQ","truefalse","multiMCQ"],
        default:"MCQ"
    },
    explanation: {
        type:String,
    }
})

export default model("Question",questionSchema);