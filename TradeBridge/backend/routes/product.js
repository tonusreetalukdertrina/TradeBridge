const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, seller } = req.body;
    const product = new Product({ name, price, description, image, seller });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'username role');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
