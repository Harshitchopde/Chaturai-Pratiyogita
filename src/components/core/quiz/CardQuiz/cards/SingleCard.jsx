import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineVerifiedUser } from "react-icons/md";

const difficultyColors = {
  Easy: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  Hard: "bg-red-200 text-red-800",
  Any: "bg-gray-200 text-gray-800"
};

const SingleCard = ({ quiz }) => {
  const getActionLabel = () => {
    if (quiz?.attempted === 2) return "Take Test";
    if (quiz?.attempted === 3) return "Show Result";
    return "Register";
  };

  return (
    <div className="w-full max-w-[320px] min-h-[350px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col">

      {/* Banner with quiz name and description */}
      <div className="bg-gray-100  h-[100px] p-4 relative">
        <h3 className="text-md sm:text-lg font-semibold text-gray-800">{quiz?.quizName}</h3>
        <p className="text-sm text-gray-600 mt-1">{quiz?.quizDesc}</p>

        {/* Verified Badge */}
        {quiz?.verifyed && (
          <div className="absolute top-2 right-2 flex items-center gap-1 text-sm text-yellow-800 bg-yellow-100 px-2 py-1 rounded-md">
            <MdOutlineVerifiedUser /> Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-4">
        
        {/* Tags */}
        <div className="text-sm mb-2">
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
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            Difficulty:{" "}
            <span className={`px-2 py-[1px] rounded-md ${difficultyColors[quiz?.difficulty] || difficultyColors["Any"]}`}>
              {quiz?.difficulty}
            </span>
          </p>
          <p>Questions: {quiz?.numberOfQuestions}</p>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Link to={quiz?._id}>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
              {getActionLabel()}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
