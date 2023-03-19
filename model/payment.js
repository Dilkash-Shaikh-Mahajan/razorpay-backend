const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
	razorpay_order_id: { required: true, type: String },
	razorpay_payment_id: { required: true, type: String },
	razorpay_signature: { required: true, type: String },
});
module.exports = mongoose.model('Payment', paymentSchema);
