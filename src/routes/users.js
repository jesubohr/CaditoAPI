const router = require('express').Router();
const User = require('../models/User');
const SessionToken = require('../utils/Tokens');

router.get('/', async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).send({ error: 'Missing user_id' });

    try {
        const user = await User.findById({ _id: user_id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Invalid user_id' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ error: 'Missing username or password' });

    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });
    SessionToken.add(user._id);

    res.json({ _id: user._id, success: 'User logged in' });
});

router.post('/prev-login', async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).send({ error: 'Missing user_id' });

    const userToken = SessionToken.find(user_id);
    res.json({ _id: userToken });
});

router.post('/register', async (req, res) => {
    const { fullname, username, password } = req.body;
    if (!fullname || !username || !password) return res.status(400).send({ error: 'Missing fields' });

    const userName = await User.findOne({ username: username });
    if (userName) return res.status(400).json({ error: 'Username already exists' });

    const newUser = new User({ fullname, username, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json({ _id: newUser._id, success: 'User created' });
});

module.exports = router;
