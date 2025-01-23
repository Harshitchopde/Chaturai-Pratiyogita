import { Schema, model } from "mongoose";

const profileSchema = new Schema({
    gender:{
        type:String,
        enum:["Male","Female","Neutral"],
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
    },
    constactNumber:{
        type:String,
    }
})

export default model("Profile",profileSchema);