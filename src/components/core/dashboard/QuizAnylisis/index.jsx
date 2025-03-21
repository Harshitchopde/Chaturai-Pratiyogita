import { Button, Card, CardContent } from '@mui/material';
import { Check, CheckCircle, Clipboard, Pencil, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { instructorAnalysis, sendQuizMail } from '../../../../services/operations/quiz.Apis';
import { setAnalyticsQuiz } from '../../../../slices/quizzesSlice';
import { QUIZ_STATUS } from '../../../../utils/constants';
import ConformationPopUp from '../../../common/ConformationPopUp';
import toast from 'react-hot-toast';
import { spendCoins } from '../../../../slices/coinSlicer';

const QuizAnalysis = () => {
  const location = useLocation();
  const quizId = location.pathname.split('/')[3]
  const [copied,setCopied] = useState(false);
  const [quizUrl,setQuizUrl] = useState("");
  const { analyticsQuiz} = useSelector(state=>state.quizzes);
  const { token } = useSelector(state=>state.auth)
  // const [publishedConformation,setPublishedConformation] = useState(null);
  const [sendEmailConformation,setSendEmailConformation] = useState(null);
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
    urlQuiz();
  },[])
  const handleSendEmails = async()=>{
    // toast.success("SendEmail");
    const result = sendQuizMail(token,quizUrl,quizId)
    if(result){
      dispatch(spendCoins(5));
    }
    setSendEmailConformation(null);
  }
  const urlQuiz = ()=>{
    const url = window.location.href;
    const pom = url.split("/") 
    pom[3]="quizzes";
    pom[4]=quizId;
    pom[5] = "";
    const copiedUrl = pom.join("/");
   
    setQuizUrl(copiedUrl);
  }
  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    setTimeout(()=>setCopied(false),1000);
  }

  return (
   <>
    <div className="p-6 max-w-4xl mx-auto">
    <div className=" flex w-full ">
    <h1 className="text-xl flex-1  sm:text-3xl sm:font-bold mb-4 capitalize">{analyticsQuiz?.quizName}</h1>
    <div className="flex flex-col flex-1 sm:flex-row gap-x-0 items-center  justify-center sm:justify-around">
    <div className="flex items-center justify-center">
    <Button onClick={copyToClipboard} className="flex max-h-max max-w-max ">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
    </Button>
    </div>
    <div className="flex flex-col gap-y-2">
    <Button className= {`border max-h-max rounded-md text-blue-500 border-blue-500`}>{analyticsQuiz?.status}</Button>
    <Button 
    onClick={()=>setSendEmailConformation({
      text1:"Notify via Email",
      text2:"Pay 5 coins to notify all eligible users via email.",
      btn1Text:"Send",
      btn2Text:"Cancel",
      btn1Handler:()=>handleSendEmails(),
      btn2Handler:()=>setSendEmailConformation(null)

    })}
    className= {`border max-h-max rounded-md text-blue-500 border-blue-500`}>Send Email</Button>

    </div>
   
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
        <Card key={i} className="flex justify-between p-4">
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
  {
    sendEmailConformation && <ConformationPopUp modelData={sendEmailConformation}/>
  }
   </>
  )
}

export default QuizAnalysis