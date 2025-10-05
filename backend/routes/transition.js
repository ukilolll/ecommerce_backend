import express from "express"

import {authMiddleware} from "../controllers/auth.js"
import * as handler from "../controllers/transition.js"
const router = express.Router()

router.post("/order/:id",authMiddleware(),handler.createOrder)

export default router