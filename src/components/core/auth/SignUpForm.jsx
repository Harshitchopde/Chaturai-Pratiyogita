import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignUpData } from "../../../slices/authSlicer";
import { sendOtp } from "../../../services/operations/authApis";
import { useNavigate } from "react-router-dom";
import { Tab } from "../../common/Tab";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const { firstName, lastName, email, password, conformPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Password validation
  const validatePassword = (password) => {
    const newValidation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidation(newValidation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePassword(password);
    if(!passwordValidation.length || !passwordValidation.lowercase || !passwordValidation.uppercase || !passwordValidation.number || !passwordValidation.specialChar ){
        toast.error("Fix password error");
        return;
    }
    if (password !== conformPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const signUpData = { ...formData, accountType };
    dispatch(setSignUpData(signUpData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      conformPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 border p-5 rounded-2xl shadow-lg w-full max-w-2xl mx-auto flex flex-col gap-5 bg-white"
    >
      <Tab accountType={accountType} setAccountType={setAccountType} />

      <div className="flex flex-col sm:flex-row gap-4">
        <label className="w-full">
          <p className="text-sm sm:text-lg font-medium">
            First Name <sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            required
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none"
          />
        </label>

        <label className="w-full">
          <p className="text-sm sm:text-lg font-medium">
            Last Name <sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            required
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none"
          />
        </label>
      </div>

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

      <div className="flex flex-col sm:flex-row gap-4">
        <label className="w-full relative">
          <p className="text-sm sm:text-lg font-medium">
            Password <sup className="text-red-600">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <div className="text-[0.75rem] mt-1 space-y-[0.5rem] leading-3">
            <p
              className={
                passwordValidation.length ? "text-green-600" : "text-red-500"
              }
            >
              {passwordValidation.length ? "✅" : "❌"} At least 8 characters
            </p>
            <p
              className={
                passwordValidation.uppercase ? "text-green-600" : "text-red-500"
              }
            >
              {passwordValidation.uppercase ? "✅" : "❌"} One uppercase letter
            </p>
            <p
              className={
                passwordValidation.lowercase ? "text-green-600" : "text-red-500"
              }
            >
              {passwordValidation.lowercase ? "✅" : "❌"} One lowercase letter
            </p>
            <p
              className={
                passwordValidation.number ? "text-green-600" : "text-red-500"
              }
            >
              {passwordValidation.number ? "✅" : "❌"} One number
            </p>
            <p
              className={
                passwordValidation.specialChar
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              {passwordValidation.specialChar ? "✅" : "❌"} One special
              character
            </p>
          </div>
        </label>

        <label className="w-full relative">
          <p className="text-sm sm:text-lg font-medium">
            Confirm Password <sup className="text-red-600">*</sup>
          </p>
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            name="conformPassword"
            value={conformPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;
