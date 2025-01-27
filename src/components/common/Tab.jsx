import React, { useEffect, useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants';

export const Tab = ({accountType,setAccountType}) => {
    const [selected,setSelected] = useState(false);
    useEffect(()=>{
        setAccountType(selected?ACCOUNT_TYPE.INSTRUCTOR:ACCOUNT_TYPE.STUDENT);
    },[selected])
  return (
    <div className=' rounded-full  border   items-center justify-between bg-white text-black flex flex-row w-full gap-x-2 px-1 py-1 cursor-pointer'>
        <div onClick={()=>setSelected(false)} className={` px-6 py-1 flex items-center justify-center flex-1 ${!selected && "bg-black text-white"} rounded-full`}>
            Student
        </div>
        <div onClick={()=>setSelected(true)} className={` px-6 py-1 flex flex-1 items-center justify-center ${selected && "bg-black text-white" } rounded-full`}>
            Instructor
        </div>
    </div>
  )
}
