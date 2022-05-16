const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');
const ShoppingCart = require('../utils/Cart');

router.get('/', async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).send({ error: 'Missing user_id' });

    try {
        const user = await User.findById({ _id: user_id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(ShoppingCart.get(user_id));
    } catch (error) {
        return res.status(500).send({ error: 'Invalid user_id' });
    }
});

router.post('/', async (req, res) => {
    const { user_id, product_id } = req.body;
    if (!user_id || !product_id) return res.status(400).send({ error: 'Missing fields' });

    try {
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        return res.status(500).send({ error: 'Invalid user_id' });
    }

    try {
        const product = await Product.findById({ _id: product_id });
        if (!product) return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        return res.status(500).send({ error: 'Invalid product_id' });
    }

    ShoppingCart.add(user_id, product_id);
    return res.json({ success: 'Product added to cart' });
});

router.post('/buy', async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).send({ error: 'Missing user_id' });

    try {
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.history.push(...ShoppingCart.buy(user_id));
        await user.save();
    } catch (error) {
        return res.status(500).send({ error: 'Invalid user_id' });
    }
    return res.json({ success: 'Cart bought' });
});

router.delete('/', async (req, res) => {
    const { item_id } = req.query;
    if (!item_id) return res.status(400).send({ error: 'Missing item_id' });

    ShoppingCart.remove(item_id);
    return res.json({ success: 'Product removed from cart' });
});

module.exports = router;
