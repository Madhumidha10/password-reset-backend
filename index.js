//imports the required packages
const express = require('express')
//create a mongodb connection
const connection=require('./db')
connection();
//create a app
const app = express()
//import the dotenv congig
require('dotenv').config()
//assign port number
const port = process.env.PORT
//import and use cors 
const cors=require('cors')
app.use(cors());
//imports the router api
const passwordReset=require("./routes/passwordReset")
const users=require("./routes/users")
//app use body parser 
app.use(express.json())
//declare the route path
app.use("/api/users",users)
app.use("/api/password-reset",passwordReset)
//create a listening port 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))