import { Request, Response } from "express";
import xlsx from "xlsx";
import bcrypt from "bcrypt";
import { User } from "../../model/user.model";
import { sendEmail } from "./email";

export const addStudents = async(req: Request, res: Response):Promise<any>=>{
     try {
        const file = (req as any).file;

        const workbook = xlsx.read(file.buffer,{type: "buffer"});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet);

        const users = await Promise.all((rows as any[]).map(async(row)=>{
           const name = row.name||row.Name ;
           const department = row.department||row.Department ;
           const year = row.year||row.Year ;
           const email = row.email||row.Email;
           const plainPassword = (row.password||row.Password).toString();
           console.log(name, department, year, email, plainPassword);
           console.log(row);
           const hashedpassword = await bcrypt.hash(plainPassword,10)
           return{email, password:hashedpassword, name, department, year};
        }))
        console.log(users);

        const student = await User.insertMany(users, {ordered: false})

        for (const user of users) {
          await sendEmail(
            user.email,
            "Welcome to CDC",
            `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to CDC</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <!-- Logo Placeholder -->
              <img src="https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj" alt="CDC Logo" style="max-width: 120px;">
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1d3557; font-size: 26px;">🎉 Welcome to CDC</h1>
              <p style="color: #333; font-size: 16px; max-width: 500px; margin: 10px auto;">
                Dear <strong>${user.name}</strong>,<br /><br />
                We're thrilled to welcome you to the <strong>Career Development Cell (CDC)</strong>! Get ready to explore amazing opportunities, events, and resources to elevate your career journey.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="margin-top: 20px;">
              <a href="[PORTAL_URL]" style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
                Visit CDC Portal
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: #666; font-size: 14px;">
                Need help? Just reply to this email — we’re here for you.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <!-- Social Media Icons -->
              <a href="#"><img src="[FACEBOOK_ICON]" alt="Facebook" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[INSTAGRAM_ICON]" alt="Instagram" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[LINKEDIN_ICON]" alt="LinkedIn" style="width: 24px; margin: 0 10px;"></a>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size: 12px; color: #aaa; padding-top: 10px;">
              © 2025 Career Development Cell. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
          );
        }

      res.status(200).json({message:"Successfully student created",success:true, student, StudentsCount: student.length})
     } catch (error) {
        res.status(500).json({message:"Failed to add students",error:(error as Error).message})
     }

}


export const addStudentManually = async (req: Request, res: Response):Promise<any> => {
    try {
        const { name, department, year, email, password } = req.body;

        if(!name){
            return res.status(400).json({ message: "Name is required" });
        }
        if(!department){
            return res.status(400).json({ message: "Department is required" });
        }
        if(!year){      
            return res.status(400).json({ message: "Year is required" });
        }
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
                return res.status(400).json({ message: "Password is required" });
            }

            const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, department, year, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user, success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}


export const getStudents = async(req: Request, res: Response)=>{
    try {
        const students = await User.find().select("-password");
        res.status(200).json({students});
    } catch (error) {
        res.status(500).json({message:"Failed to get students",error:(error as Error).message})
    }
}


export const deleteStudent = async (req: Request, res: Response):Promise<any> => {
    try {
        const { _id } = req.body;

        if(!_id){
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedUser = await User.findByIdAndDelete(_id);

        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}