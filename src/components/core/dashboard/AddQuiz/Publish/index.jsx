import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { QUIZ_STATUS } from '../../../../../utils/constants';
import { updateQuiz } from '../../../../../services/operations/quiz.Apis';
import { resetQuizDetails, setEditQuiz, setStep } from '../../../../../slices/quizSlicer';
import IconBtn from '../../../../common/IconBtn';

const Publish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {quiz,step} =  useSelector(state=>state.quiz);
  const {token} = useSelector(state=>state.auth);
  const [loading,setLoading] = useState(false);
  const {register,getValues,setValue,handleSubmit,
    formState:{errors}
  } = useForm()
  useEffect(()=>{
    if(quiz?.status === QUIZ_STATUS.PUBLISHED){
      setValue('public',true)
    }
  },[])
  // go back
  const goBack = ()=>{
    console.log(step)
    dispatch(setStep(2));
    dispatch(setEditQuiz(true));
  }
  // go to Quizs
  const goToQuiz = ()=>{
    dispatch(resetQuizDetails());
    navigate("/")
  }

  const handlePublish = async()=>{
    // check for is publish
    if(
      (quiz?.status ===QUIZ_STATUS.PUBLISHED && getValues('public')===true)
     || (quiz?.status === QUIZ_STATUS.DRAFT &&  getValues('public')===false)){
      // no need to make the update call
      goToQuiz();
      return;
     }
     const formData = new FormData();
     formData.append("quizId",quiz?._id);
     const quizStatus = getValues('public')?QUIZ_STATUS.PUBLISHED:QUIZ_STATUS.DRAFT
     formData.append("status",quizStatus);
     setLoading(true);
     console.log("Token ",token)
     const result = await updateQuiz(formData,token);
     if(result){
       goToQuiz();
     }
     setLoading(false);
  }
  // onSubmit 

  const onSubmit = async(data)=>{
    handlePublish();
  }
  return (
    <div className=' rounded-md border-[1px]  border-slate-600  bg-slate-100 p-6'>
      <p className=' text-2xl font-semibold' >Publish Quiz</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* check box */}
        <div className=" my-8 mb-8">
          <label htmlFor="public" className=' inline-flex items-center text-lg'>
            <input type="checkbox"
        
              id='public'
              {...register("public")}
              className=' border-gray-300 h-4 w-4 rounded ' />
          <span className=' ml-2 text-slate-500 select-none' >
            Publish this Quiz
          </span>
          </label>
        </div>
        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
           disabled={loading}
           type='button'
           onClick={goBack}
           className=' flex border bg-slate-200 border-slate-300  cursor-pointer items-center gap-x-2 rounded-md py-1 px-4 font-semibold '>Prev</button>
           <IconBtn disabled={loading} text={"Save Changes"}/>
        </div>
      </form>
    </div>
  )
}

export default Publish