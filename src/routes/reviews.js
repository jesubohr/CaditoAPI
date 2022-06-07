const router = require('express').Router();
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const { user_id, product_id } = req.query;
    if (user_id) {
        const review = await Review.find({ user_id });
        res.json(review);
    } else if (product_id) {
        const review = await Review.find({ product_id });
        res.json(review);
    }
});

router.post('/', async (req, res) => {
    const { product_id, user_id, rating, description } = req.body;
    if (!product_id || !user_id || !rating || !description) return res.status(400).send({ error: 'Missing fields' });

    try {
        const owner = await User.findById(user_id);
        if (!owner) return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        return res.status(500).send({ error: 'Invalid user_id' });
    }

    try {
        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        return res.status(500).send({ error: 'Invalid product_id' });
    }

    const newReview = new Review({
        user_id,
        product_id,
        description,
        rating,
    });
    await newReview.save();
    return res.json({ _id: newReview._id, success: 'Review created' });
});

module.exports = router;
