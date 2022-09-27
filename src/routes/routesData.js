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
  {
    Title: "Repositories",
    path: routes.Repositories,
    exact: true,
    Comp: lazy(() => import("pages/productIntroduction")),
    props: { pageId: "Repositories" },
  },
];

export default routesData;
