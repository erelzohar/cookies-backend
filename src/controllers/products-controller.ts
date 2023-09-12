import express from "express";
import productsLogic from "../logic/products-logic";
import Product from "../models/Product";
import { UploadedFile } from "express-fileupload";
import getError from "../helpers/errors-helper";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        res.json(products);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await productsLogic.getCategoriesAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/categories-ex", async (req, res) => {
    try {
        const categories = await productsLogic.getCategoriesNProductsAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", async (req, res) => {
    try {
        const image = req.files && req.files.image ? req.files.image : null;
        if (!image) return res.status(400).send("Missing image.");

        const newProduct = new Product(req.body);
        const addedProduct = await productsLogic.addProductAsync(newProduct,image as UploadedFile);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});


export default router;