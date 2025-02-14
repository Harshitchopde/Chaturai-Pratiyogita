import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { reportIssue } from '../services/operations/authApis';

const Contact = () => {
    const [details, setDetails] = useState("");
    const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
  const handleSubmitReport = ()=>{
    if(details===""){
        toast.error("can not submit the empty report")
        return ;
    }
    dispatch(reportIssue(details,token))
    setDetails("");
  }
  return (
   <div className=" min-h-screen flex flex-col items-center w-full  bg-gradient-to-r from-blue-500 to-purple-600">
        <div className=" flex flex-col border rounded-md gap-y-4 sm:w-[550px] mt-10 p-5">
            <p>Contact Us or Report an issue</p>
            <textarea rows={4} onChange={(e)=>setDetails(e.target.value)}
            value={details}
             className=' w-full p-2  bg-white/30 backdrop-blur-md outline-none rounded-md'
            />
            <button
             onClick={handleSubmitReport}
             className=' flex shadow-md shadow-slate-600 justify-center items-center border max-w-max rounded-md px-2 py-1 '>Submit</button>
        </div>
   </div>
  )
}

export default Contact