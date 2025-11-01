import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import db from "../services/database.js"
import redis from "../services/redisConnect.js"
import validator from "../pkg/validator.js"
import {validateObj,generateOtp,sendOtp,upload,deleteFile} from "../services/auth.js"

export function uploadImage() {return upload.single("image")}

export async function register(req,res){
    try{
    const {error ,errorMsg , body } = validator(validateObj.register,req.body)
    if(error){
        return res.status(400).json({errorMsg:errorMsg , ok:false})
    }
    console.log(body)
    //check already use email
    const check = await db.query(`SELECT id FROM users WHERE "email"=$1`, [body.email]);
    if (check.rows.length > 0) {
        return res.status(400).json({ errorMsg: "Email already exists" ,ok:false});
    }

    const saltround = 11
    const pwdHash =  await bcrypt.hash(body.password,saltround)
    body.passwordHash = pwdHash

    const otp = generateOtp()

    await redis.setEx(`otp:${body.email}`, 60 * 5, JSON.stringify({body , otp, state:"register"}));

    sendOtp(body.email,otp)

    return res.json({ ok: true, message: 'If the email exists, an OTP has been sent.' });

    }catch(err){
        console.log(err)
        res.status(500).json({errorMsg:"internal server error",ok:false})
    }
}

export async function login(req,res){
    try{
        const {error ,errorMsg , body } = validator(validateObj.login,req.body)
    if(error){
        return res.status(400).json({errorMsg:errorMsg , ok:false})
    }

    const result = await db.query({
         text: `SELECT * FROM "users" WHERE "username"= $1`, 
         values: [body.username]
    })
    // ไม่พบ email ที่ login
    if (result.rowCount == 0) {
        return res.status(401).json({ errorMsg: `Login Fail`,ok:false })
    }
    //incorrect password
    const loginOK = await bcrypt.compare(req.body.password,result.rows[0].password_hash) 
    if (!loginOK){
        return res.status(401).json({ errorMsg: `Login Fail`,ok:false })
    }

    const email = result.rows[0].email
    const otp = generateOtp()
    const catchData = {
        otp,
        body:{
            email,
            userId:result.rows[0].id,
            status:  result.rows[0].status,
        },
        state:"login" ,
    }

    await redis.setEx(`otp:${email}`, 60 * 5, JSON.stringify(catchData));

    sendOtp(email,otp)

    return res.json({ ok: true, email});

    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error",ok:false})
    }
}

export const loginAdmin = async (req,res)=>{
    try{
        const {error ,errorMsg , body } = validator(validateObj.login,req.body)
    if(error){
        return res.status(400).json({errorMsg:errorMsg , ok:false})
    }

    const result = await db.query({
         text: `SELECT * FROM "users" WHERE "username"= $1 AND "status" = 'admin'`, 
         values: [body.username]
    })
    // ไม่พบ email ที่ login
    if (result.rowCount == 0) {
        return res.status(401).json({ errorMsg: `Login Fail`,ok:false })
    }
    //incorrect password
    const loginOK = await bcrypt.compare(req.body.password,result.rows[0].password_hash) 
    if (!loginOK){
        return res.status(401).json({ errorMsg: `Login Fail`,ok:false })
    }

    const email = result.rows[0].email
    const otp = generateOtp()
    const catchData = {
        otp,
        body:{
            email,
            userId:result.rows[0].id,
            status:  result.rows[0].status,
        },
        state:"login" ,
    }

    await redis.setEx(`otp:${email}`, 60 * 5, JSON.stringify(catchData));

    sendOtp(email,otp)

    return res.json({ ok: true, email});

    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error",ok:false})
    }
}

export async function logout(req,res){
    res.clearCookie("token", {
    httpOnly: true,
    secure: false, 
    // sameSite: "lax", 
  });

    res.json({ message: "Logged out successfully" });
}

