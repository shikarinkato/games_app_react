import React from "react";
import Loader from "./Loader";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";

const StoreComponents = () => {
  const GamesSale = lazy(() => import("./GamesSale"));
  const navigate = useNavigate();
  return (
    <div className=" storecomponents  flex flex-col">
      <ErrorBoundary
        FallbackComponent={<ErrorPage />}
        onReset={() => navigate("/store")}
      >
        <Suspense fallback={<Loader />}>
          <GamesSale />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default StoreComponents;
