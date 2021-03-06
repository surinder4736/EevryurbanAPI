import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as config from '../constants';
import { Models, sequelize } from '../models';
import { tokenSecret } from '../constants';
import moment, { now } from 'moment';
import { throws } from 'assert';
import { privateLocalAddress,hostName } from '../../../config/app';
const User = Models.User;
const UserProfile = Models.UserProfile;
const TableCode = Models.tableCode;

import Axios from 'axios';
//const OTPSchema = Models.OTPSchema;
import Promise from 'bluebird';
import bcryptNode from 'bcrypt-nodejs';
import { get } from 'http';
const bcrypt = Promise.promisifyAll(bcryptNode);
/**
 * POST /login
 */
export function login(req, res, next) {
  try{
  let token = null;
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      console.log("UID:"+user.email)
      return res.sendStatus(401);
      
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      console.log("UID:"+user.unique_userid);
      User.update({last_login:sequelize.fn('NOW')},{where : { id:user.id}});
          token = jwt.sign({id:user.id}, tokenSecret, { expiresIn: 86400 });
          return res.status(200).send({ auth: true, email: user.email, name: user.first_name, unique_userid:user.unique_userid,is_email_verified:user.is_email_verified,random_id:user.random_id,role_type:user.role_type, access_token: token,id:user.id,isadmin:user.isadmin,code:user.code });
         // return res.sendStatus(200);
    });
  })(req, res, next);
}catch(error){
  return res.status(500).send(error);
}
}

/**
 * POST /logout
 */
export function logout(req, res) {
  try{
  req.logout();
  res.sendStatus(200);
  }catch(error){
    return res.status(500).send(error);
  }
}

/**
 * POST /signup
 * Create a new local account
 */

 // get date,month and year
 function formatDate()
{
	 var d=new Date();
    //get the month
    var month = d.getMonth();
    //get the day
    //convert day to string
    var day = d.getDate().toString();
    //get the year
    var year = d.getFullYear();
    
    //pull the last two digits of the year
    year = year.toString().substr(-2);
    
    //increment month by 1 since it is 0 indexed
    //converts month to a string
    month = (month + 1).toString();

    //if month is 1-9 pad right with a 0 for two digits
    if (month.length === 1)
    {
        month = "0" + month;
    }

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length === 1)
    {
        day = "0" + day;
    }

    //return the string "MMddyy"
    return month + day + year;
}


export function signUp(req, res, next) {
  try{
  let token = '';
  let dateFormate=formatDate();

  const {
user_name, email, password, name, last_name, is_active,
    secure_token, is_email_verified, phone_number, is_phone_verified,
    reset_password_token, reset_password_expires,
    isadmin,unique_userid,role_type,terms_condition,code
} = req.body;
// get max id from user table
let maxId=0;
console.log("Refferl code : "+code);
// date(column): sequelize.fn('currdate')
User.max('serial_no',{where:sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', sequelize.fn('date', new Date()))}).then(function(getID){
  // User.max('serial_no',{where:sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),sequelize.fn('date', new Date()))}).then(function(getID){  
  if(Number.isNaN(getID)){
    maxId="0"+1;
    console.log("Coming ID:"+getID);
    console.log("GET MAXID:"+maxId);
  }else{
    if(getID<10){
      if(getID==9){
        maxId=(getID+1);
      }
      else{
        maxId="0"+(getID+1);
      }
      console.log("Coming ID:"+getID);
      console.log("GET MAXID:"+maxId);
    }else{
      maxId=getID+1;
      console.log("Coming ID:"+getID);
    console.log("GET MAXID:"+maxId);
    }
  } 
  }).catch((error)=>{
    return res.status(500).send("Something went wrong"+error);
  });
  if(maxId==0){
    maxId="0"+1;
  }
  // find the user if exist then can not be signup..
  User.findOne({ where: { email:sequelize.where(sequelize.fn('LOWER', sequelize.col('email')),sequelize.fn('LOWER', email)) } }).then((existingUser) => {
    if (existingUser) {
      console.log("User Already exist")
      return res.status(409).send({errorMessage: 'Sorry this user already exist',statusCode:409,existMsg:'Exist'});
    }
    const user = User.build({
      user_name: email,
      email,
      password,
      unique_userid:dateFormate+maxId,
      role_type:role_type,
      terms_condition:terms_condition,
      is_email_verified:false,
      isadmin: false,
      createdAt: new Date(),
      serial_no:maxId,
      code:code
    });
    if(code!="" && code!=null && code!=undefined){
      TableCode.findOne({where:{code:sequelize.where(sequelize.fn('LOWER', sequelize.col('code')),sequelize.fn('LOWER', code))}})
      .then((codeResult)=>{
        if(codeResult){
          //console.log(codeResult);
          return user.save().then(() => {
            req.logIn(user, (err) => {
              if (err){
                return res.sendStatus(401);
              } else{
                UserProfile.create({about:'', photo:'', country:'',address:'',firstName:'',lastName:'',portfolio:'',isStudent:false,isCompleted:false,
                userId:user.id }).then(profile => {console.log("profile created"); });
                token = jwt.sign({ id: user.id }, tokenSecret, { expiresIn: 86400 });
                console.log("Email Api Call");
                console.log("Get Token:"+token);
                Axios.post(privateLocalAddress+'/api/sendSignUpEmail', {email:user.email}).then((response)=>{
                  console.log('Sent email verification');
                 }).catch((err) => {
                  console.log('Error in sending Email');
                });
                return res.status(200).send({ auth: true, email: user.email, name: user.first_name, company_name: user.company_name, access_token: token,success_msg:'OK',statusCode:200,is_email_verified:user.is_email_verified,unique_userid:user.unique_userid,random_id:user.random_id,role_type:user.role_type,code:code });
              }
              });
          });
        }else{
          return res.status(404).send({errorMessage:'Invalid Referral Code',codeExcute:'Invalid',status:404})
        }
      }).catch((error)=>{
        return res.status(501).send({errorMessage:error,status:501})
      })
    }
    else{
      //console.log(codeResult);
      return user.save().then(() => {
        req.logIn(user, (err) => {
          if (err){
            return res.sendStatus(401);
          } else{
            UserProfile.create({about:'', photo:'', country:'',address:'',firstName:'',lastName:'',portfolio:'',isStudent:false,isCompleted:false,
            userId:user.id }).then(profile => {console.log("profile created"); });
            token = jwt.sign({ id: user.id }, tokenSecret, { expiresIn: 86400 });
            console.log("Email Api Call");
            console.log("Get Token:"+token);
            Axios.post(privateLocalAddress+'/api/sendSignUpEmail', {email:user.email}).then((response)=>{
              console.log('Sent email verification');
             }).catch((err) => {
              console.log('Error in sending Email');
            });
            return res.status(200).send({ auth: true, email: user.email, name: user.first_name, company_name: user.company_name, access_token: token,success_msg:'OK',statusCode:200,is_email_verified:user.is_email_verified,unique_userid:user.unique_userid,random_id:user.random_id,role_type:user.role_type,code:code });
          }
          });
      }).catch((error)=>{
        return res.status(501).send({errorMessage:error,status:501})
      });
    }
  }).catch(err => next(err));
}catch(error){
  return res.status(500).send({errorMessage:error.message});
}
}

