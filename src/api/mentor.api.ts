import { City, Mentor, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { MentorResponse } from "@security/types/auth.types"
import { apiDelete, apiGet, apiPost, apiPut } from "./api"

// Auth
export const login = (credentials: { email: string; password: string }): Promise<MentorResponse> =>
  apiPost<MentorResponse>("/mentors/login", credentials)

// Public endpoints
export const getAllMentors = (): Promise<Mentor[]> => apiGet<Mentor[]>("/mentors")

export const getCities = (): Promise<City[]> => apiGet<City[]>("/cities")

export const getSpecialtyTypes = (): Promise<string[]> => apiGet<string[]>("/specialties/types")

export const getSpecialtiesByType = (type: string): Promise<Specialty[]> =>
  apiGet<Specialty[]>(`/specialties?${new URLSearchParams({ type })}`)

export type FilterParams = {
  name?: string
  cityName?: string
  specialtyType?: string
}

export const filterMentors = (filters: FilterParams): Promise<Mentor[]> => {
  const params = new URLSearchParams()
  if (filters.name) params.append("name", filters.name)
  if (filters.cityName) params.append("cityName", filters.cityName)
  if (filters.specialtyType) params.append("specialtyType", filters.specialtyType)

  const queryString = params.toString()
  const url = queryString ? `/mentors/filter?${queryString}` : "/mentors/filter"
  return apiGet<Mentor[]>(url)
}

// Public mentor creation
export const createMentor = (mentor: MentorPayload): Promise<Mentor> =>
  apiPost<Mentor>("/mentors", mentor)

// Protected endpoints (require token)
export const getMentorById = (id: number, token: string): Promise<Mentor> =>
  apiGet<Mentor>(`/mentors/${id}`, token)

export const updateMentor = (id: number, mentor: MentorPayload, token: string): Promise<Mentor> =>
  apiPut<Mentor>(`/mentors/${id}`, mentor, token)

export const deleteMentor = (id: number, token: string): Promise<void> =>
  apiDelete<void>(`/mentors/${id}`, token)
