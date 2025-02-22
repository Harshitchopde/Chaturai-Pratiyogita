import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails } from "../../../../services/operations/quiz.Apis";
import { QUIZ_DIFFICULTY } from "../../../../utils/constants";
import toast from "react-hot-toast";
import { formateTimer } from "../../../../utils/formateTime";
import CardQuizRoom from "./CardQuizRoom";
import { registerQuizResponse } from "../../../../services/operations/resultApis";
import ConformationPopUp from "../../../common/ConformationPopUp";

import { spendCoins } from "../../../../slices/coinSlicer";
import { setAttempted, setTestQuiz } from "../../../../slices/quizzesSlice";


const CardQuiz = () => {
  // const location = useLocation();
  // console.log("loca ",location)
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const {user} = useSelector(state=>state.profile);
  const { testQuiz,attempted } = useSelector((state) => state.quizzes);
  const {coins} = useSelector(state=>state.coins)
  const dispatch = useDispatch();
  console.log("IS ",user)
  console.log("Call quiz : ",testQuiz)
  console.log("Atmpt : ",attempted)
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(attempted===3);
  const [conformationModel,setConformationModel] = useState(null);
  useEffect(() => {
    const fetchQuizDetail = async () => {
      const result = await getQuizDetails(quizId, token);
      if(result){
          dispatch(setTestQuiz(result));
          if(result?.attempted){
            dispatch(setAttempted(result.attempted))

          }
      }
      
    };
   
    fetchQuizDetail();
  }, []);
  useEffect(() => {
    setShowAnswer(attempted === 3);
  }, [attempted]);
  console.log("Quizx : ", testQuiz);
  // console.log("ShowAnd ",showAnswer)
  const [loading, setLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  // console.log("PArams ",location.pathname+" - ",quizId)
  const [timer, setTimer] = useState(0);
  // handleRegister
  const handleQuizRegister =async ()=>{
    console.log("Handle quiz reg ")
    console.log("Coins : ",testQuiz?.coins ," ",coins)
   
   
    const apmt = await registerQuizResponse(testQuiz._id,token)
    
    console.log("Ampt ",apmt)
    if(apmt){
      dispatch(spendCoins(testQuiz?.coins));
      dispatch(setAttempted(2));
    }else{
      toast.error("Error Attempted null")
      console.log("Error null")
    }
    setConformationModel(null);
    console.log("Confo ",conformationModel)
  }

  // handleStartQuiz
  const handleStartQuiz = async() => {
    if (token === null) {
      toast.error("Your are not authenticated!");
      navigate("/login");
      return;
    }
  
    if (showAnswer) {
      setStartQuiz(true);
      return;
    }
    // pay the coins to proceed
    if(attempted===1){
      if(testQuiz?.coins >coins){
        toast.error("Insufficient balance");
        return;
      }
      setConformationModel({
        text1:"Are you Sure!",
        text2:`Pay ${testQuiz?.coins} to register for quiz`,
        btn1Text:"Proceed",
        btn2Text:"Cancel",
        btn1Handler:()=>handleQuizRegister(),
        btn2Handler:()=>setConformationModel(null)
      });
      //  await handleQuizRegister();
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
  // console.log(startQuiz)

  return (
   <>
    <div className=" w-full h-full p-10">
    
    {startQuiz ? (
      <CardQuizRoom setSubmitted={setShowAnswer} submitted={showAnswer} />
    ) :(
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
        <div className=" w-full h-[30vh]  flex justify-center items-center">
          <div className=" text-4xl text-gray-300">{formateTimer(timer)}</div>
        </div>
      </div>
    )}
    </div>

    {/* ConformationModel */}
    {
      conformationModel && (
        <ConformationPopUp modelData={conformationModel}/>
      )
    }
   </>
  );
};

export default CardQuiz;
