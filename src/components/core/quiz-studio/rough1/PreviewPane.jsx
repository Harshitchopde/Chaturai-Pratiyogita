import React from "react";

export default function PreviewPane({ quizData }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white">{quizData.quizName || "Untitled Quiz"}</h2>
      <p className="text-gray-400">{quizData.quizDesc || "No description"}</p>
      <p className="text-gray-300 mt-2">Type: {quizData.quizType}</p>
      <p className="text-gray-300">Difficulty: {quizData.difficulty}</p>
      <div className="mt-4 space-y-2">
        {quizData.questions?.map((q, idx) => (
          <div key={idx} className="bg-gray-900 p-2 rounded">
            <p>{q.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
