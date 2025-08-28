import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";

import { myDarkTheme } from "../../../../monacoThemes";
import { updateQuizData } from "../../../../slices/quizStudioSlicer";

export default function JSONEditor() {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizStudio.quizData);

  const [jsonData, setJsonData] = useState(
    JSON.stringify({ questions: quizData?.questions || [] }, null, 2)
  );

  const monaco = useMonaco();

  // define custom theme once monaco is available
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("studio-dark", myDarkTheme);
    }
  }, [monaco]);

  // reflect outer (Redux) → editor
  useEffect(() => {
    const newJson = JSON.stringify({ questions:quizData.questions || []},null,2);
    if(jsonData !== newJson){
      setJsonData(JSON.stringify({ questions: quizData.questions || [] }, null, 2));
    }
  }, [quizData.questions]);

  // handle editor changes
  const handleChange = (val) => {
    setJsonData(val);
    try {
      const parsed = JSON.parse(val || "{}");
      if (Array.isArray(parsed.questions)) {
        dispatch(
          updateQuizData({
            field: "questions",
            value: parsed.questions,
          })
        );
      }
    } catch {
      // ignore invalid JSON until it's valid
    }
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language="json"
        theme="studio-dark"
        value={jsonData}
        onChange={handleChange}
      />
    </div>
  );
}
