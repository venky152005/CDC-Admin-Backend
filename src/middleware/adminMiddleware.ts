import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AdminRequest extends Request {
    admin?:{
        id: string;
    };
}

export const adminMiddleware = async(req: AdminRequest, res:Response, next: NextFunction)=>{
    const token = req.cookies.adminToken || req.headers.authorization?.split(" ")[1];

    console.log(token);

    if(!token){
        res.status(401).json({ message: "Unauthorized"});
        return;
    }

    if(!process.env.JWT_SECRET_ADMIN){
        res.status(500).json({ message: "Internal server error"});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN) as { id: string };
        req.admin = {id:decoded.id};
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token"});
    }
}