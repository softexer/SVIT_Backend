const mongoose = require('mongoose');
const db = require('./DBConnection');
let schema = mongoose.Schema;
var CustomerSchema = new schema({
    userID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false,
        default: ''
    },
    lastName: {
        type: String,
        required: false,
        default: ''
    },
    fatcherName: {
        type: String,
        required: false,
        default: ''
    },
    motherName: {
        type: String,
        required: false,
        default: ''
    },
    aadharNo: {
        type: String,
        required: false,
        default: ''
    },
    village: {
        type: String,
        required: false,
        default: ''
    },
    mandal: {
        type: String,
        required: false,
        default: ''
    },
    district: {
        type: String,
        required: false,
        default: ''
    },
    collegeName: {
        type: String,
        required: false,
        default: ''
    },
    instaID: {
        type: String,
        required: false,
        default: ''
    },
    facebookID: {
        type: String,
        required: false,
        default: ''
    },
    emailID: {
        type: String,
        required: false,
        default: ''
    },
    password: {
        type: String,
        required: false,
        default: ''
    },
    phoneNumber: {
        type: String,
        required: false,
        default: '',
        index: true,
        unique: true,
    },
    isMobileVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    hallTicketNo: {
        type: String,
        required: false,
        default: ''
    },
    applicationNo: {
        type: String,
        required: false,
        default: ''
    },
    register_time: {
        type: String,
        required: false,
        default: ''
    },

    register_type: {
        type: String,
        required: false,
        default: ''
    },
});

db.connectToDB();
module.exports = mongoose.model('Customers', CustomerSchema);