import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { loginApi } from "../api/auth.api"
import type { AuthContextType, AuthState, LoginRequest, MentorResponse } from "../types/auth.types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "auth_user"
const TOKEN_STORAGE_KEY = "auth_token"
const LAST_VISITED_KEY = "last_visited_page"

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
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (storedUser && storedToken) {
      try {
        const user: MentorResponse = JSON.parse(storedUser)
        const userWithToken = { ...user, token: storedToken }
        setAuthState({
          user: userWithToken,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      const response = await loginApi(credentials)

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response))
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token)

      setAuthState({
        user: response,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(LAST_VISITED_KEY)

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const setLastVisitedPage = (path: string): void => {
    if (path !== "/login" && path !== "/" && !path.startsWith("/login")) {
      localStorage.setItem(LAST_VISITED_KEY, path)
    }
  }

  const getLastVisitedPage = (): string | null => {
    return localStorage.getItem(LAST_VISITED_KEY)
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
