import { Mentor, MentorPayload } from "@custom-types/mentor.types"
import { del, get, post, put } from "./api"

export function getAll(): Promise<Mentor[]> {
  return get<Mentor[]>("mentors")
}

export function getById(id: number): Promise<Mentor> {
  return get<Mentor>(`mentors/${id}`)
}

export function create(mentor: MentorPayload): Promise<Mentor> {
  return post<Mentor, MentorPayload>("mentors", mentor)
}

export function update(id: number, mentor: MentorPayload): Promise<Mentor> {
  return put<Mentor, MentorPayload>(`mentors/${id}`, mentor)
}

export function remove(id: number): Promise<void> {
  return del<void>(`mentors/${id}`)
}
