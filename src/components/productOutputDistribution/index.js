/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
} from "@mui/material";
import Translation from "components/translation";
import { storages } from "helpers/enums";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ProductsController from "controllers/products";

export default function ProductOutputDistribution({
  open,
  handleClose,
  product,
  getData,
}) {
  const [rejection, setRejection] = useState(false);
  const [data, setData] = useState({
    quantity: 0,
    storage: "",
    dateOfEntry: "",
  });

  const handleChange = (id) => (e) =>
    setData({ ...data, [id]: e.target.value });

  const handleRejectionSelect = (e) => setRejection(e.target.checked);

  useEffect(() => {
    setData({ ...data, storage: rejection ? "storage3" : "" });
  }, [rejection]);

  const handleSubmit = async () => {
    const newProductData = {
      ...product,
      quantity: product.quantity - data.quantity,
    };
    delete newProductData._id;
    const updatableProduct = {
      ...product,
      quantity: data.quantity,
      dateOfDistribution: data.dateOfEntry,
      storage: data.storage,
    };
    await ProductsController.updateProduct(updatableProduct);
    await ProductsController.createNewProduct(newProductData);
    await getData();
    handleClose("distribution")();
  };

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal product-distribution-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_productDistribution" />
            </h3>
          </div>
          <IconButton onClick={handleClose("distribution")}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_dateOfExit" />
            </p>
            <input
              type="date"
              value={data.dateOfEntry}
              onChange={handleChange("dateOfEntry")}
              placeholder={Translation({ label: "_dateOfExit" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_outputQuantity" />
            </p>
            <input
              onChange={handleChange("quantity")}
              value={data.quantity}
              type="number"
              placeholder={Translation({ label: "_outputQuantity" })}
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_subStorage" />
            </p>
            <FormControl disabled={rejection} className="anp-select" fullWidth>
              <InputLabel size="8px">
                <Translation label="_subStorage" />
              </InputLabel>
              <Select onChange={handleChange("storage")} value={data.storage}>
                {storages.map(({ label, id, disabled }) => (
                  <MenuItem key={id} value={id} disabled={disabled}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_rejection" />
            </p>
            <div className="switcher-wrapper">
              <Switch value={rejection} onChange={handleRejectionSelect} />
            </div>
          </div>
        </div>
        <div className="anp-buttons-wrapper">
          <div>
            <button className="anp-submit-button" onClick={handleSubmit}>
              <Translation label="_submit" /> <DoneIcon />
            </button>
            <button
              className="anp-cancel-button"
              onClick={handleClose("distribution")}
            >
              <Translation label="_cancel" /> <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
