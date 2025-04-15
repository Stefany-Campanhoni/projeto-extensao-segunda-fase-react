import { Page } from "@components/page/Page"
import { Table, Column } from "@components/table/Table";
import { useState, useEffect } from "react";

type City = {
  name: string,
  state: string
}

type Specialty = {
  name: string,
  type: string
}

type Mentor = {
  id: number,
  name: string,
  description: string,
  email: string,
  city: City,
  specialty: Specialty
}

export function Dashbord() {
  const columnNames: Column[] = [
    {label: "id"},
    {label: "name"}, 
    {label: "description"}, 
    {label: "email"}, 
    {label: "cidade"}, 
    {label: "estado"}, 
    {label: "especialidade"}, 
    {label: "área de especialidade"}, 
    {label: "opção"}
  ]

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
      <Table columns={columnNames} rowsData={mentors} emptyText="Nenhum mentor cadastrado :c" />
    </Page>
  )
}
