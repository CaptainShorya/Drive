const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//Test Route
router.get("/test", (req, res) => {
  res.send("Test Route");
});

//Register Form Route
router.get("/register", (req, res) => {
  res.render("user/register.ejs");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }), //express-validator
  body("password").trim().isLength({ min: 3 }),
  body("username").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req); //Extracts the validation results from a request, wraps them in a Result object, and returns it.
    //console.log(errors);
    if (!errors.isEmpty()) {
      //Return true, if there are no errors, false otherwise
      return res.status(400).json({
        errors: errors.array(), //Returns a list of all errors from all validated fields.
        message: "Invalid data",
      });
    }

    //If everything fine,then moves here
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    res.json(newUser);

    // console.log(req.body);
    // res.send("User Registered");
  }
);

//Login Form Route
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post(
  "/login",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {

    const errors = validationResult(req); //Extracts the validation results from a request, wraps them in a Result object, and returns it.
    //console.log(errors);
    if (!errors.isEmpty()) {
      //Return true, if there are no errors, false otherwise
      return res.status(400).json({
        errors: errors.array(), //Returns a list of all errors from all validated fields.
        message: "Invalid data",
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email:email});
    if(!user){
        return res.status(400).json({
            message:"username or password is incorrect"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password); //return true or false

    if(!isMatch){
        return res.status(400).json({
            message:"username or password is incorrect"
        })
    }

    /* Json-WebToken */
    const token = jwt.sign({userId:user._id,email,password},process.env.SECRET_KEY,{ expiresIn:'2h'});
    
    //cookie - Automatically go to every request with the header and cookieparser used to parse this.
    res.cookie('token',token);

    res.send("Logged IN");
    // res.redirect('/homepage');
  }
);

module.exports = router;
