import { jwtSecret } from "../app.js";
import { ErrorHandler } from "./error.js"
import jwt from "jsonwebtoken"



export const authenticate = (req, res, next) => {
    // Example for JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'vivek', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }  
      req.userId = { email: data.email }; // Ensure you're setting the user ID correctly 
      next();
    });
  };
  