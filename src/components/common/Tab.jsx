import React, { useEffect, useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants';

export const Tab = ({accountType,setAccountType}) => {
    const [selected,setSelected] = useState(false);
    useEffect(()=>{
        setAccountType(selected?ACCOUNT_TYPE.INSTRUCTOR:ACCOUNT_TYPE.STUDENT);
    },[selected])
  return (
    <div className=' rounded-full  border   items-center justify-between bg-white text-black flex flex-row w-full sm:gap-x-2 sm:px-1 sm:py-1 cursor-pointer'>
        <div onClick={()=>setSelected(false)} className={` sm:px-6 py-1 flex items-center text-sm sm:text-xl justify-center flex-1 ${!selected && "bg-black text-white"} rounded-full`}>
            Student
        </div>
        <div onClick={()=>setSelected(true)} className={` sm:px-6 py-1 flex flex-1 text-sm sm:text-xl items-center justify-center ${selected && "bg-black text-white" } rounded-full`}>
            Instructor
        </div>
    </div>
  )
}
