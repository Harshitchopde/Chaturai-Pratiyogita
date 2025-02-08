import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authApis';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    // destructure 
    const { email, password } = formData;

    // handleChange
    const handleChange = (e)=>{
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    // handleSubmit
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("Submit ",formData);
        dispatch(login(formData.email,formData.password,navigate));
        setFormData({
            email:"",
            password:""
        })
    }

  return (
    <form  onSubmit={handleSubmit} className='sm:mt-6 mt-3 border p-3 sm:p-5 sm:h-[300px] rounded-md flex  flex-col gap-y-4 sm:gap-y-8 w-full'>
        <label>
            <p className=' text-sm sm:text-xl'>Email<sup className='text-red-600'>*</sup> </p>
            <input required
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
                placeholder='Enter Your Email'
                style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                className=' w-full bg-slate-200 rounded-md text-sm sm:text-xl p-1 '    
            />
        </label>
        <label>
            <p className=' text-sm sm:text-xl'>Password<sup className='text-red-600'>*</sup></p>
            <input required
              name='password'
              type='password'
              value={password}
              placeholder='Enter the Password'
              onChange={handleChange}
                style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                className=' w-full bg-slate-200 rounded-md p-1 text-sm sm:text-xl '
            />
        </label>
        <button className='bg-yellow-400 flex w-full rounded-md text-black max-w-max sm:px-4 sm:p-1 px-2 justify-end mx-auto' >Login</button>
    </form>
  )
}
