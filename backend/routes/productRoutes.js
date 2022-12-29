const express = require('express');
const router = express.Router();


const { 
       getAllProducts, 
       getProductsById,
} = require('../controller/productControllers');

//Get all products from db
//get /api/products
router.get('/', getAllProducts)

//Get a products by id from db
//get /api/products/:id
router.get('/:id', getProductsById)

module.exports = router;
