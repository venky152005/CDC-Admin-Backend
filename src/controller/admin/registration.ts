import { Request, Response } from "express";
import Register from "../../model/register.model";

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