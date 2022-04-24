const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');
const ShoppingCart = require('../utils/Cart');

router.get('/', async (req, res) => {
    const { user_id } = req.query;
    const user = await User.findById({ _id: user_id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(ShoppingCart.get(user_id));
});

router.post('/', async (req, res) => {
    const { user_id, product_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const product = await Product.findById({ _id: product_id });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    ShoppingCart.add(user_id, product_id);
    return res.json({ success: 'Product added to cart' });
});

router.post('/buy', async (req, res) => {
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.history.push(...ShoppingCart.buy(user_id));
    await user.save();
    return res.json({ success: 'Cart bought' });
});

router.delete('/', async (req, res) => {
    const { item_id } = req.query;
    ShoppingCart.remove(item_id);
    res.json({ success: 'Product removed from cart' });
});

module.exports = router;
