import { post } from "@api/api"
import type { LoginRequest, MentorResponse } from "../types/auth.types"

export async function loginApi(credentials: LoginRequest): Promise<MentorResponse> {
  return await post<MentorResponse, LoginRequest>("/mentors/login", credentials)
}
