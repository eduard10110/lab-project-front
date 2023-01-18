/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import Translation from "components/translation";
import TestController from "controllers/test";
import {
  productPackingTypes,
  productTypes,
  TestDeviceNames,
} from "helpers/enums";
import { useEffect, useState } from "react";
import RepositoriesController from "../../controllers/repositories";
import { useSelector } from "react-redux";
import { translationIdSelector } from "store/selectors/app";

export default function AddNewTestModal({
  open,
  handleClose,
  getData,
  updatableData,
}) {
  const [data, setData] = useState({
    name: "",
    type: "",
    dateOfEntry: "",
    products: [],
    productType: "",
    packingType: "",
  });
  const [productItem, setProductItem] = useState({ quantity: 0, id: "" });
  const [testNames, setTestNames] = useState(null);
  const [repositories, setRepositories] = useState(null);
  const translationId = useSelector(translationIdSelector);

  const getRepositories = async () => {
    const repos = await RepositoriesController.getRepositories();
    setRepositories(repos.data);
    if (updatableData) setData(updatableData);
  };

  useEffect(() => {
    getRepositories();
    getTestNames();
  }, []);

  const getTestNames = async () => {
    const response = await RepositoriesController.getRepositories();
    setTestNames(response.data?.filter((elem) => elem.type === "test"));
  };

  const handleChange = (id, array, subId) => (e, value) => {
    setData({
      ...data,
      [id]: subId ? value[subId] : e.target.value,
    });
  };

  const handleProductItemChange = (id, array, subId) => (e) =>
    setProductItem({
      ...productItem,
      [id]: array ? array[e.target.value][subId] : e.target.value,
    });

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

  const getFilteredRepositories = () =>
    repositories?.filter((elem) => elem.type === data.productType);

  const handleDeleteProductFromData = (id) => () => {
    const newProducts = data.products.filter((elem) => elem.id !== id);
    setData({ ...data, products: newProducts });
  };

  const getName = (id, quantity) => {
    const data = repositories.find((item) => item._id === id);
    return `${data?.name} Քանակ: ${quantity}`;
  };

  console.log(testNames);

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
            <Autocomplete
              className="autocomplete"
              options={testNames || []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={Translation({ label: "_researchName" })}
                />
              )}
              onChange={handleChange("name", testNames, "name")}
            />
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
            <Autocomplete
              className="autocomplete"
              options={productPackingTypes[translationId] || []}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={Translation({ label: "_packingType" })}
                />
              )}
              onChange={handleChange(
                "packingType",
                productPackingTypes[translationId],
                "value"
              )}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_type" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_type" />
              </InputLabel>
              <Select
                onChange={handleChange("productType")}
                value={data.productType}
              >
                {productTypes.map(
                  ({ label, id, showInProductsModal }) =>
                    showInProductsModal && (
                      <MenuItem key={id} value={id}>
                        {label}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_productName" />
            </p>
            <Autocomplete
              className="autocomplete"
              options={getFilteredRepositories() || []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={Translation({ label: "_productName" })}
                />
              )}
              onChange={handleProductItemChange(
                "id",
                getFilteredRepositories(),
                "_id"
              )}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_quantity" />
            </p>
            <input
              type="number"
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
          <div className="tm-products-wrapper">
            {data.products.map((elem) => (
              <div>
                <p>{getName(elem.id, elem.quantity)}</p>
                <IconButton
                  onClick={handleDeleteProductFromData(elem.id, elem.quantity)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <div className="anp-buttons-wrapper">
          <div>
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
      </div>
    </Modal>
  );
}
