import { Request, Response } from "express";
import  Staff  from "../../model/staff.model"
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

        res.status(201).json({ message: "User created successfully", staff, success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}
