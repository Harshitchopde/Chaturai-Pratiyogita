import React, { useState } from 'react'
import { Tab } from '../../common/Tab'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { LoginForm } from './LoginForm';
import SignUpForm from './SignUpForm';
import login_img from '../../../assets/images/login_img.png'
export const Template = ({formType}) => {
    
  return (
    <div className='flex flex-col sm:flex-row-reverse w-11/12 mt-[20px] sm:mt-[100px] h-[450px]  gap-5 rounded-lg items-center mx-auto justify-center '>
       
        <div className=" sm:w-[30%] flex items-center justify-center flex-col md:gap-5">
            {/* User Form Details  */}
            <div className=' text-2xl  font-bold md:text-4xl'>Start Building Future</div>
            <p className=' md:text-xl text-xs'>Build skills for today, tomorrow, and beyond</p>
            {/* <Tab accountType={accountType} setAccountType={setAccountType}/> */}
            {/* Form Type */}
            {
                formType==="Login"?<LoginForm/>:<SignUpForm/>
            }
        </div>
        <div className=" sm:w-[40%] hidden  sm:block items-center justify-center">
           <img src={login_img} className='w-[450px] h-[450px]' alt='Not Found!'/>
        </div>
    </div>
  )
}
