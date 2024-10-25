import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dufys305j',
  api_key: '887823475795473',
  api_secret: '17zfcfOKOsuXT-i0kYo08jOGoe8',
}); 

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'claims', 
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

// Initialize multer for a single file upload using Cloudinary
const upload = multer({ storage }); // Make sure this is correctly defined

export { upload }; // This should correctly export the upload object
  