const express = require('express');
const Users = require('../models/usersModels');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();
const {userValidationSchema,loginValidationSchema} = require('../utils/validation');

// Register New User
const registerUser = async(req,res)=>{
    try{
        const{error} = userValidationSchema.validate(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const user = req.body ;
        user.password = await bcrypt.hash(user.password,10); // hashing password
        const newUser = await Users.create(user);
        return res.status(201).json(
            {message:"User registered successfully",user:newUser}
        );
    }catch(error){
        return  res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

// Login User 

const loginUser = async(req,res)=>{
    try{
        const{error} = loginValidationSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                message:error.details[0].message
            })
        }
        const{email,password} = req.body; 
        const user = await Users.findOne({
            email:email
        })
        if(!user){
            return res.status(401).json({
                 message:"User Not Found"
             })
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
        const token  = jwt.sign({id:user.id,name:user.name},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })
        return res.status(200).json({
            message: "Login Succesful",
            token :token
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}