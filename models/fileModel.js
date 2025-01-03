const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname:{
        type:String,
        required:[true,"Name is required"]
    },
    filename:{
        type:String,
        required:[true,"Name is required"]
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:[true,'User should be logged In']
    }
})

const fileModel = mongoose.model('fileModel',fileSchema);

module.exports = fileModel;