import express from "express"

import {authMiddleware} from "../controllers/auth.js"
import {uploadImage,getProductById,
    getAllProduct,
    getProductByCategoryId,
    getSearchProduct,
    postProduct,
    putProduct,
    deleteProduct,
    getCategories,
    postCategory,
    deleteCategory,
    changeImageProduct
} from "../controllers/product.js"



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
router.post("/products",authMiddleware({admin:true}),uploadImage(),postProduct) 
router.put("/products",authMiddleware({admin:true}),putProduct) 
router.patch("/products/image",authMiddleware({admin:true}),uploadImage(),changeImageProduct)
router.delete("/products/:id",authMiddleware({admin:true}),deleteProduct) 

router.get("/categories",getCategories)
router.post("categories",authMiddleware({admin:true}),postCategory)
router.delete("/categories/:id",authMiddleware({admin:true}),deleteCategory)


export default router