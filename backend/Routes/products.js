import express from "express";

import {getProducts, createProducts, updateProducts, deleteProducts} from "../Controllers/products.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);
productsRouter.post("/create", createProducts);
productsRouter.delete("/delete", deleteProducts);
productsRouter.put("/update", updateProducts);


export default productsRouter;