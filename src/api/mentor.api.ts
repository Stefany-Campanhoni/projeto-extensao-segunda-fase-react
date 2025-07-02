import { City, Mentor, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { del, get, post, put } from "./api"

// Public endpoints (no authentication required)
export function getAll(): Promise<Mentor[]> {
  return get<Mentor[]>("/mentors")
}

export interface FilterParams {
  name?: string
  cityName?: string
  specialtyType?: string
}

export function filterMentors(filters: FilterParams): Promise<Mentor[]> {
  const params = new URLSearchParams()

  if (filters.name) params.append("name", filters.name)
  if (filters.cityName) params.append("cityName", filters.cityName)
  if (filters.specialtyType) params.append("specialtyType", filters.specialtyType)

  const queryString = params.toString()
  const url = queryString ? `/mentors/filter?${queryString}` : "/mentors/filter"

  return get<Mentor[]>(url)
}

/**
 * @deprecated This endpoint is now protected. Use getMentorById from mentor.auth.api.ts instead
 */
export function getById(id: number): Promise<Mentor> {
  console.warn(
    "Using deprecated getById function. This endpoint is now protected. Use getMentorById from mentor.auth.api.ts instead",
  )
  return get<Mentor>(`/mentors/${id}`)
}

export function create(mentor: MentorPayload): Promise<Mentor> {
  return post<Mentor, MentorPayload>("/mentors", mentor)
}

// Note: update and remove operations should use mentor.auth.api.ts
// These functions are kept for backward compatibility but deprecated
/**
 * @deprecated Use updateMentor from mentor.auth.api.ts instead
 */
export function update(id: number, mentor: MentorPayload): Promise<Mentor> {
  console.warn("Using deprecated update function. Use updateMentor from mentor.auth.api.ts instead")
  return put<Mentor, MentorPayload>(`/mentors/${id}`, mentor)
}

/**
 * @deprecated Use removeMentor from mentor.auth.api.ts instead
 */
export function remove(id: number): Promise<void> {
  console.warn("Using deprecated remove function. Use removeMentor from mentor.auth.api.ts instead")
  return del<void>(`/mentors/${id}`)
}

// Public reference data endpoints
export function getCities(): Promise<City[]> {
  return get<City[]>("/cities")
}

export function getSpecialtyTypes(): Promise<string[]> {
  return get<string[]>("/specialties/types")
}

export function getSpecialtiesByType(type: string): Promise<Specialty[]> {
  return get<Specialty[]>("/specialties?" + new URLSearchParams({ type: type }).toString())
}
