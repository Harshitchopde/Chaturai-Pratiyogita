import React from 'react'
import { formateTimer } from '../../../utils/formateTime';
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
const QuestionForm = ({result,setReview,review,handleOptionSubmition, submitted,question,setQuestionNumber,quesNumber,total,timeLeft,yourResponse,handleOptionSelect}) => {


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
    <div className=" flex select-none flex-col  sm:w-10/12 mx-auto border px-4 py-4 sm:px-8 gap-1 sm:gap-3 sm:py-9 sm:h-[450px] rounded-md ">
     {/* <di>back to review</div> */}
     {/* <button onClick={()=>setReview(false)}>back to review</button> */}
    {review && <div onClick={()=>setReview(false)} className=' flex items-center gap-x-2 text-sm' ><FaArrowLeft/> back to result</div>}
        <div className="flex justify-between ">
            <div className=" text-xl sm:text-2xl font-bold">Question {quesNumber}/{total}</div>
            <div className=" text-gray-500 text-sm sm:text-[1rem]  ">{formateTimer(timeLeft)}</div>
        </div>
        <div className=" text-sm capitalize mb-5">{question?.questionDesc}</div>
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
                <div key={i} onClick={()=>handleOptionSelect(question?._id,option?._id)}  className={`${ borderColor}  flex border items-center sm:h-12 rounded-md w-full  `}>
                  <input type='radio' name='question' checked={(option?._id===yourResponse[question?._id]) || (result?.[question?._id]===option._id)  } value={option.text} className=' accent-blue-600 flex m-2 sm:m-4'/>
                 <div className=" sm:text-xl text-sm">
                 {
                      option.text
                  }
                 </div>
            </div>
              )
            }
               
            )
        }
        <div className=" flex my-2 justify-between w-full">
          <button className={ ` sm:px-3  px-2 py-1 max-h-max rounded-md text-white sm:text-xl  text-sm flex gap-2 items-center border ${quesNumber===1?"bg-gray-500":"bg-blue-600"}`}
          disabled={quesNumber===1} onClick={handlePrev}> <FaArrowLeft/> Prev</button>
          <button 
          disabled={submitted && total===quesNumber}
          className= {`sm:px-3  px-2 py-1 max-h-max rounded-md text-white  sm:text-xl flex text-sm gap-2 items-center border ${ total===quesNumber && submitted ?"bg-gray-500":"bg-blue-600"}`} onClick={handleNext}>
              {total===quesNumber?(<div>Submit</div> ):
              (<div className='flex gap-2 items-center'>
                Next <FaArrowRight/></div>)} 
            </button>
        </div>
       {
         submitted && (
          <div className= {` ${question?.correctAnswer===result?.[question?._id]?" border-green-500 bg-green-100":"border-red-500 bg-red-100"} w-full border rounded-md p-2 sm:text-[1rem] text-sm capitalize`}>{
            question?.explanation
          }</div>
         )
       }
    </div>
  )
}

export default QuestionForm