import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createQuiz, updateQuiz } from "../../../../services/operations/quiz.Apis";
import { earnCoins } from "../../../../slices/coinSlicer";
import toast from "react-hot-toast";
import { isValidateJSONQuiz } from "../../../../utils/validateFunction";
import TagInputsStudio from "../quizUtils/TagsInputsStudio";
import {  setQuizData } from "../../../../slices/quizStudioSlicer";
import TagInput from "../../dashboard/AddQuiz/CreateQuiz/TagInput";
import { normalDeepCopy } from "../../../../utils/customDeepCopy";

const QuizInfoRender = ({ setStep }) => {
  const { quizData, editStudioQuiz } = useSelector((state) => state.quizStudio);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  // ⚡ react-hook-form with defaults from quizData
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizName: quizData?.quizName || "",
      quizDesc: quizData?.quizDesc || "",
      numberOfQuestions: quizData?.numberOfQuestions || "",
      timeDuration: quizData?.timeDuration || "",
      tags: quizData?.tags || [],
      topic: quizData?.topic || "",
      difficulty: quizData?.difficulty || "Any",
      questions: quizData?.questions || [],
    },
  });

  useEffect(()=>{
    console.log("Update quiz: quizInfo render: ",quizData);
    reset({
      quizName: quizData?.quizName || "",
      quizDesc: quizData?.quizDesc || "",
      numberOfQuestions: quizData?.numberOfQuestions || "",
      timeDuration: quizData?.timeDuration || "",
      tags: quizData?.tags || [],
      topic: quizData?.topic || "",
      difficulty: quizData?.difficulty || "Any",
      questions: quizData?.questions || [],
    })
  },[quizData,reset])
  // 🔍 check if form values differ from quizData
  const checkUpdated = () => {
    if (!quizData) return false;
    const currValues = getValues();
    return (
      quizData?.quizName !== currValues?.quizName ||
      quizData?.quizDesc !== currValues?.quizDesc ||
      quizData?.numberOfQuestions !== currValues?.numberOfQuestions ||
      quizData?.timeDuration !== currValues?.timeDuration ||
      JSON.stringify(quizData?.tags) !== JSON.stringify(currValues?.tags) ||
      quizData?.topic !== currValues?.topic ||
      quizData?.difficulty !== currValues?.difficulty
    );
  };

  // 📌 handle create / update
  const onSubmitHandle = async (data) => {
    const formData = new FormData();

    if (editStudioQuiz) {
      // 📝 Update mode
      if (!checkUpdated()) {
        toast.error("No changes made");
        return;
      }
      formData.append("quizId", quizData?._id);

      if (quizData?.quizName !== data.quizName) {
        formData.append("quizName", data.quizName);
      }
      if (quizData?.quizDesc !== data.quizDesc) {
        formData.append("quizDesc", data.quizDesc);
      }
      if (quizData?.numberOfQuestions !== data?.numberOfQuestions) {
        formData.append("numberOfQuestions", data?.numberOfQuestions);
      }
      if (quizData?.timeDuration !== data?.timeDuration) {
        formData.append("timeDuration", data?.timeDuration);
      }
      if (JSON.stringify(quizData?.tags) !== JSON.stringify(data.tags)) {
        formData.append("tags", JSON.stringify(data.tags));
      }
      if (quizData?.topic !== data?.topic) {
        formData.append("topic", data?.topic);
      }
      if (quizData?.difficulty !== data.difficulty) {
        formData.append("difficulty", data.difficulty);
      }

      setLoading(true);
      const result = await updateQuiz(formData, token);
      setLoading(false);

      if (result) {
        toast.success("Quiz updated successfully!");
        dispatch(setQuizData(result));
        setStep(2);
      }
    } else {
      // ➕ Create mode
      formData.append("quizName", data.quizName);
      formData.append("quizDesc", data.quizDesc);
      formData.append("numberOfQuestions", data.numberOfQuestions);
      formData.append("timeDuration", data.timeDuration);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("topic", data.topic);
      formData.append("difficulty", data.difficulty);

      setLoading(true);
      const result = await createQuiz(formData, token);
      setLoading(false);

      if (result) {
        toast.success("Quiz created! +10 coins");
        dispatch(earnCoins(10));
        console.log("Success ful: ",result)
        dispatch(setQuizData(result));
    
        setStep(2);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandle)}
      className="p-6 space-y-5 rounded-md border border-slate-700 bg-slate-900 shadow-md"
    >
      <h2 className="text-xl font-semibold text-white">Quiz Details</h2>

      {/* Quiz Name */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-300">
          Quiz Title <sup className="text-pink-500">*</sup>
        </label>
        <input
          className="w-full p-2 rounded text-black"
          placeholder="Enter quiz title"
          {...register("quizName", { required: true })}
        />
        {errors.quizName && <span className="text-red-500 text-xs">Quiz Name is required</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-300">Description</label>
        <textarea
          className="w-full p-2 rounded text-black"
          placeholder="Describe your quiz (optional)"
          {...register("quizDesc")}
        />
      </div>

      {/* Tags + Number of Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TagInput
         name={"tags"}
         label="Tag Input"
         register={register}
         getValues={getValues}
         setValue={setValue}
         errors={errors}/>
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">Number of Questions</label>
          <input
            type="number"
            className="w-full p-2 rounded text-black"
            placeholder="e.g. 10"
            {...register("numberOfQuestions", { min: 1, max: 50 })}
          />
          {errors.numberOfQuestions && (
            <span className="text-red-500 text-xs">Enter between 1–200 questions</span>
          )}
        </div>
      </div>

      {/* Difficulty + Topic + Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">Difficulty</label>
          <select className="w-full p-2 rounded text-black" {...register("difficulty")}>
            <option value="Any">Any</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">Topic</label>
          <input
            className="w-full p-2 rounded text-black"
            placeholder="e.g. DSA in Java"
            {...register("topic")}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">
            Time Duration (minutes) <sup className="text-pink-500">*</sup>
          </label>
          <input
            type="number"
            className="w-full p-2 rounded text-black"
            placeholder="e.g. 30"
            {...register("timeDuration", { required: true, min: 1 })}
          />
          {errors.timeDuration && (
            <span className="text-red-500 text-xs">Time duration required</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3">
        {editStudioQuiz && (
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-4 py-2 bg-gray-600 rounded text-white"
          >
            Continue Without Saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 rounded text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : editStudioQuiz ? "Save & Continue →" : "Next →"}
        </button>
      </div>
    </form>
  );
};

export default QuizInfoRender;
