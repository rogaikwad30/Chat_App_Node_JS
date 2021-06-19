const mongoose = require('mongoose');
const configs = require('../config.json');
 

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect("mongodb+srv://rohan:rohan@cluster0.fredc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then(() => {
         console.log('Database connection successful')
       })
       .catch((err) => {
         console.log('Database connection error : '+ err.message) 
       })
  }
}

module.exports = new Database()