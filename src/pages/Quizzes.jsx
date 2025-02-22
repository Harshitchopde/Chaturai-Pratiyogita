import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/core/quiz/QuestionForm'
import dumy_data from "../data/dumy-quiz-data-1.json"
import { getAllQuiz } from '../services/operations/quiz.Apis';
import SingleCard from '../components/core/quiz/CardQuiz/SingleCard';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setQuizzes } from '../slices/quizzesSlice';
import { filterQuizzes } from '../utils/searchUtils';

const Quizzes = () => {
  const [quizs,setQuizs] = useState([]);
  const { token} = useSelector(state=>state.auth);
  const { query,quizzes} = useSelector(state=>state.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(token===null){
    toast.error("You are not authinticated!")
    navigate("/login");
  }
  useEffect(()=>{
    const fileterQuiz = filterQuizzes(query,quizzes);
    setQuizs(fileterQuiz)
  },[query])
  useEffect(()=>{
    const getAllQuizResp = async ()=>{
      const result = await getAllQuiz(token)
      setQuizs(result);
      dispatch(setQuizzes(result));
    }
    if(!quizzes){
      getAllQuizResp();
    }
  },[])

  // implement the search logic
  return (
    <div>
       {query && <div className=" p-3 text-xl sm:text-2xl gap-x-2 ">Search Result for :{" "+query}</div>}
        <div className='flex flex-wrap pt-6 sm:pt-10 gap-6 w-full h-[100vh] justify-center items-center'>
            {
              quizs?.map((quiz,i)=>(
                <SingleCard key={i} quiz={quiz}/>
              ))
            } 
        </div>
    </div>
  
  )
}

export default Quizzes