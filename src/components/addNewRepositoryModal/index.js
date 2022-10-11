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
import RepositoriesController from "controllers/repositories";
import { productTypes } from "helpers/enums";
import { useEffect, useState } from "react";

export default function AddNewRepositoryModal({
  open,
  handleClose,
  updatableData,
  getData,
}) {
  const [data, setData] = useState({ name: "", type: "" });

  const handleChange = (id) => (e) => {
    console.log("Hello");
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
            <h3>Ապրանքի անվանում</h3>
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon className="close-icon" />
          </IconButton>
        </div>
        <div className="anp-form-wrapper">
          <div className="product-form-item-wrapper">
            <p>Ապրանքի Անվանում</p>
            <input
              onChange={handleChange("name")}
              type="text"
              placeholder="Ապրանքի Անվանում"
            />
          </div>
          <div className="product-form-item-wrapper">
            <p>Տեսակ</p>
            <FormControl className="anp-select" fullWidth>
              <InputLabel size="8px">Տեսակ</InputLabel>
              <Select onChange={handleChange("type")} value={data.type}>
                {productTypes.map(({ label, id }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
