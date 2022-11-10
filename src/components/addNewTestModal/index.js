/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Translation from "components/translation";
import ProductsController from "controllers/products";
import TestController from "controllers/test";
import {
  productPackingTypes,
  storagesData,
  TestDeviceNames,
} from "helpers/enums";
import { useEffect, useState } from "react";
import RepositoriesController from "../../controllers/repositories";

export default function AddNewTestModal({ open, handleClose, getData }) {
  const [data, setData] = useState({
    name: "",
    type: "",
    dateOfEntry: "",
    products: [],
  });
  const [productItem, setProductItem] = useState({ quantity: 0, id: "" });
  const [products, setProducts] = useState(null);
  const [storage, setStorage] = useState("4");
  const [testNames, setTestNames] = useState(null);

  useEffect(() => {
    getTestNames();
  }, []);

  useEffect(() => {
    getProducts();
  }, [storage]);

  const getTestNames = async () => {
    const response = await RepositoriesController.getRepositories();
    setTestNames(response.data?.filter((elem) => elem.type === "test"));
  };

  const getProducts = async () => {
    const response = await ProductsController.getProducts({
      isStorageSpecified: +storage === 4 ? 0 : 1,
    });
    setProducts(
      response.data?.map(({ _id, name, storage }) => ({
        id: _id,
        label: name,
        storage,
      }))
    );
  };

  const handleChange = (id) => (e) => {
    setData({ ...data, [id]: e.target.value });
  };

  const handleStorageChange = (e) => setStorage(e.target.value);

  const getFilteredRepositories = () =>
    storage === "4"
      ? products
      : products?.filter((elem) => elem.storage === storage);

  const handleProductItemChange = (id) => (e) =>
    setProductItem({ ...productItem, [id]: e.target.value });

  const getAddProductInDataButtonClassName = () =>
    productItem.id && productItem.quantity
      ? "button-active"
      : "button-disabled";

  const handleAddProductInData = () => {
    if (!productItem.id || !productItem.quantity) return;
    const newProductsData = data.products;
    newProductsData.push(productItem);
    setData({ ...data, products: [...newProductsData] });
    setProductItem({ id: "", quantity: 0 });
  };

  const addNewTest = async () => {
    const response = await TestController.creteTest(data);
    await getData();
    return response;
  };

  const handleAddAndContinue = async () => {
    await addNewTest();
    setData({ name: "", dateOfEntry: "", type: "", products: [] });
    setProductItem({ quantity: 0, id: "" });
  };

  const handleAddNewProduct = async () => {
    await addNewTest();
    handleClose();
  };

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal test-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_research" />
            </h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_researchName" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_researchName" />
              </InputLabel>
              <Select onChange={handleChange("name")} value={data.name}>
                {testNames?.map(({ name, _id }) => (
                  <MenuItem key={_id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_deviceName" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_deviceName" />
              </InputLabel>
              <Select onChange={handleChange("type")} value={data.type}>
                {TestDeviceNames.map(({ label, id }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_packingType" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel>
                <Translation label="_packingType" />
              </InputLabel>
              <Select
                onChange={handleChange("packingType")}
                value={data.packingType}
              >
                {productPackingTypes.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_storages" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_storages" />
              </InputLabel>
              <Select onChange={handleStorageChange} value={storage}>
                {storagesData.map(({ label, id }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_product" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_product" />
              </InputLabel>
              <Select
                onChange={handleProductItemChange("id")}
                value={productItem.id}
              >
                {getFilteredRepositories(products)?.map(({ label, id }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_quantity" />
            </p>
            <input
              type="text"
              value={productItem.quantity}
              onChange={handleProductItemChange("quantity")}
              placeholder={Translation({ label: "_quantity" })}
            />
          </div>
          <div className="test-modal-add-product-wrapper">
            <button
              onClick={handleAddProductInData}
              className={getAddProductInDataButtonClassName()}
            >
              <Translation label="_addSelectedProduct" />
            </button>
          </div>
        </div>
        <div className="anp-buttons-wrapper">
          <button onClick={handleAddAndContinue} className="anp-add-button">
            <Translation label="_add" /> <AddIcon />
          </button>
          <button className="anp-submit-button" onClick={handleAddNewProduct}>
            <Translation label="_submit" /> <DoneIcon />
          </button>
          <button className="anp-cancel-button" onClick={handleClose}>
            <Translation label="_cancel" /> <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}
