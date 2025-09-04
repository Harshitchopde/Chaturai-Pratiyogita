import React, { useEffect, useMemo, useState } from "react";
import QuizInfoRender from "./quiz-render/QuizInfoRender";
import QuestionDetailRender from "./quiz-render/QuestionDetailRender";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails } from "../../../services/operations/quiz.Apis";
import { setEditStudioQuiz, setQuizData } from "../../../slices/quizStudioSlicer";

// const emptyQuiz = useMemo(
//   () => ({
//     title: "",
//     description: "",
//     tags: [],
//     difficulty: "easy",
//     questions: [],
//     // optional parity with your existing schema fields:
//     numberOfQuestions: undefined,
//     timeDuration: undefined,
//     topic: "",
//   }),
//   []
// );

export default function CreateQuizWizard({selectedQuiz}) {
  const [step, setStep] = useState(1);
 


  const { token} = useSelector(state=> state.auth);
  const dispatch = useDispatch();
  // if quiz is selectedQuiz then set them fetch their imformation and set them
  useEffect(()=>{
    const fetchQuizDetails = async()=>{
       const quizId = selectedQuiz._id;
        const result = await getQuizDetails(quizId,token);
        if(result){
          console.log("Fetch quiz details");
          console.log("res:4 ",result)
          dispatch(setQuizData(result))
          dispatch(setEditStudioQuiz(true))
        }
    }
    if(selectedQuiz && selectedQuiz?._id){
        fetchQuizDetails();
    }
  },[selectedQuiz])

  // const [quizData, setQuizData] = useState(emptyQuiz);
  const {quizData} = useSelector((state)=> state.quizStudio)
  console.log("MAIN QUIZ: ",quizData)
  
  
  return <div className="h-full bg-gray-950 text-white">
    {step === 1 && <QuizInfoRender   setStep={setStep}/>}
    {step === 2 && <QuestionDetailRender  setStep={setStep} /> }
     </div>;
}
