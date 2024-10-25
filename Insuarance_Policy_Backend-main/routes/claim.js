import express from 'express';
import { createClaim, getMyClaims, getAllClaimsForAdmin, processClaim, getUserNotifications, markAsRead} from '../controllers/claim.js';  
import { isAuth } from '../middlewares/authMiddleware.js'; 
import { isAdmin } from '../middlewares/auth.js';
import { upload } from '../config/multer-config.js';       

const router = express.Router(); 

// Route to create a claim
router.post('/claims', upload.single('photo'), createClaim); // Use multer to handle photo upload 
router.get('/my-claims', isAuth ,getMyClaims);         
// Admin: Get all claims    
router.get('/admin/claims/view', isAdmin, getAllClaimsForAdmin);

router.post('/admin/claims/:id', processClaim);      
router.get('/notifications', isAuth ,getUserNotifications);       
router.get('/notifications', isAuth ,getUserNotifications);  
router.patch('/notifications/:id/read', isAuth ,markAsRead);  

export default router;  
                

// Route for processing a claim //admin
// router.put('/process', processClaim);

// router.get('/my', myClaims); 

// // Route for retrieving all claims (for admins)
// router.get('/all', allClaims);  

// // Route for getting claim details //user
// router.get('/:id', claimDetails); 

  