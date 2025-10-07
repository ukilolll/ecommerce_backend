import express from "express"

import {authMiddleware} from "../controllers/auth.js"
import * as handler from "../controllers/transition.js"
const router = express.Router()

router.get("/order",authMiddleware(),handler.userCheckTransition)
router.post("/order/:cartId",authMiddleware(),handler.createOrder)


export default router