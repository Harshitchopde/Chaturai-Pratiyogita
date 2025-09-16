import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizData } from "../../../../slices/quizStudioSlicer";
// import { createQuizStatusUpdate } from "../../../../services/operations/quizStudioApis";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const QuizPublish = ({ setStep }) => {
  const { quizData } = useSelector((state) => state.quizStudio);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [status, setStatus] = useState(quizData?.status || "draft");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleBackStep = () => setStep(2);

  const handleSave = async (newStatus) => {
    try {
      setLoading(true);
      const payload = { quizId: quizData?._id, status: newStatus };
      // const res = await createQuizStatusUpdate(payload, token);
      const res = false; // mock
      if (res) {
        dispatch(setQuizData(res));
        setStatus(newStatus);
        toast.success(
          newStatus === "published"
            ? "Quiz Published Successfully!"
            : "Quiz Saved as Draft"
        );
      }
    } catch (error) {
      console.error("Error saving quiz status: ", error);
      toast.error("Failed to save quiz status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header + Status */}
      <div className="p-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Review & Publish</h2>
        <div className="flex items-center gap-3">
          <div className="">Current status</div>
          <span
            className={`px-3 py-1 rounded text-sm ${
              status === "published" ? "bg-green-600" : "bg-yellow-600"
            }`}
          >
            {status.toUpperCase()}
          </span>
          
        </div>
      </div>

      {/* Review Section */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-950 text-gray-200">
        {/* Quiz Info */}
        <div>
          <h3 className="text-2xl font-semibold">{quizData?.title}</h3>
          <p className="text-gray-400">{quizData?.description}</p>
        </div>

        {/* Questions */}
        <div>
        <div className=" flex justify-between">
            <h4 className="text-lg font-semibold mb-2">Questions</h4>
          <p className="text-gray-400 text-lg mb-4">
            Total: {quizData?.questions?.length || 0}
          </p>
        </div>

          <div className="space-y-3">
            {quizData?.questions?.map((q, i) => {
              const isOpen = expanded === i;
              return (
                <div
                  key={q._id || i}
                  className="bg-gray-800 rounded-lg border border-gray-700 shadow"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left"
                  >
                    <span className="font-medium text-gray-200">
                      {i + 1}. {q.questionDesc}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 space-y-3 text-sm text-gray-300"
                      >
                        {/* Options */}
                        {q.options?.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-gray-400 mb-1">
                              Options:
                            </h5>
                            <ul className="list-disc pl-6 space-y-1">
                              {q.options.map((opt, idx) => (
                                <li
                                  key={idx}
                                  className={
                                    opt.isCorrect
                                      ? "text-green-400 font-semibold"
                                      : "text-gray-300"
                                  }
                                >
                                  {opt.text} {opt.isCorrect && "✅"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Points */}
                        <p>
                          <span className="font-semibold text-gray-400">
                            Points:
                          </span>{" "}
                          {q.points || 1}
                        </p>

                        {/* Explanation */}
                        {q.explanation && (
                          <p>
                            <span className="font-semibold text-gray-400">
                              Explanation:
                            </span>{" "}
                            {q.explanation}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between p-4 border-t border-gray-800 bg-gray-900">
        <button
          onClick={handleBackStep}
          className="px-4 py-2 bg-gray-700 rounded text-white"
        >
          ← Back
        </button>

        <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={() => handleSave("draft")}
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-white disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              disabled={loading}
              onClick={() => handleSave("published")}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-white disabled:opacity-50"
            >
              Publish Now
            </button>
          </div>
      </div>
    </div>
  );
};

export default QuizPublish;
