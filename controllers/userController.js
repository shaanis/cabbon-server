const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
exports.loginUserController=async(req,res)=>{
    console.log("inside loginUserController");
    const {email,password}=req.body 
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
          res.status(200).json({user:existingUser,token})
        }else{
            res.status(401).json("No user Found!!")
        }
    } catch (e) {
        res.status(401).json(e)
    }
}