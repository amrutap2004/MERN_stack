const express = require("express");

const User = require("../models/user-model");

const home = async (req , res) =>{
    try{
        res.status(200).send("Welcome to website");
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
}

const register = async (req , res) =>{

    try{
        const {username , email , phone , password} = req.body;

        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(400).send({message : "User already exists"});
        }

    
        const userCreated = await User.create({ username ,
            email,
            phone ,
            password
        });

        res.status(200).send({message : "Registration successful" , token : await userCreated.generateToken() , userid : userCreated._id.toString()});
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
}

module.exports = { home , register };