import { deleteMentor, getAllMentors } from "@api/api"
import { Button } from "@components/button/Button"
import { DeleteModal } from "@components/modal/DeleteModal"
import { Page } from "@components/page/Page"
import { Table } from "@components/table/Table"
import { Column, Mentor } from "@custom-types/types"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@security/hooks/useAuth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mentorIdToDelete, setMentorIdToDelete] = useState<number | undefined>()

  function toggleModal(mentor?: Mentor) {
    setIsModalOpen(!isModalOpen)
    setMentorIdToDelete(mentor?.id)
  }

  async function handleDeleteMentor() {
    if (mentorIdToDelete && user?.token) {
      await deleteMentor(mentorIdToDelete, user.token)
      setMentors(mentors.filter((mentor) => mentor.id !== mentorIdToDelete))
    }
  }

  const columns: Column<Mentor>[] = [
    { key: "id", label: "Código" },
    { key: "name", label: "Nome" },
    { key: "description", label: "Descrição" },
    { key: "email", label: "Email" },
    {
      key: "city",
      label: "Cidade",
      accessor: (mentor) => mentor.city.name,
    },
    {
      key: "state",
      label: "Estado",
      accessor: (mentor) => mentor.city.state,
    },
    {
      key: "specialty",
      label: "Especialidade",
      accessor: (mentor) => mentor.specialty.name,
    },
    {
      key: "specialtyType",
      label: "Área de Especialidade",
      accessor: (mentor) => mentor.specialty.type,
    },
    {
      key: "actions",
      label: "Ações",
      className: "actions-cell",
      accessor: (mentor) => (
        <>
          <Button
            variant="edit"
            icon={faPen}
            onClick={() => navigate(`/mentors/${mentor.id}/edit`)}
            className="action-buttons"
          />
          <Button
            variant="danger"
            icon={faTrash}
            className="action-buttons"
            onClick={() => toggleModal(mentor)}
          />
        </>
      ),
    },
  ]

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const mentorData = await getAllMentors()
        setMentors(mentorData)
      } catch (err) {
        console.error("Error while fetching mentors", err)
      }
    }

    loadMentors()
  }, [])

  return (
    <>
      <Page title="Gerenciamento de Perfis de Mentores">
        <section className="dashboard-top">
          <h2>Mentores Cadastrados</h2>
          <Button
            variant="primary"
            icon={faPlus}
            onClick={() => navigate("/mentors/create")}
          >
            Adicionar
          </Button>
        </section>
        <Table
          columns={columns}
          rowsData={mentors}
        />
      </Page>

      {isModalOpen && (
        <DeleteModal
          onClose={toggleModal}
          onConfirmation={handleDeleteMentor}
        />
      )}
    </>
  )
}
