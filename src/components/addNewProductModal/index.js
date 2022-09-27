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
import ProductsController from "controllers/products";
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
};

export default function AddNewProductModal({
  open,
  handleClose,
  updatableData,
  getData,
}) {
  const [data, setData] = useState({
    name: "",
    type: "",
    quantity: 0,
    unit: "",
    expirationDate: "",
    price: "",
    supplier: "",
    dateOfEntry: "",
  });

  useEffect(() => {
    if (updatableData)
      setData({
        ...updatableData,
        dateOfEntry: updatableData.dateOfEntry?.split("T")[0],
        expirationDate: updatableData.expirationDate?.split("T")[0],
      });
  }, []);

  const handleChange = (id) => (e) => {
    setData({ ...data, [id]: e.target.value });
  };

  const addNewProduct = async () => {
    const newData = { ...data };
    newData.dateOfEntry = moment(newData.dateOfEntry).format("MM/DD/YYYY");
    newData.expirationDate = moment(newData.expirationDate).format(
      "MM/DD/YYYY"
    );
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

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>Ապրանքի մուտք</h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>Անվանում</p>
            <input
              value={data.name}
              onChange={handleChange("name")}
              placeholder="անվանում"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Տեսակ</p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">Տեսակ</InputLabel>
              <Select onChange={handleChange("type")} value={data.type}>
                <MenuItem value="reagent">Ռեագենտ</MenuItem>
                <MenuItem value="consumable">Սպառվող</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>Քանակ</p>
            <input
              type="number"
              value={data.quantity}
              onChange={handleChange("quantity")}
              placeholder="քանակ"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Միավոր</p>
            <input
              value={data.unit}
              onChange={handleChange("unit")}
              placeholder="Միավոր"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Պիտանելիության ժամկետ</p>
            <input
              type="date"
              value={data.expirationDate}
              onChange={handleChange("expirationDate")}
              placeholder="Պիտանելիության ժամկետ"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Գին</p>
            <input
              type="number"
              value={data.price}
              onChange={handleChange("price")}
              placeholder="Գին"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Մատակարար</p>
            <input
              value={data.supplier}
              onChange={handleChange("supplier")}
              placeholder="Մատակարար"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Մուտքագրման ա/թ</p>
            <input
              type="date"
              value={data.dateOfEntry}
              onChange={handleChange("dateOfEntry")}
              placeholder="Մուտքագրման ա/թ"
            />
          </div>
        </div>
        <div className="anp-buttons-wrapper">
          <button onClick={handleAddAndContinue} className="anp-add-button">
            Ավելացնել <AddIcon />
          </button>
          <button className="anp-submit-button" onClick={handleAddNewProduct}>
            Հաստատել <DoneIcon />
          </button>
          <button className="anp-cancel-button" onClick={handleClose}>
            Չեղարկել <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}
