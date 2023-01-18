import { HOSTS } from "helpers/constants";
import API from "service";
import { Controllers } from "../helpers/constants/index";

const ProductsController = {};

ProductsController.createNewProduct = async (body) => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.product,
    "",
    body
  );
  return response;
};

ProductsController.getProducts = async (query) => {
  const response = await API.GET(
    HOSTS.BASE_URL,
    Controllers.product,
    "",
    query
  );
  return response;
};

ProductsController.deleteProduct = async (id) => {
  const response = await API.DELETE(HOSTS.BASE_URL, Controllers.product, id);
  return response;
};

ProductsController.updateProduct = async (product) => {
  const response = await API.PUT(
    HOSTS.BASE_URL,
    Controllers.product,
    product._id,
    product
  );
  return response;
};

ProductsController.export = (query) => async () => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.product,
    Controllers.export,
    {},
    query
  );
  return response;
};

export default ProductsController;
