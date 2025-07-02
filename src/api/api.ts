const BASE_PATH = "http://localhost:8080"

export async function get<TResponse>(uri: string, headers: HeadersInit = {}): Promise<TResponse> {
  return await fetchData<TResponse>(uri, "GET", undefined, headers)
}

export async function post<TResponse, TBody = TResponse>(
  uri: string,
  body: TBody,
  headers: HeadersInit = {},
): Promise<TResponse> {
  return await fetchData<TResponse, TBody>(uri, "POST", body, headers)
}

export async function put<TResponse, TBody = TResponse>(
  uri: string,
  body: TBody,
  headers: HeadersInit = {},
): Promise<TResponse> {
  return await fetchData<TResponse, TBody>(uri, "PUT", body, headers)
}

export async function del<TResponse = void>(
  uri: string,
  headers: HeadersInit = {},
): Promise<TResponse> {
  return await fetchData<TResponse>(uri, "DELETE", undefined, headers)
}

async function fetchData<TResponse, TBody = unknown>(
  uri: string,
  method: string,
  body?: TBody,
  headers: HeadersInit = {},
): Promise<TResponse> {
  try {
    const response = await fetch(BASE_PATH + uri, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`
      const error = new Error(errorMessage) as Error & { status: number }
      error.status = response.status
      throw error
    }

    if (response.status === 204) return undefined as TResponse

    return response.json()
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error("Fetch error: " + errorMessage)
  }
}
