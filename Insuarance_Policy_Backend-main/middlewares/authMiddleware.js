import { jwtSecret } from "../app.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "./error.js"
import jwt from "jsonwebtoken" 

export const isAuth = (req, res, next) => {
    const token = req.cookies["user_token"];  

    if (!token) return next(new ErrorHandler("Please Login First", 400));

    try {                                                                         
        const data = jwt.verify(token, jwtSecret);         
        req.userId = { email: data.email }; // Attach user info to req.user 
        console.log(req.userId); 
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};


