import { Request, Response } from "express";
import { Admin } from "../../model/admin.model";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response):Promise<any> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);

        if(!firstName){
            return res.status(400).json({ message: "First name is required" });
        }
        if(!lastName){
            return res.status(400).json({ message: "Last name is required" });
        }
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }

        const existingAdmin = await Admin.findOne({ email });

        if(existingAdmin){
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "Admin created successfully", admin, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}
