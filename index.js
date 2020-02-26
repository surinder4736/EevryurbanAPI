require('@google-cloud/debug-agent').start();
import express from 'express';
import { isDebug } from './config/app';
import { connect } from './db';
import cors  from 'cors';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';
// import initFileOperation from './init/fileOperation';
import errorHandler from  'express-error-handler';
var enableWs =require('express-ws');
const app = express();
enableWs(app);

// var expressWs = require('express-ws')(app);
//expressWs(app);
app.use(errorHandler({ dumpExceptions: true, showStack: true })); 

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();
//app.options('*', cors()); // include before other routes
app.use(cors());
/*
 * REMOVE if you do not need passport configuration
 */
initPassport();



/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
* This is where the files magic happens. We take files 
* from server and perform action as per defined in rule
*/
//initFileOperation(app);
/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
//app.get('*', renderMiddleware);


app.listen(app.get('port'));


