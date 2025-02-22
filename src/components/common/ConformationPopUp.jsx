import React from 'react'
import IconBtn from './IconBtn';

const ConformationPopUp = ({modelData}) => {
 
  return (
    <div className=' fixed backdrop-blur-sm backdrop:blur-xl inset-0 z-[100] !mt-0 grid place-items-center 
     overflow-auto bg-opacity-10'>
        <div className=" w-11/12 max-w-[350px] p-4 rounded-lg border border-slate-700  bg-slate-200 font-semibold
        ">
            <p className=' text-2xl font-semibold '>{modelData?.text1}</p>
            <p className=' mt-3 mb-5 leading-6'>{modelData?.text2}</p>
            <div className="flex items-center gap-x-4">
                <IconBtn onClick={modelData?.btn1Handler}
                 text={modelData?.btn1Text}/>
                 <button className=' cursor-pointer rounded-md sm:py-[8px]  text-sm sm:text-xl px-3 py-1 sm:px-[20px] font-semibold
                  bg-slate-600' onClick={modelData?.btn2Handler}>
                    {modelData?.btn2Text}
                  </button>
            </div>
        </div>

    </div>
  )
}

export default ConformationPopUp