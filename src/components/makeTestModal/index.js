/* eslint-disable react-hooks/exhaustive-deps */
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
import RepositoriesController from "controllers/repositories";
import TestController from "controllers/test";
import { useEffect, useState } from "react";

export default function MakeTestModal({ open, handleClose, getData, test }) {
  const [data, setData] = useState({
    dateOfEntry: "",
    quantity: 0,
    products: [],
  });
  const [testRepositories, setTestRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState(null);

  const getProducts = async () => {
    const response = await ProductsController.getProducts({
      isStorageSpecified: 0,
    });
    return response.data;
  };

  const getRepositories = async () => {
    const response = await RepositoriesController.getRepositories();
    return response.data;
  };

  const generateTestRepositories = async () => {
    const products = await getProducts();
    const repositories = await getRepositories();
    const testRepos = [];
    for (let i = 0; i < test.products.length; i++) {
      const elem = test.products[i];
      const name = repositories?.find(
        (elem) => elem._id === test.products[i].id
      )?.name;
      const data = { ...elem, name };
      const currentRepoData = await RepositoriesController.getRepositoryById(
        elem.id
      );
      const repoProducts = products.filter((item) =>
        item.name
          .toUpperCase()
          .includes(currentRepoData.data.name.toUpperCase())
      );
      data.products = repoProducts;
      testRepos.push(data);
    }
    setTestRepositories(testRepos);
  };

  useEffect(() => {
    generateTestRepositories();
  }, []);

  const handleChange = (id) => (e) =>
    setData({ ...data, [id]: e.target.value });

  const handleProductSelect = (name) => (e) => {
    const currentRepo = testRepositories.find((elem) => elem.name === name);
    const newProducts = [...data.products];
    const currentDataIndex = data.products.findIndex(
      (elem) => elem.name === name
    );
    if (currentDataIndex >= 0) {
      newProducts[currentDataIndex] = {
        ...newProducts[currentDataIndex],
        id: e.target.value,
      };
    } else {
      newProducts.push({
        name,
        quantity: currentRepo.quantity,
        id: e.target.value,
      });
    }
    setData({ ...data, products: newProducts });
  };

  const getMenuValue = (name) => {
    const currentDataIndex = data.products.findIndex(
      (elem) => elem.name === name
    );
    return currentDataIndex >= 0 ? data.products[currentDataIndex].id : "";
  };

  const handleSubmit = async () => {
    const price = await handleGetTestPrice();
    const body = { ...test, ...data, price };
    delete body._id;
    delete body.id;
    const response = await TestController.makeTest(body);
    if (response.data.hasError) {
      setErrorMessage(response.data.errorMessage);
    } else {
      handleClose();
    }
  };

  const handleGetTestPrice = async () => {
    const products = data.products?.map((elem) => {
      const repositoryId = testRepositories.find((repo) =>
        repo.products.find((item) => item._id === elem.id)
      ).id;
      return { productId: elem.id, repositoryId };
    });
    console.log(products);
    const response = await TestController.getTestPrice(test._id, products);
    setPrice(response.data?.price);
  };

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal make-test-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_makeTest" />
            </h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_testDateOfEntry" />
            </p>
            <input
              type="date"
              value={data.expirationDate}
              onChange={handleChange("dateOfEntry")}
              placeholder={Translation({ label: "_testDateOfEntry" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_quantity" />
            </p>
            <input
              type="number"
              value={data.quantity}
              onChange={handleChange("quantity")}
              placeholder={Translation({ label: "_quantity" })}
            />
          </div>
          {testRepositories?.map(({ name, products }, index) => (
            <div className="product-form-item-wrapper" key={index}>
              <p>{name}</p>
              <FormControl className="anp-select" fullWidth>
                <InputLabel>{name}</InputLabel>
                <Select
                  onChange={handleProductSelect(name)}
                  value={getMenuValue(name)}
                >
                  {products.map(({ name, _id, storage }) => (
                    <MenuItem key={_id} value={_id}>
                      {name} {`(${storage})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
        </div>
        <div className="response-wrapper error">
          <p>{errorMessage}</p>
        </div>
        <div className="mtm-get-test-price-wrapper">
          <button onClick={handleGetTestPrice} className="anp-submit-button">
            Ստանալ 1 հետզոտության արժեքը
          </button>
          {price && <div style={{ marginTop: 20 }}>{price} Դրամ</div>}
        </div>
        <div className="anp-buttons-wrapper">
          <div>
            <button className="anp-submit-button" onClick={handleSubmit}>
              <Translation label="_make" /> <DoneIcon />
            </button>
            <button className="anp-cancel-button" onClick={handleClose}>
              <Translation label="_cancel" /> <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
