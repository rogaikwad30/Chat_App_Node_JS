var userModel = require("../models/users");


var checkErrors = (err) => {
    let errors = {};

    if (err.code === 11000) {
        duplicateKeys = Object.keys(err.keyPattern);
        duplicateKeys.forEach((key) => {
            errors[key] = "Already registered";
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

 
module.exports.register = async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        const response = {
            "status": user.username + " is Registered successfully .",
        }
        return res.json(response).status(201);
    } catch (error) {
        const message = checkErrors(error);
        res.json(message).status(409);
    }
}


module.exports.login = async (req, res) => {
    const { username , password } = req.body;
    try {
        const user = await userModel.login(username , password );
        const response = {
            "status": user.username + " is logged in successfully .",
        }
        res.json(response).status(200);
    } catch (error) { 
        res.status(400).json({"Error":error.message});
    }
}

























