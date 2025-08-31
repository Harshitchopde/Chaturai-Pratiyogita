

export const createQuizWithQuestions = (req,res)=>{
    try {
        console.log("From createQuizWithQuestions: ",req.body);


        return res.status(200).json({
            success:true,
            message:"Get the information"
        })
    } catch (error) {
        console.log("Error in createQuiz ",error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}