import React, { useState } from 'react'
import StepBasicInfo from './StepBasicInfo';
import StepContentSource from './StepContentSource';
import StepPreviewPublish from './StepPreviewPublish';

const QuizStudio = () => {
    const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    quizName: "",
    quizDesc: "",
    quizType: "Simple",
    difficulty: "Any",
    timeDuration: 10,
    tags: [],
    questions: [],
    subQuizzes: [],
    contentSource: "Manual",
    file: null,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Stepper */}
      <div className="flex justify-center p-4 border-b border-gray-700">
        {["Basic Info", "Content Source", "Preview & Publish"].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === idx + 1 ? "bg-indigo-500" : "bg-gray-700"
              }`}
            >
              {idx + 1}
            </div>
            <span className="ml-2 mr-4 text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Main Step Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          {step === 1 && <StepBasicInfo quizData={quizData} setQuizData={setQuizData} />}
          {step === 2 && <StepContentSource quizData={quizData} setQuizData={setQuizData} />}
          {step === 3 && <StepPreviewPublish quizData={quizData} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between p-4 border-t border-gray-700">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={step === 3}
          className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default QuizStudio