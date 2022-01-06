"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../db/models/product"));
// get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.find()
        .then(products => {
        const productsList = products.map(product => ({
            id: product._id,
            name: product.name,
        }));
        res.send(productsList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error. Products list is not exists.'
        });
    });
});
// get product details
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    product_1.default.findById(id)
        .then(product => {
        if (!product) {
            return res.status(404).send({
                message: `Product with Id: ${id} is not found.`
            });
        }
        res.send(product);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Product with Id: ${id} is not found.`
            });
        }
        return res.status(500).send({
            message: `Error retrieving product with Id: ${id}.`
        });
    });
});
// add a product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name && !req.body.price) {
        return res.status(400).send({
            message: "Product content can not be empty."
        });
    }
    const { name, price } = req.body;
    const product = new product_1.default({ name, price });
    product.save(err => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send('Product has been added.');
        }
    });
});
// update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name && !req.body.price) {
        return res.status(400).send({
            message: "Product content can not be empty."
        });
    }
    const id = req.params.productId;
    const { name, price } = req.body;
    const updateDate = Date.now();
    const options = {
        runValidator: true,
        upsert: false,
    };
    product_1.default.findByIdAndUpdate(id, { name, price, updateDate }, options, (err) => {
        if (err) {
            res.status(404).send({
                message: `Product with Id: ${id} is not found.`
            });
        }
        else {
            res.send('Product has been updated.');
        }
    });
});
// delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    product_1.default.findByIdAndDelete(id, null, (err) => {
        if (err) {
            res.status(404).send({
                message: `Product with Id: ${id} is not found.`
            });
        }
        else {
            res.send('Product has been deleted.');
        }
    });
});
exports.default = { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct };
