const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next)=>{
    //first check request header has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token not found"});
    //Extract jwt token from the request header 
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});

    try {
        //jwt Token verification
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //Attach the user information to request object 
        req.user = decoded
        next();
    
        //req.user ko koi bhi variable name de sakte ahin ye hmm pe depend karta hai
        //req.EncodedData ,req.userData or any other names prefer as per our specification


        
    } catch (error) {
        console.error(error);
        res.status(401).json({error:"Invalid Token"})
        
    }
}

//Function to genrate the jwt token
const generateToken = function(userData) {
    //Generate a new jwt token using a user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3600})

}

module.exports = {jwtAuthMiddleware,generateToken}