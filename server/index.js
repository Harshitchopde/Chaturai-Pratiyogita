import express from "express"
import "dotenv/config"
import cors from "cors"
import { dbConnect} from "./config/database.js"
import cookieParser from "cookie-parser";

// routers 
import userRouter from "./routes/User.js"
import quizRouter from "./routes/Quiz.js"
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
// cors
app.use(cors({
    // origin:"http://localhost:3000",
    credentials:true,
}));
// cookieParser --> cookie-parser
app.use(cookieParser())

// all connection
dbConnect();

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/quiz",quizRouter);

app.get("/",(req,res)=>{
    return res.json({
        message:"Up and Running",
        status:200,
    })
})

app.listen(PORT,()=>{
    console.log("Server is running "+PORT)
})