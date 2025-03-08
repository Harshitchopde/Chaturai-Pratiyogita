import toast from "react-hot-toast";
import { quizEndPoints} from "../apis.js"
import { apiConnector } from "../apiconnectors.js";
import { data } from "autoprefixer";
import { deleteStateQuiz, setInstructorQuiz } from "../../slices/quizzesSlice.js";

const {
    CREATE_QUIZ_API,
    UPDATE_QUIZ_API,
    UPDATE_ONLY_QUIZ_API,
    DELETE_QUIZ_API,
    GET_QUIZ_DETAILS_API,
    GET_ALL_QUIZ_API,
    INSTRUCTOR_ANAYLISIS_API,
    SEND_QUIZ_MAIL_API,
    GET_INSTRUCTOR_QUIZ_API,
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
// UPDATE_QUIZ_API,
export const updateOnlyQuiz = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST",UPDATE_ONLY_QUIZ_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,
        })
        console.log("UPDATE QUIZ RESPONSE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success("UPDATED Quiz Successfully");
        result=true;
    } catch (error) {
        console.log("Error in updateOnlyQuiz-f ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
// DELETE_QUIZ_API,
export const deleteQuiz = async(quizId,token)=>{
   return async(dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
        const res = await apiConnector("POST",DELETE_QUIZ_API,{
            quizId
        },{
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETED QUIZ RESPONSE..... ",res);
        if(!res?.data?.success){
            throw new Error(res.data.message);
        }
        dispatch(deleteStateQuiz(quizId));
        toast.success(res.data.message);
    } catch (error) {
        console.log("Error in deleteQuiz ",error);
        toast.error(error.res.data.message)
    }
    toast.dismiss(toastId);
   }
}
// GET_QUIZ_DETAILS_API,
export const getQuizDetails = async (quizId,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST",GET_QUIZ_DETAILS_API,{
            quizId,
            hello:"dfasd"
        },{
            Authorization:`Bearer ${token}`,
        })
        // console.log("GET QUIZ DETAILS RESPONCE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data?.quiz;
        // toast.success("Get Quiz Details Successfully");
    } catch (error) {
        console.log("Error in gteQuizDetails ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// GET_ALL_QUIZ_API
export const getAllQuiz = async (token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET",GET_ALL_QUIZ_API,null,{
            Authorization:`Bearer ${token}`,
        })
        // console.log("GET ALL QUIZ RESPONCE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
        // toast.success(response.data.message);
    } catch (error) {
        console.log("Error in getAllQuiz ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// INSTRUCTOR_ANAYLISIS_API,
export const instructorAnalysis = async (quizId,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST",GET_QUIZ_DETAILS_API,{
            quizId,
        },{
            Authorization:`Bearer ${token}`,
        })
        // console.log("GET QUIZ DETAILS RESPONCE... ",response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data?.quiz;
        // toast.success("Get Quiz Details Successfully");
    } catch (error) {
        console.log("Error in INSTRUCTOR_ANAYLISIS_API ",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
//SEND_QUIZ_MAIL_API
export const sendQuizMail = async(token,quizUrl,quizId)=>{
    const toastId  = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST",SEND_QUIZ_MAIL_API,{
            quizId,
            quizUrl
        },{
            Authorization:`Bearer ${token}`
        })
        // console.log("RESPONSE SEND QUIZ : ",response);
        toast.success(response.data.message)
        result = true;
    } catch (error) {
        console.error("Error in sendQuizMail ",error);
        toast.error(error)
    }
    toast.dismiss(toastId);
    return result;
}
// GET_INSTRUCTOR_QUIZ_API
export const getInstructorQuiz = (token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        let result = null;
        try {
            const res = await apiConnector("GET",GET_INSTRUCTOR_QUIZ_API,null,{
                Authorization:`Bearer ${token}`,
            })
            console.log("RESPONSE OF GETINSTRUCTORQUIZ : ",res);
            if(!res?.data?.message){
                throw new Error(res?.data?.message);
            }
            result = res?.data?.data;
            toast.success("Success Instructor Quiz!")
        } catch (error) {
            console.log("Error in getInstructorQuiz ",error);
            toast.error(error.message)
        }
        toast.dismiss(toastId);
        dispatch(setInstructorQuiz(result));
    }
}
