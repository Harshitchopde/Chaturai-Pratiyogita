import React from "react";
import PreviewPane from "./PreviewPane";

export default function StepPreviewPublish({ quizData }) {
  const handlePublish = () => {
    // Call API to save quiz
    console.log("Publishing quiz:", quizData);
    alert("Quiz Published!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <PreviewPane quizData={quizData} />
      </div>
      <div className="w-full lg:w-64 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <button
          onClick={handlePublish}
          className="w-full py-2 bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Publish Quiz
        </button>
      </div>
    </div>
  );
}
