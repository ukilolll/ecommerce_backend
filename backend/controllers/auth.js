import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import db from "../services/database.js"
import redis from "../services/redisConnect.js"
import validator from "../pkg/validator.js"
import {validateObj,generateOtp,sendOtp} from "../services/auth.js"

export async function register(req,res){
    try{
    const {error ,errorMsg , body } = validator(validateObj.register,req.body)
    if(error){
        return res.status(400).json({errorMsg})
    }

    //check already use email
    const check = await db.query(`SELECT id FROM users WHERE "email"=$1`, [body.email]);
    if (check.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const saltround = 11
    const pwdHash =  await bcrypt.hash(body.password,saltround)
    body.passwordHash = pwdHash

    const otp = generateOtp()

    await redis.setEx(`otp:${body.email}`, 99999999, JSON.stringify({body , otp, state:"register"}));

    // await sendOtp(body.email)

    return res.json({ ok: true, message: 'If the email exists, an OTP has been sent.' });

    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
}

export async function login(req,res){
    try{
        const {error ,errorMsg , body } = validator(validateObj.login,req.body)
    if(error){
        return res.status(400).json({errorMsg})
    }

    const result = await db.query({
         text: `SELECT * FROM "users" WHERE "username"= $1`, 
         values: [body.username]
    })
    // ไม่พบ email ที่ login
    if (result.rowCount == 0) {
        return res.status(401).json({ message: `Login Fail`,login:false })
    }
    //incorrect password
    const loginOK = await bcrypt.compare(req.body.password,result.rows[0].password_hash) 
    if (!loginOK){
        return res.status(401).json({ message: `Login Fail`,login:false })
    }

    const email = result.rows[0].email
    const otp = generateOtp()
    const catchData = {
        otp,
        body:{
            email,
            userId:result.rows[0].id,
            status:  result.rows[0].status
        },
        state:"login"  ,
    }

    await redis.setEx(`otp:${email}`, 99999999, JSON.stringify(catchData));

    // await sendOtp(body.email)

    return res.json({ ok: true, email});

    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
}

export async function otpVerify(req,res){
    try{
    const {error ,errorMsg , body } = validator(validateObj.checkOtp,req.body)
    if(error){
        return res.status(400).json({errorMsg})
    }
    

    let rawCache = await redis.get(`otp:${body.email}`);
    if (rawCache) {
        const cache = JSON.parse(rawCache);
        console.log(cache)
        console.log(body.otp,body.email)

        if (cache.otp !== String(body.otp) || cache.body.email !== body.email) {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }


        if(cache.state === "register"){
    
        const result = await db.query(
        `INSERT INTO "users" 
        ("username", "email", "password_hash" ,"status") VALUES ($1, $2, $3,'member') 
        RETURNING "id", "email"`,
        [cache.body.username, cache.body.email, cache.body.passwordHash ]
        );

        await redis.del(`otp:${body.email}`);
        console.log(result.rows)
        return res.json({ success: true, message: "OTP verified" });

        //state === login
        }else{
            const token = jwt.sign(
                { id: cache.body.userId, email: cache.body.email ,status:cache.body.status },
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
            );

            await redis.del(`otp:${body.email}`);

            res.cookie("token", token, {
                httpOnly: true,   // cannot be accessed by JS
                secure: false,
                sameSite: "strict", // protect against CSRF
                maxAge: 60*60 *1000*24*7 // 1 week
            });

            return res.json({ success: true, message: "Login successful" });
        }


    }else{
        return res.status(401).json({ success: false, message: "OTP expired" });
    }
    
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
}

export function authMiddleware(options = { admin: false }) {
    return function (req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token,  process.env.SECRET_KEY);

        req.user = decoded; 

        if (options.admin && decoded.status === "member") {
            return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
             
        }

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

}
}