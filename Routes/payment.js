const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Payment = require('./../model/payment');
const crypto = require('crypto');
const razorpay = new Razorpay({
	key_id: 'rzp_test_DXb4qOZFFJhsDu',
	key_secret: '6QEGux3sfiRv483wqTA2aZMH',
});
router.post('/create-order', async (req, res) => {
	const amount = req.body.price; // Amount in paise
	const currency = req.body.currency; // Currency code (INR, USD, etc.)

	const options = {
		amount: amount * 100,
		currency: currency,
	};
	try {
		const order = await razorpay.orders.create(options);
		res.status(201).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error creating order');
	}
});
router.post('/paymentSuccess', async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;

	const body = razorpay_order_id + '|' + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac('sha256', process.env.RAZORPAY_APT_SECRET)
		.update(body.toString())
		.digest('hex');

	const isAuthentic = expectedSignature === razorpay_signature;

	if (isAuthentic) {
		// Database comes here
		let paymentSuccess = Payment({
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
		});
		let order = await paymentSuccess.save();

		res.status(201).json({
			success: true,
			order,
		});
	} else {
		res.status(400).json({
			success: false,
		});
	}
});

module.exports = router;
