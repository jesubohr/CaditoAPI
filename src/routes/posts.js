const router = require('express').Router();
const Product = require('../models/Product');

router.get('/recent', async (req, res) => {
    const posts = await Product.find().limit(10);
    res.json(posts.map(post => {
        return {
            ...post._doc,
            created_date: post.timestamp
        };
    }));
});

router.get('/', async (req, res) => {
    const { user_id, post_id } = req.query;
    if (user_id) {
        const posts = await Product.find({ owner_id: user_id });
        res.json(posts);
    } else if(post_id) {
        const post = await Product.findById(post_id);
        if (!post) return res.status(404).json({ error: 'Product not found' });
        res.json(post);
    }
});

router.post('/', async (req, res) => {
    const { owner_id, img_url, display_name, description, price } = req.body;
    const product = await Product.findOne({ display_name });
    if (product) return res.status(404).json({ error: 'Product already exists' });

    const newProduct = new Product({
        owner_id,
        display_name,
        description,
        img_url,
        price,
    });
    await newProduct.save();
    res.json({ _id: newProduct._id, success: 'Product created' });
});

module.exports = router;
