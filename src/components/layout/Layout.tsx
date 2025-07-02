import backg from "@assets/backg.png"
import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import { useAuth } from "@security/contexts/AuthContext"
import { Suspense, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "./layout.css"

export function Layout() {
  const location = useLocation()
  const { setLastVisitedPage } = useAuth()

  useEffect(() => {
    setLastVisitedPage(location.pathname)
  }, [location.pathname, setLastVisitedPage])

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
