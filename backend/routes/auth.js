import express from "express"

import * as handler from "../controllers/auth.js"
const router = express.Router()


router.get("/user/info",handler.authMiddleware(),handler.homePage)
router.post("/register",handler.register)
router.post("/login",handler.login)
router.post("/logout",handler.logout)
router.post("/otp/verify",handler.otpVerify)
router.post("/user/profile",handler.authMiddleware(),handler.uploadImage(),handler.uploadUserProfile)
router.patch("/user/info",handler.authMiddleware(),handler.updateUserInfo)
router.use("/user/profile",express.static("../project_db/profile_images"))

export default router