import Claim from '../models/claim.js';
import { User } from "../models/user.js" 
import Notification from '../models/Notification.js'; // Import the Notification model
import { ErrorHandler } from '../middlewares/error.js';       
import multer from 'multer'; 

// Create Claim
/*export const createClaim = async (req, res, next) => {
  try {
    const { userId, policyId, claimType, description } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return next(new ErrorHandler("Please upload a photo", 400));
    }

    // Use the uploaded file's path
    const photoUrl = req.file.path;

    const claim = await Claim.create({
      userId,          // Store the user's email directly
      policyId,        // Assuming policyId is now just the policy number as a string
      claimType,
      description,
      photo: photoUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return next(new ErrorHandler(error.message, 400));
    }
    next(error);
  }
}; */   

// create-claim image - cloudnary 
// Create Claim
export const createClaim = async (req, res, next) => {
  try {
    const { userId, policyId, claimType, description } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return next(new ErrorHandler("Please upload a photo", 400));
    }

    // Get the Cloudinary URL of the uploaded file
    const photoUrl = req.file.path; // Multer will store the Cloudinary URL in 'path' field

    // Create the claim entry in the database
    const claim = await Claim.create({
      userId,          // Store the user's email directly
      policyId,        // Assuming policyId is now just the policy number as a string
      claimType,
      description,
      photo: photoUrl, // Store the Cloudinary URL in the photo field
    });

    return res.status(201).json({
      success: true,
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    // Handle Multer-specific errors
    if (error instanceof multer.MulterError) {
      return next(new ErrorHandler(error.message, 400));
    }
    next(error); // Pass any other errors to the error handler
  }
};

export const getMyClaims = async (req, res) => {
  try {                                                                              
    // Use req.userId which is set by your authentication middleware
    const email = req.userId.email; // Assuming req.userId contains the user's email    
    
    // Find claims where userId matches the authenticated user's ID   
    const claims = await Claim.find({ userId: email });       

    if (!claims || claims.length === 0) {
      return res.status(404).json({ message: 'No claims found for this user.' });
    }     

    res.status(200).json({ claims });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Admin: Get all claims
export const getAllClaimsForAdmin = async (req, res, next) => {
  try {
      const claims = await Claim.find();

      res.status(200).json({
          success: true,
          claims,
      });
  } catch (error) {
      next(error);
  }
};   

// Admin: Get claim details by ID
export const getClaimDetails = async (req, res, next) => {
  try {
      const claim = await Claim.findById(req.userId);         
      if (!claim) {
          return next(new ErrorHandler("Claim not found", 404));
      }

      res.status(200).json({
          success: true,
          claim,
      });
  } catch (error) {
      next(error);
  }
};       

/* // Controller to process claims
export const processClaim = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting { status: 'approved' | 'under review' | 'denied' }

  try {
    // Update the claim status
    const updatedClaim = await Claim.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }   

    // Create a success message based on the status
    let successMessage = '';
    switch (status) {
      case 'approved':
        successMessage = 'Claim has been successfully approved.';
        break;
      case 'under review':
        successMessage = 'Claim is now under review.';
        break;
      case 'denied':
        successMessage = 'Claim has been denied.';
        break;
      default:
        successMessage = 'Claim status updated successfully.';
    } 

    res.status(200).json({ updatedClaim, message: successMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error processing claim', error: error.message });
  }
}; */   

export const processClaim = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  

  try {
    const updatedClaim = await Claim.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Create the notification based on the status
    let message = '';
    switch (status) {
      case 'approved':
        message = 'Your claim has been approved.';
        break;
      case 'under review':
        message = 'Your claim is under review.';
        break;
      case 'denied':
        message = 'Your claim has been denied.';
        break;
      default:
        message = 'Your claim status has been updated.';
    }   

    // Create a new notification for the user
    await Notification.create({
      userId: updatedClaim.userId,
      message: message,
    }); 

    res.status(200).json({ updatedClaim, message });
  } catch (error) {
    res.status(500).json({ message: 'Error processing claim', error: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  const userId = req.userId.email; // Change this line
  console.log(userId);     

  if (!userId) {
    console.error('User ID is not defined. Check authentication middleware.');
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};


// Process Claim
// export const processClaim = async (req, res, next) => {
//   try {
//     const { id, status } = req.body;

//     const claim = await Claim.findById(id);
//     if (!claim) {
//       return next(new ErrorHandler("Claim not found", 404));
//     }

//     claim.status = status;
//     await claim.save();

//     return res.status(200).json({
//       success: true,
//       message: "Claim processed successfully",
//       claim,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Other functions...
// export const myClaims = async (req, res, next) => {
//   try {
//       const claims = await Claim.find({ userId: req.userId });
//       return res.status(200).json({ success: true, claims });
//   } catch (err) {
//       next(err);
//   }
// };

// export const allClaims = async (req, res, next) => {
//   try {
//       const claims = await Claim.find();
//       return res.status(200).json({ success: true, claims });
//   } catch (err) {
//       next(err);
//   }
// };

// export const claimDetails = async (req, res, next) => {
//   try {
//       const { id } = req.params;

//       const claim = await Claim.findById(id);
//       if (!claim) {
//           return next(new ErrorHandler("Claim not found", 404));
//       }

//       return res.status(200).json({ success: true, claim });
//   } catch (err) {
//       next(err);
//   }
// };
