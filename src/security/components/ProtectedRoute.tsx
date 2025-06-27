import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import { useAuth } from "@security/contexts/AuthContext"
import { Role } from "@security/types/auth.types"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: Role
  requireAuth?: boolean
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
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

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  // If specific role is required but user doesn't have it
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

interface PublicRouteProps {
  children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
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

  // If user is already authenticated and trying to access login page, redirect them
  if (isAuthenticated && location.pathname === "/login") {
    const from = (location.state as any)?.from?.pathname || "/dashboard"
    return (
      <Navigate
        to={from}
        replace
      />
    )
  }

  return <>{children}</>
}
