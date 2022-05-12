const nodemailer=require('nodemailer')

//email send function 
module.exports=async(email,subject,text)=>
{
    try {
        //create gmail transport based on my auth username and password
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });

          //create a compose mail content
          var composeMail = {
            from: process.env.USER,//my user name
            to: email,//email send to 
            subject:subject,//subject of the mail
            html:`<html lang="en"><head>
                    <title>Reset Notification</title>
            </head>
            <body>
                <h1>PASSWORD RESET REQUEST</h1>
                <p>Dear PassReset User,</p>
            
                <p>We have received your request to reset your password. Please click the link below to complete the reset:</p>
                <a href="${text}">Reset My Password</a>
                <h5>Thanks & Regards,</h5>
                <h4>PassReset Team</h4>
            </body>
            </html>`//content of the mail
          };
          //sendMail function
         await transport.sendMail(composeMail, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }})
        
    } catch (error) {
        console.log(error,'Email not Sent')
    }
}