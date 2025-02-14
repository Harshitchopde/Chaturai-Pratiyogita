export const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    LOGIN_API:BASE_URL+"/auth/login",
    SIGN_UP_API:BASE_URL+"/auth/signUp",
    SEND_OTP_API:BASE_URL+"/auth/sendOtp",
    REPOR_ISSUE_API:BASE_URL+"/auth/report",
}
// updateQuiz deleteQuiz getQuizDetails getAllQuiz
export const quizEndPoints = {
    CREATE_QUIZ_API:BASE_URL+"/quiz/createQuiz",
    UPDATE_QUIZ_API:BASE_URL+"/quiz/updateQuiz",
    DELETE_QUIZ_API:BASE_URL+"/quiz/deleteQuiz",
    GET_QUIZ_DETAILS_API:BASE_URL+"/quiz/getQuizDetails",
    GET_ALL_QUIZ_API:BASE_URL+"/quiz/getAllQuiz"
}
// createQuestion,updateQuestion,deleteQuestion,getQuestionDetails,getAllQuestions,getQuizQuestions  
export const questionEndPoints = {
    CREATE_QUESTION_API:BASE_URL+"/quiz/createQuestion",
    UPDATE_QUESTION_API:BASE_URL+"/quiz/updateQuestion",
    DELETE_QUESTION_API:BASE_URL+"/quiz/deleteQuestion",
    GET_QUESTION_DETAILS_API:BASE_URL+"/quiz/getQuestionDetails",
    GET_ALL_QUESTION_API:BASE_URL+"/quiz/getAllQuestions",
    GET_QUIZ_QUESTIONS_API:BASE_URL+"/quiz/getQuizQuestions"
}
export const resultEndPoints = {
    SUBMIT_RESPONCE_API:BASE_URL+"/res/submitQuiz",
    GET_SUBMITED_RESP_API:BASE_URL+"/res/getResultQuiz"
}