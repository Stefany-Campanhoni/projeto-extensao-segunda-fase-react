import { Button } from "@components/button/Button"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect } from "react"
import "./delete-modal.css"

type ModalProps = {
  onClose: () => void
  onConfirmation: () => void
}

export function DeleteModal({ onClose, onConfirmation }: ModalProps) {
  function executeConfirmation() {
    onConfirmation()
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [handleKeyDown])

  return (
    <div
      className="modal-container"
      onClick={handleOverlayClick}
    >
      <section
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="close-modal-button"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <FontAwesomeIcon
            icon={faX}
            size="lg"
          />
        </button>
        <section className="confirmation-container">
          <div className="modal-header">
            <h2 className="modal-title">Confirmação de Exclusão</h2>
          </div>
          <p>Você deseja mesmo deletar este mentor?</p>
          <section className="confirmation-buttons-container">
            <Button
              variant="danger"
              onClick={executeConfirmation}
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
