"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./src/routes/products"));
const db_connection_1 = __importDefault(require("./src/db/db-connection"));
const app = (0, express_1.default)();
(0, db_connection_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', products_1.default);
app.get('/', (req, res) => {
    res.send('This is a simple express api for coffee mug recrutation process.');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
