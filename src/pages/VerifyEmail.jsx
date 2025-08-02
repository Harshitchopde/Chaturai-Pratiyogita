import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authApis';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';

export const VerifyEmail = () => {
    const { loading,signUpData } = useSelector(state=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!signUpData){
            toast.error("Sign Up data is missing")
            navigate("/signUp")
        }
    },[])
    const [otp,setOtp] = useState("");
    // handleVerifySubmit
    const handleVerifyAndSubmit = (e)=>{
        e.preventDefault();
        const {
            firstName,
            accountType,
            lastName,
            email,
            password,
            conformPassword,
         } = signUpData;
        dispatch(signUp(
            firstName,
            accountType,
            lastName,
            email,
            password,
            conformPassword,
            navigate,
            otp
        ))
    }
    
  return (
    <div className=' min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        {
            loading?(<div>It is loading</div>):(
                <div className="max-w-[500px] flex flex-col gap-3 p-4 lg:p-8">
                    <div className=" text-2xl">Verify Email</div>
                    <div className=" text-[18px] font-medium">A verification code has been sent to you. Enter the code below</div>
                    <form onSubmit={handleVerifyAndSubmit} className=''>
                        <OTPInput
                         value={otp}
                         onChange={setOtp}
                         numInputs={6}
                         
                         renderInput={(props)=>(
                            <input {...props}
                            placeholder='-'
                            style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                             className=' w-[48px] lg:w-[60px] bg-slate-300
                              rounded-[0.5rem] p-4 text-center focus:outline-2
                               focus:outline-yellow-500 aspect-square border-0'
                            />
                         )}
                         containerStyle={{
                            justifyContent:"space-between",
                            
                         }}
                           />
                             <button type='submit' className=' mt-6 bg-yellow-500 rounded-[0.5rem] w-full text-richblack-900 p-2'>Verify Email</button>
                    
                        
                    </form>
                </div>
            )
        }
    </div>
  )
}
