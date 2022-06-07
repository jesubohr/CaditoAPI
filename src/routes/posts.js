const router = require('express').Router();
const Product = require('../models/Product');

router.get('/recent', async (req, res) => {
    const posts = await Product.find().limit(30);
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
        try {
            const posts = await Product.find({ owner_id: user_id });
            res.json(posts);
        } catch (error) {
            return res.status(500).send({ error: 'Invalid user_id' });
        }
    } else if (post_id) {
        try {
            const post = await Product.findById(post_id);
            if (!post) return res.status(404).json({ error: 'Product not found' });
            res.json(post);
        } catch (error) {
            return res.status(500).send({ error: 'Invalid post_id' });
        }
    }
});

router.post('/', async (req, res) => {
    const { owner_id, img_url, display_name, description, price } = req.body;
    if (!owner_id || !img_url || !display_name || !description || !price) return res.status(400).send({ error: 'Missing fields' });

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
    return res.json({ _id: newProduct._id, success: 'Product created' });
});

module.exports = router;
