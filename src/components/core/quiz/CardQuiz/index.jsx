import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails } from "../../../../services/operations/quiz.Apis";
import { setQuiz } from "../../../../slices/quizSlicer";
import { QUIZ_DIFFICULTY } from "../../../../utils/constants";
import toast from "react-hot-toast";
import { formateTimer } from "../../../../utils/formateTime";
import CardQuizRoom from "./CardQuizRoom";

const CardQuiz = () => {
  // const location = useLocation();
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { quiz } = useSelector((state) => state.quiz);
  const isSbmit = quiz?.attempted ? true : false;
  // console.log("IS ",isSbmit)
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    setShowAnswer(isSbmit);
  }, [isSbmit]);
  console.log("Quizx : ", quiz);
  // console.log("ShowAnd ",showAnswer)
  const [loading, setLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuizDetail = async () => {
      const result = await getQuizDetails(quizId, token);

      dispatch(setQuiz(result));
    };
    fetchQuizDetail();
  }, []);
  // console.log("PArams ",location.pathname+" - ",quizId)
  const [timer, setTimer] = useState(0);
  useEffect(() => {}, []);
  // handleStartQuiz
  const handleStartQuiz = () => {
    if (token === null) {
      toast.error("Your are not authenticated!");
      navigate("/login");
      return;
    }
    setLoading(true);
    if (showAnswer) {
      setLoading(false);
      setStartQuiz(true);
      return;
    }
    setTimer(5);
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
    <div className=" w-full h-full p-10">
      {startQuiz ? (
        <CardQuizRoom setSubmitted={setShowAnswer} submitted={showAnswer} />
      ) : (
        <div className=" text-[0.75rem]">
          <div className="  flex justify-between  px-5 sm:px-11 w-10/12 mx-auto rounded-lg bg-gray-200 py-4 sm:py-6">
            <div className=" space-y-[5px] sm:space-y-2">
              <p className=" capitalize  text-xl sm:text-2xl text-black">
                {quiz?.quizName}
              </p>
              <p className=" pl-1 text-[0.75rem] leading-4 sm:text-sm text-slate-400">
                {quiz?.quizDesc}
              </p>
              <p className=" sm:text-lg  ">Topic it Cover : {quiz?.topic}</p>
              <div className=" text-[0.75rem] leading-3  flex sm:flex-row items-center sm:text-xl">
                <p>by - {` .`}</p>
                <div className=" flex  italic items-center">
                  {quiz?.instructor?.firstName +
                    " " +
                    quiz?.instructor?.lastName}
                </div>
              </div>
              <div className=" flex flex-wrap text-sm sm:text-lg ">
                <p className="pr-1 ">Tags:</p>
                {quiz?.tags?.map((tag, i) => (
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
                               quiz?.difficulty === QUIZ_DIFFICULTY.EASY
                                 ? "bg-green-200 text-green-600"
                                 : quiz?.difficulty === QUIZ_DIFFICULTY.MEDIUM
                                 ? " bg-yellow-200 text-yellow-600"
                                 : quiz?.difficulty === QUIZ_DIFFICULTY.HARD
                                 ? "bg-red-200 text-red-600"
                                 : "bg-gray-200 text-gray-600"
                             }`}
                >
                  {quiz?.difficulty}
                </span>
              </p>
              <p className="  sm:text-sm">
                Number Of Questions : {quiz?.numberOfQuestions}
              </p>
            </div>

            <div className=" flex  items-start justify-center ">
              <button
                onClick={handleStartQuiz}
                disabled={loading}
                className=" sm:text-xl text-[0.75rem] leading-4 rounded-md bg-blue-500 max-h-max py-1 px-[2px] sm:px-4 flex  items-center"
              >
                {showAnswer ? (
                  <div className="">Show Answer</div>
                ) : (
                  <div>Start Quiz!</div>
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
  );
};

export default CardQuiz;
