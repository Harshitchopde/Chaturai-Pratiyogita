import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateQuizData } from "../../../../slices/quizStudioSlicer";
import { normalDeepCopy } from "../../../../utils/customDeepCopy";

export default function VisualEditor({fields,register,remove,append}) {
  // const dispatch = useDispatch();
  // const quizData = useSelector((state) => state.quizStudio.quizData);
  // sync form with outer state
  // const { control, register, watch, reset } = useForm({
  //   defaultValues: { questions: normalDeepCopy(quizData.questions || []) },
  // });

  // reflected outer changes || no need any more
  // useEffect(() => {
  //   reset({ questions: normalDeepCopy(quizData.questions || []) });
  // }, [quizData.questions, reset]);

  // useEffect(() => {
  //   const sub = watch((value) => {
  //     if(JSON.stringify(quizData.questions)!== JSON.stringify(value.questions)){
  //       dispatch(updateQuizData({field:"questions", value:normalDeepCopy(value.questions || [])}));
  //     }
  //   });
  //   return () => sub.unsubscribe();
  // }, [watch, dispatch]);

  // const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  return (
    <div className="p-4 overflow-y-auto space-y-6 h-full bg-gray-950 text-white">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded bg-gray-900 text-white">
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
          <button type="button" onClick={() => remove(index)} className="mt-2 text-red-300 underline">
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
            options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
            correctAnswer: null,
          })
        }
      >
        + Add Question
      </button>
    </div>
  );
}
