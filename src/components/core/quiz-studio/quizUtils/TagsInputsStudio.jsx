import { Add } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { setTagChip } from '../../../../slices/quizStudioSlicer';

const TagInputsStudio = () => {
    const quizData = useSelector(state=>state.quizStudio);
    // console.log("Tag : ",quizData)
    const [chips,setChips] = useState([]);
    const [chip,setChip] = useState("");
    const dispatch = useDispatch();
    const handleKeyDown = (event)=>{
        // console.log("KEy : ",event.key)
        if(event.key ==="Enter" || event.key==="," || event.type==="click"){
            event.preventDefault();
            const chipValue = chip.trim();
            if(!chip){
                return;
            }
            // check unique
            if(chipValue && !chips.includes(chipValue)){
                // add to chips array and clear
                const newChips = [...chips,chipValue];
                setChips(newChips)
                dispatch(setTagChip(newChips))
                setChip("");
            }
        }
    }
    const handleRemoveChip = (chipIndex)=>{
        const newChip = chips.filter((_,i)=>i!==chipIndex);
        setChips(newChip);
        dispatch(setTagChip(newChip))
    }

  return (
    <div className=' flex flex-col space-y-2'>
        <label htmlFor={"tags"}className=' text-sm'>{"Tags Input"}<sup className=' text-pink-800'>*</sup></label>
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
           <div className=" relative w-full">
           <input id='tags'
             type='text'
             value={chip}
             onChange={(e)=>setChip(e.target.value)}
             onKeyDown={handleKeyDown}
             className=' form-style text-black w-full'/>
             <button onClick={handleKeyDown} className=' block sm:hidden absolute top-0 right-1'><Add/></button>
           </div>
        </div>
      
    </div>
  )
}

export default TagInputsStudio