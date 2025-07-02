import { City, Mentor, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { MentorResponse } from "@security/types/auth.types"
import axios from "axios"

const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Store the logout function to be used in interceptor
let logoutCallback: (() => void) | null = null

// Function to set the logout callback from the auth context
export const setLogoutCallback = (logout: () => void) => {
  logoutCallback = logout
}

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration specifically
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.error

      if (errorMessage === "Token has expired") {
        console.warn("Token has expired, redirecting to login...")

        // Clear stored auth data
        localStorage.removeItem("auth_user")
        localStorage.removeItem("last_visited_page")

        // Call logout callback if available to update React state
        if (logoutCallback) {
          logoutCallback()
        }

        // Redirect to login page
        window.location.href = "/login"

        return Promise.reject(new Error("Session expired. Please login again."))
      }

      // Handle other 401 errors (like invalid credentials)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

// Auth
export const login = (credentials: { email: string; password: string }): Promise<MentorResponse> =>
  api.post<MentorResponse>("/mentors/login", credentials).then((res) => res.data)

// Public endpoints
export const getAllMentors = (): Promise<Mentor[]> =>
  api.get<Mentor[]>("/mentors").then((res) => res.data)

export const getCities = (): Promise<City[]> => api.get<City[]>("/cities").then((res) => res.data)

export const getSpecialtyTypes = (): Promise<string[]> =>
  api.get<string[]>("/specialties/types").then((res) => res.data)

export const getSpecialtiesByType = (type: string): Promise<Specialty[]> =>
  api.get<Specialty[]>(`/specialties?${new URLSearchParams({ type })}`).then((res) => res.data)

export type FilterParams = {
  name?: string
  cityName?: string
  specialtyType?: string
}

export const filterMentors = async (filters: FilterParams): Promise<Mentor[]> => {
  const params = new URLSearchParams()
  if (filters.name) params.append("name", filters.name)
  if (filters.cityName) params.append("cityName", filters.cityName)
  if (filters.specialtyType) params.append("specialtyType", filters.specialtyType)

  const queryString = params.toString()
  const url = queryString ? `/mentors/filter?${queryString}` : "/mentors/filter"
  const res = await api.get<Mentor[]>(url)
  return res.data
}

export const createMentor = (mentor: MentorPayload): Promise<Mentor> =>
  api.post<Mentor>("/mentors", mentor).then((res) => res.data)

// Protected endpoints (require token)
export const getMentorById = (id: number, token: string): Promise<Mentor> =>
  api
    .get<Mentor>(`/mentors/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)

export const updateMentor = (id: number, mentor: MentorPayload, token: string): Promise<Mentor> =>
  api
    .put<Mentor>(`/mentors/${id}`, mentor, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)

export const deleteMentor = (id: number, token: string): Promise<void> =>
  api
    .delete<void>(`/mentors/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
