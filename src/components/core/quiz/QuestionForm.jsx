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
const QuestionForm = ({result,handleOptionSubmition, submitted,question,setQuestionNumber,quesNumber,total,timeLeft,yourResponse,handleOptionSelect}) => {


    const handleNext = (e)=>{
       if(quesNumber===total && !submitted ){
        handleOptionSubmition();
            return;
       } 
       if(quesNumber===total){
       
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
    // const [selected,setSelected] = useState("");
  return (
    <div className=" flex flex-col w-10/12 mx-auto border px-8 gap-3 py-9 h-[450px] rounded-md ">
        <div className="flex justify-between ">
            <div className=" text-2xl font-bold">Question {quesNumber}/{total}</div>
            <div className=" text-gray-500 text-[1rem]  ">{formateTimer(timeLeft)}</div>
        </div>
        <div className="">{question?.questionDesc}</div>
        {
            question?.options?.map((option,i)=>{
              let borderColor = "border-black";
              if(submitted){
                 if(option?.isCorrect && result?.[question?._id]===option._id){
                   borderColor="border-green-500 bg-green-200"
                 }else if(result?.[question?._id]===option._id){
                   borderColor=" border-red-500 bg-red-200"
                 }else if(option.isCorrect){
                    borderColor="border-green-500 bg-green-200"
                 }
              }else if(yourResponse[question?._id]===option._id){
                borderColor="border-blue-600 "
              }
              
              return (
                <div key={i} onClick={()=>handleOptionSelect(question?._id,option?._id)}  className={`${ borderColor} flex border items-center h-12 rounded-md w-full  `}>
                  <input type='radio' name='question' checked={option?._id===yourResponse[question?._id]} value={option.text} className='  accent-blue-600 flex m-4'/>
                  {
                      option.text
                  }
            </div>
              )
            }
               
            )
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