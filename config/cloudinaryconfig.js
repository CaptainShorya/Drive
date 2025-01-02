const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Configure Cloduinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({  //The storage variable defines where and how the uploaded files should be stored.
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Optional: specify folder in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg','mp4'], // Specify allowed formats
    },
  });
  
//The upload variable is an instance of the Multer middleware that you can use to handle incoming file uploads in routes.
const upload = multer({ storage });

module.exports = upload;