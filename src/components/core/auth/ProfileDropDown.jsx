import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logOut } from '../../../services/operations/authApis';

const ProfileDropDown = () => {
    const {user} = useSelector(state=>state.profile);
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const ref = useRef(null);

    useOnClickOutside(ref,()=>setOpen(false));
    if(!user) return null;
  return (
    <button className=' relative' onClick={()=>setOpen(true)}>
        <div className=" flex items-center gap-x-1">
            <img src={user?.image} alt={`profile-${user?.firstName}`} 
             className=' aspect-square w-[30px] rounded-full object-cover'/>
             <AiOutlineCaretDown className=' text-sm text-slate-500'/>
        </div>
        {
            open && (
                <div onClick={(e)=>e.stopPropagation()}
                 className=" absolute top-[118%]  -left-10 z-[1000] divide-y-[1px] divide-red-900 overflow-hidden rounded-md border-slate-500"
                 ref={ref} >
                    <Link to="/dashboard/profile" onClick={()=>setOpen(false)}>
                        <div className=" flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-slate-600 hover:text-slate-400 hover:bg-slate-300 bg-slate-500">
                            <VscDashboard className=' text-lg'/>
                            DashBoard
                        </div>
                    </Link>
                    <div onClick={()=>{
                        dispatch(logOut(navigate))
                        setOpen(false)
                    }}
                     className=" flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-slate-600 hover:text-slate-400 hover:bg-slate-300 bg-slate-500">
                        <VscSignOut className=' text-lg'/>
                        LogOut
                    </div>
                 </div>
            )
        }
    </button>
  )
}

export default ProfileDropDown