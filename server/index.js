import express from "express"
import "dotenv/config"
import cors from "cors"
import { dbConnect} from "./config/database.js"
import cookieParser from "cookie-parser";

// routers 
import userRouter from "./routes/User.js"
import quizRouter from "./routes/Quiz.js"
import resultRouter from "./routes/Result.js"
import quizStudioRouter from "./routes/QuizStudio.js"
import serverless from "serverless-http";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
// cors
app.use(cors({
    origin: [
      "https://chaturai-pratiyogita.vercel.app",
      "http://localhost:3000",
      "https://chaturai-pratiyogita-git-main-harshitchopdes-projects.vercel.app",
      "https://chaturai-pratiyogita-memz694rj-harshitchopdes-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));
// cookieParser --> cookie-parser
app.use(cookieParser())

// all connection
dbConnect();

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/quiz",quizRouter);
app.use("/api/v1/res",resultRouter);
app.use("/api/v1/quiz-studio",quizStudioRouter);
app.get("/",(req,res)=>{
    return res.json({
        message:"Up and Running",
        status:200,
    })
})

// export const handler = serverless(app)
app.listen(PORT,()=>console.log("SErverRunning... at http://localhost:4000/"))
export const handler = async (event,context)=>{
    context.callbackWaitsForEmptyEventLoop  = false; // Prevents Lambda from closing DB connection
    return serverless(app)(event,context);
}
// app.listen(PORT,()=>{
//     console.log("Server is running "+PORT) 
// })