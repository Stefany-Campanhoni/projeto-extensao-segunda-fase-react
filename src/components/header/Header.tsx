import logo from "@assets/logo.png"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserAuthModal } from "../modal/UserAuthModal"
import "./header.css"

type HeaderProps = {
  title: string
  className?: string
}

export function Header({ title, className }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleUserButtonClick = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/mentors/create")
  }

  return (
    <>
      <header className={`topbar ${className}`}>
        <img
          src={logo}
          alt="logo.png"
        />
        <h1>{title}</h1>
        <button
          className="user-modal"
          onClick={handleUserButtonClick}
        >
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="header-icon"
          />
        </button>
      </header>

      {isAuthModalOpen && (
        <UserAuthModal
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </>
  )
}
