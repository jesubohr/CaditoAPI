const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const options = {
    family: 4,  
};

mongoose.connect(MONGO_URI, options, (err) => {
    if (err) console.error(err);
    else console.log('Connected to MongoDB');
});
