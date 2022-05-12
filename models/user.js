
const mongoose=require('mongoose')
const Joi=require('joi')
//create a userSchema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//create a model and create a user collection 
const User=mongoose.model('user',userSchema)
//Joi using validation check
const validate=(user)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),

})
return schema.validate(user)//return the validation 
}

module.exports={User,validate}