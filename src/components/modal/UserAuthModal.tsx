import { Button } from "@components/button/Button"
import {
  faSignInAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUserEdit,
  faUserPlus,
  faUsers,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "@security/hooks/useAuth"
import { Role } from "@security/types/auth.types"
import { useCallback, useEffect } from "react"
import "./user-auth-modal.css"

type UserAuthModalProps = {
  onClose: () => void
  onLogin: () => void
  onRegister: () => void
  onLogout?: () => void
  onDashboard?: () => void
  onEditProfile?: () => void
  onPublicView?: () => void
  currentPath?: string
}

export function UserAuthModal({
  onClose,
  onLogin,
  onRegister,
  onLogout,
  onDashboard,
  onEditProfile,
  onPublicView,
  currentPath,
}: UserAuthModalProps) {
  const { isAuthenticated, user } = useAuth()

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

  const handleLoginClick = () => {
    onLogin()
    onClose()
  }

  const handleRegisterClick = () => {
    onRegister()
    onClose()
  }

  return (
    <div
      className="user-auth-modal-container"
      onClick={handleOverlayClick}
    >
      <section
        className="user-auth-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="user-auth-modal-header">
          <h2
            id="modal-title"
            className="user-auth-modal-title"
          >
            {isAuthenticated ? `Olá, ${user?.email}` : "Acesso à Conta"}
          </h2>
          <button
            className="close-user-auth-modal-button"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <FontAwesomeIcon
              icon={faX}
              size="lg"
            />
          </button>
        </div>

        <div className="auth-options">
          {isAuthenticated ? (
            <>
              {user?.role === Role.ADMIN && currentPath !== "/dashboard" && (
                <Button
                  onClick={onDashboard}
                  icon={faTachometerAlt}
                  aria-label="Ir para dashboard"
                  className="auth-button"
                >
                  Dashboard
                </Button>
              )}

              {currentPath !== "/public" && (
                <Button
                  onClick={onPublicView}
                  icon={faUsers}
                  aria-label="Ver nossos mentores"
                  className="auth-button"
                >
                  Nossos Mentores
                </Button>
              )}

              <Button
                onClick={onEditProfile}
                icon={faUserEdit}
                aria-label="Editar perfil"
                className="auth-button"
              >
                Editar Perfil
              </Button>

              <Button
                onClick={onLogout}
                icon={faSignOutAlt}
                aria-label="Fazer logout"
                className="auth-button"
                variant="danger"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {currentPath !== "/public" && (
                <Button
                  onClick={onPublicView}
                  icon={faUsers}
                  aria-label="Ver nossos mentores"
                  className="auth-button"
                >
                  Nossos Mentores
                </Button>
              )}

              <Button
                onClick={handleLoginClick}
                icon={faSignInAlt}
                aria-label="Fazer login na sua conta"
                className="auth-button"
              >
                Fazer Login
              </Button>

              <div className="auth-divider">
                <span>ou</span>
              </div>

              <Button
                onClick={handleRegisterClick}
                icon={faUserPlus}
                aria-label="Criar uma nova conta"
                className="auth-button"
              >
                Criar Conta
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
