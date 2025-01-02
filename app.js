require('dotenv').config()
// console.log(process.env)

const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/user.routes.js');
const indexRouter = require('./routes/index.routes.js');
const connectToDB = require('./config/db.js');
connectToDB();


app.set("view engine","ejs");
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRouter);
app.use('/user',userRouter);


app.listen(3000,() => {
    console.log("Server is running");
})