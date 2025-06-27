import { LoadingSpinner } from "@components/loading/LoadingSpinner"
import { useAuth } from "@security/contexts/AuthContext"
import { Role } from "@security/types/auth.types"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

type ProtectedRouteProps = {
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

type PublicRouteProps = {
  children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
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
