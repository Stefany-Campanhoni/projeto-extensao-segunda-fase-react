import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import "./modal.css"
import { Button } from "@components/button/Button"

export function Modal() {
  return (
    <div className="modal-container">
      <section className="modal-content">
        <FontAwesomeIcon
          icon={faX}
          width={30}
          className="close-modal-button"
        />
        <section className="confirmation-container">
          <p>Você deseja mesmo deletar este mentor?</p>
          <section className="confirmation-buttons-container">
            <Button variant="danger">Excluir</Button>
            <Button variant="edit">Cancelar</Button>
          </section>
        </section>
      </section>
    </div>
  )
}
