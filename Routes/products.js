const express = require('express');
const router = express.Router();

const products = require('./../products');
router.get('/products', async (req, res) => {
	try {
		res.status(201).json(products);
		console.log(products);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error creating order');
	}
});

module.exports = router;
