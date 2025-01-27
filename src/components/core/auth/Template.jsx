import React, { useState } from 'react'
import { Tab } from '../../common/Tab'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { LoginForm } from './LoginForm';
import SignUpForm from './SignUpForm';
import login_img from '../../../assets/images/login_img.png'
export const Template = ({formType}) => {
    
  return (
    <div className='flex flex-row-reverse w-11/12 mt-[100px] h-[450px]  rounded-lg items-center mx-auto justify-center '>
       
        <div className=" w-[30%] flex  flex-col gap-5">
            {/* User Form Details  */}
            <div className=' text-4xl'>Start Building Future</div>
            <p>Build skills for today, tomorrow, and beyond</p>
            {/* <Tab accountType={accountType} setAccountType={setAccountType}/> */}
            {/* Form Type */}
            {
                formType==="Login"?<LoginForm/>:<SignUpForm/>
            }
        </div>
        <div className=" w-[40%]  items-center justify-center">
           <img src={login_img} className='w-[450px] h-[450px]' alt='Not Found!'/>
        </div>
    </div>
  )
}
