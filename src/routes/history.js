const router = require('express').Router();
const User = require('../models/User');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) return res.status(400).send({ error: 'Missing user_id' });

    try {
        const user = await User.findOne({ _id: user_id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.history);
    } catch (error) {
        return res.status(500).send({ error: 'Invalid user_id' });
    }
});

module.exports = router;
