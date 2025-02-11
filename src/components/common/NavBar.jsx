import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import ProfileDropDown from '../core/auth/ProfileDropDown';
export const NavBar = () => {
    const {token} = useSelector(state=> state.auth);
    const { user} = useSelector(state=> state.profile);
    // console.log("token ",token)
    // console.log("User ",user)
    const navigate = useNavigate();
  return (
    <div className='h-12 text-[1rem]  border-b-slate-600 border-b bg-white text-black justify-center flex'>
        <div className='flex items-center justify-between w-10/12 max-w-maxContent'>
        
         {/* left  -> name-> Quiz-test*/}
         <div className="sm:text-xl font-bold">Quiz-test</div>
         {/* center -> home , quizzes*/}
         <div className=" sm:text-xl flex sm:gap-4  gap-2   ">
            <Link to={"/"}>
                <div className="">Home</div>
            </Link>
            <Link to={"/quizzes"}>
                <div className="">Quizzes</div>
            </Link>
         </div>
         {/* right -> login sign up | user */}
         <div className="flex sm:text-xl  sm:gap-2 gap-1">
            {
                user && (
                    // <Link to={"/dashboard/profile"}>
                    //     <FaUserCircle className=''/>
                    // </Link>
                    <ProfileDropDown/>
                )
            }
            {
                token ==null && (
                    <Link to={"/login"}>
                        <button className='border border-slate-400 rounded-md px-1 sm:px-2 sm:py-[1px]'>Login</button>
                    </Link>
                )
            }
            {
                token===null && (
                    <Link to={"/signUp"}>
                        <button className='border border-slate-400  px-1 rounded-md sm:px-2 '>Sign Up</button>
                    </Link>
                )
            }
         </div>
        </div>
    </div>
  )
}
