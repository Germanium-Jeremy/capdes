import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string


const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

export default {
    VerifyToken
};
