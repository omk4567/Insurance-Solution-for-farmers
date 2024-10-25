import mongoose from "mongoose"

export const connectDB=(uri)=>{
   mongoose.connect(uri).then(()=>{
        console.log("Database connected Succesfully.")       
   }).catch((err)=>{
        console.log("Error while connecting Database",err)
   })
}    