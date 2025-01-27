import express from "express"
import "dotenv/config"

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    return res.json({
        message:"Up and Running",
        status:200,
    })
})

app.listen(PORT,()=>{
    console.log("Server is running")
})