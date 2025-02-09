import mongoose from "mongoose";

let isConnected = false; // Track connection state
export const dbConnect = async ()=>{
    if (isConnected) {
        console.log("✅ Using existing database connection");
        return;
    }
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        ssl:true
    }).then(()=>{
        isConnected = true;
        console.log("Connected to DataBase MongoDB");
    }).catch((err)=>{
        console.log("Error while connecting to db : ",err)
    })
}