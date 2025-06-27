import { Request, Response } from "express";
import Register from "../../model/register.model";
import { sendEmail } from "./email";

export const getRegistration = async (req: Request, res: Response): Promise<any> => {
    try{
        const { _id } = req.body;

        if(_id){
            const register = await Register.findById({ _id });
            if(!register){
                return res.status(400).json({ message: "Student not found", success: false });
            }
            return res.status(200).json({ message: "Student fetched successfully", register, success: true });
        }else{
            const register = await Register.find();
            return res.status(200).json({ message: "Students fetched successfully", register, success: true });
        }
    }catch(error){
        return res.status(500).json({ message: "Internal server error", error, success: false });
    }
}

export const acceptRegistration = async (req: Request, res: Response):Promise<any>=>{
   try {
    const {_id} = req.body;

    let updateData = { isAccepted: true }

    const update = await Register.findByIdAndUpdate(_id, updateData);

    if(!update){
        return res.status(400).json({message: "Student not found", success: false});
    }

    await sendEmail(update.email, "Registration Accepted",`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Accepted</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <!-- Logo -->
              <img src="https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj" alt="Logo" style="max-width: 100px;">
            </td>
          </tr>
          <tr>
            <td>
              <h2 style="text-align: center; color: #333;">🎉 Registration Accepted</h2>
              <p style="text-align: center; color: #555; font-size: 16px;">
                Dear <strong>${update.studentName}</strong>,<br><br>
                We're thrilled to inform you that your registration has been <strong>successfully accepted</strong>!
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 16px; color: #007bff;"><strong>Register Number:</strong> ${update.registerNumber}</p>
              </div>
              <p style="text-align: center; color: #555; font-size: 16px;">
                You can now proceed to access your dashboard and enjoy the full experience.
              </p>
              <p style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">
                If you have any questions, feel free to reach out to us.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 30px;">
              <a href="#"><img src="[FACEBOOK_ICON]" alt="Facebook" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[INSTAGRAM_ICON]" alt="Instagram" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[LINKEDIN_ICON]" alt="LinkedIn" style="width: 24px; margin: 0 10px;"></a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-size: 12px; color: #aaa; padding-top: 20px;">
              © 2025 CDC or Your Organization. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
` )

    res.status(200).json({message:"Student Accepted Successfully", success: true, update})
   } catch (error) {
    res.status(500).json({message:"Falied to Accept", success: false})
   }
}

export const updateRegistration = async (req: Request, res: Response):Promise<any>=>{
   try {
    const {_id, studentName, registerNumber, ugDegree, ugStream, gender, dob, batch, tenthScore, tenthYOP, twelthScore, twelthYOP, diplomaScore, diplomaYOP, ugScoreCGPA, email, phone, parentMobile, nativeLocation, interestedStream, aadharNumber, panNumber, anyOnlineCourse, activeBacklogs} = req.body;

    let updateStudent = {_id, studentName, registerNumber, ugDegree, ugStream, gender, dob, batch, tenthScore, tenthYOP, twelthScore, twelthYOP, diplomaScore, diplomaYOP, ugScoreCGPA, email, phone, parentMobile, nativeLocation, interestedStream, aadharNumber, panNumber, anyOnlineCourse, activeBacklogs};
    
    const updated = await Register.findByIdAndUpdate(_id, updateStudent, {new:true})

    res.status(200).json({message:"Updated Student Successfully", success:true, updated})
   } catch (error) {
    res.status(500).json({message:"Failed to updated",error})
   }
}

export const deleteRegistration = async (req: Request, res: Response):Promise<any>=>{
  try{
    const { _id } = req.body;

    if(!_id){
        return res.status(401).json({message: "Id is required"});
    }
    await Register.findByIdAndDelete({_id});

    res.status(200).json({message: "Successfully Student Deleted", success: true})
}catch(error){
    res.status(500).json({ message: "Unexpected error",error});
}
}