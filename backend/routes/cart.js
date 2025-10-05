import express from "express"
import * as cartC from "../controllers/cart.js"
import { authMiddleware } from "../controllers/auth.js"


const router =express.Router()
const cartRoute = router.use("/carts",authMiddleware())

cartRoute.post('/chkcart',cartC.getCartId)
cartRoute.get('/sumcart/:id',cartC.sumCart)
cartRoute.get('/getcart/:id',cartC.getCart)
cartRoute.get('/getcartdtl/:id',cartC.getCartDtl)
cartRoute.post('/addcart',cartC.postCart)
cartRoute.post('/addcartdtl',cartC.postCartDtl)
cartRoute.post('/getcartbycus',cartC.getCartByCus)
cartRoute.delete('/deleteCart/:id',cartC.deleteCart)

export default cartRoute
