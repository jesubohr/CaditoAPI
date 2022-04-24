const router = require('express').Router();
const User = require('../models/User');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.history);
});

module.exports = router;
