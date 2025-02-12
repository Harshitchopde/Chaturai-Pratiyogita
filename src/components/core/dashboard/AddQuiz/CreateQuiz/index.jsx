import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import TagInput from './TagInput';
import { setQuiz, setStep } from '../../../../../slices/quizSlicer';
import IconBtn from '../../../../common/IconBtn';
import { MdNavigateNext } from 'react-icons/md';
import toast from 'react-hot-toast';
import { createQuiz, updateQuiz } from '../../../../../services/operations/quiz.Apis';

const CreateQuiz = () => {
    const { step, quiz ,editQuiz} = useSelector(state=> state.quiz);
   
    // react-from
    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        formState:{errors},
    } = useForm({
        defaultValues: {
            quizName: quiz?.quizName || "",
            quizDesc: quiz?.quizDesc || "",
            numberOfQuestions: quiz?.numberOfQuestions || "",
            timeDuration: quiz?.timeDuration || "",
            tags: quiz?.tags || [],
            topic: quiz?.topic || "",
            difficulty: quiz?.difficulty || "Any",
            questions:quiz?.questions || []
        }
    })
    const {token} = useSelector(state=> state.auth);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    //  edit check | from update
    const checkUpdated = ()=>{
        
        const currValues = getValues();
        // console.log("Curr ",currValues);
        // console.log("prev ",quiz)

        if((quiz.quizName !== currValues.quizName) ||
            (quiz.quizDesc !== currValues.quizDesc) ||
            (quiz.numberOfQuestions !== currValues.numberOfQuestions) ||
            (quiz.timeDuration !== currValues.timeDuration) ||
            (quiz.tags.toString() !== currValues.tags.toString()) ||
            (quiz.topic !== currValues.topic) ||
            (quiz.difficulty !== currValues.difficulty)
        ){
            return true;
        }else return false;
    }
    // onSubmitHandle
    const onSubmitHandle = async(data)=>{
    //    console.log("Data : ",data);
       if(editQuiz){
        // console.log("Edit qu ",editQuiz)
        // console.log("Chceck : ",checkUpdated())
        if(checkUpdated()){
            const currValues = getValues();
            const formData = new FormData();
            formData.append("quizId",quiz._id);
            if(quiz.quizName !== currValues.quizName){
                formData.append("quizName",currValues.quizName);
            }
            if(quiz.quizDesc !== currValues.quizDesc){
                formData.append("quizDesc",currValues.quizDesc);
            }
            if(quiz.numberOfQuestions !== currValues.numberOfQuestions){
                formData.append("numberOfQuestions",currValues.numberOfQuestions);
            }
            if(quiz.timeDuration !== currValues.timeDuration){
                formData.append("timeDuration",currValues.timeDuration);
            }
            if(quiz.tags.toString() !== currValues.tags.toString()){
                formData.append("tags",JSON.stringify(currValues.tags));
            }
            if(quiz.topic !== currValues.topic){
                formData.append("topic",currValues.topic);
            }
            if(quiz.difficulty !== currValues.difficulty){
                formData.append("difficulty",currValues.difficulty);
            }

            setLoading(true);
            // const result = await 
            const result = await updateQuiz(formData,token);
            // editQuiz call 
            setLoading(false);

            if(result){
                toast.success("Successfully Updated!")
                dispatch(setStep(2));
                dispatch(setQuiz(result));
            }else{
                toast.error("No Changes is made")
            }

        }else{
            toast.error("No Changes is made")
        }
        return;
       } 

       // add details
       const formNewData = new  FormData();
       formNewData.append("quizName", data.quizName);
       formNewData.append("quizDesc", data.quizDesc);
       formNewData.append("numberOfQuestions" , data.numberOfQuestions);
       formNewData.append("timeDuration" , data.timeDuration);
       formNewData.append("tags" , JSON.stringify(data.tags));
       formNewData.append("topic" , data.topic);
       formNewData.append("difficulty" , data.difficulty);
       setLoading(true);
    //    console.log("Data split : ",data.quizName,data.quizDesc)
    //    console.log("Form data ",formNewData.get("tags"))
    //    const result = null;
       const result = await createQuiz(formNewData,token);
    //    console.log("Create quiz result -> ",result);
       if(result){
         dispatch(setStep(2));
         dispatch(setQuiz(result));
       }
       setLoading(false);
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitHandle)}
        className='sm:space-y-8 space-y-4 mb-[10px] sm:mb-[50px] rounded-md  border-[1px] bg-slate-200 p-6 border-slate-700'>
            {/* quizName !*/}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="quizName" className=' text-sm '>
                    Quiz Name <sup className=' text-pink-800'>*</sup>
                </label>
                <input id="quizName"
                placeholder='Enter the Quiz Name'
                className=' form-style w-full'
                {...register("quizName",{required:true})}
                />
                {errors.quizName && (
                    <span className=' text-sm text-red-500 tracking-wide '>Quiz Name required*</span>
                )}
            </div>
            {/* quizDesc! */}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="quizDesc" className=' text-sm '>
                    Quiz Description <sup className=' text-pink-800'>*</sup>
                </label>
                <input id="quizDesc"
                placeholder='Enter the Quiz Description'
                className= {`form-style w-full`}
                {...register("quizDesc",{required:true})}
                />
                {errors.quizDesc && (
                    <span className=' text-sm text-red-500 tracking-wide '>Quiz Desc required*</span>
                )}
            </div>  
            {/* numberOfQuestions */}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="numberOfQuestions" className=' text-sm '>
                    Number of Questions
                </label>
                <input id='numberOfQuestions'
                type='number'
                  placeholder='Number of Questions in quiz'
                  className=' form-style w-full'
                  {...register("numberOfQuestions",{
                    min:1,
                    max:200
                  })}
                  />
                  {
                    errors.numberOfQuestions && (
                        <span className='text-sm text-red-500'>error hai</span>
                    )
                  }
            </div>
            {/* timeDuration! */}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="timeDuration" className='text-sm'>Time Duration of test<sup className=' text-pink-800'>*</sup></label>
                <input id='timeDuration'
                type='number'
                className='form-style w-full'
                placeholder='Maximum time to finish in minute'
                {...register("timeDuration",{required:true, min:1,})}/>
                {
                    errors.timeDuration && (
                        <span className='text-sm text-red-500'>Time Duration required*</span>
                    )
                }
            </div>
            {/* tags -> chip inputs */}
            <TagInput name={"tags"} label={"Tags input"} placeholder={"Enter the name and press enter key"}
            register={register} getValues={getValues} setValue={setValue} errors={errors}/>
            {/* topic */}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="topic" className=' text-sm '>
                    Topic it relate <sup className=' text-pink-800'></sup>
                </label>
                <input id="topic"
                placeholder='eg :- DSA in Java'
                className=' form-style w-full'
                {...register("topic")}
                />
                {/* {errors.topic && (
                    <span className=' text-sm text-red-500 tracking-wide '>Quiz Desc required*</span>
                )} */}
            </div>  
            {/* difficulty  */}
            <div className=" flex flex-col space-y-2">
                <label htmlFor="difficulty" className=' text-sm'>
                    Difficulty
                </label>
                <select className=' text-sm p-1' {...register("difficulty")}>
                    <option value="Any">Any</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div className=" flex justify-end gap-x-2">
                {
                    editQuiz && (
                        <button onClick={()=>dispatch(setStep(2))}
                         dispatch={loading}
                         className={` flex cursor-pointer sm:text-xl text-sm items-center gap-x-2 rounded-md font-semibold text-white bg-slate-500 sm:py-[8px] sm:px-[20px]`}>
                            Continue Without Saving
                         </button>
                    )
                }
                <IconBtn className={" bg-red-800 text-white"} disabled={loading} text={!editQuiz?"Next":"Save & Continue"}>
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </form>
    </div>
  )
}

export default CreateQuiz