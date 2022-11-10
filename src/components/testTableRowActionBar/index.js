import React, { useState } from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import GetPossibleTestsModal from "components/getPossibleTestModal";

export default function TestTableRowActionBar(props) {
  const [modalOpened, setModalOpened] = useState(false);
  const { row, getData } = props;

  const handleOpenModal = () => setModalOpened(true);

  const handleCloseModal = () => setModalOpened(false);

  return (
    <>
      <GetPossibleTestsModal
        open={modalOpened}
        handleClose={handleCloseModal}
        getData={getData}
        testId={row._id}
      />
      <div className="table-icons-wrapper">
        <div
          onClick={handleOpenModal}
          className="table-icon-item settings-icon"
        >
          <ContentPasteSearchIcon sx={{ color: "white" }} />
        </div>
      </div>
    </>
  );
}
