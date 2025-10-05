import crypto from "crypto"
import nodemailer from "nodemailer"
import Joi from "joi";


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
    })
}

export function generateOtp() {
  return ('' + (100000 + crypto.randomInt(0, 900000))).slice(0, 6);
}

export async function sendOtp(email){
    const otp = generateOtp()

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
