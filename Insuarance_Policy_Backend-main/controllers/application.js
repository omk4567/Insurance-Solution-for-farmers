import { ErrorHandler } from "../middlewares/error.js";
import { FarmerApplication } from "../models/application.js";
import { Policy } from "../models/policy.js"; 
import Notification from '../models/Notification.js'; // Import the Notification model


export const createApplication = async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        policyNumber,
        cropType,
        cropArea,
        region,
        coverageType,
      } = req.body;

  
      if (!name || !email || !phone || !address || !policyNumber || !cropType || !cropArea || !region || !coverageType) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }
  
      const policy = await Policy.findOne({ policyNumber });
      if (!policy) {
        return next(new ErrorHandler("Invalid policy number", 404));
      }
  
      const application = await FarmerApplication.create({
        name,
        email,
        phone,
        address,
        policyNumber, 
        cropType,
        cropArea,
        region,
        coverageType,
        user:req.userId
      });
  
      return res.status(200).json({
        success: true,
        message: "Application created successfully",
      });
  
    } catch (err) {
      next(err);
    }
};

export const myApplications = async (req, res, next) => {
    try {
      const {status,userId}=req.query
  
      if (!userId) {
        return next(new ErrorHandler("Please provide UserId", 400));
      }
  
      let policies = await FarmerApplication.find({user:userId });

      if(status){
        policies=policies.filter((policy)=>policy.status==status)
      }
  
      return res.status(200).json({
        success: true,
        policies
      });
  
    } catch (err) {
      next(err);
    }
};

export const allApplications = async (req, res, next) => {
    try {
      const {status}=req.query
  
      let policies = await FarmerApplication.find();

      if(status){
        policies=policies.filter((policy)=>policy.status==status)
      }
  
      return res.status(200).json({
        success: true,
        policies
      });
  
    } catch (err) {
      next(err);
    }
};

export const applicationDetails = async (req, res, next) => {
  try {
    const {id}=req.params

    const application=await FarmerApplication.findById(id)

    return res.status(200).json({
      success: true,
      application
    });

  } catch (err) {
    next(err);
  }
};

/*export const processApplication = async (req, res, next) => {
  try {
    const {id,process}=req.body

    if(!id) return next(new ErrorHandler("Application Not Found!"))
    if(!process) return next(new ErrorHandler("Please Accept or Reject Application"))

    const application=await FarmerApplication.findById(id)

    application.status=process

    await application.save()

    return res.status(200).json({
      success: true,
      message:"Application Processed"
    });

  } catch (err) {
    next(err);
  }
}; */ 

export const processApplication = async (req, res, next) => {
  try {
    const { id, process } = req.body;

    if (!id) return next(new ErrorHandler("Application Not Found!"));
    if (!process) return next(new ErrorHandler("Please Accept or Reject Application"));

    const application = await FarmerApplication.findById(id);
    if (!application) return next(new ErrorHandler("Application Not Found!"));

    application.status = process;
    await application.save();

    // Send a notification to the user
    await Notification.create({
      userId: application.email, // Assuming you have the user ID from the application
      message: `Your application has been ${process.toLowerCase()}.`,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      message: "Application Processed",
    });
  } catch (err) {
    next(err);
  }
};



  