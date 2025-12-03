const mongoose = require("mongoose");
let schema = mongoose.Schema;
var AdminSchema = new schema({
  userID: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName:{
    type: String,
    required: false,
  },
  lastName:{
    type: String,
    required: false,
  },
  

});
module.exports = mongoose.model("Admin", AdminSchema);
