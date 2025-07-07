import Razorpay from "razorpay"
export const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORKEY_ID,
    key_secret:process.env.RAZORKEY_SECRET
})