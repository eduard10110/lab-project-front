import AddNewProductModal from "components/addNewProductModal";
import AddNewRepositoryModal from "components/addNewRepositoryModal";
import AddNewTestModal from "components/addNewTestModal";
import ProductOutputTableRowActionBar from "components/productOutputTableRowActionBar";
import ProductTableRowActionBar from "components/productTableRowActionBar";
import TestTableRowActionBar from "components/testTableRowActionBar";
import ProductsController from "controllers/products";
import RepositoriesController from "controllers/repositories";
import TestController from "controllers/test";
import Utils from "helpers/utils";
import routes from "routes/routes";

export const HostUrls = {
  BASE_URL: "http://լաբ.հայ",
};

export const HOSTS = {
  BASE_URL: "BASE_URL",
};

export const Controllers = {
  product: "product",
  repository: "repository",
  export: "export",
  test: "test",
  makeTest: "make/makeTest",
  make: "make",
  maked: "maked",
};

export const menuNavbar = [
  {
    title: "_management",
    subCategories: [
      { title: "_repositories", path: routes.Repositories },
      { title: "_research", path: routes.Research },
    ],
  },
  {
    title: "_product",
    subCategories: [
      { title: "_productIntroduction", path: routes.ProductIntroduction },
      { title: "_productOutput", path: routes.ProductOutput },
    ],
  },
  {
    title: "_storage",
    subCategories: [
      { title: "_storages", path: routes.Storages },
      { title: "_exportedProducts", path: routes.ExportedProducts },
      { title: "_makedTests", path: routes.MakedTests },
    ],
  },
];

export const ProductIntroductionTableColumns = {
  en: [
    {
      width: 40,
      field: "id",
      headerName: "Id",
    },
    {
      width: 100,
      field: "type",
      headerName: "Type",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Quantity",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Unit",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Expiration Date",
      className: "warning",
      renderCell: ({ row }) => {
        const getClassNameFunction = () => {
          const currentDate = new Date().getTime();
          const expirationDate = new Date(row.expirationDate).getTime();
          const dateExpiring = expirationDate - currentDate > 7889400000;
          return dateExpiring ? "" : "warning";
        };
        return (
          <div className={getClassNameFunction()}>{row.expirationDate}</div>
        );
      },
    },
    {
      width: 90,
      field: "price",
      headerName: "Price",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Supplier",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Date of entry",
    },
  ],
  arm: [
    {
      width: 40,
      field: "id",
      headerName: "Հ/Հ",
    },
    {
      width: 100,
      field: "type",
      headerName: "Տեսակ",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Անվանում",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Քանակ",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Միավոր",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Պիտանելիության ժամկետ",
      className: "warning",
      renderCell: ({ row }) => {
        const getClassNameFunction = () => {
          const currentDate = new Date().getTime();
          const expirationDate = new Date(row.expirationDate).getTime();
          const dateExpiring = expirationDate - currentDate > 7889400000;
          return dateExpiring ? "" : "warning";
        };
        return (
          <div className={getClassNameFunction()}>{row.expirationDate}</div>
        );
      },
    },
    {
      width: 90,
      field: "price",
      headerName: "Գին",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Մատակարար",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Մուտքագրման ա/թ",
    },
  ],
};

const RepositoriesTableColumns = {
  en: [
    {
      width: 40,
      field: "id",
      headerName: "Id",
    },
    {
      flex: 1,
      field: "type",
      headerName: "Type",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      flex: 1,
      field: "unit",
      headerName: "Unit",
    },
  ],
  arm: [
    {
      width: 40,
      field: "id",
      headerName: "Հ/Հ",
    },
    {
      flex: 1,
      field: "type",
      headerName: "Տեսակ",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Ապրանքի անվանում",
    },
    {
      flex: 1,
      field: "unit",
      headerName: "Միավոր",
    },
  ],
};

