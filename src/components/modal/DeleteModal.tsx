import { Button } from "@components/button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import "./delete-modal.css"

type ModalProps = {
  onClose: () => void
  onConfirmation: () => void
}

export function DeleteModal({ onClose, onConfirmation }: ModalProps) {
  return (
    <div className="modal-container">
      <section className="modal-content">
        <FontAwesomeIcon
          icon={faX}
          width={30}
          className="close-modal-button"
          onClick={onClose}
        />
        <section className="confirmation-container">
          <p>Você deseja mesmo deletar este mentor?</p>
          <section className="confirmation-buttons-container">
            <Button
              variant="danger"
              onClick={onConfirmation}
            >
              Excluir
            </Button>
            <Button
              variant="edit"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </section>
        </section>
      </section>
    </div>
  )
}
