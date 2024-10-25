import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/auth.js"
import { allApplications, applicationDetails, createApplication, myApplications, processApplication } from "../controllers/application.js"

const app=express.Router()


app.use(isAuthenticated)
app.post("/new",createApplication)
app.get("/my",myApplications)

app.use(isAdmin)
app.get("/all",allApplications)
app.get("/:id",applicationDetails)
app.put("/process",processApplication)







export default app