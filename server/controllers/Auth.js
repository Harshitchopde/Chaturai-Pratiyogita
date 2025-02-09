import bcryptjs from "bcryptjs";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { generate } from "otp-generator";
import Profile from "../models/Profile.js";
import pkg from "jsonwebtoken";
const { compare, genSaltSync, hashSync } = bcryptjs;
const { sign } = pkg
/* 
    email, 
    
    
*/
export const sendOtp = async (req,res)=>{
    try {
        //email
        const {email} = req.body;
        // console.log("Email ",req.body)
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email not Found!"
            })
        }
        // is present 
        const ispresent = await User.findOne({email});
        if(ispresent){
            console.log("User already exists")
            return res.status(401).json({
                success:false,
                message:"User already exists"
            });
        }
        // otp generate
        let otp = generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })
       
        let result = await Otp.findOne({otp});
        while(result){
            otp = generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })
            result = await Otp.findOne({otp});
        }
     
        //otp saved
        const otpPayload = {email,otp};
        const saveOtp = await Otp.create(otpPayload);
        console.log("Saved OTP -> ",saveOtp);
        //result
        return res.status(200).json({
            success:true,
            message:`Otp send to -> ${email}`,
            saveOtp
        })
    } catch (error) {
        console.log("Error in sendOtp ",error)
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}

// sign Up
export const signUp = async (req,res)=>{
    try {
        // firstName,lastName,
        const { firstName,
            lastName,
            password,
            conformPassword,
            email,
            contactNumber,
            accountType,
            otp
        } = req.body;
       // check 
       if (!firstName || !lastName || !password || !conformPassword || !email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Some Parameter are missing"
        })
        }

        if(password!==conformPassword){
            return res.status(400).json({
                success:false,
                message:"Password is Incorrect!"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User aleady exist , try with different name"
            })
        }

        // recent OTP 
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        if (recentOtp.lenght === 0) {
            return res.status(400).json({
                success: false,
                message: "No OTP found"
            })
        }
        else if (otp !== recentOtp[0].otp) {
            // console.log("Recent otp : ",recentOTP);
            
            return res.status(400).json({
                success: false,
                message: "Invaid OTP",
                otp:otp,
                // recentOtp,
                // recentOtp:recentOtp[0].otp,
            })
        }
        //hash password
        const saltRounds = 10;
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(password, salt);
        // create the user profile
        const profileOfUser =await Profile.create({
            dob:null,
            about:null,
            contactNumber,
        })
           
        const user = await User.create({
            firstName,
            lastName,
            password:hash,
            email,
            contactNumber,
            accountType,
            additionalDetails:profileOfUser._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        
        return res.status(200).json({
            success:true,
            message:"User has been created successfully",
            user
        })
    } catch (error) {
        console.log("Error in sendOtp ",error)
        return res.status(400).json({
            success:false,
            message:error,
        })
    }
}

// login
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser =  await User.findOne({email}).populate("additionalDetails");
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User not Exists!"
            })
        }

        // match password
        const match = await compare(password,existingUser.password);
        if(!match){
            console.log("Wrong Password!");
            return res.status(400).json({
                success:false,
                message:"Password is incorrect!"
            })
        }

        // create jwt token | future add expiresIn:"24h"
        const token = sign(
            {   
                id:existingUser._id,
                accountType:existingUser.accountType,
                password:existingUser.password,
                email:existingUser.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"24h"
            }
            )
        existingUser.token = token;
        // create cookies
        const options = {
            httpOnly:true,
            expires:new Date(Date.now()+3*24*60*60*1000)
        }
        return res.cookie("access_token",token,options).status(200).json({
            success:true,
            message:"Login SuccessFull",
            user:existingUser,
            token
        })
        
    } catch (error) {
        console.log("Error in login");
        return res.status(400).json({
            success:false,
            message:"Error in login -> "+error
        })
    }
}
// change password
