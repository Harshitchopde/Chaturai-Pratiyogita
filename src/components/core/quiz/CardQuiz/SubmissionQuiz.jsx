import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

const QuizSubmission = () => {
    const quiz = useSelector((state) => state.quiz?.quiz ?? null);
    const userResponses = useSelector((state) => state.quiz?.responses ?? {});
    const navigate = useNavigate();

    if (!quiz || !quiz.questions) {
        return <div className="text-center text-xl font-bold">No Quiz Data Available</div>;
    }

    const getOptionClass = (question, optionId) => {
        const isCorrect = optionId === question.correctOption;
        const isSelected = userResponses?.[question._id] === optionId;
        
        if (isSelected && isCorrect) return "bg-green-500 text-white";
        if (isSelected && !isCorrect) return "bg-red-500 text-white";
        if (!isSelected && isCorrect) return "border-green-500";
        return "border-gray-300";
    };

    const score = quiz.questions.reduce((acc, question) => {
        return userResponses?.[question._id] === question.correctOption ? acc + 1 : acc;
    }, 0);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Results</h2>
            <p className="text-lg font-semibold text-center">Your Score: {score} / {quiz.questions.length}</p>
            
            <div className="mt-4 space-y-6">
                {quiz.questions.map((question, index) => (
                    <div key={question._id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{index + 1}. {question.text}</h3>
                        <div className="mt-2 space-y-2">
                            {question.options.map((option) => (
                                <div 
                                    key={option._id} 
                                    className={`p-2 border rounded ${getOptionClass(question, option._id)}`}
                                >
                                    {option.text}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between">
                <Button onClick={() => navigate("/dashboard")} className="bg-gray-500">Go to Dashboard</Button>
                <Button onClick={() => navigate(`/quiz/${quiz._id}`)} className="bg-blue-500">Retry Quiz</Button>
            </div>
        </div>
    );
};

export default QuizSubmission;
