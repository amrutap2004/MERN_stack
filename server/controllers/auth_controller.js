const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model");

// ______________
// HOME LOGIC
//_______________

const home = async (req , res) =>{
    try{
        res.status(200).send("Welcome to website");
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
}

// ______________
// REGISTER LOGIC
//_______________

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


// ______________
// Login LOGIC
//_______________

const login = async (req , res)=>{
    try{
        const { email , password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).send({message : "User does not exist"});
        }

        //const user = await bcrypt.compare(password , userExist.password);
        const user = await userExist.comparePassword(password);

        if(user){
            res.status(200).send({
                message : "Login successful" , 
                token : await userExist.generateToken() , 
                userid : userExist._id.toString()});
        }
        else{
            res.status(400).send({message : "Invalid credentials"});
        }
    }
    catch(error){
        res.status(500).send({message : error.message});
    }
}

module.exports = { home , register , login};