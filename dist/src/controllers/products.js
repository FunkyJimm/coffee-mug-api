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
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Produkty");
    product_1.default.find()
        .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error. Products list is not exists.'
        });
    });
});
const getProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Szczegóły produktu");
    const { id } = req.body;
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
            message: `Error retrieving note with Id: ${id}.`
        });
    });
});
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Dodawanie produktu");
    if (!req.body.content) {
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
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Aktualizowanie produktu");
    if (!req.body.content) {
        return res.status(400).send({
            message: "Product content can not be empty."
        });
    }
    const { id, name, price } = req.body;
    const options = {
        runValidator: true,
        upsert: false,
    };
    product_1.default.findByIdAndUpdate(id, { name, price }, options, (err) => {
        if (err) {
            res.status(404).send(err);
        }
        else {
            res.send('Product has been updated.');
        }
    });
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Usuwanie produktu");
    const { id } = req.body;
    product_1.default.findByIdAndDelete(id, null, (err) => {
        if (err) {
            res.status(404).send(err);
        }
        else {
            res.send('Product has been deleted.');
        }
    });
});
exports.default = { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct };
