import Utils from "helpers/utils";
import routes from "routes/routes";

export const HostUrls = {
  BASE_URL: "http://38.242.198.147:9164",
};

export const HOSTS = {
  BASE_URL: "BASE_URL",
};

export const Controllers = {
  product: "product",
};

export const menuNavbar = [
  {
    title: "կառավարում",
    subCategories: [
      { title: "Շտեմարաններ", path: routes.Repositories },
      { title: "Ապրանքի անվանում", path: routes.ProductName },
      { title: "Հետազոտություն", path: routes.Research },
    ],
  },
  {
    title: "Ապրանք",
    subCategories: [
      { title: "Ապրանքի Մուտք", path: routes.ProductIntroduction },
      //   { title: "Բաշխում", path: routes.Distribution },
      { title: "Ապրանքի Ելք", path: routes.ProductOutput },
      { title: "Խոտանում", path: routes.Rejection },
    ],
  },
  {
    title: "Պահեստ",
    subCategories: [
      { title: "Հիմնական պահեստ", path: routes.MainStorage },
      { title: "Ենթապահեստ", path: routes.SubStore },
      { title: "Թափոնների պահեստ", path: routes.WasteStorage },
    ],
  },
];

export const ProductIntroductionTableColumns = [
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
    headerName: "Անվանում",
  },
  {
    flex: 1,
    field: "quantity",
    headerName: "Քանակ",
  },
  {
    flex: 1,
    field: "id5",
    headerName: "Միավոր",
  },
  {
    flex: 1,
    field: "id6",
    headerName: "Պիտանելիության ժամկետ",
  },
  {
    flex: 1,
    field: "id7",
    headerName: "Գին",
  },
  {
    flex: 1,
    field: "id8",
    headerName: "Մատակարար",
  },
  {
    flex: 1,
    field: "id9",
    headerName: "Մուտքագրման ա/թ",
  },
];

export const PAGES_DATA = {
  ProductIntroduction: {
    withNewButton: true,
    buttonLabel: "Նոր + ",
    tableColumns: ProductIntroductionTableColumns,
  },
};

export const PAGES_GET_DATA_FUNCTIONS = {
  ProductIntroduction: Utils.getProducts,
};
