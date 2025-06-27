import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { loginApi } from "../api/auth.api"
import type { AuthContextType, AuthState, LoginRequest, MentorResponse } from "../types/auth.types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "auth_user"
const TOKEN_STORAGE_KEY = "auth_token"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (storedUser && storedToken) {
      try {
        const user: MentorResponse = JSON.parse(storedUser)
        setAuthState({
          user,
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

      // Store user data and token
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

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
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
