 const mailer = require('express-mailer');

 import {hostName } from '../config/app';
const envVars = require('../config/env');
 import path from 'path';
 import { Models, sequelize } from '../db/sequelize/models';
// Setting up Mail propertites to sending mail.
  module.exports = (app, db) => {
    if(envVars.SMTP_USERNAME==''){
      mailer.extend(app, {
        from: envVars.SMTP_FROM,
        host: envVars.SMTP_HOST,
        secureConnection: envVars.SMTP_SECURE,
        port: envVars.SMTP_PORT,
        transportMethod: 'SMTP'
      });
    } else {
      mailer.extend(app, {
        from: envVars.SMTP_FROM,
        host: envVars.SMTP_HOST,
        secureConnection: envVars.SMTP_SECURE,
        port: envVars.SMTP_PORT,
        transportMethod: 'SMTP',  
        auth: {
         user: envVars.SMTP_USERNAME,
         pass: envVars.SMTP_PASSWORD
        }
      });
    }
    
console.log(envVars);
// Configure the path of email template
app.set('views', path.dirname('../') + '/views');
app.set('view engine', 'jade');



// Send Mail Against when After SignUp to verify email..
app.post('/api/sendSignUpEmail', (req, res, next) => {
  const{email}=req.body;
  console.log(req.body.email);
  const confirmEmailUrl=`users/verifysuccess/${email}`;
    app.mailer.send('email', {
    to: email,
    subject: 'EveryUrban-Confirm your Email',
    data:{greet:"Hi!"+" "+email,hostName:hostName,emailConfirmUrl:confirmEmailUrl}
  }, (err) => {
    if (err) {
      res.send({errorMessage:'There was an error sending the email',errorInfo:err});
      return;
    }
    res.send({successMessage:'Email has been sent',status:200});
  });
});



// Send Mail After confirming email and random profile_id and stored in database
app.post('/api/successConfimation', (req, res, next) => {
  const{email,unique_userid,random_id,role_type}=req.body;
  let developerMsg="Someone will get in touch with you soon."; 
  let architectMsg="To start recieving projects,please complete your profile.";
  let emailMsg=(role_type=="developer") ? developerMsg : architectMsg;
  const randomProfileUrl=(role_type=="developer") ? `${hostName}/developer` : `${hostName}/profile/${unique_userid}/${random_id}`;
    app.mailer.send('emailVerificationSuccess', {
    to: email,
    subject: `EveryUrban-Email successfully validated`,
    data:{profileUrl:randomProfileUrl,Message:emailMsg}
  }, (err) => {
    if (err) {
      res.send({errorMessage:'There was an error sending the email',errorInfo:err});
      return;
    }
    res.send({successMessage:'Email has been sent',status:200});
  });
});



//Send Mail against Reset Password mail confirmation
app.post('/api/resetPassword', (req, res, next) => {
  const{email,unique_userid}=req.body;
  const resetUrl=`${hostName}/resetpassword/${unique_userid}`;
    app.mailer.send('resetPassword', {
    to: email,
    subject: `EveryUrban-Reset your password`,
    data:{resetUrl:resetUrl}
  }, (err) => {
    if (err) {
      res.send({errorMessage:'There was an error sending the email',errorInfo:err});
      return;
    }
    res.send({successMessage:'Email has been sent',status:200});
  });
});


// Send Mail Against when After ContactUs..
app.post('/api/sendContactusEmail', (req, res, next) => {
  const{fname,lname,email,enquiry_type,message,contactus}=req.body;
  console.log(req.body.email);
    app.mailer.send('contactus', {
    to: contactus,
    subject: `Contact Us - ${enquiry_type}`,
    data:{fname:fname,lname:lname,email:email,enquiry_type:enquiry_type,message:message}
  }, (err) => {
    if (err) {
      res.send({errorMessage:'There was an error sending the email',errorInfo:err});
      return;
    }
    res.send({successMessage:'Email has been sent',status:200});
  });
});

};





