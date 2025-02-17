import { Button, Card, CardContent } from '@mui/material';
import { Check, CheckCircle, Clipboard, Pencil, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { instructorAnalysis } from '../../../../services/operations/quiz.Apis';
import { setAnalyticsQuiz } from '../../../../slices/quizzesSlice';
import { QUIZ_STATUS } from '../../../../utils/constants';

const QuizAnalysis = () => {
  const location = useLocation();
  const quizId = location.pathname.split('/')[3]
  const [copied,setCopied] = useState(false);
  const { analyticsQuiz} = useSelector(state=>state.quizzes);
  const { token } = useSelector(state=>state.auth)
  // const [publishedConformation,setPublishedConformation] = useState(null);
  // const publishedConformation = 
  const dispatch = useDispatch();
  // call the data of anylisis quiz
  useEffect(()=>{
    const fetchAnalyticQuiz = async()=>{
        const res = await instructorAnalysis(quizId,token);
        if(res){
          dispatch(setAnalyticsQuiz(res));
        }
    }
    fetchAnalyticQuiz();
  },[])
  const copyToClipboard = ()=>{
    const url = window.location.href;
    // console.log("Url : ",url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(()=>setCopied(false),1000);
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
    <div className=" flex w-full justify-between">
    <h1 className="text-3xl font-bold mb-4">{analyticsQuiz?.quizName}</h1>
    <div className="flex gap-x-0 items-center justify-center">
    <Button onClick={copyToClipboard} className="flex max-h-max max-w-max ">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
    </Button>
    <Button className= {`border max-h-max p-1 rounded-md text-blue-500 border-blue-500`}>{analyticsQuiz?.status}</Button>
   
    </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <p className="text-lg font-semibold">Total Attempted</p>
          <p className="text-2xl">{analyticsQuiz?.studentEnrolled?.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-lg font-semibold">Average Score</p>
          <p className="text-2xl">{analyticsQuiz?.avgScore || "N/A"}%</p>
        </CardContent>
      </Card>
    </div>
    <div className=" grid grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className=' flex  justify-center  flex-col p-4'>
          <div className="flex gap-x-4">
            <p className=' text-lg font-semibold'>Highest Score:</p> 
            <p className=' text-2xl'>{analyticsQuiz?.maxScore || 0}</p>
          </div>
          <div className=" flex gap-x-4">
            <p className=' text-lg font-semibold'>Lowest Score :</p>  
            <p className=' text-2xl'>{analyticsQuiz?.minScore || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className=' flex justify-center flex-col p-4' >
          <p className=' font-semibold text-lg'>Average Time Taken </p>
          <p className=' text-2xl'>{analyticsQuiz?.averageTime || 0}</p>
          
        </CardContent>
      </Card>
    </div>
    <h2 className="text-2xl font-semibold mb-3">Questions</h2>
    <div className="space-y-3">
      {analyticsQuiz?.questions.map((q,i) => (
        <Card key={q.id} className="flex justify-between p-4">
          <p className=' capitalize'>{i+1}.{" "}{q?.questionDesc}</p>
          <div className=" border max-w-max max-h-max rounded-md">
          <Button variant="ghost">
            <Pencil className="mr-2 w-4" /> Edit
          </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
  )
}

export default QuizAnalysis