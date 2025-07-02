import { del, get, post, put } from "@api/api"
import { useAuth } from "@security/contexts/AuthContext"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

const TOKEN_STORAGE_KEY = "auth_token"

export function useAuthenticatedApi() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = user?.token || localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      console.debug("Using authentication token for API request")
      return {
        Authorization: `Bearer ${token}`,
      }
    }
    console.warn("No authentication token found")
    return {}
  }, [user?.token])

  const handleUnauthorized = useCallback(
    (error: any) => {
      // Check for various forms of unauthorized errors
      if (
        error.message?.includes("401") ||
        error.message?.includes("403") ||
        error.message?.includes("Unauthorized") ||
        error.message?.includes("Forbidden") ||
        (error.status && (error.status === 401 || error.status === 403))
      ) {
        console.warn("Authentication failed, logging out user")
        logout()
        navigate("/public") // Redirect to public view after logout
        throw new Error("Session expired. Please login again.")
      }
      throw error
    },
    [logout, navigate],
  )

  const authenticatedGet = useCallback(
    async <TResponse>(uri: string): Promise<TResponse> => {
      try {
        return await get<TResponse>(uri, getAuthHeaders())
      } catch (error) {
        handleUnauthorized(error)
        throw error
      }
    },
    [getAuthHeaders, handleUnauthorized],
  )

  const authenticatedPost = useCallback(
    async <TResponse, TBody = TResponse>(uri: string, body: TBody): Promise<TResponse> => {
      try {
        return await post<TResponse, TBody>(uri, body, getAuthHeaders())
      } catch (error) {
        handleUnauthorized(error)
        throw error
      }
    },
    [getAuthHeaders, handleUnauthorized],
  )

  const authenticatedPut = useCallback(
    async <TResponse, TBody = TResponse>(uri: string, body: TBody): Promise<TResponse> => {
      try {
        return await put<TResponse, TBody>(uri, body, getAuthHeaders())
      } catch (error) {
        handleUnauthorized(error)
        throw error
      }
    },
    [getAuthHeaders, handleUnauthorized],
  )

  const authenticatedDelete = useCallback(
    async <TResponse = void>(uri: string): Promise<TResponse> => {
      try {
        return await del<TResponse>(uri, getAuthHeaders())
      } catch (error) {
        handleUnauthorized(error)
        throw error
      }
    },
    [getAuthHeaders, handleUnauthorized],
  )

  return useMemo(
    () => ({
      get: authenticatedGet,
      post: authenticatedPost,
      put: authenticatedPut,
      delete: authenticatedDelete,
    }),
    [user?.token],
  ) // Only re-create when the token changes
}
