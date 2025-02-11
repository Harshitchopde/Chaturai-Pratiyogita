import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClass,
    type
}) => {
  return (
   <button 
   disabled={disabled}
   type={type}
   onClick={onClick}
   className={`flex items-center  ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-300"
  } cursor-pointer gap-x-2 h-fit sm:text-xl text-sm rounded-md py-1 sm:px-4 px-2 font-semibold text-richblack-900 ${customClass}`}>
    {
        children
        ? <>
        <span className={` ${outline && " text-yellow-50" }`}> {text} </span>
        {children}
        </>
        :<div>{text}</div>
    }
   </button>
  )
}

export default IconBtn
