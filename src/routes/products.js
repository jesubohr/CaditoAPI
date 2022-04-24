const router = require('express').Router();
const Product = require('../models/Product');

router.get('/:product_id', async (req, res) => {
    const { product_id } = req.params;
    const product = await Product.findById({ _id: product_id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

module.exports = router;
