import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Modal } from "@mui/material";
import Translation from "components/translation";
import ProductsController from "controllers/products";
import { useState } from "react";

export default function ProductOutputModal({
  open,
  onClose,
  product,
  getData,
}) {
  const [data, setData] = useState({ quantity: 0, outputDescription: "" });

  const handleChange = (id) => (e) =>
    setData({ ...data, [id]: e.target.value });

  const handleAddNewProduct = async () => {
    await ProductsController.updateProduct({
      ...product,
      quantity: product.quantity - data.quantity,
    });
    await getData();
    onClose("output")();
  };

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal new-repository-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_productOutput" />
            </h3>
          </div>
          <IconButton onClick={onClose("output")}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
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
              <Translation label="_outputDescription" />
            </p>
            <input
              onChange={handleChange("outputDescription")}
              value={data.outputDescription}
              type="text"
              placeholder={Translation({ label: "_outputDescription" })}
            />
          </div>
        </div>
        <div className="anp-buttons-wrapper">
          <button className="anp-submit-button" onClick={handleAddNewProduct}>
            <Translation label="_submit" /> <DoneIcon />
          </button>
          <button className="anp-cancel-button" onClick={onClose("output")}>
            <Translation label="_cancel" /> <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}
