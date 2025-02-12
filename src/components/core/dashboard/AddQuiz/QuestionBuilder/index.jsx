import { data } from 'autoprefixer'
import React, { useState } from 'react'
import ConformationPopUp from '../../../../common/ConformationPopUp'
import NestedQuestionView from './NestedQuestionView'
import IconBtn from '../../../../common/IconBtn'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setEditQuiz, setStep } from '../../../../../slices/quizSlicer'
// import clsx from "clsx"

const AddQuestion = () => {
  const {quiz}= useSelector(state=>state.quiz);
  const dispatch = useDispatch();
  console.log("quiz : ",quiz)
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
    <div className=' border-[1px] bg-slate-100 sm:p-6 p-3 space-y-4 sm:space-y-8 rounded-md '>
      <div className="flex w-full justify-between items-center">
      <div className=" sm:text-2xl text-xl font-semibold">Quiz Builder</div>
      <div className=" sm:text-2xl text-xl font-semibold">{quiz?.questions.length}/{quiz?.numberOfQuestions}</div>
      </div>
      <NestedQuestionView/>
      {/* prev & next button */}
      <div className=" flex justify-end items-center gap-x-3">
      <button onClick={goToBack}
         className={`flex cursor-pointer items-center gap-x-2  max-h-max rounded-md py-[4px] sm:text-xl text-sm px-[10px] sm:px-[10px] font-semibold bg-slate-200`} ><MdNavigateBefore/>Prev</button>

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