import { Router } from "express";
import { capturePayement, verifySignature } from "../controllers/Payement.js";

const router = Router();

router.post("/create-order",capturePayement);
router.post("/verify-payment",verifySignature)

export default router;