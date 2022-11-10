import { IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Translation from "components/translation";
import DoneIcon from "@mui/icons-material/Done";
import TestController from "controllers/test";

export default function GetPossibleTestsModal({ open, handleClose, testId }) {
  const [data, setData] = useState({ expirationDate: "" });
  const [responseLabel, setResponseLabel] = useState("");

  const handleChange = (id) => (e) =>
    setData({ ...data, [id]: e.target.value });

  const handleForecast = async () => {
    const response = await TestController.getPossibleTests(data, testId);
    setResponseLabel(response.data?.count || response.data.errorMassage);
  };

  return (
    <Modal open={open}>
      <div className="add-newProduct-modal possible-tests-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_researchForecast" />
            </h3>
            <IconButton onClick={handleClose}>
              <CloseIcon className="close-icon" />
            </IconButton>
          </div>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_testDateOfEntry" />
            </p>
            <input
              type="date"
              value={data.expirationDate}
              onChange={handleChange("expirationDate")}
              placeholder={Translation({ label: "_testDateOfEntry" })}
            />
          </div>
        </div>
        <div className="response-wrapper">
          <p>{responseLabel}</p>
        </div>
        <div className="anp-buttons-wrapper">
          <button className="anp-submit-button" onClick={handleForecast}>
            <Translation label="_forecast" /> <DoneIcon />
          </button>
          <button className="anp-cancel-button" onClick={handleClose}>
            <Translation label="_cancel" /> <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}
