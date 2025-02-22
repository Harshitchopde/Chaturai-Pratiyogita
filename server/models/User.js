import { Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName:{
        required:true,
        type:String,
        trim:true,
    },
    lastName:{
        required:true,
        type:String,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    contactNumber:{
        type:String
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
        default:"Student"
    },
    additionalDetails:{
        type:Schema.Types.ObjectId,
        ref:"Profile",
        req:true,
    },
    coins:{
        type:Number,
        default:50,  
        min:0,      
    },
    image:{
        type:String,
        req:true,
    },
    token:{
        type:String,
    },
    quizzes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quiz"
        }
    ]
})

export default model("User",userSchema);