export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type LoginRequest = {
  email: string
  password: string
}

export type MentorResponse = {
  id: number
  email: string
  token: string
  role: Role
}

export type AuthState = {
  user: MentorResponse | null
  isAuthenticated: boolean
  isLoading: boolean
}

export type AuthContextType = AuthState & {
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  setLastVisitedPage: (path: string) => void
  getLastVisitedPage: () => string | null
}
