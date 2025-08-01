import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineVerifiedUser } from "react-icons/md";
// import { QUIZ_DIFFICULTY } from '../../../../utils/constants';
// import { cn } from '../../../../utils/classname'; // optional utility to combine Tailwind classes

const difficultyColors = {
  Easy: "bg-green-100 border-green-300",
  Medium: "bg-yellow-100 border-yellow-300",
  Hard: "bg-red-100 border-red-300",
  Any: "bg-gray-100 border-gray-300",
};

const tagColors = {
  Easy: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  Hard: "bg-red-200 text-red-800",
  Any: "bg-gray-200 text-gray-800",
};

const SingleCard = ({ quiz }) => {
  const getActionLabel = () => {
    if (quiz?.attempted === 2) return "Take Test";
    if (quiz?.attempted === 3) return "Show Result";
    return "Register";
  };

  const cardTheme = difficultyColors[quiz?.difficulty] || difficultyColors["Any"];
  const badgeTheme = tagColors[quiz?.difficulty] || tagColors["Any"];

  return (
    <div className={`relative w-full max-w-[360px] h-[390px] rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-2 ${
      cardTheme}`}>
      
      {/* Verified badge */}
      {quiz?.verifyed && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-sm text-yellow-800 bg-yellow-200 px-2 py-1 rounded-md shadow-sm">
          <MdOutlineVerifiedUser className="text-lg" /> Verified
        </div>
      )}

      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-blue-900 truncate">{quiz?.quizName}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{quiz?.quizDesc}</p>
        <p className="text-sm mt-2"><span className="font-semibold text-gray-800">Topic:</span> {quiz?.topic || <span className="italic text-gray-400">N/A</span>}</p>
      </div>

      {/* Tags */}
      <div className="mt-3 text-sm">
        <p className="font-medium text-gray-800">Tags:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {quiz?.tags?.length > 0 ? quiz.tags.map((tag, i) => (
            <span key={i} className="px-2 py-[2px] rounded-full bg-gray-200 text-xs text-gray-700 shadow-sm">
              {tag}
            </span>
          )) : <span className="text-xs italic text-gray-400">No tags</span>}
        </div>
      </div>

      {/* Meta info */}
      <div className="mt-4 flex justify-between text-sm text-gray-800">
        <p>
          <span className="font-medium">Difficulty:</span>{" "}
          <span className={`px-2 py-[2px] rounded-md text-xs ${badgeTheme}`}>
            {quiz?.difficulty || "Any"}
          </span>
        </p>
        <p><span className="font-medium">Questions:</span> {quiz?.numberOfQuestions || 0}</p>
      </div>

      {/* Action */}
      <div className="mt-4">
        <Link to={`/${quiz?._id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition">
            {getActionLabel()}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleCard;
