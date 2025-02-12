import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <div className="max-w-3xl text-center">
        <h1 className=" text-5xl font-bold mb-4 animate-fade-in">Welcome to QuizMaster</h1>
        <p className="sm:text-lg text-sm mb-6">Test your knowledge with fun and challenging quizzes across various topics. Compete with friends and climb the leaderboard!</p>
        <Link to={"/quizzes"}>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-200 transition duration-300">
            See All
          </button>
        </Link>
      </div>
    </div>
  )
}
