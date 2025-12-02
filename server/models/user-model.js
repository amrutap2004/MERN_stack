const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    isAdmin:{
        type:Boolean,
        default:false, 
    }
});

userSchema.pre('save',async function(next){

    const user = this;

    if(!user.isModified('password')){
        return next();
    }

    //hash Password
    try{
        const saltRounds = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password , saltRounds);
        user.password = hashPassword;
    }
    catch(err){
        console.log("Error in hashing password", err);
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (passsword){
    return bcrypt.compare(password , this.password);
}

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({_id : this._id ,email : this.email , isAdmin : this.isAdmin} , process.env.JWT_SECRET , {expiresIn :"30d"});
    }
    catch(err){
        console.error("Error in generating token" , err);
    }
};

const User = mongoose.model("User" , userSchema);

module.exports = User;