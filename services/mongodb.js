const mongoose = require('mongoose');
const configs = require('../config.json');
 

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect("mongodb://localhost:27017/chatApp",
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
