import React, { useEffect, useMemo, useState } from "react";
import QuizInfoRender from "./quiz-render/QuizInfoRender";
import QuestionDetailRender from "./quiz-render/QuestionDetailRender";


export default function CreateQuizWizard({ onFinish, onCancel, seedQuiz }) {
  const [step, setStep] = useState(1);
 



  const emptyQuiz = useMemo(
    () => ({
      title: "",
      description: "",
      tags: [],
      difficulty: "easy",
      questions: [],
      // optional parity with your existing schema fields:
      numberOfQuestions: undefined,
      timeDuration: undefined,
      topic: "",
    }),
    []
  );

  const [quizData, setQuizData] = useState(emptyQuiz);
  console.log("MAIN QUIZ: ",quizData)
  useEffect(() => {
    if (seedQuiz) {
      // map your existing quiz shape into studio shape if needed
      // setQuizData({
      //   ...emptyQuiz,
      //   ...seedQuiz,
      //   title: seedQuiz.title || seedQuiz.quizName || "",
      //   description: seedQuiz.description || seedQuiz.quizDesc || "",
      //   difficulty: seedQuiz.difficulty?.toLowerCase?.() || " easy",
      //   questions: seedQuiz.questions || [],
      // });
    }
  }, [seedQuiz,quizData, emptyQuiz]);

  return <div className="h-full bg-gray-950 text-white">
    {step === 1 && <QuizInfoRender quizData={quizData} setQuizData={setQuizData} onCancel={onCancel} setStep={setStep}/>}
    {step === 2 && <QuestionDetailRender quizData={quizData} setQuizData={setQuizData} setStep={setStep} onFinish={onFinish} /> }
     </div>;
}
