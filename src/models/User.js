const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    display_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    history: Array,
});


User.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

User.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);
