const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const userModel = require('../models/userModel.js');

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
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 3 }),
  body("username").trim().isLength({ min: 5 }),
  async (req, res) => {

    const errors = validationResult(req); //Extracts the validation results from a request, wraps them in a Result object, and returns it.
    //console.log(errors); 
    if(!errors.isEmpty()){  //Return true, if there are no errors, false otherwise
        return res.status(400).json({
            errors : errors.array(), //Returns a list of all errors from all validated fields.
            message : "Invalid data"
        })
    }
    
    //If everything fine,then moves here
    const {username,email,password} = req.body;
    const newUser = await userModel.create({
        username,
        email,
        password
    });

    res.json(newUser);

    // console.log(req.body);
    // res.send("User Registered");
  }
);

module.exports = router;
