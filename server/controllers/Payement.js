import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto"
// create-order
export const capturePayement = async (req,res)=>{
    const { amount,currency} = req.body;
    if(!amount || !currency ){
        return res.status(404).json({
            success:false,
            message:"Missing parameter"
        })
    }
    const options = {
        amount:amount*100,  // in paisa
        currency,
        receipt:`receipt_order_${Math.floor(Math.random()*1000000)}`
    };

    try {
        const order  = await razorpayInstance.orders.create(options);
        console.log("Payement orders: ",order);
        res.status(200).json({
            orderId:order.id,amount:order.amount,
            currency:order.currency,
            receipt:order.receipt
        })
        
    } catch (error) {
          console.log("Error in capturePayment : ",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
// verify signature
export const verifySignature = async (req,res) =>{
    try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORKEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');
    console.log("Gn s: ",generatedSignature);
    console.log("RS : ",razorpay_signature)
    if (generatedSignature === razorpay_signature) {
        res.json({ status: 'success' });
    } else {
        res.status(400).json({ status: 'failure' });
    }
    } catch (error) {
        console.log("Error in verifySignature : ",error.message);
        return res.status(400).json()
    }
}