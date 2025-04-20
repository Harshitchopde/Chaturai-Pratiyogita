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
        required:true
    },
    quizType:{
        type:String,
        trim:true,
        enum:["Regular","Survey","Multi","Mini"],
        default:"Regular",
    },
    verifyed:{
        type:Boolean,
        required:true,
        default:false,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,

    },
    timeDuration:{
        type:Number,
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
        
    },
    studentEnrolled:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    coins:{
        type:Number,
        default:1,
        min:0,
        max:5,
        required:true,
    },
    questions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Question",
        }
    ],
    maxAttempt:{
        type:Number,
        default:1,
    },
    quizzes:{
        type:Schema.Types.ObjectId,
        ref:"Quiz"
    },
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