const sendEmail=require('../utils/sendEmail');
const Joi=require('joi')
const crypto=require('crypto')
const express=require('express');
const { User } = require('../models/user');
const Token = require('../models/token')
const router=express.Router();
router.post("/",async(req,res)=>{
    try {
        //create a email validation schema using Joi
        const schema=Joi.object({
            email:Joi.string().email().required()
        })
        //check request email validation
        const {error}=schema.validate(req.body)
        //if error then send status 400 with error message
        if(error)return res.status(400).send(error.details[0].message)
        //find user in DB
        const user=await User.findOne({email:req.body.email})
        //user not exist then send status 400 with error message
        if(!user)return res.status(400).send("user does not exist")
        //check already token create or not
        let token=await Token.findOne({userId:user._id});
        //create a token and save it to the token collection
        if(!token){
            token=await Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString('hex'), 
            }).save()
        }
        //create a base url link for the reset password
        const link=`${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        //this link send to the email
        await sendEmail(user.email,"password reset",link);
        //email send response
        res.send("password reset link sent to your email account.")
    } catch (error) {
        res.send("An error occured")
        console.log(error)
    }
});


router.post("/:userId/:token",async(req,res)=>{
    try {
       const schema=Joi.object({password:Joi.string().required()}) 
       const {error}=schema.validate(req.body)
       if(error)return res.status(400).send(error.details[0].message)
       const user=await User.findById(req.params.userId)
       if(!user)return res.status(400).send('Invalid link or expired.')
    const token=await Token.findOne({
        userId:user._id,
        token:req.params.token
    });
    if(!token)return res.status(400).send("Invalid link or expired.")
    user.password=req.body.password
    await user.save();
    await token.delete();
    res.send("password reset successfully")
    } 
    catch (error) {
      res.send("An error occured") 
      console.log(error) 
    }
})


module.exports=router;
