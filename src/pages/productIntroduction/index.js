/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import excelIcon from "assets/images/excel-icon.png";
import AddNewProductModal from "components/addNewProductModal";
import { PAGES_GET_DATA_FUNCTIONS, PAGES_DATA } from "helpers/constants";
import { useEffect, useState } from "react";

export default function ProductIntroduction({ pageId }) {
  const { withNewButton, buttonLabel, tableColumns } = PAGES_DATA[pageId];
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tablePaginationSettings, setTablePaginationSettings] = useState({
    rowsPerPageOptions: [10, 25, 50],
    pageSize: 10,
  });

  useEffect(() => {
    PAGES_GET_DATA_FUNCTIONS[pageId]().then((res) => console.log(res));
  }, []);

  const handlePageSizeChange = (e) =>
    setTablePaginationSettings({
      ...tablePaginationSettings,
      pageSize: e.target.value,
    });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddNewProduct = () => {
    setAddNewProductModal(true);
  };

  const closeAddNewProductModal = () => setAddNewProductModal(false);

  return (
    <>
      {addNewProductModal && (
        <AddNewProductModal
          open={addNewProductModal}
          handleClose={closeAddNewProductModal}
        />
      )}
      <div className="page-wrapper">
        <div className="ProductIntroduction-header-wrapper">
          <div className="circle-white"></div>
          <p>Ապրանքի Մուտք</p>
        </div>
        <div className="table-header-actions-wrapper">
          <div>
            {withNewButton && (
              <button
                onClick={handleAddNewProduct}
                variant="outlined"
                className="create-new-product-btn"
              >
                {buttonLabel}
              </button>
            )}
            <div className="table-page-size-dropdown-wrapper">
              <div className="table-page-size-dropdown-wrapper-inner">
                <FormControl fullWidth>
                  <Select
                    className="table-page-size-dropdown"
                    value={tablePaginationSettings.pageSize}
                    onChange={handlePageSizeChange}
                  >
                    {tablePaginationSettings.rowsPerPageOptions.map((elem) => (
                      <MenuItem value={elem}>{elem}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <p>գրառում</p>
            </div>
          </div>
          <div>
            <input
              placeholder="Որոնում"
              type="search"
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="download-btn">
              Արտահանել{" "}
              <img className="excel-icon" src={excelIcon} alt="excelIcon" />
            </button>
          </div>
        </div>
        <div className="table-wrapper">
          <DataGrid columns={tableColumns} rows={[]} />
        </div>
      </div>
    </>
  );
}
