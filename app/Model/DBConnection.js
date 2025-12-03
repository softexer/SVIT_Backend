const mongoose = require('mongoose');
const config = require('../Configfiles/config.json');
var dbConnection = {
  connectToDB: function connectWithDatabase() {
    ////console.log"Called Database connection");
    mongoose.set('strictQuery', true);
    //mongoose.set('useCreateIndex', true);
    mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {  
      console.log("Mongodb is Connected");
    });
  }
}
module.exports = dbConnection;


