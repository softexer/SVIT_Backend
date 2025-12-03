
const mongoose = require("mongoose");
let schema = mongoose.Schema;
var TestSchema = new schema({
  userID: {
    required: true,
    type: String,
    unique: true,
  },
  testName: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["preliminary", "application", "hallticket"],
      required: true,
    },

    testNumber: { type: Number, required: true },
    testURL: { type: String, default: "" },
  

});
module.exports = mongoose.model("mockTest", TestSchema);


