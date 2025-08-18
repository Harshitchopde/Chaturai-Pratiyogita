import React, { useState } from "react";
import VisualEditor from "./VisualEditor";
import JSONEditor from "./JSONEditor";
import JsonAndVisual from "../../../demoRough/JsonAndVisual";

export default function EditorPane({ quiz, setQuiz }) {
  const [mode, setMode] = useState("visual");

  if (!quiz) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a quiz to start editing</div>;
  }

  return (
    <JsonAndVisual/>
  );
}
