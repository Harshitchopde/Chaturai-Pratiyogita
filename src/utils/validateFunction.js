
export const isValidateJSONQuiz= (quiz)=>{
      const difficulties = ["Easy", "Medium", "Hard"];
      console.log("validate: ",quiz)
  if (!quiz.quizName || typeof quiz.quizName !== "string") return "QuizName not their";
  if (!quiz.quizDesc || typeof quiz.quizDesc !== "string") return "QuizDesc not their";
  if (!difficulties.includes(quiz.difficulty)) return "difficulties not their";
  if (isNaN(Number(quiz.timeDuration))) return "timeDuration not their";
  if (!Array.isArray(quiz.tags) || quiz.tags.length === 0) return "tags not their"+quiz.tags;


  return true;
}

export const isValidateQuestion = (quiz)=>{

    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) return "questions not their";

    for (const q of quiz.questions) {
        if (!q.questionDesc || typeof q.questionDesc !== "string") return "questionDesc not their";
        if (!Array.isArray(q.options) || q.options.length !== 4) return "options not their 4 or ";
        if (typeof q.correctAnswer !== "number" || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) return `correctAnswer not their ${q.correctAnswer}`;
        if (!q.explanation || typeof q.explanation !== "string") return "explanation not their";

        for (const opt of q.options) {
        if (!opt.text || typeof opt.text !== "string") return "options not their";
        }
    }
    return true;
}