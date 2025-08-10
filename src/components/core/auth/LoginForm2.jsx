import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, Oauth } from '../../../services/operations/authApis';
import toast from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase';

// You’ll implement Google Auth logic here later
// import { signInWithGoogle } from '../../../services/operations/authApis';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
    setFormData({ email: "", password: "" });
  };

  const handleGoogleAuth =async () => {
    try {
    const result = await signInWithPopup(auth,googleProvider);
    const user = result.user;
      dispatch(Oauth(user.email,user,navigate));
    } catch (error) {
      console.error("Error f ",error)
      throw error;
    }
    toast.success("Google Auth clicked (implement logic)");
  };

  return (
    <div className='sm:mt-6 mt-3 border p-5 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-5 bg-white'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-5'>
        <label>
          <p className='text-sm sm:text-lg font-medium'>Email <sup className='text-red-600'>*</sup></p>
          <input
            required
            name='email'
            type='email'
            value={email}
            onChange={handleChange}
            placeholder='Enter Your Email'
            className='w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none'
          />
        </label>
        <label>
          <p className='text-sm sm:text-lg font-medium'>Password <sup className='text-red-600'>*</sup></p>
          <input
            required
            name='password'
            type='password'
            value={password}
            onChange={handleChange}
            placeholder='Enter Your Password'
            className='w-full bg-slate-100 rounded-lg p-2 text-sm sm:text-base outline-none'
          />
        </label>
        <button
          type='submit'
          className='w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition'
        >
          Login
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
