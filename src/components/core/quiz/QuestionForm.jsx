import React, { useEffect, useState } from 'react'
import { formateTimer } from '../../../utils/formateTime';
import toast from 'react-hot-toast';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
/*
{
    "questionDesc": "Which planet is known as the Red Planet?",
    "options": [
      { "text": "Earth", "isCorrect": false },
      { "text": "Mars", "isCorrect": true },
      { "text": "Venus", "isCorrect": false },
      { "text": "Jupiter", "isCorrect": false }
    ],
    "correctAnswer": "Mars",
    "points": 1,
    "questionType": "MCQ",
    "explanation": "Mars is often called the Red Planet because of its reddish appearance."
  },
  */
const QuestionForm = ({question,setQuestionNumber,quesNumber,total,timer}) => {

    const [timeLeft, setTimeLeft] = useState(timer*60);
    useEffect(()=>{
       
        if(timeLeft<=0){
            toast.success("Test is over now");
            return;
        }
        if(timeLeft===60){
            toast.success("Hurry Up 60 second left");
           
        }
        const interval = setInterval(()=>{
            setTimeLeft(prev=>prev-1)
        },1000);
        return ()=> clearInterval(interval);
    },[timeLeft])
    
    const handleNext = (e)=>{
       if(quesNumber===total){
            toast.success("Submit hogya")
            return;
       } 
       setQuestionNumber(prev=>prev+1);
    }
    const handlePrev = (e)=>{
        if(quesNumber===1){
            
            return;
        }
        setQuestionNumber(prev=> prev-1);
    }
    const [selected,setSelected] = useState("");
  return (
    <div className=" flex flex-col w-10/12 mx-auto border px-8 gap-3 py-9 h-[450px] rounded-md ">
        <div className="flex justify-between ">
            <div className=" text-2xl font-bold">Question {quesNumber}/{total}</div>
            <div className=" text-gray-500 text-[1rem]  ">{formateTimer(timeLeft)}</div>
        </div>
        <div className="">{question?.questionDesc}</div>
        {
            question?.options.map((option,i)=>(
                <div key={i} onClick={()=>setSelected(option)}  className={`${selected.text===option.text?"border-blue-600":"border-black "} flex border items-center h-12 rounded-md w-full  `}>
                    <input type='radio' name='question' checked={option.text===selected.text} value={option.text} className='  accent-blue-600 flex m-4'/>
                    {
                        option.text
                    }
                </div>
            ))
        }
        <div className=" flex  my-2 justify-between w-full">
          <button className={ ` px-3  p-2 rounded-md text-white text-xl  flex gap-2 items-center border ${quesNumber===1?"bg-gray-500":"bg-blue-600"}`}
          disabled={quesNumber===1} onClick={handlePrev}> <FaArrowLeft/> Prev</button>
          <button className=' px-3  p-2 rounded-md text-white  text-xl flex gap-2 items-center border bg-blue-600' onClick={handleNext}>{total===quesNumber?(<div>Submit</div>):(<div className='flex gap-2 items-center'>Next <FaArrowRight/></div>)} </button>
        </div>
       
    </div>
  )
}

export default QuestionForm