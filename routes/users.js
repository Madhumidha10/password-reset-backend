const {User,validate}=require('../models/user')
const express=require('express')
const router=express.Router();
//create a register user info
router.post("/",async(req,res)=>{
    try {
        const {error}=validate(res.body)//check user validation schema
        if(error)return re.status(400).send(error.details[0].message);//if error
        const user=await new User(req.body).save();//else store to the user collection
        res.send(user);//response send the new user info
    } catch (error) {
        res.send("An error occured")
        console.log(error)
    }
})
//check email and password or correct
router.get("/:email/:pwd",async(req,res)=>{
    try {
      const user=await User.findOne({email:req.params.email})//find email id in the user collection
      if(user.password===req.params.pwd) res.send(true)//correct auth info send true
      else res.send(false)//wrong auth send false
    } catch (error) {
        res.send("An error occured")
        console.log(error)
    }
})
module.exports=router