const mongoose=require('mongoose')
const Schema=mongoose.Schema;
//create a token schema
const tokenSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true  
    },
    CreatedAt:{
        type:Date,
        default:Date.now,
        expires:3600//onehour
    }
});
//token stored in token collection
module.exports=mongoose.model("token",tokenSchema)