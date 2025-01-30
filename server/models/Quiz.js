import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    quizName:{
        type:String,
        required:true,
        trim:true,
    },
    quizDesc:{
        type:String,
        trim:true,
    },
    timeDuration:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
    },
    topic:{
        type:String,
    },
    difficulty:{
        type:String,
        enum:["Any","Easy","Medium","Hard"],
        default:"Any",
        required:true,
    },
    numberOfQuestions:{
        type:Number,
        required:true,
    },
    questions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Question",
        }
    ],
    status:{
        type:String,
        enum:["Draft","Published"],
        required:true,
        default:"Draft",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default model("Quiz",quizSchema);

// analytics: {
//     attempts: {
//       type: Number,
//       default: 0, // Total attempts for the quiz
//     },
//     averageScore: {
//       type: Number,
//       default: 0, // Average score of all attempts
//     },
//     completionRate: {
//       type: Number,
//       default: 0, // Percentage of users completing the quiz
//     },
//   },