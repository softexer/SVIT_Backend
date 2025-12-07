const mongoose = require('mongoose');
const config = require('../Configfiles/config.json');

var dbConnection = {
  connectToDB: function connectWithDatabase() {
    console.log("Called Database connection");
    
    mongoose.set('strictQuery', true);

    mongoose.connect(config.connectionString)
      .then(() => {
        console.log("Mongodb is Connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  }
}

module.exports = dbConnection;
