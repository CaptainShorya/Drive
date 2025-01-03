const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinaryconfig.js');
const fileModel = require('../models/fileModel.js');
const authMiddleware = require('../middlewares/auth.js');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');


router.get('/homepage',authMiddleware,async (req,res) => {
    
    const userFiles = await fileModel.find({userID: req.user.userId}); //return as array 
    console.log(userFiles);

    res.render('homepage.ejs',{
        files:userFiles

    });  //Accepted in ejs file

})

router.post('/upload-files',authMiddleware,upload.single('uploaded-file'),async (req,res) => {
    console.log("Auth Middleware:", req.user);
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No Image uploaded"
            })
        }

        if (!req.user.userId || !mongoose.Types.ObjectId.isValid(req.user.userId)) {
            return res.status(400).json({ message: "Invalid or missing user ID." });
        }
        
        const userInfo = req.user.userId;
        console.log(userInfo);
        const newFile = await fileModel.create({ 
            originalname:req.file.originalname,
            filename:req.file.filename,
            userID:userInfo
        })
    
        
        res.redirect('/homepage');

    }catch(err){
        console.log("Error Occuring")
        console.log(err);
    }

})

router.get('/download/:filename',authMiddleware,async (req,res) => {
    //Check whether file should belong to the same user who had uploaded this

    const loggedInUserId = req.user.userId;

    const filename = req.params.filename;

    //if exists,then user is same who is creator or doing deletion of the file
    const file = await fileModel.findOne({
        userID:loggedInUserId,
        filename:filename
    })


    if(!file){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
        const { resources } = await cloudinary.search
            .expression(`${filename}`) // Search by file name
            .max_results(1) // Limit results (optional)
            .execute();

        // res.send(resources);

        if (resources.length > 0) {
            const publicIds = resources.map(file => file.secure_url); // Get URLs of matched files
            res.send(publicIds);
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }

    
})

module.exports = router;