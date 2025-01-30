import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/core/quiz/QuestionForm'
import dumy_data from "../data/dumy-quiz-data-1.json"
const Quizzes = () => {
  let timer = 2;
  const [currentQuestion,setCurrentQuestion] = useState(dumy_data[0]);
  const [quesNumber,setQuestionNumber] = useState(1);
  useEffect(()=>{
    setCurrentQuestion(dumy_data[quesNumber-1])
  },[quesNumber])
  const totalQuestion = dumy_data.length;
  return (
    <div className='flex flex-col w-full h-[100vh] justify-center items-center'>
        {
           <QuestionForm question={currentQuestion} setQuestionNumber={setQuestionNumber} total={totalQuestion} quesNumber={quesNumber} timer={timer}/> 
        }
    </div>
  )
}

export default Quizzes