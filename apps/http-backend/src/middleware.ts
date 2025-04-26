import { NextFunction , Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const userMiddleware=(req: Request, res:Response, next:NextFunction)=>{
    //@ts-ignore 
    const token =req.headers.authorization;
    if(!token){
        res.send({
            msg:"not logged in"
        })
    }
    const decoded=jwt.verify(token as string,JWT_SECRET);
    if(!decoded){
        res.json({
            msg:"authentication failed"
        })
        return;
    }

    
    //@ts-ignore
    req.userId=decoded.userId;
    next();
}