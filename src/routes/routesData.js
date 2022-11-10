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
  {
    Title: "Product Output",
    path: routes.ProductOutput,
    exact: true,
    Comp: lazy(() => import("pages/productIntroduction")),
    props: { pageId: "ProductOutput" },
  },
  {
    Title: "Storages",
    path: routes.Storages,
    exact: true,
    Comp: lazy(() => import("pages/productIntroduction")),
    props: { pageId: "Storages" },
  },
  {
    Title: "Test",
    path: routes.Research,
    exact: true,
    Comp: lazy(() => import("pages/productIntroduction")),
    props: { pageId: "Test" },
  },
];

export default routesData;
