import express from "express";
import cors from "cors";
import productsRouter from "./Routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", productsRouter);


//Port used for the fetch API;
app.listen(8800);