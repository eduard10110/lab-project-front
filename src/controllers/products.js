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
  console.log(response);
};

ProductsController.getProducts = async () => {
  const response = await API.GET(HOSTS.BASE_URL, Controllers.product, "");
  console.log(response);
};

export default ProductsController;
