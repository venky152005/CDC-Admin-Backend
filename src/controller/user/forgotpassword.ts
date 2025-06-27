import nodemailer from "nodemailer";
import {Request, Response } from "express";
import { User } from "../../model/user.model";


export const forgotpassword = async(req:Request, res:Response):Promise<any>=>{
    try {
      const { email } = req.body;
      if (!email) { 
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {  
        return res.status(404).json({ message: "User not found" });
      }

     const otp = Math.floor(100000 + Math.random() * 900000); 
     const otpExpires = new Date(Date.now() + 15 * 60 * 1000); 

        user.otp = otp.toString();
        user.otpExpires = otpExpires;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset OTP</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <!-- Logo Placeholder -->
              <img src="https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj" alt="Logo" style="max-width: 120px;">
            </td>
          </tr>
          <tr>
            <td>
              <h2 style="font-size: 22px; color: #333; text-align: center;">Password Reset Request</h2>
              <p style="font-size: 16px; color: #555; text-align: center;">
                We received a request to reset your password. Please use the OTP below to complete your request.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <div style="background-color: #fff4e5; padding: 20px; border-radius: 8px; display: inline-block;">
                <p style="margin: 0; font-size: 16px; color: #f57c00;">Your OTP:</p>
                <p style="font-size: 24px; font-weight: bold; color: #d84315;">${otp}</p>
                <p style="font-size: 14px; color: #777;">This OTP is valid for 15 minutes.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 30px;">
              <p style="text-align: center; color: #777; font-size: 14px;">
                If you didn't request this, please ignore this email or contact support.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <a href="[SUPPORT_URL]" style="font-size: 14px; color: #007BFF; text-decoration: none;">Contact Support</a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; color: #aaa; font-size: 12px; padding-top: 10px;">
              © 2025 CDC or Your Organization. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: "Error sending email" });
            }
            res.status(200).json({ message: "OTP sent successfully", success: true });
        });


    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
        console.error('Error in forgotpassword:', error);
    }
}



export const verifyOtp = async(req:Request, res:Response):Promise<any>=>{
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        res.status(200).json({ message: "OTP verified successfully", success: true });

    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}
