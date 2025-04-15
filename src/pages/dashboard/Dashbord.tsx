import { useState, useEffect } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Page } from "@components/page/Page"
import { Table, Column } from "@components/table/Table"
import { Button } from "@components/button/Button"
import "./dashboard.css"

type City = {
  name: string
  state: string
}

type Specialty = {
  name: string
  type: string
}

type Mentor = {
  id: number
  name: string
  description: string
  email: string
  city: City
  specialty: Specialty
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
    accessor: (mentor) => (
      <Button
        variant="edit"
        onClick={() => console.log(`Edit mentor: ${mentor.id}`)}
      >
        Editar
      </Button>
    ),
  },
]

export function Dashbord() {
  const [mentors, setMentors] = useState<Mentor[]>([])
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
    <Page>
      <section className="dashboard-top">
        <h2>Mentores Cadastrados</h2>
        <Button
          variant="primary"
          icon={faPlus}
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
