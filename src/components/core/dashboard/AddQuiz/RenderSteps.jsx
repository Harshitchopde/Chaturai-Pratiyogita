import React from 'react'
import { useSelector } from 'react-redux'
import CreateQuiz from './CreateQuiz';
import AddQuestion from './QuestionBuilder';
import Publish from './Publish';
import { FaCheck } from 'react-icons/fa';
const steps = [
    {
        id:1,
        title:"Create Quiz"
    },
    {
        id:2,
        title:"Add Questions"
    },
    {
        id:3,
        title:"Publish"
    },
]
const RenderSteps = () => {
    const {step, quiz,editQuiz } =useSelector((state)=> state.quiz); 
   
  return (
    <div>
        {/* handle step 1 - 2 - 3 */}
        <div className=" flex  relative justify-center mt-14 mb-7 ">
            {
                steps.map((ele,i)=>(
                    <>
                    <div key={i} className="flex flex-col items-center">
                        <button className={` flex grid cursor-default place-items-center rounded-full border  w-[34px] aspect-square 
                            ${step>= ele.id ? " text-white  border-green-300 bg-green-500":" text-white border-slate-600 bg-slate-400"}
                            `}>
                            {
                                step > ele.id ?(<FaCheck className=' font-bold text-white'/>):(
                                    ele.id
                                )
                            }
                        </button>

                    </div>
                    {
                        ele.id!== steps.length && (
                            <div key={i+10} className={` h-[calc(34px/2)  w-[33%] border-dashed   border-t-2 border-b-2 ${ele.id<step? "border-green-500":"border-gray-400"}`}></div>
                        )
                    }
                    </>
                ))
            }
        </div>
        {/* selected render */}
        {
            step===1 && (<CreateQuiz/>)
            // step===1 && (<DemoQue/>)
        }
        {
            step===2 && (<AddQuestion/>)
        }
        {
            step===3 && (<Publish/>)
        }
    </div>
  )
}

export default RenderSteps