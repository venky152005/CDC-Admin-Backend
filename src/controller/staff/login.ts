import { Request, Response } from "express";
import Staff from "../../model/staff.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password } = req.body;

        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }

        const staff = await Staff.findOne({ email });

        if(!staff){
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, staff.password);

        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }

        if(!process.env.JWT_SECRET_STAFF){
            return res.status(500).json({ message: "Internal server error" });
        }

        const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET_STAFF, { expiresIn: "15h" });

        res.status(200).json({ message: "Login successful", token, success: true });
        
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}