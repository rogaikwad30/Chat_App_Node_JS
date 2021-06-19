// express js based server
/**
 * This code contains a Rest API and socket integration
 * Rest API is used by mobile app, web client etc UIs
 * mqtt is used by NodeMCUs
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
var urlBodyEncoder = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json())  
var userHandlers = require('./controllers/users');
var mongodb = require('./services/mongodb');
 
app.post('/register' , urlBodyEncoder , userHandlers.register );
app.post('/login' , urlBodyEncoder , userHandlers.login );

var server = app.listen(8000);
console.log("Server running");
module.exports = app;
