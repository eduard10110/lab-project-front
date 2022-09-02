import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesData from "routes/routesData";

export default function RoutesBuilder() {
  return (
    <Suspense>
      <Routes>
        {routesData.map(({ exact, path, Comp, props }, index) => (
          <Route
            key={index}
            exact={exact}
            path={path}
            element={<Comp {...props} />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}
