const users=require('../model/usermodel')
const jwt = require('jsonwebtoken')
//to register
exports.register=async(req,res)=>{
const{username,email,password}=req.body 
console.log(username,email,password);
try {
    const existinguser= await users.findOne({email})
    if(existinguser){
        res.status(406).json('user already exists')
    }else{
        const newUser = new users({
            username,email,password
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    
} catch (error) {
    res.status(401).json(`req failed due to ${error}`)
    
}
 }


 //to login

 exports.login=async(req,res)=>{
    const{email,password}=req.body
    console.log(email,password);

    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userid:existingUser._id},'SecretKey')
            res.status(200).json({token,existingUser})

        }
        
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
 }