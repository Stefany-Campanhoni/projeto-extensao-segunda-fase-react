import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export function useNavigationTracking() {
  const location = useLocation()
  const { setLastVisitedPage, isAuthenticated } = useAuth()

  useEffect(() => {
    // Only track navigation for authenticated users
    // and exclude certain paths that shouldn't be tracked
    if (isAuthenticated) {
      const pathsToExclude = ["/login", "/", ""]
      const currentPath = location.pathname

      // Don't track navigation to public or login pages
      if (!pathsToExclude.includes(currentPath) && !currentPath.startsWith("/login")) {
        setLastVisitedPage(currentPath)
      }
    }
  }, [location.pathname, isAuthenticated, setLastVisitedPage])
}
