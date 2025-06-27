import { Request, Response } from "express";
import  Staff  from "../../model/staff.model";
import { sendEmail } from "../admin/email";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response):Promise<any> => {
    try {
        const { firstName, lastName, email, password, role, department } = req.body;

        if(!firstName){
           return res.status(400).json({message: "Firstname is required"})
        }

        if(!lastName){
            return res.status(400).json({message: "Lastname is required"})
        }

        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }

        if(!role){
            return res.status(400).json({message: "Role is required"})
        }

        if(!department){
            return res.status(400).json({message: "Department is required"})
        }

        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }

        const existingUser = await Staff.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const staff = await Staff.create({ firstName, lastName, email, password: hashedPassword, role, department });

        await sendEmail(email,"Welcome to CDC", `<!DOCTYPE html>
           <html lang="en">
           <head>
           <meta charset="UTF-8" />
           <title>Staff Signup Confirmation</title>
           </head>
           <body style="font-family: 'Segoe UI', sans-serif; margin: 0; background-color: #f5f7fa; padding: 0;">
           <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
           <tr>
           <td align="center">
           <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
           <tr>
            <td align="center" style="padding-bottom: 20px;">
              <!-- Logo -->
              <img src="https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj" alt="Organization Logo" style="max-width: 120px;" />
            </td>
           </tr>
           <tr>
            <td>
              <h2 style="text-align: center; color: #2c3e50;">Welcome to the Team!</h2>
              <p style="font-size: 16px; color: #555; text-align: center;">
                Dear <strong>${firstName}</strong>,
                <br /><br />
                Your staff account has been successfully registered. You now have access to manage operations, view internal updates, and contribute to the system.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 16px; color: #007bff;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 16px; color: #007bff;"><strong>Department:</strong> ${department}</p>
              </div>
              <p style="text-align: center; color: #555; font-size: 16px;">
                You can log in using your credentials and begin managing your responsibilities.
              </p>
              <div style="text-align: center; margin: 30px;">
                <a href="[LOGIN_URL]" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                  Login Now
                </a>
              </div>
              <p style="text-align: center; font-size: 14px; color: #888;">
                If you have questions, reach out to your department head or IT support.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 30px;">
              <a href="#"><img src="[FACEBOOK_ICON]" alt="Facebook" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[LINKEDIN_ICON]" alt="LinkedIn" style="width: 24px; margin: 0 10px;"></a>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size: 12px; color: #bbb; padding-top: 20px;">
              © 2025 CDC Your Organization. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`)  

        res.status(201).json({ message: "User created successfully", staff, success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}
