import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    quizName: { type: String, required: true, trim: true },
    quizDesc: { type: String, trim: true, required: true },
    quizType: { type: String, enum: ["Simple", "Super"], default: "Simple" }, // NEW
    subQuizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }], // NEW for Super Quizzes
    verified: { type: Boolean, default: false },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeDuration: { type: Number, required: true },
    tags: { type: [String] },
    topic: { type: String },
    difficulty: { type: String, enum: ["Any", "Easy", "Medium", "Hard"], default: "Any" },
    numberOfQuestions: { type: Number },
    studentEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
    coins: { type: Number, default: 1, min: 0, max: 5 },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Used only for Simple quizzes
    maxAttempt: { type: Number, default: 1 },
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    analytics: { // NEW ANALYTICS OBJECT
        attempts: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now }
});


export default model("Quiz",quizSchema);