//Random Alfanumeric 10 digit

function randomID(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


//Email Verify
 export function emailVerify(req,res,next){
   try {
     const{email}=req.body;
     User.findOne({where:{email}}).then((getUser)=>{
       if(getUser!=null && getUser.is_email_verified=="false"){
        const RID=randomID(15);
        User.update({is_email_verified:true,random_id:RID},{where : { email: email}}).then((result)=>{
          console.log("send verifiy success"+result)
          //api
          User.findOne({where : { email }}).then((user)=>{
            Axios.post(privateLocalAddress+'/api/successConfimation', {email:email,unique_userid:user.unique_userid,random_id:RID,role_type:user.role_type}).then((response)=>{
              console.log('Sent email verification');
             }).catch((err) => {
              logger.error(err.stack);
              console.log('Error in sending Email');
            });
          })
          res.status(200).send({successMsg:"Email Verified successfully",status:200,user:getUser});
         });
       }else{
            res.status(200).send({error:"AlreadyVerified",massageStaus:500,user:getUser});
       }
     })
     console.log("Param Email:"+email);
     //const userId="";
     
   } catch (error) {
    res.status(500).send('We failed to save for some reason'+error);
   }
   
 }

/**
 * @api {get} /api/user/verifyotp OTP Verification
 * @apiName VerifyOTP
 * @apiGroup User
 * @apiParam {String} email require OTP to verify email.
 * @apiParam {String} otp require recent OTP sent on email.
 * @apiDescription This API is created to validate OTP sent on email address.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 NotFound
 */
export function verifyOTP(req, res) {
  try {
    
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() - 5);
    OTPSchema.findAndCount({
      where: {
        otp: req.body.otp,
        email: req.body.email,
        createdAt: {
          [sequelize.Op.lt]: sequelize.fn('NOW'),
          [sequelize.Op.gt]:  sequelize.literal("NOW() - interval '5 minute'")
        }
      }
    }).then((d) => {
      if (d.count > 0) {
        return res.status(200).send({successMessage: 'OTP confirmed', status: 200});
      }
      return res.status(404).send({errorMessage: 'Invalid code provided', status: 404});
    }).catch((err) => {
      return res.status(404).send({errorMessage: 'Invalid code provided', status: 404});
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Unable to process request.Plese try again after some time', data: e
    });
  }
}

export function recoveryPasswordVerifyOTP(req, res) {
  try {
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() - 5);
    OTPSchema.findAndCount({
      where: {
        otp: req.body.otp,
        email: req.body.email,
        createdAt: {
          [sequelize.Op.lt]: sequelize.fn('NOW'),
          [sequelize.Op.gt]:  sequelize.literal("NOW() - interval '5 minute'")
        }
      }
    }).then((d) => {
      if (d.count > 0) {
        return res.status(200).send({successMessage: 'OTP confirmed', status: 200});
      }
      return res.status(404).send({errorMessage: 'Invalid code provided', status: 404});
    }).catch((err) => {
      return res.status(404).send({errorMessage: 'Invalid code provided', status: 404});
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Unable to process request.Plese try again after some time', data: e
    });
  }
}

