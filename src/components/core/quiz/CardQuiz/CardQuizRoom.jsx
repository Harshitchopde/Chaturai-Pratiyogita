import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import QuestionForm from '../QuestionForm';
import toast from 'react-hot-toast';
import { getSubmitedQuizResp, submitQuizResponce } from '../../../../services/operations/resultApis';
const CardQuizRoom = ({submitted,setSubmitted}) => {
    const {testQuiz} = useSelector(state=> state.quizzes);
    const { token} = useSelector(state=> state.auth);
   
    let timer = testQuiz?.timeDuration 
    const [currentQuestion,setCurrentQuestion] = useState(testQuiz?.questions[0]);
    const [quesNumber,setQuestionNumber] = useState(1);
    // yourResponse
    const [yourResponse,setYourResponse] = useState({});
    // result 
    const [result,setResult] = useState(null);
    // const [submitted,setSubmitted] = useState(false);
    // handle option selected
    
    const handleOptionSelect = (questionId,optionId)=>{
      if(submitted){
        return;
      }
      setYourResponse({...yourResponse,[questionId]:optionId});
    }
    // console.log("Result set : ",result)
    useEffect(()=>{
      if(submitted===true){
        const fetchDetails = async ()=>{
          const res = await getSubmitedQuizResp(testQuiz?._id,token)
          // console.log("RESPONCE GET ",res);
          setResult(res);
        }
        fetchDetails();
      }
    },[submitted,testQuiz?._id])
    const handleOptionSubmition = async()=>{
       // yourResponse ko submit karna hai
       const formData = new FormData();
       formData.append("quizId",testQuiz._id)
       Object.entries(yourResponse).forEach(([questionId,optionId])=>{
         formData.append(`responses[${questionId}]`,optionId);
       })
       // call for the submit
       const response = await submitQuizResponce(formData,token);
       if(response){
          setResult(response);
          setSubmitted(true);
       }
    }
    useEffect(()=>{
      setCurrentQuestion(testQuiz?.questions[quesNumber-1])
    },[quesNumber])
    const totalQuestion = testQuiz?.questions?.length;
    
    // timer related calculation
    const [timeLeft, setTimeLeft] = useState(timer*60);
    useEffect(()=>{
       if(!submitted){
            if(timeLeft<=0){
              toast.success("Test is over now");
              handleOptionSubmition();
              return;
          }
          if(timeLeft===60){
              toast.success("Hurry Up 60 second left");
            
          }
          const interval = setInterval(()=>{
              setTimeLeft(prev=>prev-1)
          },1000);
          return ()=> clearInterval(interval);
       }
    },[timeLeft,submitted])
    
  return (
    <div>
        <QuestionForm submitted={submitted} handleOptionSubmition={handleOptionSubmition} result={result} question={currentQuestion} yourResponse={yourResponse} handleOptionSelect={handleOptionSelect} setQuestionNumber={setQuestionNumber} total={totalQuestion} quesNumber={quesNumber} timeLeft={timeLeft}/> 
    </div>
  )
}

export default CardQuizRoom