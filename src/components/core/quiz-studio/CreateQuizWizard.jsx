import React, { useEffect, useMemo, useState } from "react";
import QuizInfoRender from "./quiz-render/QuizInfoRender";
import QuestionDetailRender from "./quiz-render/QuestionDetailRender";
import { useSelector } from "react-redux";


export default function CreateQuizWizard() {
  const [step, setStep] = useState(1);
 



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

  // const [quizData, setQuizData] = useState(emptyQuiz);
  const {quizData} = useSelector((state)=> state.quizStudio)
  console.log("MAIN QUIZ: ",quizData)
  
  
  return <div className="h-full bg-gray-950 text-white">
    {step === 1 && <QuizInfoRender   setStep={setStep}/>}
    {step === 2 && <QuestionDetailRender  setStep={setStep} /> }
     </div>;
}
