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
        connectTimeoutMS: 10000, // Reduce connection timeout to 5s
        socketTimeoutMS: 20000, // Allow 10s before closing connection
        serverSelectionTimeoutMS: 10000, // Prevent infinite waiting
        tls:true
    }).then(()=>{
        isConnected = true;
        console.log("Connected to DataBase MongoDB");
    }).catch((err)=>{
        console.log("Error while connecting to db : ",err)
    })
}