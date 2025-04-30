import { Page } from "@components/page/Page"
import { useEffect, useState } from "react"
import { Mentor } from "@custom-types/mentor.types"
import { getAll } from "@api/mentor.api"

import "./public-view.css"
import { Card } from "@components/card/MentorCard"
import { Filter } from "@components/filter/Filter"

export function PublicView() {
  const [mentors, setMentors] = useState<Mentor[]>([])

  useEffect(() => {
    ;(async () => {
      setMentors(await getAll())
    })()
  }, [])

  return (
    <Page
      title="Banco de Mentores"
      headerClass="public-view-header"
    >
      <Filter />
      <section className="cards-container">
        {mentors.map((mentor) => (
          <Card
            key={mentor.id}
            mentor={mentor}
          />
        ))}
      </section>
    </Page>
  )
}
