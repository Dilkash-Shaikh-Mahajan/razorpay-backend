require('dotenv').config();
const express = require('express');
const connectDB = require('./DB');
const router = require('./Routes/payment');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server start on port ${PORT}`);
});
