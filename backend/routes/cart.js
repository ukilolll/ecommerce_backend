import express from "express"
import * as cartC from "../controllers/cart.js"
import { authMiddleware } from "../controllers/auth.js"


const router = express.Router()

router.get('/carts/chkcart',authMiddleware(),cartC.getCartId)
router.get('/carts/sumcart/:id',authMiddleware(),cartC.sumCart)
router.get('/carts/getcartdtl/:id',authMiddleware(),cartC.getCartDtl)
router.get('/carts/getcartbycus',authMiddleware(),cartC.getCartByUserId)
router.get('/carts/getcart/:id',authMiddleware(),cartC.getCartByCartId)
router.post('/carts/addcart',authMiddleware(),cartC.postCart)
router.post('/carts/addcartdtl',authMiddleware(),cartC.postCartDtl)
router.delete('/carts/deleteCart/:id',authMiddleware(),cartC.deleteCart)

export default router
