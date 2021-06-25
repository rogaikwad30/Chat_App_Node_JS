const mongoose  = require("mongoose")
const bcryptjs = require('bcryptjs')

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: {unique: true}
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: {unique: true}
    },
    password: {
        type: String, 
        required: [true, "can't be blank"], 
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'is invalid'],
        minLength : [5 , 'password must be at least 5 characters long']
    }
})

   
UserSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ "username" :  username });
    if (user) {
      const auth = await bcryptjs.compareSync(password , user.password)
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect username');
};



UserSchema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
});


let UserModel =  mongoose.model("users", UserSchema)
module.exports = UserModel;











