import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionForm from "../Question/QuestionForm";
import toast from "react-hot-toast";
import {
  getSubmitedQuizResp,
  submitQuizResponce,
} from "../../../../services/operations/resultApis";
import { formateTimer } from "../../../../utils/formateTime";

const CardQuizRoom = ({ submitted, setSubmitted }) => {
  const { testQuiz } = useSelector((state) => state.quizzes);
  const { token } = useSelector((state) => state.auth);

  const [currentQuestion, setCurrentQuestion] = useState(
    testQuiz?.questions[0]
  );
  const [quesNumber, setQuestionNumber] = useState(1);
  const [yourResponse, setYourResponse] = useState({});
  const [result, setResult] = useState(null);
  const [review, setReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timer = testQuiz?.timeDuration || 0;
  const [timeLeft, setTimeLeft] = useState(timer * 60);
  const totalQuestions = testQuiz?.questions?.length || 0;

  const handleOptionSelect = (questionId, optionId) => {
    if (submitted) return;
    setYourResponse((prev) => ({ ...prev, [questionId]: optionId }));
  };

  useEffect(() => {
    if (submitted) {
      const fetchResult = async () => {
        const res = await getSubmitedQuizResp(testQuiz?._id, token);
        if (res) setResult(res);
      };
      fetchResult();
    }
  }, [submitted, testQuiz?._id, token]);

  const handleOptionSubmission = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const formData = new FormData();
    formData.append("quizId", testQuiz._id);
    formData.append("timeTaken",(timer * 60 - timeLeft));
    Object.entries(yourResponse).forEach(([qid, oid]) =>
      formData.append(`responses[${qid}]`, oid)
    );
    console.log("Submiting: ",formData)

    const response = await submitQuizResponce(formData, token);
    if (response) {
      setResult(response);
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    setCurrentQuestion(testQuiz?.questions[quesNumber - 1]);
  }, [quesNumber, testQuiz]);

  useEffect(() => {
    if (!submitted) {
      if (timeLeft <= 0) {
        toast.success("Test is over now");
        handleOptionSubmission();
        return;
      }
      if (timeLeft === 60) {
        toast("⏰ Hurry up! Only 60 seconds left.", {
          icon: "⚠️",
        });
      }
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, submitted]);
//   console.log("RESULT: ",result)
  return (
    <div className="animate-fade-in">
      {isSubmitting ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-8 bg-white rounded-md shadow-md text-center">
          <div className="text-xl font-semibold text-blue-600">
            Submitting your quiz...
          </div>
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 animate-pulse w-full" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few seconds.
          </p>
        </div>
      ) : !submitted || review ? (
        <QuestionForm
          submitted={submitted}
          review={review}
          setReview={setReview}
          handleOptionSubmition={handleOptionSubmission}
          result={result}
          question={currentQuestion}
          yourResponse={yourResponse}
          handleOptionSelect={handleOptionSelect}
          setQuestionNumber={setQuestionNumber}
          total={totalQuestions}
          quesNumber={quesNumber}
          timeLeft={timeLeft}
        />
      ) : (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Analysis
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-100 rounded-md shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                {result?.totalQuestions}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div className="p-4 bg-green-100 rounded-md shadow-sm">
              <p className="text-2xl font-bold text-green-700">
                {result?.correctAnswers}
              </p>
              <p className="text-sm text-green-600">Correct Answers</p>
            </div>
            <div className="p-4 bg-red-100 rounded-md shadow-sm">
              <p className="text-2xl font-bold text-red-700">
                {result?.wrongAnswers}
              </p> 
              <p className="text-sm text-red-600">Wrong Answers</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-md shadow-sm">
              <p className="text-2xl font-bold text-blue-700">
                {result?.totalScore}
              </p>
              <p className="text-sm text-blue-600">Total Score</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-100 text-center rounded-md shadow-sm">
            <p className="text-xl font-bold text-yellow-700">
              {formateTimer(result?.timeTaken)}
            </p>
            <p className="text-sm text-yellow-600">Time Taken</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 text-gray-800">
            Review Questions
          </h3>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {testQuiz?.questions.map((q, idx) => {
              const isCorrect =
                result?.responses?.[q._id] === q.correctAnswerId;
                console.log("RES, ", result?.responses?.[q._id])
                console.log("RE SHOW : ",isCorrect+" - ",q.correctAnswerId)
              const notAttempted = result?.responses?.[q._id] == null;
              let btnColor = "bg-gray-400";

              if (!notAttempted) {
                btnColor = isCorrect ? "bg-green-500" : "bg-red-500";
              }

              return (
                <button
                  key={q._id}
                  onClick={() => {
                    setQuestionNumber(idx + 1);
                    setReview(true);
                  }}
                  className={`text-white text-sm px-3 py-2 rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ${btnColor}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardQuizRoom;
