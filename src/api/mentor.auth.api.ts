import { Mentor, MentorPayload } from "@custom-types/mentor.types"

export async function getMentorById(
  id: number,
  authenticatedApi: {
    get: <TResponse>(uri: string) => Promise<TResponse>
  },
): Promise<Mentor> {
  return authenticatedApi.get<Mentor>(`/mentors/${id}`)
}

export async function updateMentor(
  id: number,
  mentor: MentorPayload,
  authenticatedApi: {
    put: <TResponse, TBody = TResponse>(uri: string, body: TBody) => Promise<TResponse>
  },
): Promise<Mentor> {
  return authenticatedApi.put<Mentor, MentorPayload>(`/mentors/${id}`, mentor)
}

export async function removeMentor(
  id: number,
  authenticatedApi: {
    delete: <TResponse = void>(uri: string) => Promise<TResponse>
  },
): Promise<void> {
  return authenticatedApi.delete<void>(`/mentors/${id}`)
}
