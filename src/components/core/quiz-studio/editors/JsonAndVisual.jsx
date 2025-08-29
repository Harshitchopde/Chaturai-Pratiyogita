import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateQuizData } from "../../../../slices/quizStudioSlicer";
import { myDarkTheme } from "../../../../monacoThemes";

const JsonAndVisual = () => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizStudio.quizData);

  const [jsonData, setJsonData] = useState(
    JSON.stringify({ questions: quizData?.questions || [] }, null, 2)
  );
  
  // react-hook-form setup
  const { control, register, watch, reset } = useForm({
    defaultValues: { questions: quizData?.questions || [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  // Handle JSON editor changes
  const handleJsonChange = (val) => {
    setJsonData(val);
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed.questions)) {
        dispatch(updateQuizData({ field: "questions", value: parsed.questions }));
        reset(parsed); // sync form with parsed data
      }
    } catch(e) {
      // ignore invalid JSON
      console.error("Error in json: ",e)

    }
  };

  // Reflect form → JSON + Redux
  useEffect(() => {
    const subscription = watch((value) => {
    const newJson = JSON.stringify(value, null, 2);

    // update JSON only if different
    if (jsonData !== newJson) {
      setJsonData(newJson);
    }

    // update Redux only if questions actually changed
    if (JSON.stringify(quizData.questions) !== JSON.stringify(value.questions)) {
      dispatch(updateQuizData({ field: "questions", value: value.questions }));
    }
  });
    return () => subscription.unsubscribe();
  }, [watch, dispatch,quizData.questions, jsonData]);

  // Reflect Redux → Form + JSON
  useEffect(() => {
     const newJson = JSON.stringify({ questions: quizData.questions || [] }, null, 2);

  if (jsonData !== newJson) {
    setJsonData(newJson);
    reset({ questions: quizData.questions || [] });
  }
    
  }, [quizData.questions, reset,jsonData]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-full">
      {/* JSON Editor */}
      <div className="h-full border rounded">
        <Editor
          height="100%"
          language="json"
          theme="studio-dark"
          value={jsonData}
          onChange={handleJsonChange}
          onMount={(editor,monaco)=>{
            monaco.editor.defineTheme("studio-dark",myDarkTheme)
            monaco.editor.setTheme("studio-dark")
          }}
        />
      </div>

      {/* Visual Editor */}
      <div className="overflow-y-auto space-y-6 pr-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded bg-gray-900 text-white"
          >
            <label>Question {index + 1}</label>
            <input
              {...register(`questions.${index}.questionDesc`)}
              className="w-full p-2 my-2 text-black"
              placeholder="Enter question text"
            />
            <input
              {...register(`questions.${index}.explanation`)}
              className="w-full p-2 my-2 text-black"
              placeholder="Explanation (optional)"
            />
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  {...register(`questions.${index}.options.${i}.text`)}
                  className="p-2 text-black"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
            </div>
            <select
              {...register(`questions.${index}.correctAnswer`)}
              className="w-full p-2 mt-2 text-black"
            >
              <option value="">Select Correct Option</option>
              {[0, 1, 2, 3].map((i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-red-300 underline"
            >
              Delete Question
            </button>
          </div>
        ))}

        <button
          type="button"
          className="p-2 bg-green-500 text-white rounded"
          onClick={() =>
            append({
              questionDesc: "",
              explanation: "",
              options: [
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
              ],
              correctAnswer: 0,
            })
          }
        >
          + Add Question
        </button>
      </div>
    </div>
  );
};

export default JsonAndVisual;
