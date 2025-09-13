
import {  quizStudioEndPoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnectors";


const {
    CREATE_QUESTIONS_API
} = quizStudioEndPoints

// CREATE QUIZ WITH QUESTIONS

export const createQuestions = async(data,token)=>{
    console.log("DATA SEND: ",data)
    const datastr = JSON.stringify(data)
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const res = await apiConnector("POST",CREATE_QUESTIONS_API,datastr,{
              Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        })
        console.log("RESPONSE: 0",res.data);
        if(!res?.data?.success){
            throw new Error(res.data.message);
        }
        result = res.data.updatedQuiz;
        

    } catch (error) {
        console.log("Error in createQuiz-f ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
    
}