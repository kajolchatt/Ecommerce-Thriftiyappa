const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("./asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  //Read the JWT from 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized, no token" });
  }
});

//check for admin if the user is admin

const authorizeAdmin=(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send("not authorized as an admin")
    }
}
module.exports={authenticate:authenticate,authorizeAdmin:authorizeAdmin}