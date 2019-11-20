/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
const usersController = controllers && controllers.users;

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
  } else {
    console.warn(unsupportedMessage('users routes'));
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
