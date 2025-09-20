import { createSlice } from "@reduxjs/toolkit"

const initialState={
    quizData:{
        quizName:"",
        quizDesc:"",
        questions:[],
        editStudioQuiz:false,
        tags:[],
    },
    quizzesData:[],
    loading:false,
    
}

const quizStudioSlice = createSlice({
    name:"quizStudio",
    initialState,
    reducers:{
        setQuizData(state,action){
            state.quizData = action.payload
        },
        setQuizzesData(state,action){
            state.quizzesData = action.payload
        },
        updateQuizData(state,action){
            const {field,value} = action.payload;
            state.quizData[field] = value;
        },
        updateQuestion(state,action){
            state.quizData.questions = action.payload;
        },
        appendQuestions(state,action){
            state.quizData.questions = [
                ...state.quizData.questions,
                ...action.payload,
            ];
        },
        setTagChip(state,action){
            state.quizData.tags = action.payload
        },
        setEditStudioQuiz(state,action){
            state.quizData.editStudioQuiz = action.payload
        },
        resetQuizData(state){
            state.quizData = initialState.quizData;
        }

    }
})

export const {setEditStudioQuiz,setQuizzesData, setQuizData,updateQuestion,setTagChip,updateQuizData,appendQuestions,resetQuizData } = quizStudioSlice.actions;
export default quizStudioSlice.reducer
