const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[3,"Username must be atleast 5 character long"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[13,"Email must be atleast 5 character long"]
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[5,"Password must be atleast 5 character long"]
    }
})

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;

