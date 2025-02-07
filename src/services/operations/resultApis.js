import toast from "react-hot-toast";
import { apiConnector } from "../apiconnectors";
import { resultEndPoints } from "../apis";
const {SUBMIT_RESPONCE_API}= resultEndPoints; 
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