const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const scraper = require('../utils/scraper');
const amazon = require('../utils/amazon');

// Route for searching products
router.post('/search', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const results = await scraper.searchProducts(searchTerm);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for products' });
  }
});

// Route for getting product details
router.post('/product-details', async (req, res) => {
  try {
    const url = req.body.url;
    const productDetails = await scraper.getProductDetails(url);
    const amazonData = await amazon.getAmazonData(productDetails);

    const product = new Product({
      ...productDetails,
      ...amazonData
    });

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

module.exports = router;
