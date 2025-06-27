export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface LoginRequest {
  email: string
  password: string
}

export interface MentorResponse {
  id: number
  email: string
  token: string
  role: Role
}

export interface AuthState {
  user: MentorResponse | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}
