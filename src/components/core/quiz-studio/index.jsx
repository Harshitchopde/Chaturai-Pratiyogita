import React, { useState } from "react";
import SidebarLeft from "./SidebarLeft";
import CreateQuizWizard from "./CreateQuizWizard";

export default function QuizStudio() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, name: "Math Basics", type: "Simple", status: "Draft" },
    { id: 2, name: "Science Mega Pack", type: "Super", status: "Published" }
  ]);

  // api call for all quiz of the user
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex h-screen bg-black text-gray-200">
      {/* Left Sidebar */}
      <SidebarLeft quizzes={quizzes} onSelect={setSelectedQuiz} />

      {/* Center Editor */}
      <div className="flex-1 flex flex-col border-x border-gray-800">
        {/* <EditorPane quiz={selectedQuiz} setQuiz={setSelectedQuiz} /> */}
        <CreateQuizWizard/>
      </div>

    </div>
  );
}
