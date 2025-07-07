// create-order
export const capturePayement = async (req,res)=>{
    try {
        
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
        
    } catch (error) {
        console.log("Error in verifySignature : ",error.message);
        return res.status(400).json()
    }
}