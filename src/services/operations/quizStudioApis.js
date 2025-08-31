import { data } from "autoprefixer";
import { quizEndPoints, quizStudioEndPoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnectors";


const {
    CREATE_QUIZ_WITH_QUESTIONS
} = quizStudioEndPoints

// CREATE QUIZ WITH QUESTIONS

export const createQuizWithQuestions = async(data,token)=>{
    console.log("DATA SEND: ",data)
    const toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("POST",CREATE_QUIZ_WITH_QUESTIONS,data,{
              Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
        })
        console.log("RESPONSE: 0",res.data);
        if(!res?.data?.success){
            throw new Error(res.data.message);
        }

    } catch (error) {
        console.log("Error in createQuiz-f ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    
}