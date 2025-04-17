import { Button } from "@components/button/Button"
import { Page } from "@components/page/Page"
import { Table } from "@components/table/Table"
import { Column, Mentor } from "@custom-types/types"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"

export function Dashbord() {
  const navigate = useNavigate()
  const [mentors, setMentors] = useState<Mentor[]>([])

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
      accessor: (mentor) => (
        <Button
          variant="edit"
          onClick={() => navigate(`/mentors/${mentor.id}/edit`)}
        >
          Editar
        </Button>
      ),
    },
  ]

  useEffect((): void => {
    fetch("http://localhost:8080/mentors")
      .then((response) => response.json())
      .then((data: Mentor[]) => {
        setMentors(data)
      })
      .catch((erro) => {
        console.error("Erro ao buscar mentores:", erro)
      })
  }, [])

  return (
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
  )
}
