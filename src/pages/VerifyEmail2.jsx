import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Placeholder for your OTP verification action
// import { verifyEmailOtp } from '../services/operations/authApis';

export const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signUpData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (signUpData?.email) {
      setEmail(signUpData.email);
    } else {
      toast.error('Sign Up data is Missing');
      navigate('/signUp');
    }
  }, [signUpData, navigate]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);
    try {
      // await dispatch(verifyEmailOtp(email, otp, navigate));
      toast.success(`OTP Verified for ${email} (Implement backend logic)`);
      navigate('/complete-profile');
    } catch (err) {
      toast.error('Verification Failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOtpChange = (value) => {
  const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters
  setOtp(numericValue);
};
  const handleResendOTP = () => {
    if (timer === 0) {
      // dispatch(sendOtp(email));
      setTimer(60);
      toast.success('OTP Resent');
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-gray-50 px-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <motion.div
          className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 lg:p-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Email Verification</h2>
          <p className="text-center text-gray-600">
            Enter the 6-digit code sent to <span className="font-semibold text-black">{email}</span>
          </p>

          <form onSubmit={handleVerifyAndSubmit} className="flex flex-col items-center gap-6">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              shouldAutoFocus
              isInputNum
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18"}}
                  className="  w-[48px] lg:w-[60px] bg-gray-100 rounded-lg 
                  text-xl font-bold text-center
                   focus:ring-2 focus:ring-yellow-500
                    focus:outline-none  border-gray-300 
                    border-0
                    aspect-square transition"
                />
              )}
              containerStyle={{ justifyContent: 'center', gap: '0.75rem' }}
            />

            <button
              type="submit"
              disabled={otp.length !== 6 || isSubmitting}
              className={`w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg transition hover:bg-yellow-400 ${
                (otp.length !== 6 || isSubmitting) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            {timer > 0 ? (
              <p>Resend OTP in <span className="font-medium text-black">{timer}s</span></p>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-yellow-500 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
