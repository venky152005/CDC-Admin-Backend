import { Request, Response } from "express";
import { sendEmail } from "../../controller/user/email";
import Register from "../../model/register.model";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { studentName, registerNumber, ugDegree, ugStream, gender, dob, batch, tenthScore, tenthYOP, twelthScore, twelthYOP, diplomaScore, diplomaYOP, ugScoreCGPA, email, phone, parentMobile, nativeLocation, interestedStream, aadharNumber, panNumber, anyOnlineCourse, activeBacklogs } = req.body;

    if(!studentName){
        return res.status(400).json({message: "Student name is required"});
    }
    if(!registerNumber){
        return res.status(400).json({message: "Register number is required"});
    }
    if(!ugDegree){
        return res.status(400).json({message: "UG degree is required"});
    }
    if(!ugStream){
        return res.status(400).json({message: "UG stream is required"});
    }
    if(!gender){
        return res.status(400).json({message: "Gender is required"});
    }
    if(!dob){
        return res.status(400).json({message: "Date of birth is required"});
    }
    if(!batch){         
        return res.status(400).json({message: "Batch is required"});
    }
    if(!tenthScore){
        return res.status(400).json({message: "10th score is required"});
    }
    if(!tenthYOP){
        return res.status(400).json({message: "10th year of passing is required"});
    }
    if(!twelthScore){
        return res.status(400).json({message: "12th score is required"});
    }
    if(!twelthYOP){
        return res.status(400).json({message: "12th year of passing is required"});
    }
    if(!diplomaScore){
        return res.status(400).json({message: "Diploma score is required"});
    }
    if(!diplomaYOP){
        return res.status(400).json({message: "Diploma year of passing is required"});
    }
    if(!ugScoreCGPA){
        return res.status(400).json({message: "UG score CGPA is required"});
    }
    if(!email){
        return res.status(400).json({message: "Email is required"});
    }
    if(!phone){
        return res.status(400).json({message: "Phone number is required"});
    }
    if(!parentMobile){
        return res.status(400).json({message: "Parent mobile number is required"});
    }
    if(!nativeLocation){
        return res.status(400).json({message: "Native location is required"});
    }
    if(!interestedStream){
        return res.status(400).json({message: "Interested stream is required"});
    }
    if(!aadharNumber){
        return res.status(400).json({message: "Aadhar number is required"});
    }
    if(!panNumber){
        return res.status(400).json({message: "PAN number is required"});
    }
    if(!anyOnlineCourse){
        return res.status(400).json({message: "Any online course is required"});
    }
    if(!activeBacklogs){
        return res.status(400).json({message: "Active backlogs is required"});
    }

    const existingRegister = await Register.findOne({ registerNumber, email, phone, parentMobile, aadharNumber, panNumber });

    if(existingRegister){
        return res.status(400).json({message: "You have already registered"});
    }

    try{
        const register = new Register({ 
            studentName, 
            registerNumber, 
            ugDegree, 
            ugStream, 
            gender, 
            dob, 
            batch, 
            tenthScore, 
            tenthYOP, 
            twelthScore, 
            twelthYOP, 
            diplomaScore, 
            diplomaYOP, 
            ugScoreCGPA, 
            email, 
            phone, 
            parentMobile, 
            nativeLocation, 
            interestedStream, 
            aadharNumber, 
            panNumber, 
            anyOnlineCourse, 
            activeBacklogs 
        });
        await register.save();

        if(!register){
            return res.status(400).json({message: "Failed to register"});
        }

        await sendEmail(email, "Registration Successful", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Registration Confirmation</title>
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
              <h2 style="font-size: 24px; color: #333; text-align: center;">Registration Successful</h2>
              <p style="font-size: 16px; color: #555; text-align: center;">
                Dear <strong>${studentName}</strong>,<br />
                Thank you for completing your registration. We have successfully received your information.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <div style="background-color: #eaf6ff; padding: 20px; border-radius: 8px; display: inline-block;">
                <p style="margin: 0; font-size: 16px; color: #007BFF;">Your Register Number</p>
                <p style="font-size: 20px; font-weight: bold; color: #0056b3;">${registerNumber}</p>
              </div>
            </td>
          </tr>
            <tr>
                <td style="padding: 20px; text-align: center;">
                <p style="font-size: 16px; color: #555;">
                    We are excited to have you on board. You can now access all the features and resources available to our registered users.
                </p>
                </td>
          <tr>
            <td style="padding-top: 30px;">
              <p style="text-align: center; color: #777; font-size: 14px;">
                If you have any questions, feel free to reply to this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <!-- Social Media Icons -->
              <a href="#"><img src="[FACEBOOK_ICON]" alt="Facebook" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[TWITTER_ICON]" alt="Twitter" style="width: 24px; margin: 0 10px;"></a>
              <a href="#"><img src="[INSTAGRAM_ICON]" alt="Instagram" style="width: 24px; margin: 0 10px;"></a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; color: #aaa; font-size: 12px; padding-top: 10px;">
              © 2025 CDC or Your Jeppiaar Institute of Technology . All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`);

        return res.status(200).json({message: "Register successfully", register, success: true});
    }catch(error){
        return res.status(500).json({message: "Internal server error", error, success: false});
    }
}


export const getRegister = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;
    try{
        const register = await Register.find({ email});
        if(!register){
            return res.status(400).json({message: "You have not registered yet"});
        }
        return res.status(200).json({message: "Register successfully", register, success: true});
    }catch(error){
        return res.status(500).json({message: "Internal server error", error, success: false});
    }
}

export const updateRegister = async (req: Request,res: Response):Promise<any>=>{
    const { _id, studentName, registerNumber, ugDegree, ugStream, gender, dob, batch, tenthScore, tenthYOP, twelthScore, twelthYOP, diplomaScore, diplomaYOP, ugScoreCGPA, email, phone, parentMobile, nativeLocation, interestedStream, aadharNumber, panNumber, anyOnlineCourse, activeBacklogs } = req.body

    let updateRegister = { studentName, registerNumber, ugDegree, ugStream, gender, dob, batch, tenthScore, tenthYOP, twelthScore, twelthYOP, diplomaScore, diplomaYOP, ugScoreCGPA, email, phone, parentMobile, nativeLocation, interestedStream, aadharNumber, panNumber, anyOnlineCourse, activeBacklogs, isAccepted:false}
    try {
        const updated = await Register.findByIdAndUpdate( _id, updateRegister, {new: true})

        res.status(200).json({message:"Updated successfully", success: true, updated})
    } catch (error) {
        res.status(500).json({message:"Failed to updated", success: false})
    }
}

export const deleteRegister = async (req: Request, res: Response):Promise<any>=>{
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
