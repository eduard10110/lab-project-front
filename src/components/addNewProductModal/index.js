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
import RepositoriesController from "controllers/repositories";
import { productPackingTypes, productTypes, productUnits } from "helpers/enums";
import moment from "moment";
import { useEffect, useState } from "react";

const inputValuesInitialState = {
  name: "",
  type: "",
  quantity: 0,
  unit: "",
  expirationDate: "",
  price: "",
  supplier: "",
  dateOfEntry: "",
  lot: "",
  nameId: "",
  packingType: "",
};

export default function AddNewProductModal({
  open,
  handleClose,
  updatableData,
  getData,
}) {
  const [repositories, setRepositories] = useState(null);
  const [data, setData] = useState({
    name: "",
    type: "",
    quantity: 0,
    unit: "",
    expirationDate: "",
    price: "",
    supplier: "",
    dateOfEntry: "",
    nameId: "",
    packingType: "",
  });

  const getRepositories = async () => {
    const repos = await RepositoriesController.getRepositories();
    setRepositories(repos.data);
  };

  useEffect(() => {
    getRepositories();
    if (updatableData)
      setData({
        ...updatableData,
        dateOfEntry: updatableData.dateOfEntry?.split("T")[0],
        expirationDate: updatableData.expirationDate?.split("T")[0],
      });
  }, []);

  useEffect(() => {
    if (data.nameId) setData({ ...data, name: `${data.nameId}-${data.name}` });
  }, [data.nameId]);

  const handleChange = (id) => (e) => {
    setData({ ...data, [id]: e.target.value });
  };

  const addNewProduct = async () => {
    const newData = { ...data };
    newData.dateOfEntry = moment(newData.dateOfEntry).format("MM/DD/YYYY");
    newData.expirationDate = moment(newData.expirationDate).format(
      "MM/DD/YYYY"
    );
    delete newData.nameId;
    updatableData
      ? await ProductsController.updateProduct(newData)
      : await ProductsController.createNewProduct(newData);
  };
  const handleAddNewProduct = async () => {
    await addNewProduct();
    await getData();
    handleClose();
  };

  const handleAddAndContinue = async () => {
    await addNewProduct();
    setData({ ...inputValuesInitialState });
  };

  const getFilteredRepositories = () =>
    repositories?.filter((elem) => elem.type === data.type);

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_productIntroduction" />
            </h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_type" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_type" />
              </InputLabel>
              <Select onChange={handleChange("type")} value={data.type}>
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
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_productName" />
              </InputLabel>
              <Select onChange={handleChange("nameId")} value={data.nameId}>
                {data.type &&
                  getFilteredRepositories()?.map(({ name, type }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_unitProduct" />
            </p>
            <input
              value={data.name}
              onChange={handleChange("name")}
              placeholder={Translation({ label: "_unitProduct" })}
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
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_unit" />
            </p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel>
                <Translation label="_unit" />
              </InputLabel>
              <Select onChange={handleChange("unit")} value={data.unit}>
                {productUnits.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
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
              <Translation label="_expirationDate" />
            </p>
            <input
              type="date"
              value={data.expirationDate}
              onChange={handleChange("expirationDate")}
              placeholder={Translation({ label: "_expirationDate" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_price" />
            </p>
            <input
              type="number"
              value={data.price}
              onChange={handleChange("price")}
              placeholder={Translation({ label: "_price" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_supplier" />
            </p>
            <input
              value={data.supplier}
              onChange={handleChange("supplier")}
              placeholder={Translation({ label: "_supplier" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_dateOfEntry" />
            </p>
            <input
              type="date"
              value={data.dateOfEntry}
              onChange={handleChange("dateOfEntry")}
              placeholder={Translation({ label: "_dateOfEntry" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_lot" />
            </p>
            <input
              type="text"
              value={data.lot}
              onChange={handleChange("lot")}
              placeholder={Translation({ label: "_lot" })}
            />
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
