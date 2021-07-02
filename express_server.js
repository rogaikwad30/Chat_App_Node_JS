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
var path = require('path') ;
var bodyParser = require('body-parser') ;
var app  = express();
var urlBodyEncoder = bodyParser.urlencoded({extended:false});
var authHandlers = require('./controllers/auth_handlers');
var mongodb = require('./services/mongodb');
var loginMiddleware = require('./services/jwt').verifyToken;
app.use(bodyParser.json())  
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', urlBodyEncoder , authHandlers.getHome )
app.get('/login', urlBodyEncoder , authHandlers.getLogin )
app.post('/login'    , urlBodyEncoder , authHandlers.postLogin )
app.get('/register', urlBodyEncoder , authHandlers.getRegister ) 
app.post('/register' , urlBodyEncoder , authHandlers.postRegister )
app.get('/dashBoard', urlBodyEncoder ,  loginMiddleware , authHandlers.getDashBoard)
app.post('/logout'   , urlBodyEncoder , loginMiddleware , authHandlers.logout );
app.post('/test'     , urlBodyEncoder , loginMiddleware , authHandlers.test );

app.get('/search-user/:id' , urlBodyEncoder , authHandlers.searchUser)

var server = app.listen(8000);
console.log("Server running");


var socket = require('socket.io');
 
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection : ', socket.id);
     
    socket.on('chat', function(data){
        io.sockets.emit('chat', data); 
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect' , ()=>{
        console.log('disconnected : ', socket.id);
    })
});
