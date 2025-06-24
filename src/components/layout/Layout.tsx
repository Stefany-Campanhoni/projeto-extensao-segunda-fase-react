import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import "./layout.css"

export function Layout() {
  return (
    <div className="app-layout">
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
