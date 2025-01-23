import mongoose from "mongoose";

export const dbConnect = async ()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to DataBase MongoDB");
    }).catch((err)=>{
        console.log("Error while connecting to db : ",err)
    })
}