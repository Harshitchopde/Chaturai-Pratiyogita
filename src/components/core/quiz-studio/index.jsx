import React, { useEffect, useState } from "react";
import SidebarLeft from "./SidebarLeft";
import CreateQuizWizard from "./CreateQuizWizard";
import StudioDashboard from "./StudioDashboard";
import QuestionBank from "./QuestionBank";
import QuizTemplates from "./QuizTemplates";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorQuiz } from "../../../services/operations/quizApis";
import { setQuizData } from "../../../slices/quizStudioSlicer";

export default function QuizStudio() {
  // const [quizzes, setQuizzes] = useState([
  //   { id: 1, name: "Math Basics", type: "Simple", status: "Draft" },
  //   { id: 2, name: "Science Mega Pack", type: "Super", status: "Published" },
  //   { id: 3, name: "Basics", type: "Simple", status: "Draft" },
  //   { id: 4, name: "Mega Pack", type: "Super", status: "Published" },
  // ]);

  const [selectedCenterTab, setSelectedCenterTab] = useState("wizard"); // dashboard | bank | templates | wizard
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const handleCreate = () => {
    setSelectedQuiz(null);
    setSelectedCenterTab("wizard");
  };
  const handleSelect = (quiz) =>{
    setSelectedQuiz(quiz);
    setSelectedCenterTab("wizard");
  }
  const {token} = useSelector((state)=>state.auth);
  const { instructorQuiz } = useSelector(state=> state.quizzes);
  const dispatch = useDispatch();
  // fetch the all instructor quizs
  useEffect(()=>{
    const fetchInstructorQuiz = async()=>{
        dispatch(getInstructorQuiz(token));
    }

    if(!instructorQuiz ){
      console.log("Call Instructor")
        fetchInstructorQuiz()
    }
    
  },[])
  // console.log("Selected Quiz: ",selectedQuiz)
  return (
    <div className="flex h-screen bg-black text-gray-200">
      <SidebarLeft quizzes={instructorQuiz} selectedQuiz={selectedQuiz} onSelect={handleSelect} onCreate={handleCreate} />

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
            <StudioDashboard quizzes={instructorQuiz} onCreate={handleCreate} />
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
            <CreateQuizWizard selectedQuiz={selectedQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}
