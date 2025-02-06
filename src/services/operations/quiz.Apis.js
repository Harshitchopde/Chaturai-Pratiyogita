import toast from "react-hot-toast";
import { quizEndPoints} from "../apis.js"
import { apiConnector } from "../apiconnectors.js";
import { data } from "autoprefixer";

const {
    CREATE_QUIZ_API,
    UPDATE_QUIZ_API,
    DELETE_QUIZ_API,
    GET_QUIZ_DETAILS_API,
    GET_ALL_QUIZ_API
} = quizEndPoints;

// CREATE_QUIZ_API,
export const createQuiz = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    console.log("Data client ",data.get("quizName"))
    try {
        const response = await apiConnector("POST",CREATE_QUIZ_API,data,{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
        })
        console.log("CREATE QUIZ RESPONSE... ",response.data);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success("Created Quiz Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("Error in createQuiz-f ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
// UPDATE_QUIZ_API,
export const updateQuiz = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST",UPDATE_QUIZ_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,
        })
        console.log("UPDATE QUIZ RESPONSE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success("UPDATED Quiz Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("Error in updateQuiz-f ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
// DELETE_QUIZ_API,
export const deleteQuiz = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    try {
        const res = await apiConnector("POST",DELETE_QUIZ_API,{
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETED QUIZ RESPONSE..... ",res);
        if(!res?.data?.success){
            throw new Error(res.data.message);
        }
        toast.success(res.data.message);
    } catch (error) {
        console.log("Error in deleteQuiz ",error);
        toast.error(error.res.data.message)
    }
    toast.dismiss(toastId);
}
// GET_QUIZ_DETAILS_API,
export const getQuizDetails = async (quizId,token)=>{
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET",{
            quizId
        },{
            Authorization:`Bearer ${token}`,
        })
        console.log("GET QUIZ DETAILS RESPONCE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data?.quiz;
        toast.success("Get Quiz Details Successfully");
    } catch (error) {
        console.log("Error in gteQuizDetails ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// GET_ALL_QUIZ_API
export const getAllQuiz = async (token)=>{
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET",{
            Authorization:`Bearer ${token}`,
        })
        console.log("GET ALL QUIZ RESPONCE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("Error in getAllQuiz ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
