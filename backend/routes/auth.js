import express from "express"

import * as handler from "../controllers/auth.js"
const router = express.Router()

router.post("/register",handler.register)
router.post("/login",handler.login)
router.post("/otp/verify",handler.otpVerify)

export default router