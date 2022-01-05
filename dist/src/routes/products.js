"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controllers/products"));
const router = express_1.default.Router();
router.get('/products', products_1.default.getProducts);
router.get('/products/:productId', products_1.default.getProductDetails);
router.post('/products', products_1.default.addProduct);
router.put('/products/:productId', products_1.default.updateProduct);
router.delete('/products/:productId', products_1.default.deleteProduct);
module.exports = router;
