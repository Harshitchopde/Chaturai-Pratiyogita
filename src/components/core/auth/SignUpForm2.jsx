import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../services/operations/authApis";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setSignUpData } from "../../../slices/authSlicer";

// You will use this when implementing Google OAuth
// import { signInWithGoogle } from "../../../services/operations/authApis";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    conformPassword:"",
  })
  const {email} = formData;
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    dispatch(setSignUpData(formData))
    dispatch(sendOtp(email, navigate));
  };

  const handleGoogleAuth = () => {
    // Trigger your Google Auth Logic here
    // save the firstName and lastName
    // dispatch(signInWithGoogle(navigate));
    toast.success("Google Auth clicked (implement logic)");
  };
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,[name]:value
    }));
  }
  return (
    <div className="mt-4 border p-5 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-5 bg-white">
      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
        <label className="w-full">
          <p className="text-sm sm:text-lg font-medium">
            Email <sup className="text-red-600">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Verify Email
        </button>
      </form>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-300" />
        <p className="text-gray-500 text-sm">OR</p>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <button
        onClick={handleGoogleAuth}
        className="w-full bg-white border border-gray-300 text-black font-semibold py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SignUpForm;
