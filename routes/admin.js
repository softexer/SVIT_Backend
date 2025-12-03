var express = require('express');
var app = express.Router()
var fileupload = require('express-fileupload');
app.use(
    fileupload({
        limits: { fileSize: 500 * 1024 * 1024 },
    })
);
var Adminlogin = require('../Controllers/Admin/login');
var Adminsignup = require('../Controllers/Admin/signup');
var mocktestUpload = require('../Controllers/Admin/testupload')
var verificatioToken = require('./verificationToken')

//Admin signup api
app.post('/adminsignup', async (req, res) => {
    Adminsignup.signup(req, res)
})

app.post('/adminlogin', async (req, res) => {
    Adminlogin.login(req, res)
})

app.post('/mocktestupload', async (req, res) => {
    mocktestUpload.testUploaddata(req, res)
})

app.delete('/mocktestdelete', async (req, res) => {
    mocktestUpload.deleteMockTest(req, res)
})

module.exports = app;