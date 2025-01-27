import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../../slices/authSlicer';
import { sendOtp } from '../../../services/operations/authApis';
import { useNavigate } from 'react-router-dom';
import { Tab } from '../../common/Tab';

const SignUpForm = () => {
    // accountType -> state
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // form data 
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        conformPassword:""
    })
    // handleChange
    const handleChange = (e)=>{
        setFormData((prev)=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }
    // destructure form data
    const {firstName, lastName, email, password, conformPassword} = formData
    // handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("handle Submit ",formData)
        if(password!==conformPassword){
            toast.error("Password does not match!")
            return;
        }
        const signUpData = {
            ...formData,accountType
        }
        dispatch(setSignUpData(signUpData));
        dispatch(sendOtp(formData.email,navigate));
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            conformPassword:""
        })
        
    }

  return (
    <form className='mt-4 border p-5 rounded-md h-[400px] flex  flex-col gap-y-6 w-full' onSubmit={handleSubmit}>
        <Tab accountType={accountType} setAccountType={setAccountType}/>
        <div className="flex  gap-2  justify-between">
            <label>
                <p>First Name<sup className='text-red-600'>*</sup></p>
                <input type="text"
                    required
                    name='firstName'
                    value={firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                    className='pl-2 bg-slate-200 w-full rounded-md p-1 '
                />
            </label>
            <label>
                <p>Last Name<sup className='text-red-600'>*</sup></p>
                <input type="text"
                    required
                    name='lastName'
                    value={lastName}
                    placeholder='Last Name'
                    onChange={handleChange}
                    style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                    className='pl-2 bg-slate-200 w-full rounded-md p-1 '
                />
            </label>
        </div>
        <div className="">
            {/* email */}
            <p>Email<sup className='text-red-600'/>*</p>
            <input type="email"
                required
                onChange={handleChange}
                name='email'
                value={email}
                placeholder='Enter Your Email'
                style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                className='pl-2 w-full bg-slate-200 rounded-md p-1 '
            />
        </div>
        <div className=" flex gap-2">
            <label>
                <p>Password</p>
                <input 
                    type="password"
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='Password'
                    style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                    className='pl-2 w-full bg-slate-200 rounded-md p-1 '
                />
            </label>
            <label>
                <p>Conform Password</p>
                <input
                    type='password'
                    required
                    name='conformPassword'
                    value={conformPassword}
                    onChange={handleChange}
                    placeholder='Conform Password'
                    style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
                    className=' pl-2 w-full bg-slate-200 rounded-md p-1 '
                    />
            </label>
        </div>
        <button className=' bg-yellow-400 flex w-full rounded-md py-1 px-3 mx-auto text-black  max-w-max justify-center items-center'>Create Account</button>
    </form>
  )
}

export default SignUpForm