export const StoragesTableColumns = {
  en: [
    { width: 40, field: "id", headerName: "Id" },
    {
      width: 100,
      field: "type",
      headerName: "Type",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Quantity",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Unit",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Expiration Date",
    },
    {
      width: 90,
      field: "price",
      headerName: "Price",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Supplier",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Date of entry",
    },
    { flex: 1, field: "storage", headerName: "Storage" },
  ],
  arm: [
    { width: 40, field: "id", headerName: "Հ/Հ" },
    {
      width: 100,
      field: "type",
      headerName: "Տեսակ",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Անվանում",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Քանակ",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Միավոր",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Պիտանելիության ժամկետ",
    },
    {
      width: 90,
      field: "price",
      headerName: "Գին",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Մատակարար",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Մուտքագրման ա/թ",
    },
    { flex: 1, field: "storage", headerName: "Տեղակայում" },
  ],
};

export const TEST_PAGE_COLUMNS = {
  en: [
    { flex: 1, field: "name", headerName: "Test name" },
    { flex: 1, field: "type", headerName: "Device name" },
    { flex: 1, field: "packingType", headerName: "Packing type" },
  ],
  arm: [
    { flex: 1, field: "name", headerName: "Հետազոտության անվանում" },
    { flex: 1, field: "type", headerName: "Սարքի անվանում" },
    { flex: 1, field: "packingType", headerName: "Փաթեթավորման տեսակ" },
  ],
};

export const ExportedProductsTableColumns = {
  en: [
    {
      width: 40,
      field: "id",
      headerName: "Id",
    },
    {
      width: 100,
      field: "type",
      headerName: "Type",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Quantity",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Unit",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Expiration Date",
      className: "warning",
      renderCell: ({ row }) => {
        const getClassNameFunction = () => {
          const currentDate = new Date().getTime();
          const expirationDate = new Date(row.expirationDate).getTime();
          const dateExpiring = expirationDate - currentDate > 7889400000;
          return dateExpiring ? "" : "warning";
        };
        return (
          <div className={getClassNameFunction()}>{row.expirationDate}</div>
        );
      },
    },
    {
      width: 90,
      field: "price",
      headerName: "Price",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Supplier",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Date of entry",
    },
    {
      flex: 1,
      field: "storage",
      headerName: "Storage",
    },
    {
      flex: 1,
      field: "exportedCount",
      headerName: "Exported count",
    },
  ],
  arm: [
    {
      width: 40,
      field: "id",
      headerName: "Հ/Հ",
    },
    {
      width: 100,
      field: "type",
      headerName: "Տեսակ",
    },
    {
      flex: 1,
      field: "name",
      headerName: "Անվանում",
    },
    {
      width: 70,
      field: "quantity",
      headerName: "Քանակ",
    },
    {
      width: 70,
      field: "unit",
      headerName: "Միավոր",
    },
    {
      flex: 1,
      field: "expirationDate",
      headerName: "Պիտանելիության ժամկետ",
      className: "warning",
      renderCell: ({ row }) => {
        const getClassNameFunction = () => {
          const currentDate = new Date().getTime();
          const expirationDate = new Date(row.expirationDate).getTime();
          const dateExpiring = expirationDate - currentDate > 7889400000;
          return dateExpiring ? "" : "warning";
        };
        return (
          <div className={getClassNameFunction()}>{row.expirationDate}</div>
        );
      },
    },
    {
      width: 90,
      field: "price",
      headerName: "Գին",
    },
    {
      flex: 1,
      field: "supplier",
      headerName: "Մատակարար",
    },
    {
      flex: 1,
      field: "dateOfEntry",
      headerName: "Մուտքագրման ա/թ",
    },
    {
      flex: 1,
      field: "storage",
      headerName: "Տեղակայում",
    },
    {
      flex: 1,
      field: "exportedCount",
      headerName: "Ելքագրված քանակ",
    },
  ],
};

