import mongoose, { model, Schema } from "mongoose";
const quizResultSchema = new Schema({
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalQuestions: Number,
    correctAnswers: Number,
    wrongAnswers: Number,
    totalScore: Number,
    timeTaken: Number,
    total: Number,
    responses: [{ questionId: Schema.Types.ObjectId, selectedOption: Schema.Types.ObjectId }],
    createdAt: { type: Date, default: Date.now }
});


export default model("QuizResult",quizResultSchema);