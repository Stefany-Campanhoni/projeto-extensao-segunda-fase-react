import logo from "@assets/logo.png"
import "./header.css"

export function Header() {
  return (
    <header className="topbar">
      <img
        src={logo}
        alt="logo.png"
      />
      <h1>Gerenciamento de perfis de mentores</h1>
    </header>
  )
}
