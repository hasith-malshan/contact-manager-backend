const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async (req, res, next)=>{
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }

           req.user = decoded.user;
           next();

           if(!token){
            res.status(401);
            throw new Error("Token is missing");
           }
        });
    }
});

module.exports = validateToken;