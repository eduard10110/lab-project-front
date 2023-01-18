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
import RepositoriesController from "controllers/repositories";
import { productTypes, productUnits } from "helpers/enums";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { translationIdSelector } from "store/selectors/app";

export default function AddNewRepositoryModal({
  open,
  handleClose,
  updatableData,
  getData,
}) {
  const [data, setData] = useState({ name: "", type: "", unit: "" });
  const translationId = useSelector(translationIdSelector);

  const handleChange = (id) => (e) => {
    setData({ ...data, [id]: e.target.value });
  };

  useEffect(() => {
    if (updatableData) {
      setData(updatableData);
    }
  }, []);

  const addNewProduct = async () => {
    updatableData
      ? await RepositoriesController.update(data)
      : await RepositoriesController.create(data);
    await getData();
  };

  const handleAddAndContinue = async () => {
    await addNewProduct();
    setData({ type: "", name: "" });
  };

  const handleAddNewProduct = async () => {
    await addNewProduct();
    handleClose();
  };
  return (
    <Modal open={open}>
      <div className="add-newProduct-modal new-repository-modal">
        <div className="add-new-product-header-wrapper">
          <div>
            <div className="circle-white"></div>
            <h3>
              <Translation label="_productName" />
            </h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>
              <Translation label="_productName" />
            </p>
            <input
              onChange={handleChange("name")}
              value={data.name}
              type="text"
              placeholder={Translation({ label: "_productName" })}
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
              <Select onChange={handleChange("type")} value={data.type}>
                {productTypes.map(({ label, id }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                {productUnits[translationId].map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
