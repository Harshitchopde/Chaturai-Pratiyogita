import pkg from 'jsonwebtoken'
const { verify} = pkg;
export async function verifyAuth(req,res,next){
    try {
        // take token 
        const token = req.cookies.access_token || 
                        req.header("Authorization")?.replace("Bearer ","");
        // console.log("token find ",req.cookies.access_token," and ",req.header("Authorization"))?.replace("Bearer ","");
     
        // console.log("Token ",token);


        // decode
        try {
            const decoded = await verify(token,process.env.JWT_SECRET_KEY);
            // console.log("Decode data ",decoded);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Decode failed " +error.message,
            })
        }
        
    } catch (error) {
        console.log("ErrorIn : ",error)
        return res.status(400).json({
            success:false,
            message:error.message,
            errorIn:"verifyAuth fn"
        })
    }
}

export const isStudent = (req,res,next)=>{
    try {
        if(req.user.accountType!=="Student"){
            return res.status(400).json({
                success:false,
                message:"This route is protected for Student"
            })
        }
        next();
    } catch (error) {
        console.log("Error in IsStudent",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const isInstructor = (req,res,next)=>{
    try {
        if(req.user.accountType!=="Instructor"){
            return res.status(400).json({
                success:false,
                message:"This route is protected for Instructor"
            })
        }
        next();
    } catch (error) {
        console.log("Error in isinstructor",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const isAdmin = (req,res,next)=>{
    try {
        if(req.user.accountType!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"This route is protected for Admin"
            })
        }
        next();
    } catch (error) {
        console.log("Error in isAdmin",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}