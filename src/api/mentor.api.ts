import { City, Mentor, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { del, get, post, put } from "./api"

export function getAll(): Promise<Mentor[]> {
  return get<Mentor[]>("/mentors")
}

export function getById(id: number): Promise<Mentor> {
  return get<Mentor>(`/mentors/${id}`)
}

export function create(mentor: MentorPayload): Promise<Mentor> {
  return post<Mentor, MentorPayload>("/mentors", mentor)
}

export function update(id: number, mentor: MentorPayload): Promise<Mentor> {
  return put<Mentor, MentorPayload>(`/mentors/${id}`, mentor)
}

export function remove(id: number): Promise<void> {
  return del<void>(`/mentors/${id}`)
}

export function getCities(): Promise<City[]> {
  return get<City[]>("/cities")
}

export function getSpecialtyTypes(): Promise<string[]> {
  return get<string[]>("/specialties/types")
}

export function getSpecialtiesByType(type: string): Promise<Specialty[]> {
  return get<Specialty[]>(
    "/specialties?" + new URLSearchParams({ type: type }).toString(),
  )
}
