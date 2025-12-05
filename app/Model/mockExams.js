
const mongoose = require("mongoose");
let schema = mongoose.Schema;
var TestSchema = new schema({
    userID: {
        required: true,
        type: String,
        unique: true,
    },

    category: {
        type: String,
        enum: ["preliminary", "application", "hallticket", "videolectures"],
        required: false,
    },

    preliminary: [{
        type:{type: String, required: true},
        testName: { type: String, required: true, trim: true },
        testNumber: {
            type: Number, required: true, index: true,
            unique: true,
        },
        testURL: { type: String, default: "" },
        questions: {
            type: Array,
            default: []
        }
    }],
    application: [{
         type:{type: String, required: true},
        testName: { type: String, required: true, trim: true },
        testNumber: {
            type: Number, required: true, index: true,
            unique: true,
        },
        testURL: { type: String, default: "" },
        questions: {
            type: Array,
            default: []
        }
    }],
    hallticket: [{
         type:{type: String, required: true},
        testName: { type: String, required: true, trim: true },
        testNumber: {
            type: Number, required: true, index: true,
            unique: true
        },
        testURL: { type: String, default: "" },
        questions: {
            type: Array,
            default: []
        }
    }],
    videolectures: [{
        testName: { type: String, required: true, trim: true },
        testNumber: {
            type: Number, required: true, index: true,
            unique: true
        },
        testURL: { type: String, default: "" },
    }],



});
module.exports = mongoose.model("mockTest", TestSchema);


