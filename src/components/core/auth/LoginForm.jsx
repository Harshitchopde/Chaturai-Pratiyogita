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
    <form  onSubmit={handleSubmit} className='mt-6 border p-5 h-[300px] rounded-md flex  flex-col gap-y-8 w-full'>
        <label>
            <p className=''>Email<sup className='text-red-600'>*</sup> </p>
            <input required
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
                placeholder='Enter Your Email'
                style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                className=' w-full bg-slate-200 rounded-md p-1 '    
            />
        </label>
        <label>
            <p>Password<sup className='text-red-600'>*</sup></p>
            <input required
              name='password'
              type='password'
              value={password}
              placeholder='Enter the Password'
              onChange={handleChange}
                style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                className=' w-full bg-slate-200 rounded-md p-1 '
            />
        </label>
        <button className='bg-yellow-400 flex w-full rounded-md text-black max-w-max px-4 p-1 justify-end mx-auto' >Login</button>
    </form>
  )
}
