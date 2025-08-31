import React, { useEffect, useState } from "react";
import VisualEditor from "../editors/VisualEditor";
import JSONEditor from "../editors/JSONEditor";
import JsonAndVisual from "../editors/JsonAndVisual";
import AIUploadModal from "./AIUploadModal";
import { useDispatch, useSelector } from "react-redux";
import { setEditStudioQuiz, updateQuestion, updateQuizData } from "../../../../slices/quizStudioSlicer";
import { isValidateQuestion } from "../../../../utils/validateFunction";
import { useFieldArray, useForm } from "react-hook-form";
import { normalDeepCopy } from "../../../../utils/customDeepCopy"
const QuestionDetailRender = ({ setStep }) => {
  const [showAIUpload, setShowAIUpload] = useState(null);
  const [mode, setMode] = useState("split"); // "visual" | "json" | "split"
  const [lastImport, setLastImport] = useState(null);
  const { quizData} = useSelector((state=> state.quizStudio))
  const dispatch = useDispatch()
  const { control,register,watch,reset} = useForm({
    defaultValues: normalDeepCopy(quizData?.questions || []),
  })

  const { append, remove,fields } = useFieldArray({
    control,
    name: "questions",
  })

  //  jsonData for Editor
  const [jsonData,setJsonData] = useState(
    JSON.stringify({questions: normalDeepCopy(quizData?.questions || [])},null,2)
  )
    // -------------------------
  // 1) Handle JSON → Form
  // -------------------------
  const handleJsonChange = (val)=>{
    setJsonData(val);
    console.log("JSON CHANGE")
    try {
      const parsed = JSON.parse(val);
      if(Array.isArray(parsed.questions)){
        // reset from with cloned data
        reset({questions:normalDeepCopy(parsed?.questions || [])})
      }
    } catch (error) {
      console.error("Invalid JSON Data: ",error);
    }
  }

  // -------------------------
  // 2) Handle Form → JSON
  // -------------------------
  useEffect(()=>{
    const sub = watch((value)=>{
      const newJson = JSON.stringify(value,null,2);
      if(newJson !== jsonData){
        // changes made update jsonData
        setJsonData(newJson);
      }
      // update redux when from changes
      if(JSON.stringify(quizData.questions) !== JSON.stringify(value.questions)){
         dispatch(updateQuizData({fields:"questions",value: normalDeepCopy(value.questions)}));
      }

    });

    // unsubscribe it
    return ()=> sub.unsubscribe();

  },[watch,dispatch,quizData.questions,jsonData])
  const handleBackStep = ()=>{
    dispatch(setEditStudioQuiz(true));
    setStep(1);
  }
  // console.log("SHI AI : ", showAIUpload, mode, lastImport,quizData?.questions);
  const appendQuestions = (incoming) => {
      const cleaned = incoming
      .filter(Boolean)
      .map((q) => ({
        questionDesc: q.questionDesc ?? q.text ?? "",
        explanation: q.explanation ?? "",
        options: q.options?.length
          ? q.options
          : Array.isArray(q.choices)
          ? q.choices.map((t) => ({ text: t }))
          : [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswer:
          typeof q.correctAnswer === "number"
            ? q.correctAnswer
            : q.options?.findIndex?.((o) => o.isCorrect) ?? 0,
        points: q.points ?? 1,
      }))
      .filter((q) => q.questionDesc?.trim().length > 0);

    // add to questions
    dispatch(appendQuestions(cleaned));
    setLastImport({count:cleaned.length,sample:cleaned.slice(0,3)})
  };

   // 🔹 Handles undo of last import
  const undoLastImport = () => {
    if (!lastImport) return;

    const keep = quizData.questions?.slice(
      0,
      quizData.questions.length - lastImport.count
    );

    dispatch(updateQuestion(keep));
    setLastImport(null);
  };
   const handleSubmitQuizWithQuestion = ()=>{
      console.log("SUBMITED QUIZ: ",quizData)
      const validate = isValidateQuestion(quizData)
      if(validate===true){
          console.log("Validated successfull")
      }else{
        console.warn("Problem: ",validate)
      }
   }

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Add Questions</h2>

        {/* Tabs Visual | Json | VisualAndJson */}
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
        </div>
      </div>

      {/* Secondary action bar (Upload + AI) */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-800 bg-gray-950">
        <button
          onClick={() => setShowAIUpload(true)}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-500"
        >
          Generate with AI
        </button>
        <button
          onClick={() => setShowAIUpload(true)}
          className="px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-500"
        >
          Upload File Quiz
        </button>
        <div className="text-xs text-gray-400 ml-auto">
          Questions:{" "}
          <span className="text-gray-200">{quizData.questions?.length}</span>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-hidden">
        {mode === "visual" && (
          <VisualEditor
           fields={fields} register={register} remove={remove} append={append} 
           />
          // <div >visual</div>
        )}
        {mode === "json" && (
          <JSONEditor
           jsonData={jsonData} handleJsonChange={handleJsonChange}
          />
          // <div >json</div>
        )}
        {mode === "split" && (
          <JsonAndVisual 
          jsonData={jsonData}
          handleJsonChange={handleJsonChange}
          fields={fields}
          register={register}
          remove={remove}
          append={append}
          />
          // <div >split</div>
        )}
      </div>

      {/* Import result strip */}
      {lastImport && (
        <div className="border-t border-gray-800 bg-gray-900 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">
              Imported <b>{lastImport.count}</b> question
              {lastImport.count !== 1 ? "s" : ""}.
            </span>
            <button
              className="text-red-300 underline"
              onClick={undoLastImport}
            >
              Undo import
            </button>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div className="flex justify-between p-4 border-t border-gray-800">
        <button
          onClick={handleBackStep}
          className="px-4 py-2 bg-gray-700 rounded text-white"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmitQuizWithQuestion}
          className="px-4 py-2 bg-indigo-600 rounded text-white"
        >
          Save Quiz
        </button>
      </div>

      {/* modal */}
      {showAIUpload && (
        <AIUploadModal
          showAIUpload
          onClose={() => setShowAIUpload(false)}
          onImport={(incomingQuestions) => {
            appendQuestions(incomingQuestions);
            setShowAIUpload(false);
          }}
        />
      )}
    </div>
  );
};

export default QuestionDetailRender;
