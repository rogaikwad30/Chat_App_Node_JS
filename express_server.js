// express js based server
/**
 * This code contains a Rest API and socket integration
 * Rest API is used by mobile app, web client etc UIs 
 *
 * PORTS
 * Rest API - 8000
 *
 * @author - Rohan Gaikwad
 * @created_on - 19th June 2021
 */
var express = require('express') ;
var bodyParser = require('body-parser') ;
var app  = express();
var urlBodyEncoder = bodyParser.urlencoded({extended:false});
var userHandlers = require('./controllers/users');
var mongodb = require('./services/mongodb');
var loginMiddleware = require('./services/jwt').verifyToken;

app.use(bodyParser.json())  
 
app.post('/register' , urlBodyEncoder , userHandlers.register );
app.post('/login'    , urlBodyEncoder , userHandlers.login );
app.post('/logout'   , urlBodyEncoder , loginMiddleware , userHandlers.logout );
app.post('/test'     , urlBodyEncoder , loginMiddleware , userHandlers.test );


var server = app.listen(8000);
console.log("Server running");
module.exports = app;
