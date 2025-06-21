import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface StaffRequest extends Request {
    staff?: any;
}

export const staffMiddleware = (req: StaffRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({ message: "Unauthorized"});
        return;
    }

    if(!process.env.JWT_SECRET_STAFF){
        res.status(500).json({ message: "Internal server error"});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_STAFF) as { id: string };
        req.staff = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token"});
    }
}