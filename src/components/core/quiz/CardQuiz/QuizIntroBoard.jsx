import React, { useState } from 'react'
import { QUIZ_DIFFICULTY, QUIZ_TYPE } from '../../../../utils/constants'
import { formateTimer } from '../../../../utils/formateTime'
// import { registerQuizResponse } from "../../../../services/operations/resultApis";
// import { spendCoins } from "../../../../slices/coinSlicer";
import toast from "react-hot-toast";
import { registerQuizResponse } from '../../../../services/operations/resultApis';
import { spendCoins } from '../../../../slices/coinSlicer';
import { setAttempted } from '../../../../slices/quizzesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MiniCard from './MiniCard';
const QuizIntroBoard = ({quizType,showAnswer,setConformationModel,setStartQuiz}) => {
     const { token } = useSelector((state) => state.auth);
    // testQuiz
    const { testQuiz, attempted } = useSelector((state) => state.quizzes);
    const { coins } = useSelector((state) => state.coins);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const [quizResults, setQuizResults] = useState(null);
      const [loading, setLoading] = useState(false);
      const [timer, setTimer] = useState(0);
      const [selectedQuestion, setSelectedQuestion] = useState(null);
      console.log("Tyep : ",quizType)
      // console.log("MULTI : ",dummy_multi_quiz)
    // handleStartQuiz
     
        // Handle Quiz Submission
  const handleQuizSubmit = async () => {
    try {
      const result = await registerQuizResponse(testQuiz._id, token);
      if (result) {
        setQuizResults(result);

        toast.success("Quiz Submitted! See your results below.");
      } else {
        toast.error("Failed to submit quiz.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  
  // Handle Quiz Registration
  const handleQuizRegister = async () => {
    const apmt = await registerQuizResponse(testQuiz._id, token);
    if (apmt) {
      dispatch(spendCoins(testQuiz?.coins));
      dispatch(setAttempted(2));
    } else {
      toast.error("Error Attempted null");
    }
    setConformationModel(null);
  };

   // Handle Quiz Start
  const handleStartQuiz = async () => {
    if (!token) {
      toast.error("You are not authenticated!");
      navigate("/login");
      return;
    }

    if (showAnswer) {
      setStartQuiz(true);
      return;
    }

    if (attempted === 1) {
      if (testQuiz?.coins > coins) {
        toast.error("Insufficient balance");
        return;
      }
      setConformationModel({
        text1: "Are you Sure!",
        text2: `Pay ${testQuiz?.coins} to register for quiz`,
        btn1Text: "Proceed",
        btn2Text: "Cancel",
        btn1Handler: () => handleQuizRegister(),
        btn2Handler: () => setConformationModel(null),
      });
      return;
    }

    setLoading(true);
    setTimer(3);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoading(false);
          setStartQuiz(true);
          toast.success("Test Started!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
    // loading
    // timer
    // attempted
    


  return (
    <div className=" text-[0.75rem]">
                  <div className="  flex justify-between  px-5 sm:px-11 w-10/12 mx-auto rounded-lg bg-gray-200 py-4 sm:py-6">
                    <div className=" space-y-[5px] sm:space-y-2">
                      <p className=" capitalize  text-xl sm:text-2xl text-black">
                        {testQuiz?.quizName}
                      </p>
                      <p className=" pl-1 text-[0.75rem] leading-4 sm:text-sm text-slate-400">
                        {testQuiz?.quizDesc}
                      </p>
                      <p className=" sm:text-lg  ">Topic it Cover : {testQuiz?.topic}</p>
                      <div className=" text-[0.75rem] leading-3  flex sm:flex-row items-center sm:text-xl">
                        <p>by - {` .`}</p>
                        <div className=" flex  italic items-center">
                          {testQuiz?.instructor?.firstName +
                            " " +
                            testQuiz?.instructor?.lastName}
                        </div>
                      </div>
                      <div className=" flex flex-wrap text-sm sm:text-lg ">
                        <p className="pr-1 ">Tags:</p>
                        {testQuiz?.tags?.map((tag, i) => (
                          <div
                            key={i}
                            className=" px-2 py-0 max-h-max my-1 sm:py-[1px] mx-1  text-sm flex flex-wrap items-center justify-center rounded-lg bg-yellow-100"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
          
                      <p className=" sm:text-sm">
                        Difficulty :{" "}
                        <span
                          className={`
                                      rounded-md px-2 py-[1px] ${
                                        testQuiz?.difficulty === QUIZ_DIFFICULTY.EASY
                                          ? "bg-green-200 text-green-600"
                                          : testQuiz?.difficulty === QUIZ_DIFFICULTY.MEDIUM
                                          ? " bg-yellow-200 text-yellow-600"
                                          : testQuiz?.difficulty === QUIZ_DIFFICULTY.HARD
                                          ? "bg-red-200 text-red-600"
                                          : "bg-gray-200 text-gray-600"
                                      }`}
                        >
                          {testQuiz?.difficulty}
                        </span>
                      </p>
                      <p className="  sm:text-sm">
                        Number Of Questions : {testQuiz?.numberOfQuestions}
                      </p>
                    </div>
          
                    <div className=" flex  items-start justify-center ">
                      <button
                        onClick={handleStartQuiz}
                        disabled={loading}
                        className=" sm:text-xl text-[0.75rem] leading-4 rounded-md bg-blue-500 max-h-max py-1 px-[2px] sm:px-4 flex  items-center"
                      >
                        {attempted===3 ? (
                          <div className="">Show Answer</div>
                        ):attempted===2 ? (
                          <div>Start Quiz!</div>
                        ):(
                          <div className="">Register</div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className=" overflow-hidden w-10/12 mx-auto m-5  flex justify-center items-center">
                        {
                          quizType===QUIZ_TYPE.MULTI?(
                            <div className="  w-full h-[300px] space-y-2 overflow-scroll">
                               {
                                testQuiz?.quizzes?.map((quiz,i)=>(
                                  <MiniCard key={i} quiz={quiz}/>
                                ))
                               }
                            </div>
                          ):(

                            <div className=" h-[30vh]  text-4xl text-gray-300">{formateTimer(timer)}</div>
                          )
                        }

                  </div>
                </div>
  )
}

export default QuizIntroBoard