import React from "react";

import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { formateTimer } from "../../../../utils/formateTime";
/*
{
    "questionDesc": "Which planet is known as the Red Planet?",
    "options": [
      { "text": "Earth", "isCorrect": false },
      { "text": "Mars", "isCorrect": true },
      { "text": "Venus", "isCorrect": false },
      { "text": "Jupiter", "isCorrect": false }
    ],
    "correctAnswer": "Mars",
    "points": 1,
    "questionType": "MCQ",
    "explanation": "Mars is often called the Red Planet because of its reddish appearance."
  },
  */
const QuestionForm = ({
  question,
  quesNumber,
  total,
  yourResponse,
  handleOptionSelect,
  handleOptionSubmition,
  submitted,
  result,
  timeLeft,
  review,
  setReview,
  setQuestionNumber,
}) => {
  const isLast = quesNumber === total;
  const isFirst = quesNumber === 1;

  const selectedOptionId = yourResponse?.[question._id];

  const getOptionClasses = (option) => {
    const selected = selectedOptionId === option._id;
    const correct = question.correctAnswer === option._id;
    const attempted = selectedOptionId != null;

    if (!submitted) {
      return selected
        ? "bg-blue-600 text-white border border-blue-700"
        : "border border-gray-300";
    }

    if (submitted) {
      if (selected && correct) return "bg-green-500 text-white border";
      if (selected && !correct) return "bg-red-500 text-white border";
      if (!selected && correct) return "border border-green-600";
    }

    return "border border-gray-300";
  };
//   console.log("result: ",result)
  return (
     <div className="animate-fade-in bg-white p-6 rounded-xl shadow-lg transition-all duration-500">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-gray-800">
        Question {quesNumber} of {total}
      </h3>
      {!submitted && (
        <span className="text-sm font-mono text-red-600 bg-red-100 px-2 py-1 rounded">
          Time Left: {formateTimer(timeLeft)}
        </span>
      )}
    </div>

   <div className="text-sm sm:text-base capitalize font-medium text-gray-800 mb-5">
  {question?.questionDesc}
</div>

{/* Options */}
<div className="space-y-3">
  {question?.options?.map((option, i) => {
    const isSelected = yourResponse[question?._id] === option._id;
    const isCorrect = option?.isCorrect;
    const userSelected = result?.responses?.[question?._id] === option._id;
    console.log("ID: ",i," ISEL: ",isSelected," ISCOR: ",isCorrect," US: ",userSelected)
    let borderColor = "border-gray-300";
    let bgColor = "bg-white";
    let textColor = "text-gray-800";

    if (submitted) {
      if (isCorrect && userSelected) {
        console.log("op: gg")
        borderColor = "border-green-600";
        bgColor = "bg-green-100";
        textColor = "text-green-800";
      } else if (userSelected && !isCorrect) {
        console.log("op: rr")
        borderColor = "border-red-600";
        bgColor = "bg-red-100";
        textColor = "text-red-800";
      } else if (isCorrect) {
        console.log("op: gg")
        borderColor = "border-green-600";
        bgColor = "bg-green-50";
      }
    } else if (isSelected) {
        console.log("op: bb")
      borderColor = "border-blue-600";
      bgColor = "bg-blue-50";
      textColor = "text-blue-800";
    }

    return (
      <div
        key={i}
        onClick={() => !submitted && handleOptionSelect(question?._id, option?._id)}
        className={`flex items-center cursor-pointer transition duration-200 border ${borderColor} ${bgColor} ${textColor} rounded-md px-4 py-3 hover:shadow-md`}
      >
        <input
          type="radio"
          name={`question-${question?._id}`}
          value={option.text}
          checked={isSelected || userSelected}
          readOnly
          className={`${!submitted?"accent-blue-600":isCorrect && userSelected ?"accent-green-600":userSelected && "accent-red-600"} w-4 h-4 mr-4`}
        />
        <span className="text-sm sm:text-base">{option.text}</span>
      </div>
    );
  })}
</div>

    {/* Explanation Box */}
    {submitted && question?.explanation && (
      <div className={`mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm`}>
        <p className="text-sm text-yellow-800 font-medium">
          📘 Explanation:
        </p>
        <p className="text-sm text-gray-700 mt-1">
          {question?.explanation}
        </p>
      </div>
    )}

    {/* Footer Navigation */}
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={isFirst}
        onClick={() => setQuestionNumber((prev) => prev - 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
          isFirst
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <ArrowLeft size={18} />
        Previous
      </button>

      {!submitted && isLast ? (
        <button
          onClick={handleOptionSubmition}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          <CheckCircle size={18} />
          Submit Quiz
        </button>
      ) : (
        <button
          disabled={isLast}
          onClick={() => setQuestionNumber((prev) => prev + 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
            isLast
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
          <ArrowRight size={18} />
        </button>
      )}
    </div>

    {/* Exit Review */}
    {submitted && review && (
      <div className="text-center mt-6">
        <button
          onClick={() => setReview(false)}
          className="text-sm text-blue-600 hover:underline"
        >
          Exit Review Mode
        </button>
      </div>
    )}
  </div>
  );
};

export default QuestionForm;
