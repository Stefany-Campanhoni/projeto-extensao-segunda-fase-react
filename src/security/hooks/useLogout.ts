import { useAuth } from "@security/contexts/AuthContext"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export function useLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    navigate("/public")
  }, [logout, navigate])

  return handleLogout
}
