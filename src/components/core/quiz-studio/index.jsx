import React, { useState } from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import EditorPane from "./EditorPane";

export default function QuizStudio() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, name: "Math Basics", type: "Simple", status: "Draft" },
    { id: 2, name: "Science Mega Pack", type: "Super", status: "Published" }
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex h-screen bg-black text-gray-200">
      {/* Left Sidebar */}
      <SidebarLeft quizzes={quizzes} onSelect={setSelectedQuiz} />

      {/* Center Editor */}
      <div className="flex-1 flex flex-col border-x border-gray-800">
        <EditorPane quiz={selectedQuiz} setQuiz={setSelectedQuiz} />
      </div>

      {/* Right Sidebar */}
      <SidebarRight
        selectedQuiz={selectedQuiz}
        setQuizzes={setQuizzes}
        quizzes={quizzes}
      />
    </div>
  );
}
