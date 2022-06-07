const router = require('express').Router();
const Product = require('../models/Product');

router.get('/:product_id', async (req, res) => {
    const { product_id } = req.params;
    if (!product_id) return res.status(400).send({ error: 'Missing product_id' });

    try {
        const product = await Product.findById({ _id: product_id });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        return res.json(product);
    } catch (error) {
        return res.status(500).send({ error: 'Invalid product_id' });
    }
});

module.exports = router;
