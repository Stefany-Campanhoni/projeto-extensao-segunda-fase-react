import { filterMentors, FilterParams, getAllMentors } from "@api/api"
import { Page } from "@components/page/Page"
import { Mentor } from "@custom-types/mentor.types"
import { useEffect, useState } from "react"

import { Card } from "@components/card/MentorCard"
import { Filter } from "@components/filter/Filter"
import "./public-view.css"

export function PublicView() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)

  const loadAllMentors = async () => {
    setLoading(true)
    try {
      const data = await getAllMentors()
      setMentors(data)
    } catch (error) {
      console.error("Error loading mentors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = async (filters: FilterParams) => {
    setLoading(true)
    try {
      let data = await filterMentors(filters)
      data = data.filter(mentor => mentor.role !== "ADMIN") 
      setMentors(data)
    } catch (error) {
      console.error("Error filtering mentors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearFilters = async () => {
    await loadAllMentors()
  }

  useEffect(() => {
    loadAllMentors()
  }, [])

  return (
    <Page
      title="Conheça nossos mentores"
      headerClass="public-view-header"
    >
      <p className="tagline">Toda jornada começa com uma boa orientação!</p>

      <Filter
        onFilter={handleFilter}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <section className="cards-container">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <Card
                key={mentor.id}
                mentor={mentor}
              />
            ))
          ) : (
            <div className="text-center">
              <p>Nenhum mentor encontrado com os filtros aplicados.</p>
            </div>
          )}
        </section>
      )}
    </Page>
  )
}
