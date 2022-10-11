import ProductsController from "controllers/products";

const Utils = {};

Utils.getProducts = async () => {
  return await ProductsController.getProducts();
};

export default Utils;
