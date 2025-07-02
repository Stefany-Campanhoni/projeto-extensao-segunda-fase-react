import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import { useAuth } from "@security/hooks/useAuth"
import { Role } from "@security/types/auth.types"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

type RouteProps = {
  children: ReactNode
  requiredRole?: Role
  requireAuth?: boolean
  isPublicRoute?: boolean
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireAuth = true,
  isPublicRoute = false,
}: RouteProps) {
  const { isAuthenticated, user, isLoading, getLastVisitedPage } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <LoadingSpinner />
      </div>
    )
  }

  // Handle public routes when user is authenticated (like login page)
  if (isPublicRoute && isAuthenticated && location.pathname === "/login") {
    const fromState = (location.state as { from?: { pathname: string } })?.from?.pathname
    const lastVisited = getLastVisitedPage()
    const redirectTo = fromState || lastVisited || "/dashboard"
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    )
  }

  // Handle protected routes
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  if (requiredRole && (!user || user.role !== requiredRole)) {
    return (
      <Navigate
        to="/public"
        replace
      />
    )
  }

  return <>{children}</>
}

// Simplified alias for public routes
export function PublicRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute
      requireAuth={false}
      isPublicRoute={true}
    >
      {children}
    </ProtectedRoute>
  )
}
