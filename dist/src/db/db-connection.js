"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config/config"));
const dbConnect = () => {
    (0, mongoose_1.connect)(config_1.default.DATABASE_URL)
        .then(() => {
        console.log('Successfully connected to the database :)');
    }).catch(err => {
        console.log('Could not connect to the database :(', err);
        process.exit();
    });
};
exports.default = dbConnect;
