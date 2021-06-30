var userModel = require("../models/users");
var jwtServices = require("../services/jwt");

var checkErrors = (err) => {
    let errors = {};

    if (err.code === 11000) {
        duplicateKeys = Object.keys(err.keyPattern);
        duplicateKeys.forEach((key) => {
            errors[key] = "already registered";
        })
        return errors;
    }

    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.getHome = async(req, res)=>{
    res.render('index')
}
module.exports.getRegister = async(req, res)=>{
    res.render('register' , {error : ""})
}
module.exports.getLogin = async(req, res)=>{
    res.render('login' , {error : ""})
}
module.exports.postRegister = async (req, res) => {
    try {
        const user = await userModel.create({...req.body  , "name" : req.body.firstName +" " + req.body.lastName});
        const response = {
            "status": user.email + " is Registered successfully .",
        }
        return res.json(response).status(201);
    } catch (error) {
        const message = checkErrors(error);
        const key = Object.keys(message)[0]
        const value = Object.values(message)[0]
        
        res.render('register' , {error : key+" "+value}) ;
    }
}
module.exports.postLogin = async (req, res) => {
    const { email , password } = req.body;
    try {
        const user = await userModel.login(email , password );
        const token = await jwtServices.createToken(user._id);
        const refreshToken = await jwtServices.createRefreshToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.cookie('refreshJwt', refreshToken, { httpOnly: true })
        const response = {
            "status": user.email+ " is logged in successfully .",
            "token" : token ,
            "refreshToken" : refreshToken
        }
        res.json(response).status(200);
    } catch (error) {  
        res.render('login' , {error : error.message }) ;
    }
}
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('refreshJwt', '', { maxAge: 1 });
    res.json({ "Msg ": "Logout successfully" }).status(200)
}
module.exports.test = async (req ,res)=>{
    res.json(req.user);
}




