export async function otpVerify(req,res){
    try{
    const {error ,errorMsg , body } = validator(validateObj.checkOtp,req.body)
    if(error){
        return res.status(400).json({errorMsg:errorMsg , ok:false})
    }
    

    let rawCache = await redis.get(`otp:${body.email}`);
    if (rawCache) {
        const cache = JSON.parse(rawCache);
        console.log(cache)
        console.log(body.otp,body.email)

        if (cache.otp !== String(body.otp) || cache.body.email !== body.email) {
            return res.status(401).json({ ok: false, errorMsg: "Invalid OTP" });
        }

        let userId;

        if(cache.state === "register"){
            const result = await db.query(
            `INSERT INTO "users" 
            ("username", "email", "password_hash" ,"status") VALUES ($1, $2, $3,'member') 
            RETURNING "id", "email"`,
            [cache.body.username, cache.body.email, cache.body.passwordHash ]
            );
            userId = result.rows[0].id
        }else{
            userId = cache.body.userId
        }
        

        await redis.del(`otp:${body.email}`);

        //if state === login just send cookie
        const token = jwt.sign(
            { userId: userId, email: cache.body.email ,status:cache.body.status },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        await redis.del(`otp:${body.email}`);

        res.cookie("token", token, {
            httpOnly: true,   // cannot be accessed by JS
            secure: false,
            sameSite: "strict", // protect against CSRF
            maxAge: 1000*60*60*24*30 // 1 month
        });

        return res.json({ ok: true, message: "OTP verified" , role:cache.body.status || "member" });

    }else{
        return res.status(401).json({ ok: false, errorMsg: "OTP expired" });
    }
    
    }catch(err){
        console.log(err)
        res.status(500).json({errorMsg:"internal server error",ok:false})
    }
}

export function isAdmin(req,res){
    return res.json({ ok: true, message: "yes is admin" });
}

export async function uploadUserProfile(req,res){
  try{
    if (!req.file){
        return res.status(400).json({"errorMsg":"image not found" , ok:false})
    }

    const oldImage = await db.query(
      `SELECT profile_image FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (oldImage.rows[0].profile_image !== null){
        await deleteFile(oldImage.rows[0].profile_image);
    }

    await db.query(
      `UPDATE users 
       SET profile_image =$1
       WHERE id=$2 RETURNING *`,
      [ req.file.filename, req.user.userId]
    );

    res.json({ok:true,message:"image change"});

  } catch (err) {
    console.log(err)
    res.status(500).json({errorMsg:"internal server error",ok:false})
  }
}

export async function homePage(req,res){
    try {
    const result = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [req.user.userId]
    );
    const userData = result.rows[0]
    console.log(req.user.userId)
    console.log(userData)
    res.json({
        "username": userData.username,
        "email": userData.email,
        "status": userData.status,
        "profile_image": userData.profile_image,
        "first_name":userData.first_name,
        "last_name":userData.last_name,
        "phone_number":userData.phone_number,
        "date_of_birth":userData.date_of_birth
        
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({errorMsg:"internal server error",ok:false})
  }
}

export async function  updateUserInfo(req,res){
  try{ 
    // const {error ,errorMsg , body } = validator(validateObj.updateUserInfo,req.body)
    // if(error){
    //     return res.status(400).json({errorMsg:errorMsg , ok:false})
    // }
    const body = req.body
    await db.query(
      `UPDATE users 
       SET first_name = $1,
        "last_name" = $2,
        "phone_number" = $3,
        "date_of_birth" = $4
       WHERE id = $5 `,
    [
        body.first_name,
        body.last_name,
        body.phone_number,
        body.date_of_birth,
        req.user.userId
    ]
    );

    res.json({ok:true,message:"data change"});

  } catch (err) {
    console.log(err)
    res.status(500).json({errorMsg:"internal server error",ok:false})
  }
}

export function authMiddleware(options = { admin: false }) {
    return function (req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ ok: false, errorMsg: "No token provided" });
        }

        const decoded = jwt.verify(token,  process.env.SECRET_KEY);

        req.user = decoded; 
        console.log("userIn:" , req.user)
        if (options.admin && decoded.status === "member") {
            return res.status(403).json({ ok: false, errorMsg: "Forbidden: Admins only" });
             
        }

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ ok: false, errorMsg: "Token expired" });
        }
        return res.status(401).json({ ok: false, errorMsg: "Invalid token" });
    }

}
}


