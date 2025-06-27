import { del, get, post, put } from "@api/api"
import { useAuth } from "@security/contexts/AuthContext"

export function useAuthenticatedApi() {
  const { user, logout } = useAuth()

  const getAuthHeaders = (): HeadersInit => {
    if (user?.token) {
      return {
        Authorization: `Bearer ${user.token}`,
      }
    }
    return {}
  }

  const handleUnauthorized = (error: any) => {
    if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
      logout()
      throw new Error("Session expired. Please login again.")
    }
    throw error
  }

  const authenticatedGet = async <TResponse>(uri: string): Promise<TResponse> => {
    try {
      return await get<TResponse>(uri, getAuthHeaders())
    } catch (error) {
      handleUnauthorized(error)
      throw error
    }
  }

  const authenticatedPost = async <TResponse, TBody = TResponse>(
    uri: string,
    body: TBody,
  ): Promise<TResponse> => {
    try {
      return await post<TResponse, TBody>(uri, body, getAuthHeaders())
    } catch (error) {
      handleUnauthorized(error)
      throw error
    }
  }

  const authenticatedPut = async <TResponse, TBody = TResponse>(
    uri: string,
    body: TBody,
  ): Promise<TResponse> => {
    try {
      return await put<TResponse, TBody>(uri, body, getAuthHeaders())
    } catch (error) {
      handleUnauthorized(error)
      throw error
    }
  }

  const authenticatedDelete = async <TResponse = void>(uri: string): Promise<TResponse> => {
    try {
      return await del<TResponse>(uri, getAuthHeaders())
    } catch (error) {
      handleUnauthorized(error)
      throw error
    }
  }

  return {
    get: authenticatedGet,
    post: authenticatedPost,
    put: authenticatedPut,
    delete: authenticatedDelete,
  }
}
