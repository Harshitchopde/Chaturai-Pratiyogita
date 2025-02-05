import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { QuestionModel } from './QuestionModel';
import ConformationPopUp from '../../../../common/ConformationPopUp';
import { CiCirclePlus } from "react-icons/ci";
const NestedQuestionView = () => {
    const { quiz} = useSelector(state=>state.quiz);
    const { token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [addQuestion,setAddQuestion] = useState(null);
    const [editQuestion,setEditQuestion] = useState(null);
    const [viewQuestion,setViewQuestion] = useState(null);
    console.log("Quiz id ",quiz._id)
    // conformation model
    const [conformationModel,setConformationModel] = useState(null);
     console.log("Conformation ",conformationModel);
    return (
        <>
        <div className=" flex flex-col space-y-5">
          <button onClick={()=>setAddQuestion(quiz._id)}
           className=' border-2 flex items-center max-w-max px-3 rounded-lg py-1 border-yellow-400  text-yellow-400'>
            Question <CiCirclePlus className='ml-2 font-bold'/>
           </button>
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


