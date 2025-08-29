import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";

import { myDarkTheme } from "../../../../monacoThemes";
import { updateQuizData } from "../../../../slices/quizStudioSlicer";

export default function JSONEditor() {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizStudio.quizData);

  const [jsonData, setJsonData] = useState(
    JSON.stringify({ questions: quizData?.questions || [] }, null, 2)
  );
 
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
    } catch(err) {
      // ignore invalid JSON until it's valid
      console.error("Error in  handle change: ",err)
    }
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language="json"
        theme="studio-dark"
        // theme="vs-dark"
        value={jsonData}
        onChange={handleChange}
        onMount={(editor,monaco)=>{
            monaco.editor.defineTheme("studio-dark",myDarkTheme)
            monaco.editor.setTheme("studio-dark")
        }}
      />
    </div>
  );
}
