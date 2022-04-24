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
    const owner = await User.findById(user_id);
    if (!owner) return res.status(404).json({ error: 'User not found' });

    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const newReview = new Review({
        user_id,
        product_id,
        description,
        rating,
    });
    await newReview.save();
    res.json({ _id: newReview._id, success: 'Review created' });
});

module.exports = router;
