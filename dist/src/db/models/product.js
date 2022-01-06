"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        minlength: [2, 'Product name must have 2 letters or more!'],
        maxlength: [100, 'Product name must have less than 101 characters!'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required!'],
        min: [0, 'Price must be higher than 0!'],
    },
    updateDate: {
        type: Date,
        required: false,
    },
});
const ProductModel = (0, mongoose_1.model)('Product', schema);
exports.default = ProductModel;
