import React, { useState } from "react";
import SidebarLeft from "./SidebarLeft";
import CreateQuizWizard from "./CreateQuizWizard";
import StudioDashboard from "./StudioDashboard";
import QuestionBank from "./QuestionBank";
import QuizTemplates from "./QuizTemplates";

export default function QuizStudio() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, name: "Math Basics", type: "Simple", status: "Draft" },
    { id: 2, name: "Science Mega Pack", type: "Super", status: "Published" },
    { id: 3, name: "Basics", type: "Simple", status: "Draft" },
    { id: 4, name: "Mega Pack", type: "Super", status: "Published" },
  ]);

  const [selectedCenterTab, setSelectedCenterTab] = useState("wizard"); // dashboard | bank | templates | wizard
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const handleCreate = () => {
    setSelectedCenterTab("wizard");
    setSelectedQuiz(null);
  };
  console.log("Selected Quiz: ",selectedQuiz?.id)
  return (
    <div className="flex h-screen bg-black text-gray-200">
      <SidebarLeft quizzes={quizzes} onSelect={setSelectedQuiz} onCreate={handleCreate} />

      <div className="flex-1 flex flex-col border-x border-gray-800">
        {/* studio top nav */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-800 bg-gray-950">
          {["dashboard", "bank", "templates", "wizard"].map((k) => (
            <button
              key={k}
              onClick={() => setSelectedCenterTab(k)}
              className={`px-3 py-1 rounded ${
                selectedCenterTab === k ? "bg-indigo-600" : "bg-gray-800"
              } capitalize`}
            >
              {k === "wizard" ? "Create / Edit" : k}
            </button>
          ))}
        </div>

        {/* center pane */}
        <div className="flex-1 min-h-0">
          {selectedCenterTab === "dashboard" && (
            <StudioDashboard quizzes={quizzes} onCreate={handleCreate} />
          )}
          {selectedCenterTab === "bank" && (
            <QuestionBank
              onAddToQuiz={(qs) => {
                // you can lift this up through context or pass a setter from wizard later
                console.log("Add to current quiz (wire to wizard):", qs);
              }}
            />
          )}
          {selectedCenterTab === "templates" && (
            <QuizTemplates
              onApplyTemplate={(tpl) => {
                console.log("Apply template (wire to wizard):", tpl);
              }}
            />
          )}
          {selectedCenterTab === "wizard" && (
            <CreateQuizWizard
            />
          )}
        </div>
      </div>
    </div>
  );
}
