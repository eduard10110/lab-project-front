import ProductsController from "controllers/products";

const Utils = {};

Utils.getProducts = async () => {
  return await ProductsController.getProducts();
};

Utils.getRepositories = async () => {};

export default Utils;
