/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import excelIcon from "assets/images/excel-icon.png";
import Translation from "components/translation";
import {
  PAGES_DATA,
  PAGES_GET_DATA_FUNCTIONS,
  PAGES_MODALS,
  PAGE_DELETE_ROW_ITEM,
  PAGE_EXPORT_TABLE_DATA,
  TABLE_ROW_ACTION_BARS,
} from "helpers/constants";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { translationIdSelector } from "store/selectors/app";

export default function ProductIntroduction({ pageId }) {
  const CurrentPageRowActionBar = TABLE_ROW_ACTION_BARS[pageId];
  const tableRowActionBar = {
    field: "actions",
    headerName: "",
    renderCell: (params) => (
      <CurrentPageRowActionBar
        {...params}
        handleEdit={handleAddNewProduct}
        getData={getData}
        deleteProduct={PAGE_DELETE_ROW_ITEM[pageId]}
      />
    ),
  };
  const {
    withNewButton,
    buttonLabel,
    tableColumns,
    withExport,
    withModal,
    pageTitle,
  } = PAGES_DATA[pageId];
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
  const translationId = useSelector(translationIdSelector, shallowEqual);

  const getData = async () => {
    PAGES_GET_DATA_FUNCTIONS[pageId]().then((res) =>
      !res?.hasError
        ? setRows(res.data?.map((elem, index) => ({ ...elem, id: index + 1 })))
        : setRows([])
    );
  };

  useEffect(() => {
    pageId && getData();
  }, [pageId]);

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

  const handleExport = () => PAGE_EXPORT_TABLE_DATA[pageId]();

  const getTableColumns = () => {
    const columns = CurrentPageRowActionBar
      ? [...tableColumns[translationId], tableRowActionBar]
      : tableColumns[translationId];
    return columns;
  };

  const CurrentModal = PAGES_MODALS[pageId];
  return (
    <>
      {withModal && addNewProductModal.open && (
        <CurrentModal
          {...addNewProductModal}
          handleClose={closeAddNewProductModal}
          getData={getData}
        />
      )}
      <div className="page-wrapper">
        <div className="ProductIntroduction-header-wrapper">
          <div className="circle-white"></div>
          <p>
            <Translation label={pageTitle} />
          </p>
        </div>
        <div className="table-header-actions-wrapper">
          <div>
            {withNewButton && (
              <button
                onClick={handleAddNewProduct()}
                variant="outlined"
                className="create-new-product-btn"
              >
                <Translation label={buttonLabel} />
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
              <p>
                <Translation label="_note" />
              </p>
            </div>
          </div>
          <div>
            <input
              placeholder={Translation({ label: "_search" })}
              type="search"
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            {withExport && (
              <button onClick={handleExport} className="download-btn">
                <Translation label="_export" />
                <img className="excel-icon" src={excelIcon} alt="excelIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="table-wrapper">
          <DataGrid columns={getTableColumns()} rows={rows} />
        </div>
      </div>
    </>
  );
}
