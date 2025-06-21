import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserRequest extends Request {
    user?: any;
}

export const userMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if(!process.env.JWT_SECRET_USER){
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER) as { id: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}