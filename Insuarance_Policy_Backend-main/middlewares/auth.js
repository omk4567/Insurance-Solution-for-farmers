import { jwtSecret } from "../app.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const isAuthenticated=(req,res,next)=>{
    const token=req.cookies["user_token"]

    if(!token) return next(new ErrorHandler("Please Login First",400));
    
    const data=jwt.verify(token,jwtSecret)  
    req.userId=data._id;

    next()     
} 

export const isAdmin=async (req,res,next)=>{
    const token=req.cookies["user_token"]

    if(!token) return next(new ErrorHandler("Please Login First",400));
    
    const data=jwt.verify(token,jwtSecret)
    const user=await User.findById(data._id)
    if(!user) return next(new ErrorHandler("User Not Found!",400));
    if(user.role==="user") return next(new ErrorHandler("Access Denied!",400));

    next()
}      