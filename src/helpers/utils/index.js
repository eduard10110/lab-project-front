import ProductsController from "controllers/products";

const Utils = {};

Utils.getProducts = (query) => async () => {
  return await ProductsController.getProducts(query);
};

Utils.ExportedProduct = (query) => async () => {
  const response = await ProductsController.getProducts(query);
  const newData = response.data?.filter((elem) => +elem.storage === 4);
  return { ...response, data: newData };
};

export default Utils;
