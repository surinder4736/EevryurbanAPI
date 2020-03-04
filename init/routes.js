/**
 * Routes for express app
 */
import passport from 'passport';
var multer  = require('multer');
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const userExperiance = controllers && controllers.userExperiance;
const UserLanguage = controllers && controllers.userLanguages;
const userProfile = controllers && controllers.userProfile;
const userEducation = controllers && controllers.userEducation;
const tableCode = controllers && controllers.tableCode;
const contactUs = controllers && controllers.contactUs;



var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({storage: storage});

export default (app) => {


  // user routes
  if (usersController) {
    app.post('/api/sessions', usersController.login);
    app.post('/api/users', usersController.signUp);
    app.delete('/api/sessionsExpired', usersController.logout);
    app.post('/api/user/verifyEmail', usersController.emailVerify);
    app.post('/api/resetPasswordRequest', usersController.resetPasswordRequest);
    app.post('/api/user/changePassword', usersController.changePassword);
    app.get('/api/user/validateToken',usersController.validateToken);
    app.get('/api/user/userList',usersController.getUserList);
    
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if(UserLanguage) {
    app.post('/api/users/:userId/language', UserLanguage.create); // API route for user to create a book
    app.put('/api/users/:userId/:id/language', UserLanguage.modify);
    app.delete('/api/users/:userid/:id/language', UserLanguage.delete);
    app.get('/api/users/:userid/languages', UserLanguage.list);
  }
  if(userExperiance) {
    app.post('/api/users/:userId/experiance', userExperiance.create); // API route for user to create a book
    app.put('/api/users/:userId/:id/experiance', userExperiance.modify);
    app.delete('/api/users/:userid/:id/experiance', userExperiance.delete);
    app.get('/api/users/:userid/experiance', userExperiance.list);
  }
  if(userProfile) {
    app.post('/api/users/:userId/profile', userProfile.create); // API route for user to create a book
    app.put('/api/users/:userId/:id/profile', userProfile.modify);
    app.delete('/api/users/:userid/:id/profile', userProfile.delete);
    app.get('/api/users/:userid/profile', userProfile.list);
    app.get('/api/users/:userid/completeprofile', userProfile.fetchCompleteProfile);
    app.post('/api/users/:userid/:id/upload',upload.single('file'), userProfile.changePhoto);
  }
  if(userEducation) {
    app.post('/api/users/:userId/education', userEducation.create); // API route for user to create a book
    app.put('/api/users/:userId/:id/education', userEducation.modify);
    app.delete('/api/users/:userid/:id/education', userEducation.delete);
    app.get('/api/users/:userid/education', userEducation.list);
  }

  if(tableCode) {
    app.post('/api/code/saveCode', tableCode.create); // API route for user to create a book
    app.post('/api/code/modifyCode', tableCode.modifyCode);
    app.delete('/api/code/deleteCod/:id', tableCode.deleteCode);
    app.get('/api/code/getAll', tableCode.getCodeList);
  }

  if(contactUs) {
    app.post('/api/contactus/save', contactUs.create); // API route for user to create a book
    
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      }));
  }
};
