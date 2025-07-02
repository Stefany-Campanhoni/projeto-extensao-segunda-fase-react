import { login as loginApi, setLogoutCallback } from "@api/api"
import { useEffect, useState, type ReactNode } from "react"
import type { AuthState, LoginRequest, MentorResponse } from "../types/auth.types"
import { AuthContext, type AuthContextType } from "./AuthContextDef"

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      try {
        const user: MentorResponse = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        localStorage.removeItem("auth_user")
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (credentials: LoginRequest): Promise<void> => {
    const user = await loginApi(credentials)
    localStorage.setItem("auth_user", JSON.stringify(user))
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const logout = (): void => {
    localStorage.removeItem("auth_user")
    localStorage.removeItem("last_visited_page")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  // Register logout callback with API interceptor
  useEffect(() => {
    setLogoutCallback(logout)
  }, [])

  const setLastVisitedPage = (path: string): void => {
    if (path !== "/login" && path !== "/" && !path.startsWith("/login")) {
      localStorage.setItem("last_visited_page", path)
    }
  }

  const getLastVisitedPage = (): string | null => {
    return localStorage.getItem("last_visited_page")
  }

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    setLastVisitedPage,
    getLastVisitedPage,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
