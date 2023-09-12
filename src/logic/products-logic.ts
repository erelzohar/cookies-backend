import { UploadedFile } from "express-fileupload";
import Category from "../models/Category";
import Product, { ProductModel } from "../models/Product";
import path from "path";

function getAllProductsAsync() {
    return Product.find().populate("category").exec();

}

function getCategoriesAsync() {
    return Category.find().exec();
}
function getCategoriesNProductsAsync() {
    return Category.find().populate("products").exec();
}

async function addProductAsync(product: ProductModel, image: UploadedFile) {
    const extension = image.name.substr(image.name.lastIndexOf("."));
    product.imageName = product.name + extension;
    const absolutePath = path.join(__dirname, "..", "assets", "images", "products", product.imageName);
    const errors = product.validateSync();
    if (errors) return errors.message;
    await image.mv(absolutePath);
    return product.save();
}


export default {
    getAllProductsAsync,
    addProductAsync,
    getCategoriesNProductsAsync,
    getCategoriesAsync
}