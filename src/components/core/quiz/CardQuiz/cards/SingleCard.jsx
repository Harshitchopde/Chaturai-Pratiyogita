import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { QUIZ_DIFFICULTY } from '../../../../../utils/constants';

const SingleCard = ({ quiz }) => {
  const difficultyColors = {
    Easy: "bg-green-200 text-green-700",
    Medium: "bg-yellow-200 text-yellow-700",
    Hard: "bg-red-200 text-red-700",
    Any: "bg-gray-200 text-gray-700"
  };

  const getActionLabel = () => {
    if (quiz?.attempted === 2) return "Take Test";
    if (quiz?.attempted === 3) return "Show Result";
    return "Register";
  };

  return (
    <div className="relative w-full max-w-[350px] h-[370px] bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-blue-900 line-clamp-1">{quiz?.quizName}</h3>
        <p className="text-sm text-gray-500">{quiz?.quizDesc}</p>
        <p className="text-sm mt-2"><span className="font-medium">Topic:</span> {quiz?.topic || "N/A"}</p>
      </div>

      {/* Tags */}
      <div className="text-sm mt-3">
        <p className="font-medium">Tags:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {quiz?.tags?.map((tag, i) => (
            <span key={i} className="px-2 py-[2px] bg-yellow-100 rounded-md text-xs text-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-2 space-y-1 text-sm text-gray-700">
        <p>
          Difficulty: <span className={`px-2 py-[1px] rounded-md ${difficultyColors[quiz?.difficulty] || difficultyColors["Any"]}`}>
            {quiz?.difficulty}
          </span>
        </p>
        <p>Questions: {quiz?.numberOfQuestions}</p>
      </div>

      {/* Verified badge */}
      {quiz?.verifyed && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-sm text-yellow-800 bg-yellow-100 px-2 py-1 rounded-md">
          <MdOutlineVerifiedUser /> Verified
        </div>
      )}

      {/* Action Button */}
      <div className="mt-4 text-center">
        <Link to={quiz?._id}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
            {getActionLabel()}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleCard;
