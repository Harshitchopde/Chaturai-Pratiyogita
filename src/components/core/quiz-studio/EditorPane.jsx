import { useState } from "react";
import VisualEditor from "./editors/VisualEditor";
import JSONEditor from "./editors/JSONEditor";
import JsonAndVisual from "./editors/JsonAndVisual";


export default function EditorPane({ quiz, setQuiz }) {
  const [mode, setMode] = useState("split"); // default to Split view

  if (!quiz) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a quiz to start editing
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">{quiz.name}</h2>
        <div className="space-x-2">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {mode === "visual" && <VisualEditor />}
        {mode === "json" && <JSONEditor />}
        {mode === "split" && <JsonAndVisual />}
      </div>
    </div>
  );
}
