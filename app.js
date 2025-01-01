require('dotenv').config()
// console.log(process.env)

const express = require('express');
const app = express();

const userRouter = require('./routes/user.routes.js');
const connectToDB = require('./config/db.js');
connectToDB();
const userModel = require('./models/userModel.js');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);

app.listen(3000,() => {
    console.log("Server is running");
})