import axios, { AxiosError, AxiosRequestConfig } from "axios"

const BASE_PATH = "http://localhost:8080"

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_PATH,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function get<TResponse>(
  uri: string,
  headers: Record<string, string> = {},
): Promise<TResponse> {
  try {
    const config: AxiosRequestConfig = {
      headers,
    }
    const response = await apiClient.get<TResponse>(uri, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
    throw error
  }
}

export async function post<TResponse, TBody = TResponse>(
  uri: string,
  body: TBody,
  headers: Record<string, string> = {},
): Promise<TResponse> {
  try {
    const config: AxiosRequestConfig = {
      headers,
    }
    const response = await apiClient.post<TResponse>(uri, body, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
    throw error
  }
}

export async function put<TResponse, TBody = TResponse>(
  uri: string,
  body: TBody,
  headers: Record<string, string> = {},
): Promise<TResponse> {
  try {
    const config: AxiosRequestConfig = {
      headers,
    }
    const response = await apiClient.put<TResponse>(uri, body, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
    throw error
  }
}

export async function del<TResponse = void>(
  uri: string,
  headers: Record<string, string> = {},
): Promise<TResponse> {
  try {
    const config: AxiosRequestConfig = {
      headers,
    }
    const response = await apiClient.delete<TResponse>(uri, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
    throw error
  }
}

function handleAxiosError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    const status = axiosError.response?.status
    const statusText = axiosError.response?.statusText || "Unknown Error"
    const errorMessage = `HTTP ${status}: ${statusText}`

    const customError = new Error(errorMessage) as Error & { status: number }
    customError.status = status || 0
    throw customError
  } else {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error("API error: " + errorMessage)
  }
}
