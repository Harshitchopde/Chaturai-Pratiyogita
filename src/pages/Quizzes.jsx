import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setQuizzes } from "../slices/quizzesSlice";
import { getAllQuiz } from "../services/operations/quiz.Apis";
import { filterQuizzes } from "../utils/searchUtils";
import SingleCard from "../components/core/quiz/CardQuiz/cards/SingleCard";
import { motion } from "framer-motion";
const Quizzes = () => {
  const [quizs, setQuizs] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { query, quizzes } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("You are not authenticated!");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const filtered = filterQuizzes(query, quizzes);
    setQuizs(filtered);
  }, [query, quizzes]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const result = await getAllQuiz(token);
      setQuizs(result);
      dispatch(setQuizzes(result));
    };
    if (!quizzes || quizzes.length === 0) {
      fetchQuizzes();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
     
    >
      <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
        {query && (
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
            Search Results for: <span className="text-blue-600">"{query}"</span>
          </h2>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {quizs?.map((quiz, i) => (
            <SingleCard key={i} quiz={quiz} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Quizzes;
