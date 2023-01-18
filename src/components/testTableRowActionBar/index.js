import React, { useState } from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import GetPossibleTestsModal from "components/getPossibleTestModal";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MakeTestModal from "components/makeTestModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TestTableRowActionBar(props) {
  const [possibleTestsModalOpened, setPossibleTestsModalOpened] =
    useState(false);
  const [makeTestModalOpened, setMakeTestModalOpened] = useState(false);
  const { row, getData, handleEdit, deleteProduct } = props;

  const handleOpenPossibleTestsModal = () => setPossibleTestsModalOpened(true);

  const handleClosePossibleTestsModal = () =>
    setPossibleTestsModalOpened(false);

  const handleOpenMakeTestModal = () => setMakeTestModalOpened(true);

  const handleCloseMakeTestModal = () => setMakeTestModalOpened(false);

  const handleDelete = async () => {
    await deleteProduct(row._id);
    await getData();
  };

  return (
    <>
      {makeTestModalOpened && (
        <MakeTestModal
          open={makeTestModalOpened}
          handleClose={handleCloseMakeTestModal}
          getData={getData}
          test={row}
        />
      )}
      <GetPossibleTestsModal
        open={possibleTestsModalOpened}
        handleClose={handleClosePossibleTestsModal}
        getData={getData}
        testId={row._id}
      />
      <div className="table-icons-wrapper">
        <div
          onClick={handleOpenPossibleTestsModal}
          className="table-icon-item settings-icon"
        >
          <ContentPasteSearchIcon
            titleAccess="Կանխատեստել"
            sx={{ color: "white" }}
          />
        </div>
      </div>
      <div className="table-icons-wrapper">
        <div
          onClick={handleOpenMakeTestModal}
          className="table-icon-item settings-icon"
        >
          <DoneAllIcon titleAccess="Կատարել" sx={{ color: "white" }} />
        </div>
      </div>
      <div className="table-icons-wrapper">
        <div
          className="edit-icon-wrapper table-icon-item"
          onClick={handleEdit(row)}
        >
          <EditIcon titleAccess="Խմբագրել" sx={{ color: "white" }} />
        </div>
      </div>
      <div className="table-icons-wrapper">
        <div
          onClick={handleDelete}
          className="delete-icon-wrapper table-icon-item"
        >
          <DeleteIcon titleAccess="Ջնջել" sx={{ color: "white" }} />
        </div>
      </div>
    </>
  );
}
