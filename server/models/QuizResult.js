import { response } from "express";
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
     responses: {
    type: Map,
    of: Schema.Types.ObjectId   // each value is an ObjectId (selectedOption)
  },
    // responses: [{ questionId: Schema.Types.ObjectId, selectedOption: Schema.Types.ObjectId }],
    createdAt: { type: Date, default: Date.now }
});


export default model("QuizResult",quizResultSchema);