const MakedTestsTableColumns = {
  en: [
    { flex: 1, field: "name", headerName: "Test name" },
    { flex: 1, field: "type", headerName: "Test type" },
    { flex: 1, field: "quantity", headerName: "Quantity" },
    { flex: 1, field: "dateOfEntry", headerName: "Date" },
    { flex: 1, field: "price", headerName: "Price" },
  ],
  arm: [
    { flex: 1, field: "name", headerName: "Հետազոտության անվանում" },
    { flex: 1, field: "type", headerName: "Հետազոտության տեսակ" },
    { flex: 1, field: "quantity", headerName: "Քանակ" },
    { flex: 1, field: "dateOfEntry", headerName: "Հետազոտության ամսաթիվ" },
    { flex: 1, field: "price", headerName: "Հետազոտության գին" },
  ],
};

export const PAGES_DATA = {
  ProductIntroduction: {
    pageTitle: "_productIntroduction",
    withModal: true,
    withNewButton: true,
    withExport: true,
    buttonLabel: "_new",
    tableColumns: ProductIntroductionTableColumns,
  },
  Repositories: {
    pageTitle: "_repositories",
    withModal: true,
    withNewButton: true,
    withExport: false,
    buttonLabel: "_new",
    tableColumns: RepositoriesTableColumns,
  },
  Storages: {
    pageTitle: "_storages",
    withModal: true,
    withExport: true,
    withNewButton: false,
    tableColumns: StoragesTableColumns,
  },
  ProductOutput: {
    pageTitle: "_productOutput",
    withModal: true,
    withExport: true,
    withNewButton: false,
    tableColumns: ProductIntroductionTableColumns,
  },
  Test: {
    pageTitle: "_research",
    withModal: true,
    withExport: false,
    withNewButton: true,
    buttonLabel: "_new",
    tableColumns: TEST_PAGE_COLUMNS,
  },
  ExportedProducts: {
    pageTitle: "_exportedProducts",
    withModal: false,
    withExport: true,
    withNewButton: false,
    tableColumns: ExportedProductsTableColumns,
  },
  MakedTests: {
    pageTitle: "_makedTests",
    withModal: false,
    withExport: true,
    withNewButton: false,
    tableColumns: MakedTestsTableColumns,
  },
};

export const PAGES_GET_DATA_FUNCTIONS = {
  ProductIntroduction: Utils.getProducts({ isStorageSpecified: 0 }),
  Repositories: RepositoriesController.getRepositories,
  ProductOutput: Utils.getProducts({ isStorageSpecified: 0 }),
  Storages: Utils.getProducts({ isStorageSpecified: 1 }),
  Test: TestController.getTestsData,
  ExportedProducts: Utils.ExportedProduct({ isStorageSpecified: 1 }),
  MakedTests: TestController.getMakedTests,
};

export const PAGE_EXPORT_TABLE_DATA = {
  ProductIntroduction: ProductsController.export({ isStorageSpecified: 0 }),
  Storages: ProductsController.export({ isStorageSpecified: 1 }),
  ExportedProducts: ProductsController.export({ isStorageSpecified: 1 }),
  MakedTests: TestController.exportMakedTests,
};

export const PAGES_MODALS = {
  ProductIntroduction: AddNewProductModal,
  Repositories: AddNewRepositoryModal,
  Test: AddNewTestModal,
};

export const PAGE_DELETE_ROW_ITEM = {
  ProductIntroduction: ProductsController.deleteProduct,
  Repositories: RepositoriesController.delete,
  Test: TestController.deleteTest,
};

export const TABLE_ROW_ACTION_BARS = {
  ProductIntroduction: ProductTableRowActionBar,
  Repositories: ProductTableRowActionBar,
  ProductOutput: ProductOutputTableRowActionBar,
  Storages: ProductOutputTableRowActionBar,
  Test: TestTableRowActionBar,
  MakedTests: null,
};
