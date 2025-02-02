import toast from "react-hot-toast";
import { questionEndPoints } from "../apis.js";
import { apiConnector } from "../apiconnectors.js";

const {
    CREATE_QUESTION_API,
    UPDATE_QUESTION_API,
    DELETE_QUESTION_API,
    GET_QUESTION_DETAILS_API,
    GET_ALL_QUESTION_API,
    GET_QUIZ_QUESTIONS_API
} = questionEndPoints;

// CREATE_QUESTION_API,
export const createQuestion = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    const result = [];
    try {
        const response = await apiConnector("POST",CREATE_QUESTION_API,data,{
             Authorization:`Bearer ${token}`
        })
        console.log("CREATE QUESTION RESPONSE... ",response);
        if(!response?.data?.success){
            throw new Error("Could Not CreateQuestion");
        }
        result = response.data.updatedQuiz
        toast.success(response.data.message);
    } catch (error) {
        console.log("Error in createQuestion ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// UPDATE_QUESTION_API,
export const updateQuestion = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    const result = [];
    try {
        const response = await apiConnector("POST",DELETE_QUESTION_API,data,{
             Authorization:`Bearer ${token}`
        })
        console.log("CREATE QUESTION RESPONSE... ",response);
        if(!response?.data?.success){
            throw new Error("Could Not CreateQuestion");
        }
        result = response.data.updatedQuiz
        toast.success(response.data.message);
    } catch (error) {
        console.log("Error in createQuestion ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// DELETE_QUESTION_API,
export const deleteQuestion = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST",DELETE_QUESTION_API,data,{
             Authorization:`Bearer ${token}`
        })
        console.log("CREATE QUESTION RESPONSE... ",response);
        if(!response?.data?.success){
            throw new Error("Could Not CreateQuestion");
        }
        // result = response.data.updatedQuiz
        toast.success(response.data.message);
    } catch (error) {
        console.log("Error in createQuestion ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    // return result;
}
// GET_QUESTION_DETAILS_API,
// GET_ALL_QUESTION_API,
// GET_QUIZ_QUESTIONS_API