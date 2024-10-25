import cp from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.js";
import policyRoutes from "./routes/policy.js";
import applicationRoutes from "./routes/application.js";
import { connectDB } from "./utils/database.js"; 
import claimRoutes from "./routes/claim.js";

dotenv.config({
    path:"./.env"
})


const port=process.env.PORT || 4000;
const uri=process.env.MONGO_URI;       
export const jwtSecret=process.env.JWT_SECRET

const app=express()


connectDB(uri)  

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(cp())

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/policy",policyRoutes)
app.use("/api/v1/application",applicationRoutes) 
app.use("/api", claimRoutes);   


app.use(errorMiddleware)
app.listen(port,()=>{
    console.log(`app is listening on port, ${port}`)
})

export default app