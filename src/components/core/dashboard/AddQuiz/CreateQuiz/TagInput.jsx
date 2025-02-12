import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux'

const TagInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) => {
    const {editQuiz,quiz} = useSelector(state=>state.quiz);
    const [chips,setChips] = useState([]);
    useEffect(()=>{
        if(editQuiz){
            // console.log("Quiz ",quiz);
            setChips(quiz?.tags)
        }
        register(name,{
            required:true,
            validate:(value)=>name.length>0
         // eslint-disable-next-line react-hooks/exhaustive-deps
        })
    },[])

    // add chip to form data
    useEffect(()=>{
        setValue(name,chips)
    },[chips])
 
    const handleKeyDown = (event)=>{
        // console.log("KEy : ",event.key)
        if(event.key ==="Enter" || event.key===","){
            event.preventDefault();
            const chipValue = event.target.value.trim();
            // check unique
            if(chipValue && !chips.includes(chipValue)){
                // add to chips array and clear
                const newChips = [...chips,chipValue];
                setChips(newChips)
                // event.target.value.clear()
                event.target.value=""
            }
        }
    }
    const handleRemoveChip = (chipIndex)=>{
        const newChip = chips.filter((_,i)=>i!==chipIndex);
        setChips(newChip);
    }
  return (
    <div className=' flex flex-col space-y-2'>
        <label htmlFor={name}className=' text-sm'>{label}<sup className=' text-pink-800'>*</sup></label>
        {/* render chips data */}
        <div className=" flex w-full flex-wrap gap-y-2">
            {
                chips.map((chip,i)=>(
                    <div className=" sm:m-1 mx-1 flex items-center rounded-full bg-yellow-400 px-2  sm:py-1 text-sm text-white" key={i}>
                        {
                            chip
                        }
                        {/* remove butten */}
                        <button type='button'
                        onClick={()=>handleRemoveChip(i)}
                         className=' ml-2 focus:outline-none'>
                            <MdClose className=' text-sm'/>
                        </button>
                    </div>
                ))
            }
            <input id={name}
             type='text'
             placeholder={placeholder}
             onKeyDown={handleKeyDown}
             className=' form-style w-full'/>
        </div>
        {
            errors[name] && (
                <span className=' text-sm text-red-500'>Required *</span>
            )
        }
    </div>
  )
}

export default TagInput