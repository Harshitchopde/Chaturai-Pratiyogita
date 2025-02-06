import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import QuestionForm from '../QuestionForm';
import toast from 'react-hot-toast';
/*
  let timer = 2;
  const [currentQuestion,setCurrentQuestion] = useState(dumy_data[0]);
  const [quesNumber,setQuestionNumber] = useState(1);
  useEffect(()=>{
    setCurrentQuestion(dumy_data[quesNumber-1])
  },[quesNumber])
  const totalQuestion = dumy_data.length;

*/
const CardQuizRoom = () => {
    const {quiz} = useSelector(state=> state.quiz);
    console.log("Quiz detail : ",quiz?.questions);
    let timer = quiz?.timeDuration 
    const [currentQuestion,setCurrentQuestion] = useState(quiz?.questions[0]);
    const [quesNumber,setQuestionNumber] = useState(1);
    useEffect(()=>{
      setCurrentQuestion(quiz?.questions[quesNumber-1])
    },[quesNumber])
    const totalQuestion = quiz?.questions?.length;

    // timer related calculation
    const [timeLeft, setTimeLeft] = useState(timer*60);
    useEffect(()=>{
       
        if(timeLeft<=0){
            toast.success("Test is over now");
            return;
        }
        if(timeLeft===60){
            toast.success("Hurry Up 60 second left");
           
        }
        const interval = setInterval(()=>{
            setTimeLeft(prev=>prev-1)
        },1000);
        return ()=> clearInterval(interval);
    },[timeLeft])
    
  return (
    <div>
        <QuestionForm question={currentQuestion} setQuestionNumber={setQuestionNumber} total={totalQuestion} quesNumber={quesNumber} timeLeft={timeLeft}/> 
    </div>
  )
}

export default CardQuizRoom