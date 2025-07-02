import backg from "@assets/backg.png"
import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import { useNavigationTracking } from "@security/hooks/useNavigationTracking"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import "./layout.css"

export function Layout() {
  useNavigationTracking()

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
  )
}
