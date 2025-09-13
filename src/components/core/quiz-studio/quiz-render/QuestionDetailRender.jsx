import React, { useEffect, useMemo, useState } from "react";
import VisualEditor from "../editors/VisualEditor";
import JSONEditor from "../editors/JSONEditor";
import JsonAndVisual from "../editors/JsonAndVisual";
import AIUploadModal from "./AIUploadModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditStudioQuiz,
  setQuizData,
  updateQuestion,
  updateQuizData,
} from "../../../../slices/quizStudioSlicer";
import { isValidateQuestion } from "../../../../utils/validateFunction";
import { useFieldArray, useForm } from "react-hook-form";
import { normalDeepCopy } from "../../../../utils/customDeepCopy";
import toast from "react-hot-toast";
import { diffQuestions } from "../../../../utils/sortQuestionsInertUpdateDelete";
import { createQuestions } from "../../../../services/operations/quizStudioApis";
import { isEqual } from "lodash";

const QuestionDetailRender = ({ setStep }) => {
  const [showAIUpload, setShowAIUpload] = useState(null);
  const [mode, setMode] = useState("split"); // "visual" | "json" | "split"
  const [lastImport, setLastImport] = useState(null);

  const { quizData } = useSelector((state) => state.quizStudio);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ Memoize normalized questions to prevent reference changes
  const normalizedQuestions = useMemo(
    () => normalDeepCopy(quizData?.questions || []),
    [quizData]
  );

  const { control, register, watch, reset, getValues, formState } = useForm({
    defaultValues: { questions: normalizedQuestions },
  });
  const { isDirty } = formState;

  const { append, remove, fields } = useFieldArray({
    control,
    name: "questions",
  });

  // ✅ Keep JSON editor in sync
  const [jsonData, setJsonData] = useState(
    JSON.stringify({ questions: normalizedQuestions }, null, 2)
  );

  // ✅ Reset only when quizData changes
  useEffect(() => {
    if (quizData) {
      reset({ questions: normalizedQuestions });
    }
  }, [normalizedQuestions, reset, quizData]);

  // -------------------------
  // 1) Handle JSON → Form
  // -------------------------
  const handleJsonChange = (val) => {
    setJsonData(val);
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed.questions)) {
        reset(
          { questions: normalDeepCopy(parsed.questions) },
          { keepDirty: false }
        );
      }
    } catch (error) {
      console.error("Invalid JSON Data: ", error);
    }
  };

  // -------------------------
  // 2) Handle Form → JSON
  // -------------------------
  useEffect(() => {
    const sub = watch((value) => {
      const newJson = JSON.stringify(value, null, 2);
      if (newJson !== jsonData) {
        setJsonData(newJson);
      }
    });

    return () => sub.unsubscribe();
  }, [watch, jsonData]);

  // -------------------------
  // Navigation Handlers
  // -------------------------
  const handleBackStep = () => {
    console.log("BACK: ",)
    if (isUpdated){
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to go back and lose them?"
      );
      if (!confirmLeave) return;
    }
    dispatch(setEditStudioQuiz(true));
    setStep(1);
  };

  const handleNext = () => {
    if (isDirty) {
      toast.error("Unsaved Changes!");
      return;
    }
    setStep(3);
  };

  const handleSubmitQuizWithQuestion = async () => {
    const values = getValues();
    const validate = isValidateQuestion(values?.questions);
    if (validate !== true) {
      toast.error("Problem: " + validate);
      return;
    }

    const { inserts, deletes, updates } = diffQuestions(
      quizData?.questions,
      values?.questions
    );

    const data = {
      quizId: quizData?._id,
      inserts,
      deletes,
      updates,
    };

    const res = await createQuestions(data, token);
    if (res) {
      dispatch(setQuizData(res));
    }
  };

  // -------------------------
  // Import / Undo Import
  // -------------------------
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

    setLastImport({ count: cleaned.length, sample: cleaned.slice(0, 3) });
  };

  const undoLastImport = () => {
    if (!lastImport) return;
    const keep = quizData.questions?.slice(
      0,
      quizData.questions.length - lastImport.count
    );
    // dispatch(updateQuestion(keep));
    setLastImport(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Add Questions</h2>

        <div className="flex gap-2">
          {["visual", "json", "split"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`px-3 py-1 rounded ${
                mode === tab ? "bg-indigo-600" : "bg-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary action bar */}
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
            fields={fields}
            register={register}
            remove={remove}
            append={append}
          />
        )}
        {mode === "json" && (
          <JSONEditor jsonData={jsonData} handleJsonChange={handleJsonChange} />
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
            <button className="text-red-300 underline" onClick={undoLastImport}>
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
        <div className="flex gap-2">
          <button
            onClick={handleSubmitQuizWithQuestion}
            className="px-4 py-2 bg-indigo-600 rounded text-white"
          >
            Save Quiz
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 rounded text-white"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Modal */}
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
