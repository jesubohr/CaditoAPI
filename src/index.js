const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
require('./database');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/cart', require('./routes/cart'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/product', require('./routes/products'));
app.use('/reviews', require('./routes/reviews'));
app.use('/history', require('./routes/history'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
