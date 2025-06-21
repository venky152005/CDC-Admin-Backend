import { Request, Response } from "express";
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
