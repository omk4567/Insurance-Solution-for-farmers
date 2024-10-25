import express from "express"
import { isAdmin } from "../middlewares/auth.js"
import { createPolicy, deletePolicy, searchPolicies } from "../controllers/policy.js"

const app=express.Router()

app.get("/search",searchPolicies)

app.use(isAdmin)

app.post("/create",createPolicy)
app.delete("/delete",deletePolicy)                           






export default app