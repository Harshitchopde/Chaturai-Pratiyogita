import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";


export const createQuestion = async(data)=> {
    const { quizId, questionDesc, options: _options, correctAnswer, points, explanation } = data.body;
    // console.log("Details : ",quizId)
    // console.log("CREATE QUES: ",data)
    let { questionType } = data.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new Error(`Could not find Quiz ${quizId}`);

    const options = typeof _options === "string" ? JSON.parse(_options) : _options;
    if (!questionDesc || !options) throw new Error("Some fields are missing!");

    if (!questionType) questionType = "MCQ";

    const question = new Question({
      quizId,
      options,
      points,
      questionType,
      questionDesc,
      correctAnswer,
      explanation,
    });

    // console.log("Options print :",JSON.stringify(question.options,null,2))
    // const correctOption = question.options.find((o) => o.isCorrect);
    question.options.forEach((option,i)=>{
      option.isCorrect = (correctAnswer === i);
    });
    const correctOption = question.options.find((o)=> o.isCorrect);
    console.log("Correct options",correctOption)
    if (correctOption) {
      question.correctAnswerId = correctOption._id;
    }

    await question.save();
    await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: question._id } },
     
    )

    return true;
  }

export const updateQuestion = async(data)=> {

    const { questionId, ...other } = data;
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found!");

    for (const key of Object.keys(other)) {
      if (key === "options") {
        question[key] = typeof other[key] === "string" ? JSON.parse(other[key]) : other[key];
      } else {
        question[key] = other[key];
      }
    }

    await question.save();

    // const updatedQuiz = await Quiz.findById(question.quizId)
    //   .populate("questions")
    //   .populate("instructor")
    //   .exec();

    return true;
  }
export const deleteQuestion = async(questionId)=> {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found!");

    await Quiz.findByIdAndUpdate(
      question.quizId,
      { $pull: { questions: question._id } },
    //   { new: true }
    )
    //   .populate("questions")
    //   .populate("instructor")
    //   .exec();

    await Question.findByIdAndDelete(question._id);

    return true;
}
