import express from "express"

import {authMiddleware} from "../controllers/auth.js"
import {uploadImage,getProductById,
    getAllProduct,
    getProductByCategoryId,
    getSearchProduct,
    postProduct,
    putProduct,
    deleteProduct} from "../controllers/product.js"

const router = express.Router()

router.get("/",authMiddleware({admin:false}),(req,res) =>{
    return res.json({
        data:req.user
    })
})

router.get("/products",getAllProduct) 
router.get("/products/:id",getProductById) 
router.get("/products/searching/:search",getSearchProduct) 
router.get("/products/Category/:id",getProductByCategoryId)
//get Category
//add Category (admin)
//delete Category(admin)
router.post("/products",authMiddleware({admin:true}),uploadImage(),postProduct) 
router.put("/products/:id",authMiddleware({admin:true}),uploadImage(),putProduct) 
router.delete("/products/:id",authMiddleware({admin:true}),deleteProduct) 


export default router