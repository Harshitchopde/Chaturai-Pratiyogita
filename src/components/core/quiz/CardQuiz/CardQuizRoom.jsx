import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionForm from '../QuestionForm';
import toast from 'react-hot-toast';
import { getSubmitedQuizResp, submitQuizResponce } from '../../../../services/operations/resultApis';
import { formateTimer } from '../../../../utils/formateTime';
import { ArrowBack, ArrowBackIos, ArrowBackIosTwoTone, ArrowCircleUp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { resetTestQuiz } from '../../../../slices/quizzesSlice';

const CardQuizRoom = ({ submitted, setSubmitted }) => {
    const { testQuiz } = useSelector(state => state.quizzes);
    const { token } = useSelector(state => state.auth);
    console.log("Card Quiz room : ",testQuiz)
    const navigate = useNavigate();
    let timer = testQuiz?.timeDuration;
    const [currentQuestion, setCurrentQuestion] = useState(testQuiz?.questions[0]);
    const [quesNumber, setQuestionNumber] = useState(1);
    const [yourResponse, setYourResponse] = useState({});
    const [result, setResult] = useState(null);
    const [review,setReview] = useState(false);
    const dispatch = useDispatch();
    // console.log("Result : ",result)
    // console.log("response : ",yourResponse)
    const handleOptionSelect = (questionId, optionId) => {
        if (submitted) return;
        setYourResponse({ ...yourResponse, [questionId]: optionId });
    };
   
    useEffect(() => {
        if (submitted) {
            const fetchDetails = async () => {
                const res = await getSubmitedQuizResp(testQuiz?._id, token);
                setResult(res);
            };
            fetchDetails();
        }
    }, [submitted, testQuiz?._id]);

    const handleOptionSubmission = async () => {
        const formData = new FormData();
        formData.append("quizId", testQuiz._id);
        formData.append("timeTaken",timeLeft);
        Object.entries(yourResponse).forEach(([questionId, optionId]) => {
            formData.append(`responses[${questionId}]`, optionId);
        });
        const response = await submitQuizResponce(formData, token);
        if (response) {
            setResult(response);
            setSubmitted(true);
        }
    };
    const handleBackToMain = ()=>{
        dispatch(resetTestQuiz());
        navigate(`/quizzes/${testQuiz?.parentQuiz}`);
    }

    useEffect(() => {
        setCurrentQuestion(testQuiz?.questions[quesNumber - 1]);
    }, [quesNumber]);

    const totalQuestions = testQuiz?.questions?.length;
    const [timeLeft, setTimeLeft] = useState(timer * 60);
    
    useEffect(() => {
        if (!submitted) {
            if (timeLeft <= 0) {
                toast.success("Test is over now");
                handleOptionSubmission();
                return;
            }
            if (timeLeft === 60) {
                toast.success("Hurry Up! 60 seconds left");
            }
            const interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft, submitted]);
    // console.log("Questions : ",testQuiz.questions)
    // console.log("Result ",result)
    return (
        <div>
            {!submitted || review ? (
                <QuestionForm
                    submitted={submitted}
                    review={review}
                    setReview={setReview}
                    handleOptionSubmition={handleOptionSubmission}
                    result={result}
                    question={currentQuestion}
                    yourResponse={yourResponse}
                    handleOptionSelect={handleOptionSelect}
                    setQuestionNumber={setQuestionNumber}
                    total={totalQuestions}
                    quesNumber={quesNumber}
                    timeLeft={timeLeft}
                />
            ) : (
                <div className="mt-10 p-6 bg-gray-100 rounded-md">
                    <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold ">Quiz Analysis</h2>
                    {
                        testQuiz?.parentQuiz && 
                        // <Link to={`/quizzes/${testQuiz?.parentQuiz}`}>
                            <button onClick={handleBackToMain} className=' bg-slate-200 border rounded-md px-1 text-sm border-black'>
                                <ArrowBack className=' text-sm'/> 
                                Back to Main
                            </button>
                        // </Link>
                    }
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-white rounded-md shadow">
                            <p className="text-xl font-bold">{result?.totalQuestions}</p>
                            <p className="text-gray-500">Total Questions</p>
                        </div>
                        <div className="p-4 bg-green-100 rounded-md shadow">
                            <p className="text-xl font-bold">{result?.correctAnswers}</p>
                            <p className="text-green-600">Correct Answers</p>
                        </div>
                        <div className="p-4 bg-red-100 rounded-md shadow">
                            <p className="text-xl font-bold">{result?.wrongAnswers}</p>
                            <p className="text-red-600">Wrong Answers</p>
                        </div>
                        <div className="p-4 bg-blue-100 rounded-md shadow">
                            <p className="text-xl font-bold">{result?.totalScore}</p>
                            <p className="text-blue-600">Total Score</p>
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-100 rounded-md shadow text-center">
                        <p className="text-xl font-bold">{formateTimer(result?.timeTaken)}</p>
                        <p className="text-yellow-600">Time Taken</p>
                    </div>
                    <h3 className="text-xl font-semibold mt-6">Review Questions</h3>
                    <div className="mt-4 grid grid-cols-6 gap-2">
                    {testQuiz?.questions.map((q, index) => (
                            <button
                                key={q._id}
                                onClick={()=>{
                                  setQuestionNumber(index+1);
                                  setReview(true)
                                }}
                                className={`p-2 text-sm rounded-md ${
                                   result?.responses?.[q._id] ==null? "bg-gray-500 text-white":
                                    result?.responses?.[q._id] === q.correctAnswer
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardQuizRoom;
