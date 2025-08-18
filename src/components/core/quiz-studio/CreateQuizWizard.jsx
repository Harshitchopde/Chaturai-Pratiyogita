import { useState } from "react";
import VisualEditor from "./editors/VisualEditor";
import JSONEditor from "./editors/JSONEditor";
import JsonAndVisual from "./editors/JsonAndVisual";


export default function CreateQuizWizard({ onFinish, onCancel }) {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    tags: [],
    difficulty: "easy",
    questions: []
  });
  const [mode, setMode] = useState(null); // "visual" | "json" | "split" | "ai"

  // Step 1 – Quiz Info
  const renderStep1 = () => (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Quiz Details</h2>
      <input
        className="w-full p-2 text-black rounded"
        placeholder="Quiz Title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />
      <textarea
        className="w-full p-2 text-black rounded"
        placeholder="Description (optional)"
        value={quizData.description}
        onChange={(e) =>
          setQuizData({ ...quizData, description: e.target.value })
        }
      />
      <select
        className="w-full p-2 text-black rounded"
        value={quizData.difficulty}
        onChange={(e) =>
          setQuizData({ ...quizData, difficulty: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded text-white"
        >
          Cancel
        </button>
        <button
          disabled={!quizData.title}
          onClick={() => setStep(2)}
          className="px-4 py-2 bg-indigo-600 rounded text-white disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );

  // Step 2 – Questions Input
  const renderStep2 = () => (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Add Questions</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("visual")}
            className={`px-3 py-1 rounded ${
              mode === "visual" ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            Visual
          </button>
          <button
            onClick={() => setMode("json")}
            className={`px-3 py-1 rounded ${
              mode === "json" ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setMode("split")}
            className={`px-3 py-1 rounded ${
              mode === "split" ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            Split
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-3 py-1 rounded ${
              mode === "ai" ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            AI
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        {mode === "visual" && <VisualEditor />}
        {mode === "json" && <JSONEditor />}
        {mode === "split" && <JsonAndVisual />}
        {mode === "ai" && (
          <div className="p-6 text-white">
            <h3 className="text-lg mb-2">Generate with AI</h3>
            <textarea
              className="w-full p-2 text-black rounded"
              placeholder="Describe what kind of quiz you want (e.g. '10 questions about React basics, medium difficulty')"
            />
            <button className="mt-3 px-4 py-2 bg-green-600 rounded">
              Generate
            </button>
          </div>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between p-4 border-t border-gray-800">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2 bg-gray-700 rounded text-white"
        >
          ← Back
        </button>
        <button
          onClick={() => onFinish(quizData)}
          className="px-4 py-2 bg-indigo-600 rounded text-white"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-950 text-white">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </div>
  );
}
