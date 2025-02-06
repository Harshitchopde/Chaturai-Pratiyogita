import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/core/quiz/QuestionForm'
import dumy_data from "../data/dumy-quiz-data-1.json"
import { getAllQuiz } from '../services/operations/quiz.Apis';
import SingleCard from '../components/core/quiz/CardQuiz/SingleCard';

const Quizzes = () => {
  const [quizzes,setQuizzes] = useState([]);
  console.log("Quizzes : ",quizzes)
  useEffect(()=>{
    const getAllQuizResp = async ()=>{
      const result = await getAllQuiz()
      setQuizzes(result);
    }
    getAllQuizResp();
  },[])
  return (
    <div className='flex flex-wrap pt-10 gap-6 w-full h-[100vh] justify-center items-center'>
        {
          quizzes?.map((quiz,i)=>(
             <SingleCard key={i} quiz={quiz}/>
          ))
        } 
    </div>
  )
}

export default Quizzes