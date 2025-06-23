import { Request, Response } from "express";
import { Admin } from "../../model/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }

        const admin = await Admin.findOne({ email });

        if(!admin){
            return res.status(400).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }

        if(!process.env.JWT_SECRET_ADMIN){
            return res.status(500).json({ message: "Internal server error" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: "15h" });


        res.cookie("adminToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 15 * 60 * 60 * 1000, 
        }).status(200).json({ message: "Login successful", success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}
