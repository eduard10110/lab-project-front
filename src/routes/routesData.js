import { lazy } from "react";
import routes from "./routes";

const routesData = [
  {
    Title: "Home",
    path: routes.Home,
    exact: true,
    Comp: lazy(() => import("pages/home")),
  },
  {
    Title: "ProductIntroduction",
    path: routes.ProductIntroduction,
    exact: true,
    Comp: lazy(() => import("pages/productIntroduction")),
    props: { pageId: "ProductIntroduction" },
  },
];

export default routesData;
