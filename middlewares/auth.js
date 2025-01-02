const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    //Receive token in token variable
    console.log(req.cookies);
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY); //decoded will get data which we passed in jwt.sign

        req.user = decoded; 

        next();

    }catch(err){
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }
    
}

module.exports = auth;