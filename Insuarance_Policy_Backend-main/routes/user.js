import express from "express"
import { getMyProfile, login, logout, newUser, updateProfile } from "../controllers/user.js" 
import { isAuthenticated } from "../middlewares/auth.js"
import { authenticate } from "../middlewares/authenticate.js";   
import { isAuth } from "../middlewares/authMiddleware.js";

const app=express.Router()

app.post("/new",newUser)    
app.post("/login",login) 

         
app.use(isAuthenticated) 

app.get("/my",getMyProfile)
app.post("/logout",logout)
app.put("/profile/update",updateProfile)     




export default app