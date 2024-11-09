const express = require('express');
const router = express.Router(); // Use Router to create a router instance
const Order = require('../schemas/Order');

router.post('/orderData', async (req, res) => {
    try {
        const {order_data, email, order_date} = req.body;
        if(!email){
            return res.status(400).json({error: 'Email is required'})
        }
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date }); // Add order date to the array

        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);

        if (!eId) {
            // Create a new order if email does not exist
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // Update the existing order
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { $each: data } } } // Use $each to push all items in array
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email' : req.body.email})
        res.json({orderData: myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;
