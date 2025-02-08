import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { createQuestion } from '../../../../../services/operations/questionApis';
import { setQuiz } from '../../../../../slices/quizSlicer';
import ReactJson from 'react-json-view';

export const QuestionModel = ({
  modelData, 
  setModelData
  ,add=false,
  view=false,
  edit=false
}) => {
  const {
    register,

    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      questionDesc: modelData?.questionDesc || "",
      explanation: modelData?.explanation || "",
      points: modelData?.points || 1,
      options: modelData?.options || [{ text: "", isCorrect: false }]
    }
  });



  const dispatch = useDispatch();
  const { quiz} = useSelector(state=>state.quiz);
  const { token } = useSelector(state=> state.auth)
  const [loading,setLoading] = useState(false)
  // options
  const [options,setOptions] = useState([{text:"",isCorrect:false}]);

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
    // const currValues = getValues();
    
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
    console.log("Optin : ",options)
    // const currValues = getValues();
    const formData = new FormData();
    formData.append("quizId",modelData);
    formData.append("questionDesc",data.questionDesc)
    formData.append("points",data.points)
    formData.append("explanation",data.explanation)
    formData.append("options",JSON.stringify(options));
    setLoading(true);
    const res = await createQuestion(formData,token);
    
    if(res){
      dispatch(setQuiz(res));
      // toast.success("Added succesfully!")
    }
    setModelData(null)
    setLoading(false);
    // toast.success("you got it")

  }
  
  return (
    <div className=' !mt-0 z-[100] h-screen w-screen overflow-auto grid place-items-center  fixed inset-0 backdrop-blur-sm bg-white bg-opacity-10'>
      <div className="  my-10 w-11/12 rounded-lg max-w-[700px] border border-slate-700 bg-slate-400 
       ">
      {/* Model Heading */}
      <div className=" flex justify-between items-center  rounded-lg p-5">
      <p className=' text-2xl  font-bold flex items-center justify-center rounded-t-lg p-5'>
        {add && "Adding"} {view && "Viewing"} {edit && "Editing"} Question
      </p>
      <button onClick={()=>(!loading ? setModelData(null):{})} >
        <RxCross2 className=' text-2xl text-slate-800'/>
      </button>
      </div>
      {/* Model Form  */}
      <form onSubmit={handleSubmit(handleSubmitBtn)}
       className=' w-11/12 px-3 mb-4 mx-auto flex flex-col space-y-3'>
                 {/* JSON Editor */}
                 <div className="relative flex flex-col space-y-1">
            <label htmlFor="jsonEditor" className='text-sm'>Edit Question Data (JSON)</label>
            <ReactJson
              src={jsonData}
              theme="monokai"
              onEdit={(e) => handleJsonChange(e.updated_src)}
              onAdd={(e) => handleJsonChange(e.updated_src)}
              onDelete={(e) => handleJsonChange(e.updated_src)}
              collapsed={false}
            />
          </div>

          {/* Buttons */}
          {!view && (
            <div className="flex justify-end gap-2">
              <button type='button' onClick={() => setModelData(null)} className='bg-gray-300 border text-white px-2 py-1 rounded-md '>
                Cancel
              </button>
              <IconBtn type={"submit"} disabled={loading} text={loading ? "Loading..." : edit ? "Save & Next" : "Save"} />
            </div>
          )}
       
      </form>
       </div>
    </div>
  )
}
