import { Request, Response } from "express";
import Staff from "../../model/staff.model";

export const getStaff = async(req: Request, res: Response):Promise<any>=>{
    try {
        const Staffs = await Staff.find();

        if(!Staffs){
            return res.status(400).json({message:"No Staff"})
        }

        res.status(200).json({message:"Successfully fetched", success:true, Staffs})
    } catch (error) {
        res.status(500).json({message:error, success:false})
    }
}