export function resetPasswordRequest(req, res) {
    try {
      const{email}=req.body;
     User.findOne({where: { email }}).then((user)=>{
      if(user){
       Axios.post(privateLocalAddress+'/api/resetPassword', {email:email,unique_userid:user.unique_userid}).then((response)=>{
          console.log('Sent email for reset password');
         }).catch((err) => {
          logger.error(err.stack);
          console.log('Error in sending Email');
        });
       res.status(200).send({successMsg:"Email successfully sent",status:200,statusCode:'ResetPassword'});
      }else{
        res.status(404).send({errorMsg:"User email not exist",status:404,statusCode:'NOTEXIST'});
      }
     }).catch((err)=>{
      return res.status(505).send({errorMessage: err.message, status: 404});
     })
    } catch (error) {
     console.log(error);
    }
  }

export function changePassword(req, res) {
  try {
    
    const dt = new Date();
    const data = req.body;
    console.log('Get user API call');
        User.findOne({ where: { unique_userid:data.unique_userid }}).then((existingUser) => {
          if (existingUser) {
            //existingUser.set('passsword',data.password);
            bcrypt.genSaltAsync(5).then(salt =>
              bcrypt.hashAsync(data.password, salt, null).then((hash) => {
                data.password = hash;
                User.update(data,{where: {id:existingUser.id}}).then((uc) => {
                  console.log('response change password api');
                  console.log(uc);
                  return res.status(200).send({successMessage: 'Password has been changed', status: 200,statusCode:'ChangePassword'});
                }).catch((err) => {
                  console.log(err);
                  return res.status(404).send({errorMessage: err.message, status: 404,statusCode:'NOTEXIST'});
                });
            }));
          }
          else{
            return res.status(404).send({errorMessage: 'User not found', status: 404});
          }
        }).catch((err) => {
          return res.status(404).send({errorMessage: err.message, status: 404});
        });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Unable to process request.Plese try again after some time', data: e
    });
  }
}

/**
 * @api {post} /api/user/validateToken Invite users.
 * @apiName ValidateToken
 * @apiGroup User
 * @apiHeader {String} x-access-token require latest acces token.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Error
 *     HTTP/1.1 401 Error Access Denied
 */
export function validateToken(req, res) {
  try {
    console.log(req.user);
    console.log(req.isAuthenticated());
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.',dt: new Date() });
    }

    jwt.verify(token, config.tokenSecret, (e, decoded) => {
      if (e) {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.',dt: new Date() });
      }
      else{
        return res.status(200).send({auth:true,message:'Token is valid',dt: new Date()});
      }});
  } catch (error) {
    return res.status(500).send(error);
  }
}

//Find Admin UserList Data
export function getUserList(req,res){
  try {
    User.findAll({include:[{model:UserProfile}],order:[['id','DESC']]}).then((userData)=>{
      if(userData){
        return res.status(200).send({user:userData});
      }else{
        return res.status(404).send({errorMessage:'Data not found'});
      }
    })
  } catch (error) {
    return res.status(500).send({error:error});
  }
}

export function deleteuser(req, res) {
  User.findOne({ where: { unique_userid:req.params.id }}).then((existingUser)=>{
    if(existingUser){
      existingUser.destroy().then(()=>
      User.findAll({include:[{model:UserProfile}],order:[['id','DESC']]}).then((userData)=>{
        if(userData){
          return res.status(200).send({user:userData});
        }else{
          return res.status(404).send({errorMessage:'Data not found'});
        }
        })
      )
    }
  })
    
}

//Email Verify
export function resendEmailVerify(req,res,next){
  try {
    const{email}=req.body;
    User.findOne({where:{email}}).then((getUser)=>{
      if(getUser!=null && getUser.is_email_verified=="false"){
        Axios.post(privateLocalAddress+'/api/sendSignUpEmail', {email:getUser.email}).then((response)=>{
          console.log('Re-Sent email verification');
          res.status(200).send({successMsg:"Email resend successfully",status:200,user:getUser});
         }).catch((err) => {
          console.log('Error in sending Email');
        });
      }else{
           res.status(200).send({error:"AlreadyVerified",massageStaus:500,user:getUser});
      }
    })
    console.log("Param Email:"+email);
    //const userId="";
    
  } catch (error) {
   res.status(500).send('We failed to save for some reason'+error);
  }
  
}

export function modifyStatus(req,res,){
  // cosnole.log();
  User.findOne({id:req.params.userId})
  .then((data) => {
    User.update({is_email_verified:req.body.status},{where : { id:req.params.userId}})
  .then((updatedLanguage) => {
      res.status(200).send({
      message: ' updated successfully'})
  })
  .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
  
}

export default {
  login,
  logout,
  signUp,
  verifyOTP,
  changePassword,
  recoveryPasswordVerifyOTP,
  validateToken,
  emailVerify,
  resetPasswordRequest,
  getUserList,
  deleteuser,
  resendEmailVerify,
  modifyStatus
};
