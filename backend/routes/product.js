import express from "express"

import {authMiddleware} from "../controllers/auth.js"

const router = express.Router()

router.get("/",authMiddleware({admin:true}),(req,res) =>{
    return res.json({
        data:req.user
    })
})


export default router