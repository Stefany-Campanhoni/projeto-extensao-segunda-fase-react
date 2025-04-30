import { Mentor } from "@custom-types/mentor.types"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import "./mentor-card.css"
import "bootstrap/dist/css/bootstrap.min.css"

export function Card({ mentor }: { mentor: Mentor }) {
  return (
    <div className="card">
      <section className="card-body">
        <h5 className="card-title">{mentor.name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {mentor.specialty.type} - {mentor.specialty.name}
        </h6>
        <p className="card-text">{mentor.description}</p>
        <p className="text-body-secondary">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="me-1"
          />
          <span>
            {mentor.city.name}, {mentor.city.state}
          </span>
        </p>
        <p className="text-body-secondary">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="me-1"
          />
          <span>{mentor.email}</span>
        </p>
      </section>
    </div>
  )
}
