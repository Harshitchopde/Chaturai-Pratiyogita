import toast from "react-hot-toast";
import { authEndPoints } from "../apis.js";
import { setLoading, setToken } from "../../slices/authSlicer.js";
import { apiConnector } from "../apiconnectors.js";
import { setUser } from "../../slices/profileSlicer.js";

const {
    SEND_OTP_API,
    SIGN_UP_API,
    LOGIN_API
} = authEndPoints
// sendOtp
export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await apiConnector("POST",SEND_OTP_API,{
                email
            });

            console.log("SEND OTP res ---> ",res);
            if(!res.data.success){
                toast.error(res.data.message);
                return;
            }
            toast.success("Send Otp SuccessFull");
            navigate("/verify-email")

        } catch (error) {
                console.log("Error in SENDOTP-F ",error);
                toast.error(error);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
export function signUp(
    firstName,
    accountType,
    lastName,
    email,
    password,
    conformPassword,
    navigate,
    otp
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",SIGN_UP_API,{
                firstName,lastName,password,conformPassword,email,accountType,otp
            })
            console.log("API response of signup ",response)
            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            toast.dismiss(toastId);
            navigate("/login");
        } catch (error) {
            console.log("Error in ",error);
            toast.error(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}
export function login(
    email,
    password,
    navigate,
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,password
            })
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            // console.log(response.data)
            toast.success("Login successfull")
            // console.log("LOgin data ",response)
            // console.log("Totkn login :",response.data.token)
            dispatch(setToken(response.data.token))
            const image= response.data.user.image
            ?response.data.user.image
            :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`
            // setUser
            dispatch(setUser({...response.data.user,image:image}))
            // token
            localStorage.setItem("token",JSON.stringify(response.data.user.token))
            // user
            localStorage.setItem("user",JSON.stringify(response.data.user))
          
            navigate("/")

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error : ",error)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        
        // remove from local storeage
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}