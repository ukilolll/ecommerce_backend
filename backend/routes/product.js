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

router.get("/products",getAllProduct) 
router.get("/product/:id",getProductById) 
router.get("/product/searching/:search",getSearchProduct) 
router.get("/product/category/:id",getProductByCategoryId)
router.post("/product",authMiddleware({admin:true}),uploadImage(),postProduct) 
router.put("/product",authMiddleware({admin:true}),putProduct) 
router.patch("/product/image",authMiddleware({admin:true}),uploadImage(),changeImageProduct)
router.delete("/product/:id",authMiddleware({admin:true}),deleteProduct) 
router.use("/product/image",express.static("../project_db/product_images"))

router.get("/categories",getCategories)
router.post("category",authMiddleware({admin:true}),postCategory)
router.delete("/category/:id",authMiddleware({admin:true}),deleteCategory)


export default router