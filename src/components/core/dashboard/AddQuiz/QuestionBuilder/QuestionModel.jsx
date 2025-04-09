import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { createQuestion } from '../../../../../services/operations/questionApis';
import { setQuiz } from '../../../../../slices/quizSlicer';
import { setAnalyticsQuiz } from '../../../../../slices/quizzesSlice';

export const QuestionModel = ({
  modelData, 
  setModelData,
  analysis=false
  ,add=false,
  view=false,
  edit=false
}) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState:{errors}
  } = useForm({
    defaultValues:{
      points:1
    }
  });

  const dispatch = useDispatch();
  const { token } = useSelector(state=> state.auth)
  const [loading,setLoading] = useState(false)
  // options
  const [options,setOptions] = useState([
    {text:"",isCorrect:false},
    {text:"",isCorrect:false},
    {text:"",isCorrect:false},
    {text:"",isCorrect:false},
  ]);

  useEffect(() => {
    if (edit || view) {
      if (modelData?.questionDesc) {
        setValue("questionDesc", modelData.questionDesc);
        setValue("explanation", modelData.explanation);
        setValue("points", modelData.points);
        setOptions(modelData.options || []);
      }
    }
  }, [modelData, edit, view, setValue]);
  // handleOption Change
  const handleOptionChange = (index,field,value)=>{
    const newOption = [...options];// destructure
    newOption[index][field] = value;
    setOptions(newOption);
  }
  // toggle isCorrect
  const toggleCorrectAnswer = (index)=>{
    // options.forEach((_, i) => setValue(`options.${i}.isCorrect`, i === index ?true:false));
    const newOptions = options.map((option,i)=>({
      ...option,
      isCorrect:i===index, //Ensure only one option is correct
    }))
    setOptions(newOptions);
    setValue(`options`,newOptions)
  }
  
  // add option button 
   const addOption = ()=>{
    // setOptions([...options, { text: "", isCorrect: false }]);
    if(options.length===4){
      toast.error("Only 4 options are allowed");
      return;
    }
    setOptions(prev=> [...prev,{
      text:"",isCorrect:false
    }])
   }
  // remove option
   const removeOption = (index)=>{
     setOptions(options.filter((_,i)=>index!==i));
     setValue('options',options)
   }
   // isFormUpdate
   const isFormUpdate = ()=>{
    const currValues = getValues();
    console.log("Before : ",modelData);
    console.log("After : ",currValues);
    if(modelData?.questionDesc !== currValues.questionDesc){
        return true;
    }
    if(modelData?.explanation!==currValues.explanation){
      return true;
    }
    if(modelData?.points!==currValues.points){
      return true;
    }
    if(JSON.stringify(modelData?.options)!==JSON.stringify(currValues?.options)){
       return true;
    }
    return false;
   }

   const handleEditQuestion =()=>{
     toast.error("Currently not Available!")
   }
  const handleSubmitBtn = async (data)=>{
    console.log("Submit : ",data)
    if(view)return;
    if(edit){
      if(isFormUpdate()){
         handleEditQuestion();
      }else{
        toast.error("No Changes were made!")
      }
      return;
    }
    let isAllFalse = true;
    for(const key of data.options){
      if(key.isCorrect=='true'){
         isAllFalse=false;
      }
    }
    if(isAllFalse){
      toast.error("Atleast on true is required!")
      return;
    }
    if(data.options.length!==4){
       toast.error("Exactly 4 options required!")
       return;
    }
    // console.log("Optin : ",options)
    const currValues = getValues();
    const formData = new FormData();
    formData.append("quizId",modelData);
    formData.append("questionDesc",data.questionDesc)
    formData.append("points",data.points)
    formData.append("explanation",data.explanation)
    formData.append("options",JSON.stringify(options));
    setLoading(true);
    const res = await createQuestion(formData,token);
    
    if(res){
      if(analysis){
        dispatch(setAnalyticsQuiz(res));
      }else{

        dispatch(setQuiz(res));
      }
      // toast.success("Added succesfully!")
    }
    setModelData(null)
    setLoading(false);
    // toast.success("you got it")

  }
  
  return (
    <div className=' !mt-0 z-[100] h-screen w-screen overflow-auto grid place-items-center  fixed inset-0 backdrop-blur-sm bg-white bg-opacity-10'>
      <div className=" my-5 sm:my-10 w-11/12 rounded-lg sm:max-w-[700px] border border-slate-700 bg-slate-400 
       ">
      {/* Model Heading */}
      <div className=" flex justify-between items-center  rounded-lg sm:p-5">
      <p className=' text-2xl  font-semibold sm:font-bold flex items-center justify-center rounded-t-lg p-5'>
        {add && "Adding"} {view && "Viewing"} {edit && "Editing"} Question
      </p>
      <button onClick={()=>(!loading ? setModelData(null):{})} >
        <RxCross2 className=' text-2xl mr-2 text-slate-800'/>
      </button>
      </div>
      {/* Model Form  */}
      <form onSubmit={handleSubmit(handleSubmitBtn)}
       className=' w-11/12 px-3 mb-4 mx-auto flex flex-col space-y-2 sm:space-y-3'>
        {/* Question input */}
        <div className=" relative flex flex-col space-y-1">
          <label htmlFor="questionDesc" className=' text-sm '>Question Description <sup className=' text-red-500'>*</sup></label>
          <input disabled={view || loading}
           id='questionDesc'
           placeholder='Enter the Question Description'
           {...register("questionDesc",{required:true})}
           className='form-style'/>
           {
            errors.questionDesc && (
              <span className=' absolute -bottom-5 right-0 text-red-400 text-sm' >Question Desc required*</span>
            )
           }
        </div>
         {/* Explaination input */}
        <div className=" relative flex flex-col space-y-1">
          <label htmlFor="explanation" className=' text-sm '>Explanation Description</label>
          <input disabled={view || loading}
           id='explanation'
           placeholder='Enter the explanation '
           {...register("explanation")}
           className='  form-style '/>
        
        </div>
        {/* Option +  */}
      <div className=" flex justify-between ">
      <button type='button' onClick={addOption} className=' max-w-max rounded-md px-2 py-1 text-sm border border-yellow-300 text-yellow-300'>
          Add Options +
        </button>
       <div className="flex gap-x-4 items-center">
        <label htmlFor="points" className='text-sm'>
          Points
        </label>
        <input type='number' max={1000}  {...register("points",{
          valueAsNumber: true,
        })} className='px-1 max-h-max  w-[60px] rounded-md outline-none'/>
       </div>
      </div>
        {
          options.map((option,index)=>(
            
             <div className="flex items-center  relative mb-7 bg-slate-600  px-1 sm:p-1  rounded-md gap-1 sm:gap-3" key={index}>
              <input type='text' placeholder={`Option ${index+1}`}
              value={option.text}
              {...register(`options.${index}.text`,{required:true})}
              onChange={(e)=>handleOptionChange(index,"text",e.target.value)}
              className=' outline-none border p-1 text-sm sm:text-xl  sm:p-2 w-full rounded-md'/>
              
              {/* toggle switch */}
              <button type='button' className={` sm:w-14 w-10 sm:h-7 h-3 flex items-center rounded-full sm:p-1 
              ${option.isCorrect?"bg-green-500":"bg-gray-300"}`}
              {...register(`options.${index}.isCorrect`,{required:true,

              })}
               onClick={()=>toggleCorrectAnswer(index)}>
                <div className={` h-5 w-5 bg-white rounded-full shadow-md  transform transition-all duration-500
                  ${option.isCorrect?" translate-x-3 sm:translate-x-5":"translate-x-0"}`}></div>
               </button>
              {/* Cancel */}
              <button type='button' onClick={()=>removeOption(index)}
               className=' p-2  text-white rounded-md'>
                 ✖
               </button>
               {
                errors.options?.[index]?.text  && (
                  <span className=' absolute -bottom-5 text-red-400 text-[0.75rem]'>Option  required*</span>
                )
              }
              
              
            </div>
           
         
           
          ))
        }
        {
            !view && (
              <div className=" flex justify-end gap-2">
                <button type='button' onClick={()=>setModelData(null)} className=' bg-gray-300 border text-white px-2 sm:text-xl text-sm  sm:py-1 rounded-md '>
                  Cancel
                </button>
                {/* Save */}
                <IconBtn  type={"submit"} 
                 disabled={loading} text={loading?"Loading...":edit?"Save & Next":"Save"}/>
              </div>
            )
          }
       
      </form>
       </div>
    </div>
  )
}
