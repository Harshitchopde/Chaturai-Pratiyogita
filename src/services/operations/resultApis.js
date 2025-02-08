import toast from "react-hot-toast";
import { apiConnector } from "../apiconnectors";
import { resultEndPoints } from "../apis";
const {SUBMIT_RESPONCE_API,
    GET_SUBMITED_RESP_API
}= resultEndPoints; 
export const submitQuizResponce = async(response,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("POST",SUBMIT_RESPONCE_API,response,{
             Authorization:`Bearer ${token}`
        })
        console.log("SUBMIT QUIZ RESPONSE..... ",res);
        if(!res?.data?.success){
            
            throw new Error(res?.data?.message);
        }
     
        result = res?.data?.data;
    } catch (error) {
        console.error("Error occure in submitQuizResponce ",error);
        toast.error("Error : ",error);
    }
    toast.dismiss(toastId);
    return result;
}

export const getSubmitedQuizResp = async (quizId,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const res = await apiConnector("POST",GET_SUBMITED_RESP_API,{
            quizId
        },{
            Authorization:`Bearer ${token}`
        })

        console.log("GET Submited quiz REsponses .... ",res);
        if(!res?.data?.success){
            throw new Error("Error occure in getting")
        }
        result = res?.data?.data;
        toast.success("SuccessFully get Responces");
    } catch (error) {
        console.error("Error occure in getSubmitedQuizResp ",error);
        toast.error("Error : ",error);
    }

    toast.dismiss(toastId);
    return result;
}