import { ErrorHandler } from "../middlewares/error.js";
import { Policy } from "../models/policy.js";


export const createPolicy = async (req, res, next) => {
  try {
    const {
      policyName,
      policyNumber,
      insuranceType,
      coverageAmount,
      premiumAmount,
      policyTerm,
      startDate,
      endDate,
      description,
      minAge,
      maxAge
    } = req.body;

    if (!policyName || !policyNumber || !insuranceType || !coverageAmount || !premiumAmount || !policyTerm || !startDate || !endDate || !description || !minAge || !maxAge) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    const policy = await Policy.create({
      policyName,
      policyNumber,
      insuranceType,
      coverageAmount,
      premiumAmount,
      policyTerm,
      startDate,
      endDate,
      description,
      minAge,
      maxAge
    });

    
    return res.status(200).json({
      success: true,
      message: "Policy created successfully",
    });

  } catch (err) {
    next(err);
  }
};

export const searchPolicies = async (req, res, next) => {
    try {
      const { search } = req.query;
  
     
      const policies = await Policy.find({
        $or: [
          { policyName: { $regex: search, $options: "i" } },
          { insuranceType: { $regex: search, $options: "i" } }
        ]
      });
  
      return res.status(200).json({
        success: true,
        policies
      });
  
    } catch (err) {
      next(err);
    }
  };

export const deletePolicy = async (req, res, next) => {
    try {
      const { id } = req.body;
  
      if(!id) return next(new ErrorHandler("Please Provide ID"))
     
      const policy = await Policy.findByIdAndDelete(id);
  
      if(!policy) return next(new ErrorHandler("Policy Not Found"));

      return res.status(200).json({
        success: true,
        message:"Deleted Policy Succesfully"
      });
  
    } catch (err) {
      next(err);
    }
  };


  
