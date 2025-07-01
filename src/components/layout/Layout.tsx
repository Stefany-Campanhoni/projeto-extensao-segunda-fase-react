import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { LoadingSpinner } from "@components/loading/LoadingSpinner";
import backg from "@assets/backg.png";
import "./layout.css";

export function Layout() {
  return (
    <div
      className="app-layout"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
}