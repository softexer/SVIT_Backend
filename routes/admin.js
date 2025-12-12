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


app.post('/mocktestfetch',async (req, res) => {
    mocktestUpload.fetchmocktest(req, res)
})
const { stringify } = require("csv-stringify");

const ExcelJS = require("exceljs");
var CustomersModel = require('../app/Model/Customer');
app.get('/download', async (req, res) => {
  try {
    // console.log("paramsvinod", req.query);
    // const params = req.query;

    // if (!params.userID) {
    //   return res.status(400).json({
    //     response: 0,
    //     message: "userID (AdminuserID) is required"
    //   });
    // }

    const customers = await CustomersModel.find({
     
    }).lean().exec();

    if (!customers || customers.length === 0) {
      return res.json({
        status: 200,
        data: {
          response: 0,
          message: "Data not found from DB",
        },
      });
    }

    // ✅ Convert userID to string safely
    customers.forEach(cust => {
      if (cust.userID) cust.userID = String(cust.userID);
    });

    // ✅ Format Data
    const formattedCustomers = customers.map(cust => ({
      firstName: cust.firstName || "",
      lastName: cust.lastName || "",
     dob: formatDOB(cust.password),
      phoneNumber: cust.phoneNumber || "",
      fatherName: cust.fatherName || "",
      motherName: cust.motherName || "",
      aadharNo: cust.aadharNo || "",
      village: cust.village || "",
      mandal: cust.mandal || "",
      district: cust.district || "",
      collegeName: cust.collegeName || "",
      facebookID: cust.facebookID || "",
      instaID: cust.instaID || "",
      emailID: cust.emailID || "",
      hallTicketNo: cust.hallTicketNo || "",
      applicationNo: cust.applicationNo || ""
    }));

    // ✅ Create Excel File
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // ✅ HEADERS FROM JOI
    worksheet.columns = [
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Date of Birth", key: "dob", width: 18 },
      { header: "Phone Number", key: "phoneNumber", width: 20 },
      { header: "Father Name", key: "fatherName", width: 25 },
      { header: "Mother Name", key: "motherName", width: 25 },
      { header: "Aadhar Number", key: "aadharNo", width: 25 },
      { header: "Village", key: "village", width: 20 },
      { header: "Mandal", key: "mandal", width: 20 },
      { header: "District", key: "district", width: 20 },
      { header: "College Name", key: "collegeName", width: 35 },
      { header: "Facebook ID", key: "facebookID", width: 30 },
      { header: "Instagram ID", key: "instaID", width: 30 },
      { header: "Email ID", key: "emailID", width: 35 },
      { header: "Hall Ticket No", key: "hallTicketNo", width: 25 },
      { header: "Application No", key: "applicationNo", width: 25 }
    ];

    // ✅ Wrap long text columns
    ['collegeName', 'facebookID', 'instaID', 'emailID', 'village', 'mandal', 'district']
      .forEach(key => {
        const column = worksheet.getColumn(key);
        column.alignment = { wrapText: true, vertical: 'top' };
      });

    // ✅ Add rows to Excel
    worksheet.addRows(formattedCustomers);

    // ✅ Header Styling
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }
      };
      cell.alignment = { horizontal: 'center' };
    });

    // ✅ Response headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Student_Data.xlsx"`
    );

    // ✅ Send Excel
    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error("Error in /download:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




const express = require('express');
const Customer = require('../../Models/Customer'); // Assuming you have a Customer model


// API to set hall ticket number based on application number
app.post('/setHallTicket', async (req, res) => {
    const { userID,applicationNumber, hallTicketNumber } = req.body;

    if (!applicationNumber && !hallTicketNumber) {
        return res.status(400).json({ message: 'Application number and hall ticket number are required.' });
    }

    try {
        // Find the customer by application number
        const customer = await Customer.findOne({ userID :userID});

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        // Update the hall ticket number
     var updateQuery = await Customer.updateOne(
            { userID: userID },
            { $set: { hallTicketNo: hallTicketNumber,applicationNo: applicationNumber } }
        ).exec();

        res.status(200).json({ message: 'Hall ticket number / application number updated successfully.', customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});




module.exports = app;

function formatDOB(dob) {
  if (!dob) return "";

  const str = String(dob).trim();

  // Must be exactly 8 digits like 08021990
  if (!/^\d{8}$/.test(str)) return str;

  const day = str.substring(0, 2);
  const month = str.substring(2, 4);
  const year = str.substring(4, 8);

  return `${day}/${month}/${year}`;
}
