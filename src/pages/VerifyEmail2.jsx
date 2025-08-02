import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';

// Placeholder for your OTP verification action
// import { verifyEmailOtp } from '../services/operations/authApis';

export const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector(state => state.auth);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Assuming email is passed via location.state from previous page
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      toast.error("Email not found. Redirecting...");
      navigate('/login'); // or '/signup'
    }
  }, [location, navigate]);

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    // dispatch(verifyEmailOtp(email, otp, navigate));
    toast.success(`OTP Verified for ${email} (Implement backend logic)`);
    navigate('/dashboard'); // After successful verification
  };

  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-[500px] flex flex-col gap-3 p-4 lg:p-8">
          <h2 className="text-2xl font-semibold text-center">Verify Your Email</h2>
          <p className="text-md text-center text-gray-600">
            A verification code has been sent to <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleVerifyAndSubmit} className='flex flex-col items-center gap-6 mt-6'>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder='-'
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                  className='w-[48px] lg:w-[60px] bg-slate-300 rounded-[0.5rem] p-4 text-center focus:outline-2 focus:outline-yellow-500 aspect-square border-0'
                />
              )}
              containerStyle={{ justifyContent: "space-between" }}
            />

            <button
              type='submit'
              className='w-full bg-yellow-500 text-black font-semibold py-2 rounded-[0.5rem] hover:bg-yellow-400 transition'
            >
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
