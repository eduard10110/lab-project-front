import ProductsController from "controllers/products";

const Utils = {};

Utils.getProducts = (query) => async () => {
  return await ProductsController.getProducts(query);
};

export default Utils;
