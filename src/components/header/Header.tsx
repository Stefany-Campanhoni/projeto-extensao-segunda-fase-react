import logo from "@assets/logo.png"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css"

type HeaderProps = {
  title: string
  className?: string
}

export function Header({ title, className }: HeaderProps) {
  return (
    <header className={`topbar ${className}`}>
      <img
        src={logo}
        alt="logo.png"
      />
      <h1>{title}</h1>
      <button>
        <FontAwesomeIcon
          icon={faUser}
          size="2x"
          className="header-icon"
        />
      </button>
    </header>
  )
}
