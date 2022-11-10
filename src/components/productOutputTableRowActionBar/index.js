import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductOutputModal from "components/productOutputModal";
import ProductOutputDistribution from "components/productOutputDistribution";

export default function ProductOutputTableRowActionBar(props) {
  const { row, getData } = props;
  const [modals, setModals] = useState({ distribution: false, output: false });

  const handleOpenModal = (id) => () => setModals({ ...modals, [id]: true });

  const handleCloseModal = (id) => () => setModals({ ...modals, [id]: false });

  return (
    <>
      {modals.output && (
        <ProductOutputModal
          product={row}
          open={modals.output}
          onClose={handleCloseModal}
          getData={getData}
        />
      )}

      {modals.distribution && (
        <ProductOutputDistribution
          open={modals.distribution}
          product={row}
          handleClose={handleCloseModal}
          getData={getData}
        />
      )}

      <div className="table-icons-wrapper">
        <div
          onClick={handleOpenModal("distribution")}
          className="table-icon-item settings-icon"
        >
          <SettingsIcon titleAccess="Բաշխում" sx={{ color: "white" }} />
        </div>
        <div
          onClick={handleOpenModal("output")}
          className="table-icon-item delete-icon-wrapper"
        >
          <RemoveIcon titleAccess="ելքագրում" sx={{ color: "white" }} />
        </div>
      </div>
    </>
  );
}
