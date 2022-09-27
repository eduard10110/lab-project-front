/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import excelIcon from "assets/images/excel-icon.png";
import AddNewProductModal from "components/addNewProductModal";
import TableActionBarIcons from "components/tableActionBarIcons";
import { PAGES_DATA, PAGES_GET_DATA_FUNCTIONS } from "helpers/constants";
import { useEffect, useMemo, useState } from "react";

export default function ProductIntroduction({ pageId }) {
  const tableRowActionBar = {
    field: "actions",
    headerName: "",
    renderCell: (params) => (
      <TableActionBarIcons
        {...params}
        handleEdit={handleAddNewProduct}
        getData={getData}
      />
    ),
  };
  const { withNewButton, buttonLabel, tableColumns, withExport } =
    PAGES_DATA[pageId];
  const [rows, setRows] = useState([]);
  const [addNewProductModal, setAddNewProductModal] = useState({
    open: false,
    updatableData: null,
  });
  const [search, setSearch] = useState("");
  const [tablePaginationSettings, setTablePaginationSettings] = useState({
    rowsPerPageOptions: [10, 25, 50],
    pageSize: 10,
  });

  const getData = async () => {
    PAGES_GET_DATA_FUNCTIONS[pageId]().then((res) =>
      !res?.hasError
        ? setRows(res.data?.map((elem, index) => ({ ...elem, id: index + 1 })))
        : setRows([])
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageSizeChange = (e) =>
    setTablePaginationSettings({
      ...tablePaginationSettings,
      pageSize: e.target.value,
    });

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddNewProduct =
    (updatableData = null) =>
    () => {
      setAddNewProductModal({ open: true, updatableData });
    };

  const closeAddNewProductModal = () =>
    setAddNewProductModal({ open: false, updatableData: null });

  const tableColumnsFinally = useMemo(
    () => [...tableColumns, tableRowActionBar],
    []
  );

  return (
    <>
      {addNewProductModal.open && (
        <AddNewProductModal
          {...addNewProductModal}
          handleClose={closeAddNewProductModal}
          getData={getData}
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
                onClick={handleAddNewProduct()}
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
            {withExport && (
              <button className="download-btn">
                Արտահանել{" "}
                <img className="excel-icon" src={excelIcon} alt="excelIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="table-wrapper">
          <DataGrid columns={tableColumnsFinally} rows={rows} />
        </div>
      </div>
    </>
  );
}
