export const filterQuizzes = (query,quizzes)=>{
    if(!query.trim())return quizzes;
    const lowerQuery = query.toLowerCase();

    const regex = new RegExp(`.*${lowerQuery.split("").join(".*")}.*`,"i");
    // console.log("Regex : ",regex)
    return quizzes.filter(
        (quiz)=> regex.test(quiz?.quizName.toLowerCase()) ||
        quiz?.tags.some((tag)=> regex.test(tag.toLowerCase()))
    );
}