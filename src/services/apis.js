export const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    LOGIN_API:BASE_URL+"/auth/login",
    SIGN_UP_API:BASE_URL+"/auth/signUp",
    SEND_OTP_API:BASE_URL+"/auth/sendOtp"
}