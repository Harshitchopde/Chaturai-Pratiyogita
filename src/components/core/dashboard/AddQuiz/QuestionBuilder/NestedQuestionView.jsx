import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { QuestionModel } from './QuestionModel';
import ConformationPopUp from '../../../../common/ConformationPopUp';
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete, MdEdit } from 'react-icons/md';
import { AiFillCaretDown } from 'react-icons/ai';
const NestedQuestionView = () => {
    const { quiz} = useSelector(state=>state.quiz);
    const { token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [addQuestion,setAddQuestion] = useState(null);
    const [editQuestion,setEditQuestion] = useState(null);
    const [viewQuestion,setViewQuestion] = useState(null);
    console.log("Quiz ",quiz)
    // conformation model
    const [conformationModel,setConformationModel] = useState(null);
     console.log("Conformation ",conformationModel);
     const handleQuestionDelete = (questionId)=>{
      
     }
    return (
        <>
        <div className=" flex flex-col space-y-3 sm:space-y-5">
          <button onClick={()=>setAddQuestion(quiz._id)}
           className=' border-2 flex items-center max-w-max px-1 text-sm sm:text-xl  sm:px-3 rounded-lg py-1 border-yellow-400  text-yellow-400'>
            Question <CiCirclePlus className='sm:ml-2 ml-1 font-bold'/>
           </button>
           <div className=" bg-white rounded-lg px-20 py-10">
              {
                quiz && quiz?.questions?.map((question,i)=>(
                  <details open key={i}>
                    <summary className=' flex   justify-between cursor-pointer items-center border-b-2 py-2'>
                      <p>Question {i+1}. {question.questionDesc}</p>
                        <div className="flex gap-3 items-center">
                        <button>
                          <MdEdit className=' text-xl'/>
                        </button>
                        <button
                         onClick={()=>setConformationModel({
                          text1:"Delete the Question",
                          text2:"This Question Will be Deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:()=>handleQuestionDelete(question._id),
                          btn2Handler:()=>setConformationModel(null)
                         })}>
                          <MdDelete/>
                        </button>
                        <span className=' font-medium text-richblack-300'></span>
                        <AiFillCaretDown className=' text-xl text-richblack-300' />
                      </div>
                    </summary>
                    <div className="px-6 pb-4">
                    {
                      question?.options?.map((option,i)=>(
                        <div className=" flex text-xl ">{i+1}. {option.text}</div>
                      ))

                    }
                    </div>
                  </details>
                ))

              }
           </div>
        </div>
        {/* model  */}
        {
          addQuestion 
          ?(<QuestionModel modelData={addQuestion}
           setModelData={setAddQuestion}
           add={true}/>)
          :viewQuestion
          ?(<QuestionModel modelData={viewQuestion}
          setModelData={setViewQuestion}
          view={true}/>)
          :editQuestion
          ?(<QuestionModel modelData={editQuestion}
          setModelData={setEditQuestion}
          edit={true}/>)
          :(<></>)
    
        }
        {/* conformation model */}
        {
          conformationModel && (
            <ConformationPopUp modelData={conformationModel}/>
          )
        }
        </>
      )
}

export default NestedQuestionView


