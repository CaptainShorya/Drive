const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinaryconfig.js');
const fileModel = require('../models/fileModel.js');
const authMiddleware = require('../middlewares/auth.js');


router.get('/homepage',authMiddleware,(req,res) => {
    res.render('homepage.ejs');
})

router.post('/upload-files',authMiddleware,upload.single('uploaded-file'),async (req,res) => {
    if(!req.file){
        return res.status(400).json({
            message:"No Image uploaded"
        })
    }
    
    const newFile = await fileModel.create({
        originalname:req.file.originalname,
        filename:req.file.filename,
        userId:req.user.userId
    })

    res.json(newFile);

})


module.exports = router;