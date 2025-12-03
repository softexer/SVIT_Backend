var express = require('express');
var app = express.Router()
var fileupload = require('express-fileupload');
app.use(
    fileupload({
        limits: { fileSize: 500 * 1024 * 1024 },
    })
);
var customerlogin = require('../Controllers/Customers/login');
var customerSignup = require('../Controllers/Customers/signup');
var verificatioToken = require('./verificationToken')

//Admin signup api
app.post('/signup', async (req, res) => {
    customerSignup.signup(req, res)
})

app.post('/login', async (req, res) => {
    customerlogin.login(req, res)
})



module.exports = app;