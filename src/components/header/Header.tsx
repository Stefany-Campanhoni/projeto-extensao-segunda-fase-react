import logo from "@assets/logo.png"
import "./header.css"

export function Header({ title }: { title: string }) {
  return (
    <header className="topbar">
      <img
        src={logo}
        alt="logo.png"
      />
      <h1>{title}</h1>
    </header>
  )
}
