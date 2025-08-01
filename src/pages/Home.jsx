import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    emoji: "📚",
    title: "Fun Topics",
    desc: "Explore quizzes across science, tech, history, and more.",
  },
  {
    emoji: "🏆",
    title: "Leaderboard",
    desc: "Climb the leaderboard and earn achievements.",
  },
  {
    emoji: "🤝",
    title: "Challenge Friends",
    desc: "Invite friends and compete together in real-time.",
  },
];

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold mb-6"
        >
          Welcome to QuizMaster
        </motion.h1>

        <p className="max-w-xl sm:text-lg text-sm mb-8">
          Test your knowledge with fun and challenging quizzes. Compete with friends, track progress, and climb the leaderboard!
        </p>

        <Link to="/quizzes">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            See All Quizzes
          </motion.button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white text-blue-700 py-16 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 p-6 rounded-2xl shadow-md"
            >
              <div className="text-4xl mb-3">{f.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-white text-sm bg-gradient-to-r from-blue-600 to-purple-700">
        © {new Date().getFullYear()} QuizMaster · Built with ❤️ using React + TailwindCSS
      </footer>
    </div>
  );
};

// export default Home;
