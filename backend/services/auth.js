import crypto from "crypto"
import nodemailer from "nodemailer"
import Joi from "joi";
import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import multer from "multer";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const validateObj = {
    register:Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password:Joi.string().min(8).max(30).required(),
        email: Joi.string().email().required(),
    }),
    checkOtp:Joi.object({
        email: Joi.string().email().required(),
        otp:Joi.number().max(999999).required()
    }),
    login:Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password:Joi.string().min(8).max(30).required(),
    }),
    resendOtp:Joi.object({
        email: Joi.string().email().required(),
    }),
}

export function generateOtp() {
  return ('' + (100000 + crypto.randomInt(0, 900000))).slice(0, 6);
}

export async function sendOtp(email,otp){

    const emailData = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your OTP code',
    html: `<p>Your OTP code is <strong>${otp}</strong>.</p>`
    }

    try {
        await transporter.sendMail(emailData);
       
    } catch (err) {
        console.error('Mail send failed', err);
    }
    
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../project_db/profile_images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    cb(null, true);  
  } else {
    cb(new Error('Only .jpg and .jpeg files are allowed!'), false); 
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteFile = async (fileName) => {
  try {
    const imagePath = path.resolve(__dirname, "../../project_db/profile_images", fileName);
    await fs.promises.unlink(imagePath);
    console.log("Deleted invalid file:", fileName);
  } catch (err) {
    console.error("Failed to delete invalid file:", err.message);
  }
};
