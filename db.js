const mongoose=require('mongoose')
require('dotenv').config()
const connection=async()=>{
try {

    await mongoose.connect(process.env.URI)
    console.log('connect to the DB')
} catch (error) {
    console.log(error,"could not connect to the DB")
}
}
module.exports=connection;