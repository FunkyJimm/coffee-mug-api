import express, { Router } from 'express';
import products from '../controllers/products';
const router = express.Router();

router.get('/products', products.getProducts);

router.get('/products/:productId', products.getProductDetails);

router.post('/products', products.addProduct);

router.put('/products/:productId', products.updateProduct);

router.delete('/products/:productId', products.deleteProduct);

export = router;