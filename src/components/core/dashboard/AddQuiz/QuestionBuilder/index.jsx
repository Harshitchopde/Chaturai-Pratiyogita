import { data } from 'autoprefixer'
import React, { useState } from 'react'
import ConformationPopUp from '../../../../common/ConformationPopUp'
import NestedQuestionView from './NestedQuestionView'
import IconBtn from '../../../../common/IconBtn'
import { MdNavigateNext } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setEditQuiz, setStep } from '../../../../../slices/quizSlicer'


const AddQuestion = () => {
  const {quiz}= useSelector(state=>state.quiz);
  const dispatch = useDispatch();
  const goToNext = ()=>{
    if(quiz.numberOfQuestions && quiz.questions.length !==quiz?.numberOfQuestions){
      toast.error("Total number of questions not match : ",quiz.numberOfQuestions)
      return;
    }
    dispatch(setStep(3));
  }
  const goToBack = ()=>{
    dispatch(setStep(1));
    dispatch(setEditQuiz(true));
  }
  return (
    <>
    <div className=' border-[1px] bg-slate-100 p-6 space-y-8 rounded-md '>
      <div className=" text-2xl font-semibold">Quiz Builder</div>
      <NestedQuestionView/>
      {/* prev & next button */}
      <div className=" flex justify-end items-center gap-x-3">
      <button onClick={goToBack}
         className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[4px] px-[20px] font-semibold bg-slate-200`}>prev</button>

         <IconBtn text="Next" onClick={goToNext}>
          {/* <MdNavigateNext/> */}
          <MdNavigateNext/>
         </IconBtn>
      </div>
    </div>
   
    </>
  )
}

export default AddQuestion