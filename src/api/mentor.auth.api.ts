import { Mentor, MentorPayload } from "@custom-types/mentor.types"

// These functions should be called with authentication headers
// Import these from components that require authentication
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
