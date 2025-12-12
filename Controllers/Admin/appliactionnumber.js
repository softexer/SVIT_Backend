const express = require('express');
const Customer = require('../../Models/Customer'); // Assuming you have a Customer model

const router = express.Router();

// API to set hall ticket number based on application number
router.post('/setHallTicket', async (req, res) => {
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

module.exports = router;