const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Users = require('../models/usersModels');

const verifyJwtToken = async(req,res,next)=>{
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
    }catch(error){
        return res.status(410).json({messgae:"Invalid JWT token"})
    }
}

module.exports = verifyJwtToken; 

