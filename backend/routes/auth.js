import express from "express"

import * as handler from "../controllers/auth.js"
const router = express.Router()


router.get("/",handler.authMiddleware(),handler.homePage)
router.post("/register",handler.register)
router.post("/login",handler.login)
router.post("/otp/verify",handler.otpVerify)
router.post("/user/profile",handler.authMiddleware(),handler.uploadImage(),handler.uploadUserProfile)

export default router