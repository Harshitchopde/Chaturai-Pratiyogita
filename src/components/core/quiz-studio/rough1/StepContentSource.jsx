import React from "react";
import QuestionEditor from "./QuestionEditor";
import FileUploader from "./FileUploader";
import AIGenerator from "./AIGenerator";
import SubQuizSelector from "./SubQuizSelector";

export default function StepContentSource({ quizData, setQuizData }) {
  const updateField = (field, value) => setQuizData({ ...quizData, [field]: value });

  if (quizData.quizType === "Super") {
    return (
      <SubQuizSelector
        subQuizzes={quizData.subQuizzes}
        setSubQuizzes={(val) => updateField("subQuizzes", val)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Content Source Selection */}
      <div>
        <label className="block text-sm text-gray-300">Content Source</label>
        <select
          value={quizData.contentSource}
          onChange={(e) => updateField("contentSource", e.target.value)}
          className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
        >
          <option value="Manual">Manual</option>
          <option value="AI">AI</option>
          <option value="File">File Import</option>
        </select>
      </div>

      {/* Conditional Rendering */}
      {quizData.contentSource === "Manual" && (
        <QuestionEditor
          questions={quizData.questions}
          setQuestions={(val) => updateField("questions", val)}
        />
      )}

      {quizData.contentSource === "AI" && (
        <AIGenerator
          setQuestions={(val) => updateField("questions", val)}
          quizData={quizData}
        />
      )}

      {quizData.contentSource === "File" && (
        <FileUploader
          file={quizData.file}
          setFile={(val) => updateField("file", val)}
          setQuestions={(val) => updateField("questions", val)}
        />
      )}
    </div>
  );
}
