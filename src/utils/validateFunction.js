
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

export const isValidateQuestion = (questions)=>{

    if (!Array.isArray(questions) || questions.length === 0) return "questions not their"+questions;
    console.log("r", questions)
    for (const q of questions) {
        console.log("sing q ",q.questionDesc," ",q.options," ",q.explanation," ",q.correctAnswer)
        if(!q.questionDesc || typeof q.questionDesc !=="string") return "Question desc: "+q.questionDesc;
        if (!Array.isArray(q.options) || q.options.length !== 4) return "options not their 4 or ";
        if ( Number.isNaN(q.correctAnswer) ||typeof q.correctAnswer !== "number" || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) return `correctAnswer not their ${q.correctAnswer}`;
        if (!q.explanation || typeof q.explanation !== "string") return "explanation not their";

        for (const opt of q.options) {
            console.log("PROB: ",!opt.text," - ",typeof opt.text)
        if (!opt.text || typeof opt.text !== "string") return "options not their";
        }
    }
    console.log("FINX")
    return true;
}