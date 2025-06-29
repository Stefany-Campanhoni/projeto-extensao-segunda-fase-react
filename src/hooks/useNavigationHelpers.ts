import { useNavigate } from "react-router-dom"

export function useNavigationHelpers() {
  const navigate = useNavigate()

  const goToDashboard = () => navigate("/dashboard")
  const goToPublicView = () => navigate("/public")
  const goToMentorCreate = () => navigate("/mentors/create")
  const goToMentorEdit = (id: number) => navigate(`/mentors/${id}/edit`)

  return {
    goToDashboard,
    goToPublicView,
    goToMentorCreate,
    goToMentorEdit,
  }
}
