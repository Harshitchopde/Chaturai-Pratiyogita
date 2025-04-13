import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails } from "../../../../services/operations/quiz.Apis";
import CardQuizRoom from "./CardQuizRoom";

import ConformationPopUp from "../../../common/ConformationPopUp";

import { setAttempted, setTestQuiz } from "../../../../slices/quizzesSlice";
import QuizIntroBoard from "./QuizIntroBoard";

const CardQuiz = () => {
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { testQuiz, attempted } = useSelector((state) => state.quizzes);

  const dispatch = useDispatch();


  const [showAnswer, setShowAnswer] = useState(attempted === 3);
  
 
  const [conformationModel, setConformationModel] = useState(null);
 
  const [startQuiz, setStartQuiz] = useState(false);

  // console.log("shwo ",quizId)
  // console.log("testQuiz ",testQuiz,attempted)
  // console.log("showAnswer ",showAnswer)
  // console.log("showAnalysis ",quizResults)
  useEffect(() => {
    const fetchQuizDetail = async () => {
      const result = await getQuizDetails(quizId, token);
      if (result) {
        dispatch(setTestQuiz(result));
        if (result?.attempted) {
          dispatch(setAttempted(result.attempted));
        }
      }
    };
    fetchQuizDetail();
  }, []);

  useEffect(() => {
    setShowAnswer(attempted === 3);
  }, [attempted]);





  return (
    <>
      <div className="w-full h-full p-10">
        {startQuiz ? (
          <CardQuizRoom setSubmitted={setShowAnswer} submitted={showAnswer} />
        ) : (
            <QuizIntroBoard showAnswer={showAnswer} setStartQuiz={setStartQuiz} setConformationModel={setConformationModel}
             />
        )}
      </div>

      {conformationModel && <ConformationPopUp modelData={conformationModel} />}
    </>
  );
};

export default CardQuiz;
