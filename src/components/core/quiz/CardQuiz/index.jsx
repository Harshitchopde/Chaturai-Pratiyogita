import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails } from "../../../../services/operations/quiz.Apis";
import CardQuizRoom from "./CardQuizRoom";
import dummy_multi_quiz from '../../../../data/dumy-multi-quiz.json'
import ConformationPopUp from "../../../common/ConformationPopUp";

import { setAttempted, setMultiQuiz, setTestQuiz } from "../../../../slices/quizzesSlice";
import QuizIntroBoard from "./QuizIntroBoard";
import { QUIZ_TYPE } from "../../../../utils/constants";

const CardQuiz = () => {
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { testQuiz, attempted } = useSelector((state) => state.quizzes);

  const dispatch = useDispatch();

  console.log("Test quiz : ",testQuiz);

  const [showAnswer, setShowAnswer] = useState(attempted === 3);
  console.log("Shhow anwer : ",showAnswer)
  console.log("Type : ",testQuiz?.quizType);
  console.log("Attempted : ",attempted)
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
        if(result?.quizType===QUIZ_TYPE.MULTI){
            dispatch(setMultiQuiz(result));
        }else{
             dispatch(setTestQuiz(result));

        }
        if (result?.attempted) {
          dispatch(setAttempted(result.attempted));
        }
      }
    };
    dispatch(setAttempted(dummy_multi_quiz.attempted));
    dispatch(setTestQuiz(dummy_multi_quiz))
    // fetchQuizDetail();
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
            <QuizIntroBoard quizType={testQuiz?.quizType} showAnswer={showAnswer} setStartQuiz={setStartQuiz} setConformationModel={setConformationModel}
             />
        )}
      </div>

      {conformationModel && <ConformationPopUp modelData={conformationModel} />}
    </>
  );
};

export default CardQuiz;
